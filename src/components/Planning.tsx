/**
 * @file src/components/Planning.tsx
 * @description
 * Ce composant est responsable d'afficher le planning des événements du resto-ambulant
 * et de localiser le prochain événement sur une carte interactive.
 *
 * Pour un développeur junior, ce fichier est une excellente ressource pour comprendre :
 * - L'utilisation de la directive `'use client'` pour les composants côté client.
 * - L'importation dynamique de composants (`next/dynamic`) pour optimiser le chargement
 *   et gérer les bibliothèques spécifiques au navigateur (comme Leaflet pour la carte).
 * - La récupération de données complexes depuis Sanity, incluant des coordonnées géographiques.
 * - La logique pour déterminer la position de la carte en fonction des données.
 * - La génération de données structurées (JSON-LD) pour les événements, afin d'améliorer le SEO.
 */

// Indique que ce composant doit être rendu côté client.
// C'est nécessaire car il utilise des hooks React (useState, useEffect) et des bibliothèques
// qui interagissent avec le DOM du navigateur (comme Leaflet via le composant Map).
'use client';

// Importe les hooks React nécessaires pour la gestion de l'état et des effets de bord.
import { useEffect, useState, useCallback } from 'react';
// Importe le client Sanity configuré pour interagir avec l'API de votre CMS.
import { sanityClient } from '../../lib/sanityClient';
// Importe `dynamic` de Next.js pour l'importation dynamique de composants.
import dynamic from 'next/dynamic';
// Importe le type `LatLngExpression` de la bibliothèque Leaflet, utilisé pour les coordonnées géographiques.
import { LatLngExpression } from 'leaflet';

/**
 * @type PlanningItem
 * @description
 * Définit la structure des données pour un seul élément de planning (un événement).
 * C'est un "type" TypeScript qui garantit la cohérence des données récupérées de Sanity.
 */
type PlanningItem = {
  _id: string;          // Identifiant unique de l'événement.
  day: string;          // Jour de l'événement (ex: "Mardi").
  place: string;        // Lieu où se déroule l'événement.
  time: string;         // Plage horaire de l'événement (ex: "10h-14h").
  location?: {          // Coordonnées GPS de l'emplacement (optionnel, si l'événement a une localisation).
    lat: number;        // Latitude.
    lng: number;        // Longitude.
  };
};

/**
 * @constant Map
 * @description
 * Importation dynamique du composant `Map`.
 * - `dynamic(() => import('./Map'))`: Charge le composant `Map` uniquement lorsque cela est nécessaire
 *   (généralement après le rendu initial côté client).
 * - `ssr: false`: Désactive le rendu côté serveur pour ce composant. C'est CRUCIAL pour les bibliothèques
 *   comme Leaflet qui nécessitent un environnement de navigateur (DOM) pour fonctionner.
 * - `loading`: Affiche un indicateur de chargement pendant que le composant `Map` est en cours de chargement.
 */
const Map = dynamic(() => import('./Map'), { 
  ssr: false, // Désactive le rendu côté serveur pour ce composant (essentiel pour Leaflet).
  loading: () => <div style={{ height: '400px', width: '100%' }} className="bg-gray-200 flex items-center justify-center"><p>Chargement de la carte...</p></div> // Affiche un placeholder pendant le chargement.
});

/**
 * @interface PlanningProps
 * @description
 * Définit les propriétés (props) que le composant `Planning` peut recevoir de son parent.
 */
interface PlanningProps {
  // `initialPlanningItems` est une prop optionnelle, utile pour le rendu côté serveur (SSR)
  // ou pour les tests (ex: Storybook) afin de fournir des données initiales sans chargement.
  initialPlanningItems?: PlanningItem[];
}

/**
 * @function Planning
 * @description
 * Composant fonctionnel React qui affiche le planning des événements et une carte.
 * Il gère le chargement des données, les états d'erreur et la logique de la carte.
 *
 * @param {PlanningProps} props - Les propriétés passées au composant.
 * @returns {JSX.Element} La section du planning avec la liste des événements et la carte.
 */
const Planning = ({ initialPlanningItems }: PlanningProps) => {
  // --- Gestion de l'état local avec `useState` ---
  // `planningItems`: Contient la liste des événements de planning à afficher.
  const [planningItems, setPlanningItems] = useState<PlanningItem[]>(initialPlanningItems || []);
  // `loading`: Booléen indiquant si les données sont en cours de chargement.
  const [loading, setLoading] = useState(!initialPlanningItems);
  // `error`: Contient un message d'erreur si la récupération des données échoue, sinon `null`.
  const [error, setError] = useState<string | null>(null);

  /**
   * @function fetchPlanningItems
   * @description
   * Fonction asynchrone pour récupérer les éléments de planning depuis Sanity.
   * `useCallback` est utilisé pour mémoriser cette fonction, évitant sa recréation
   * à chaque rendu et optimisant les performances.
   */
  const fetchPlanningItems = useCallback(async () => {
    setLoading(true); // Active l'état de chargement.
    setError(null);   // Réinitialise tout message d'erreur précédent.
    try {
      /**
       * @property query
       * @description
       * Requête GROQ pour interroger Sanity et récupérer les documents de type "planning".
       * - `*[_type == "planning"]`: Sélectionne tous les documents de type "planning".
       * - `| order(day asc)`: Trie les résultats par jour en ordre croissant.
       * - `{ _id, day, place, time, location }`: Projette les champs nécessaires.
       */
      const data: PlanningItem[] = await sanityClient.fetch(`*[_type == "planning"] | order(day asc) {_id, day, place, time, location}`);
      setPlanningItems(data); // Met à jour l'état `planningItems` avec les données reçues.
    } catch (err) {
      console.error("Error fetching planning items:", err); // Log l'erreur en console.
      setError("Échec du chargement du planning. Veuillez réessayer."); // Message d'erreur pour l'utilisateur.
    } finally {
      setLoading(false); // Désactive l'état de chargement.
    }
  }, []); // Le tableau de dépendances est vide, la fonction est stable.

  /**
   * @hook useEffect
   * @description
   * Ce hook exécute `fetchPlanningItems` au montage du composant si les données
   * n'ont pas été fournies initialement via les props.
   */
  useEffect(() => {
    if (!initialPlanningItems) {
      fetchPlanningItems();
    }
  }, [initialPlanningItems, fetchPlanningItems]);

  // --- Logique pour déterminer la position de la carte ---
  // Cherche le premier événement dans la liste qui a une localisation définie.
  const nextEventWithLocation = planningItems.find(p => p.location);

  // Position par défaut (Paris) si aucun événement n'a de localisation.
  const defaultPosition: LatLngExpression = [48.8566, 2.3522];
  // La position de la carte sera celle du prochain événement avec localisation, sinon la position par défaut.
  const position: LatLngExpression = nextEventWithLocation?.location
    ? [nextEventWithLocation.location.lat, nextEventWithLocation.location.lng]
    : defaultPosition;
  // Le texte du popup de la carte affichera les détails du prochain événement ou un message générique.
  const popupText = nextEventWithLocation ? `${nextEventWithLocation.place} - ${nextEventWithLocation.time}` : "Prochainement ici !";

  // --- Rendu conditionnel : États de chargement et d'erreur ---

  // Si `loading` est vrai, affiche un squelette de chargement pour la liste et la carte.
  if (loading) {
    return (
      <section id="planning" className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-10 text-primary">Où nous trouver</h2>
        <p className="mb-6">Retrouvez notre foodtruck selon le planning ci-dessous :</p>
        <ul className="max-w-xl mx-auto mb-8 text-lg space-y-2 animate-pulse">
          {/* Crée 3 éléments de "squelette" pour simuler le chargement de la liste. */}
          {[...Array(3)].map((_, index) => (
            <li key={index} className="h-6 bg-gray-300 rounded w-full"></li>
          ))}
        </ul>
        <div className="rounded-2xl shadow-lg overflow-hidden">
          {/* Placeholder pour la carte pendant le chargement. */}
          <div style={{ height: '400px', width: '100%' }} className="bg-gray-200 flex items-center justify-center">
            <p>Chargement de la carte...</p>
          </div>
        </div>
      </section>
    );
  }

  // Si `error` contient un message, affiche le message d'erreur et un bouton de réessai.
  if (error) {
    return (
      <section id="planning" className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-10 text-primary">Où nous trouver</h2>
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchPlanningItems} // Au clic, tente de récupérer à nouveau les données.
          className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-accent transition"
        >
          Réessayer
        </button>
      </section>
    );
  }

  /**
   * @function generateEventSchema
   * @description
   * Génère un script JSON-LD pour les événements, afin d'améliorer le référencement (SEO)
   * en fournissant des données structurées aux moteurs de recherche.
   *
   * @returns {JSX.Element | null} Un élément <script> contenant le JSON-LD ou null si aucun événement n'a de localisation.
   */
  const generateEventSchema = () => {
    // Filtre les événements qui ont une localisation définie.
    const events = planningItems
      .map((item) => {
        if (!item.location) {
          return null; // Ignore les événements sans localisation pour le schéma.
        }

        // Note importante pour le développeur junior :
        // Le format de date de Sanity n'est pas toujours assez précis pour le schéma Event de Google.
        // Pour une implémentation complète et valide, le CMS devrait fournir des dates/heures précises
        // au format ISO 8601 pour `startDate` et `endDate`.
        // Pour l'instant, nous omettons ces champs pour éviter les erreurs de validation.

        return {
          '@context': 'https://schema.org', // Contexte du schéma (schema.org est un vocabulaire standard).
          '@type': 'Event',                 // Type d'entité : un événement.
          name: `BiBim Cuisine à ${item.place}`, // Nom de l'événement.
          description: `Retrouvez notre foodtruck à ${item.place} le ${item.day} de ${item.time}.`, // Description.
          location: {                       // Informations sur le lieu de l'événement.
            '@type': 'Place',
            name: item.place,
            address: item.place, // L'adresse peut être plus détaillée si disponible.
            geo: {
              '@type': 'GeoCoordinates',
              latitude: item.location.lat,
              longitude: item.location.lng,
            },
          },
          organizer: {
            '@type': 'Organization',
            name: 'BiBim Cuisine',
            // TODO: Remplacer par l'URL réelle du site une fois déployé.
            url: 'https://www.votre-site.com',
          },
        };
      })
      .filter(Boolean); // Filtre les éléments nuls (ceux sans localisation) du tableau.

    if (events.length === 0) {
      return null; // Ne retourne rien si aucun événement valide n'est trouvé.
    }

    return (
      // Insère le JSON-LD dans le DOM. `dangerouslySetInnerHTML` est utilisé car nous insérons du HTML brut.
      // Il faut s'assurer que le contenu JSON est bien formé et sécurisé.
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(events) }}
      />
    );
  };

  // --- Rendu principal : Affichage du planning et de la carte ---
  return (
    // La balise <section> pour la section du planning.
    // - `id="planning"`: Ancre pour la navigation.
    <section id="planning" className="py-20 px-6 text-center">
      {/* Affiche le script JSON-LD généré pour le SEO. */}
      {generateEventSchema()}
      <h2 className="text-4xl font-bold mb-10 text-primary">Où nous trouver</h2>
      <p className="mb-6">Retrouvez notre foodtruck selon le planning ci-dessous :</p>
      <ul className="max-w-xl mx-auto mb-8 text-lg">
        {/* `planningItems.map()`: Itère sur chaque événement pour l'afficher dans une liste. */}
        {planningItems.map((item) => (
          <li key={item._id}>
            {item.day} – {item.place} ({item.time})
          </li>
        ))}
      </ul>
      <div className="rounded-2xl shadow-lg overflow-hidden">
        {/* Affiche le composant Map, en lui passant la position calculée et le texte du popup. */}
        <Map position={position} popupText={popupText} />
      </div>
    </section>
  );
};

// Exporte le composant Planning pour qu'il puisse être utilisé dans d'autres fichiers.
export default Planning;