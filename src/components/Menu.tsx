'use client';

/**
 * @file src/components/Menu.tsx
 * @description
 * Ce composant est responsable de l'affichage du menu du resto-ambulant.
 * Il récupère dynamiquement les éléments du menu depuis Sanity.io (le CMS headless)
 * et les présente de manière structurée.
 *
 * Pour un développeur junior, ce fichier est une excellente ressource pour comprendre :
 * - La gestion de l'état local avec `useState`.
 * - L'exécution d'effets secondaires (comme la récupération de données) avec `useEffect`.
 * - L'optimisation des fonctions avec `useCallback`.
 * - L'interaction avec un CMS externe (Sanity) via son client.
 * - Le rendu conditionnel (chargement, erreur, données).
 * - L'utilisation du composant `Image` de Next.js pour l'optimisation des images.
 * - L'intégration de données structurées (JSON-LD) pour le SEO.
 */

// Importe les hooks React nécessaires pour la gestion de l'état et des effets de bord.
import { useEffect, useState, useCallback } from 'react';
// Importe le client Sanity configuré pour interagir avec l'API de votre CMS.
import { sanityClient } from '../../lib/sanityClient';
// Importe le composant Image de Next.js, qui optimise automatiquement les images pour le web.
import Image from 'next/image';

/**
 * @interface MenuItem
 * @description
 * Définit la structure des données pour un seul élément de menu.
 * C'est une "interface" TypeScript qui garantit que chaque élément de menu
 * aura ces propriétés avec les types spécifiés, ce qui rend le code plus robuste.
 */
interface MenuItem {
  _id: string;          // Identifiant unique de l'élément de menu (généré par Sanity).
  name: string;         // Nom de l'élément (ex: "Burger Classique").
  description: string;  // Description détaillée de l'élément.
  price: number;        // Prix de l'élément.
  image: {              // Objet contenant les informations de l'image.
    asset: {
      url: string;      // L'URL de l'image hébergée.
    };
  };
  categoryName?: string; // Nom de la catégorie à laquelle l'élément appartient (optionnel).
}

/**
 * @interface MenuProps
 * @description
 * Définit les propriétés (props) que le composant `Menu` peut recevoir de son parent.
 */
interface MenuProps {
  // `initialMenuItems` est une prop optionnelle. Elle peut être utilisée pour pré-remplir le menu
  // lors du rendu côté serveur (SSR) ou pour les tests (ex: Storybook), évitant ainsi un état de chargement initial.
  initialMenuItems?: MenuItem[];
}

/**
 * @function Menu
 * @description
 * Composant fonctionnel React qui affiche la liste des éléments du menu.
 * Il gère le chargement des données, les états d'erreur et l'affichage des éléments.
 *
 * @param {MenuProps} props - Les propriétés passées au composant.
 * @returns {JSX.Element} La section du menu avec les éléments chargés.
 */
const Menu = ({ initialMenuItems }: MenuProps) => {
  // --- Gestion de l'état local avec `useState` ---
  // `menuItems`: Contient la liste des éléments de menu à afficher.
  // Initialisé avec `initialMenuItems` si fourni, sinon un tableau vide.
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems || []);
  // `loading`: Booléen indiquant si les données sont en cours de chargement.
  // Initialisé à `true` si `initialMenuItems` n'est PAS fourni (nécessite un chargement).
  const [loading, setLoading] = useState(!initialMenuItems);
  // `error`: Contient un message d'erreur si la récupération des données échoue, sinon `null`.
  const [error, setError] = useState<string | null>(null);

  /**
   * @function fetchMenuItems
   * @description
   * Fonction asynchrone pour récupérer les éléments du menu depuis Sanity.
   * `useCallback` est utilisé pour mémoriser cette fonction. Cela signifie que la fonction
   * ne sera recréée que si ses dépendances changent (ici, aucune, donc elle est stable).
   * C'est une optimisation pour éviter des rendus inutiles des composants enfants.
   */
  const fetchMenuItems = useCallback(async () => {
    setLoading(true); // Active l'état de chargement avant de commencer la requête.
    setError(null);   // Réinitialise tout message d'erreur précédent.
    try {
      /**
       * @property query
       * @description
       * Requête GROQ (Graph-Relational Object Queries) utilisée pour interroger Sanity.
       * - `*[_type == "menu"]`: Sélectionne tous les documents dont le type est "menu".
       * - `{ ... }`: Projette les champs que nous voulons récupérer.
       * - `image.asset->{url}`: Récupère l'URL de l'asset de l'image liée.
       * - `"categoryName": category->name`: Récupère le nom de la catégorie liée et le renomme en `categoryName`.
       */
      const query = `*[_type == "menu"]{
        _id,
        name,
        description,
        price,
        image {
          asset->{
            url
          }
        },
        "categoryName": category->name
      }`;
      // Exécute la requête GROQ via le client Sanity.
      const data = await sanityClient.fetch(query);
      setMenuItems(data); // Met à jour l'état `menuItems` avec les données reçues.
    } catch (err) {
      // En cas d'erreur lors de la récupération des données.
      console.error("Error fetching menu items:", err); // Log l'erreur dans la console du navigateur.
      setError("Échec du chargement des éléments du menu. Veuillez réessayer."); // Définit un message d'erreur pour l'utilisateur.
    } finally {
      setLoading(false); // Désactive l'état de chargement, que la requête ait réussi ou échoué.
    }
  }, []); // Le tableau de dépendances est vide, car `fetchMenuItems` ne dépend d'aucune variable externe au composant.

  /**
   * @hook useEffect
   * @description
   * Ce hook est utilisé pour exécuter des effets de bord après le rendu du composant.
   * Ici, il est utilisé pour déclencher la récupération des données du menu.
   *
   * - `if (!initialMenuItems)`: La récupération n'est déclenchée que si les données
   *   n'ont pas été fournies initialement (par exemple, si le composant est rendu côté client
   *   et non via SSR ou Storybook avec des props initiales).
   * - `[initialMenuItems, fetchMenuItems]`: Le tableau de dépendances. L'effet se réexécutera
   *   si `initialMenuItems` ou `fetchMenuItems` changent. `fetchMenuItems` est stable grâce à `useCallback`.
   */
  useEffect(() => {
    if (!initialMenuItems) {
      fetchMenuItems();
    }
  }, [initialMenuItems, fetchMenuItems]);

  // --- Rendu conditionnel : États de chargement et d'erreur ---

  // Si `loading` est vrai, affiche un squelette de chargement.
  if (loading) {
    return (
      <section id="menu" className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-10 text-primary">Notre Menu</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Crée 3 éléments de "squelette" pour simuler le chargement. */}
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white shadow-lg p-6 rounded-2xl flex flex-col items-center animate-pulse">
              <div className="w-48 h-48 bg-gray-300 rounded-lg mb-4"></div>
              <div className="h-6 bg-gray-300 w-3/4 mb-2 rounded"></div>
              <div className="h-4 bg-gray-200 w-1/2 mb-2 rounded"></div>
              <div className="h-5 bg-gray-300 w-1/4 rounded"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Si `error` contient un message, affiche le message d'erreur et un bouton de réessai.
  if (error) {
    return (
      <section id="menu" className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-10 text-primary">Notre Menu</h2>
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchMenuItems} // Au clic, tente de récupérer à nouveau les données.
          className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-accent transition"
        >
          Réessayer
        </button>
      </section>
    );
  }

  // --- Rendu principal : Affichage des éléments du menu ---
  return (
    // La balise <section> pour la section du menu.
    // - `id="menu"`: Ancre pour la navigation.
    <section id="menu" className="py-20 px-6 text-center">
      <h2 className="text-4xl font-bold mb-10 text-primary">Notre Menu</h2>
      {/* Grille Tailwind CSS pour afficher les éléments du menu. */}
      {/* - `grid md:grid-cols-3`: Affiche les éléments en colonne unique sur mobile, 3 colonnes sur écrans moyens et plus. */}
      {/* - `gap-8`: Espacement entre les éléments de la grille. */}
      {/* - `max-w-5xl mx-auto`: Limite la largeur de la grille et la centre. */}
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* `menuItems.map()`: Itère sur chaque élément du tableau `menuItems` pour créer un composant pour chacun. */}
        {menuItems.map((item, index) => (
          // Chaque élément de la liste doit avoir une prop `key` unique pour que React puisse les identifier efficacement.
          <div key={item._id} className="bg-white shadow-lg p-6 rounded-2xl flex flex-col items-center">
            {/* --- Données structurées JSON-LD pour le SEO --- */}
            {/* Ce script fournit des informations structurées sur chaque élément de menu aux moteurs de recherche. */}
            {/* Cela peut aider à améliorer la visibilité dans les résultats de recherche (ex: affichage direct du menu). */}
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "http://schema.org", // Contexte du schéma (schema.org est un vocabulaire standard).
                "@type": "MenuItem",             // Type d'entité : un élément de menu.
                name: item.name,
                description: item.description,
                image: item.image?.asset?.url,
                offers: {
                  "@type": "Offer",
                  price: item.price,
                  priceCurrency: "EUR"
                },
                hasMenuSection: {
                  "@type": "MenuSection",
                  name: item.categoryName || 'Menu'
                }
              })}
            </script>

            {/* Affiche l'image de l'élément de menu si elle existe. */}
            {item.image && (
              <Image
                src={item.image.asset.url} // Source de l'image.
                alt={item.name}             // Texte alternatif pour l'accessibilité.
                width={200}                 // Largeur intrinsèque de l'image.
                height={200}                // Hauteur intrinsèque de l'image.
                className="rounded-lg mb-4 object-cover" // Styles Tailwind pour l'image.
                // `sizes` aide Next.js à choisir la meilleure taille d'image en fonction de la largeur de l'écran.
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 200px"
                // `priority` indique à Next.js de charger cette image avec une priorité élevée (pour les images visibles au-dessus du pli).
                // Ici, seule la première image (index 0) est chargée avec priorité.
                priority={index === 0}
              />
            )}
            {/* Nom de l'élément de menu. */}
            <h3 className="text-2xl font-bold text-primary mb-2">{item.name}</h3>
            {/* Nom de la catégorie, affiché seulement s'il existe. */}
            {item.categoryName && <p className="text-gray-600 text-sm mb-1">{item.categoryName}</p>}
            {/* Description de l'élément, affichée seulement s'il existe. */}
            {item.description && <p className="mb-2">{item.description}</p>}
            {/* Prix de l'élément. */}
            <span className="font-bold text-secondary text-xl">{item.price}€</span>
          </div>
        ))}
        {/* Message affiché si aucun élément de menu n'est disponible après le chargement et sans erreur. */}
        {menuItems.length === 0 && !loading && !error && (
          <p className="col-span-full">Aucun élément de menu disponible pour le moment.</p>
        )}
      </div>
    </section>
  );
};

// Exporte le composant Menu pour qu'il puisse être utilisé dans d'autres fichiers.
export default Menu;