'use client';

/**
 * @file src/components/Gallery.tsx
 * @description
 * Ce composant est responsable de l'affichage d'une galerie d'images.
 * Il récupère les images et leurs légendes depuis Sanity.io (le CMS headless)
 * et les présente dans une grille réactive.
 *
 * Pour un développeur junior, ce fichier est une bonne illustration de :
 * - La réutilisation des patterns de récupération de données (useState, useEffect, useCallback).
 * - L'utilisation avancée du composant `Image` de Next.js avec la prop `fill` pour des images responsives.
 * - La création de superpositions (overlays) pour afficher des informations sur les images.
 */

// Importe les hooks React nécessaires pour la gestion de l'état et des effets de bord.
import { useEffect, useState, useCallback } from 'react';
// Importe le client Sanity configuré pour interagir avec l'API de votre CMS.
import { sanityClient } from '../../lib/sanityClient';
// Importe le composant Image de Next.js, qui optimise automatiquement les images pour le web.
import Image from 'next/image';

/**
 * @interface GalleryItem
 * @description
 * Définit la structure des données pour un seul élément de la galerie.
 * C'est une "interface" TypeScript qui garantit que chaque élément de la galerie
 * aura ces propriétés avec les types spécifiés.
 */
interface GalleryItem {
  _id: string;          // Identifiant unique de l'élément de la galerie (généré par Sanity).
  caption?: string;     // Légende ou description de l'image (optionnel).
  image: {              // Objet contenant les informations de l'image.
    asset: {
      url: string;      // L'URL de l'image hébergée.
    };
  };
}

/**
 * @interface GalleryProps
 * @description
 * Définit les propriétés (props) que le composant `Gallery` peut recevoir de son parent.
 */
interface GalleryProps {
  // `initialGalleryItems` est une prop optionnelle, utile pour le rendu côté serveur (SSR)
  // ou pour les tests (ex: Storybook) afin de fournir des données initiales sans chargement.
  initialGalleryItems?: GalleryItem[];
}

/**
 * @function Gallery
 * @description
 * Composant fonctionnel React qui affiche une galerie d'images.
 * Il gère le chargement des données, les états d'erreur et l'affichage des images.
 *
 * @param {GalleryProps} props - Les propriétés passées au composant.
 * @returns {JSX.Element} La section de la galerie avec les images chargées.
 */
const Gallery = ({ initialGalleryItems }: GalleryProps) => {
  // --- Gestion de l'état local avec `useState` ---
  // `galleryItems`: Contient la liste des éléments de la galerie à afficher.
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(initialGalleryItems || []);
  // `loading`: Booléen indiquant si les données sont en cours de chargement.
  const [loading, setLoading] = useState(!initialGalleryItems);
  // `error`: Contient un message d'erreur si la récupération des données échoue, sinon `null`.
  const [error, setError] = useState<string | null>(null);

  /**
   * @function fetchGalleryItems
   * @description
   * Fonction asynchrone pour récupérer les éléments de la galerie depuis Sanity.
   * `useCallback` est utilisé pour mémoriser cette fonction, évitant sa recréation
   * à chaque rendu et optimisant les performances.
   */
  const fetchGalleryItems = useCallback(async () => {
    setLoading(true); // Active l'état de chargement.
    setError(null);   // Réinitialise tout message d'erreur précédent.
    try {
      /**
       * @property query
       * @description
       * Requête GROQ pour interroger Sanity et récupérer les documents de type "gallery".
       * - `*[_type == "gallery"]`: Sélectionne tous les documents de type "gallery".
       * - `{ _id, caption, image { asset->{ url } } }`: Projette les champs nécessaires.
       */
      const query = `*[_type == "gallery"]{
        _id,
        caption,
        image {
          asset->{
            url
          }
        }
      }`;
      const data = await sanityClient.fetch(query); // Exécute la requête via le client Sanity.
      setGalleryItems(data); // Met à jour l'état `galleryItems` avec les données reçues.
    } catch (err) {
      console.error("Error fetching gallery items:", err); // Log l'erreur en console.
      setError("Échec du chargement des éléments de la galerie. Veuillez réessayer."); // Message d'erreur pour l'utilisateur.
    } finally {
      setLoading(false); // Désactive l'état de chargement.
    }
  }, []); // Le tableau de dépendances est vide, la fonction est stable.

  /**
   * @hook useEffect
   * @description
   * Ce hook exécute `fetchGalleryItems` au montage du composant si les données
   * n'ont pas été fournies initialement via les props.
   */
  useEffect(() => {
    if (!initialGalleryItems) {
      fetchGalleryItems();
    }
  }, [initialGalleryItems, fetchGalleryItems]);

  // --- Rendu conditionnel : États de chargement et d'erreur ---

  // Si `loading` est vrai, affiche un squelette de chargement pour les images.
  if (loading) {
    return (
      <section id="gallery" className="py-20 px-6 bg-accent text-center">
        <h2 className="text-4xl font-bold mb-10 text-primary">Galerie</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Crée 3 éléments de "squelette" pour simuler le chargement des images. */}
          {[...Array(3)].map((_, index) => (
            <div key={index} className="relative w-full h-64 rounded-2xl shadow-lg overflow-hidden animate-pulse">
              <div className="w-full h-full bg-gray-300"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Si `error` contient un message, affiche le message d'erreur et un bouton de réessai.
  if (error) {
    return (
      <section id="gallery" className="py-20 px-6 bg-accent text-center">
        <h2 className="text-4xl font-bold mb-10 text-primary">Galerie</h2>
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchGalleryItems} // Au clic, tente de récupérer à nouveau les données.
          className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-accent transition"
        >
          Réessayer
        </button>
      </section>
    );
  }

  // --- Rendu principal : Affichage des éléments de la galerie ---
  return (
    // La balise <section> pour la section de la galerie.
    // - `id="gallery"`: Ancre pour la navigation.
    <section id="gallery" className="py-20 px-6 bg-accent text-center">
      <h2 className="text-4xl font-bold mb-10 text-primary">Galerie</h2>
      {/* Grille Tailwind CSS pour afficher les images. */}
      {/* - `grid md:grid-cols-3`: Affiche les images en colonne unique sur mobile, 3 colonnes sur écrans moyens et plus. */}
      {/* - `gap-6`: Espacement entre les éléments de la grille. */}
      {/* - `max-w-5xl mx-auto`: Limite la largeur de la grille et la centre. */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* `galleryItems.map()`: Itère sur chaque élément de la galerie pour créer un composant pour chacun. */}
        {galleryItems.map((item) => (
          // Conteneur pour chaque image de la galerie.
          <div key={item._id} className="relative w-full h-64 rounded-2xl shadow-lg overflow-hidden">
            {/* Affiche l'image de l'élément si elle existe. */}
            {item.image && (
              <Image
                src={item.image.asset.url} // Source de l'image.
                alt={item.caption || 'Gallery image'} // Texte alternatif pour l'accessibilité.
                fill // La prop `fill` fait en sorte que l'image remplisse le conteneur parent.
                style={{ objectFit: 'cover' }} // S'assure que l'image couvre la zone sans être déformée.
                // `sizes` aide Next.js à choisir la meilleure taille d'image en fonction de la largeur de l'écran.
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
            {/* Affiche la légende de l'image si elle existe, en superposition. */}
            {item.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
                {item.caption}
              </div>
            )}
          </div>
        ))}
        {/* Message affiché si aucun élément de galerie n'est disponible après le chargement et sans erreur. */}
        {galleryItems.length === 0 && !loading && !error && (
          <p className="col-span-full">Aucun élément de galerie disponible pour le moment.</p>
        )}
      </div>
    </section>
  );
};

// Exporte le composant Gallery pour qu'il puisse être utilisé dans d'autres fichiers.
export default Gallery;
