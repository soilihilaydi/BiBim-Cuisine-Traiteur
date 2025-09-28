/**
 * @file sanity/schemaTypes/planning.ts
 * @description
 * Ce fichier définit le schéma de contenu pour le type de document "Planning" dans Sanity.io.
 * Un document "Planning" représente un événement ou un emplacement du resto-ambulant à un moment donné.
 *
 * Pour un développeur junior, il est important de comprendre que :
 * - Ce schéma dicte la structure des données que les éditeurs de contenu peuvent créer dans le Sanity Studio.
 * - Chaque `defineField` correspond à un champ que l'éditeur verra dans le formulaire.
 * - Les types de champs (ex: 'string', 'geopoint') déterminent le type de données et l'interface utilisateur dans le Studio.
 */

// Importe les fonctions `defineField` et `defineType` de la bibliothèque Sanity.
// - `defineType`: Utilisé pour définir un nouveau type de document ou d'objet.
// - `defineField`: Utilisé pour définir un champ à l'intérieur d'un type de document/objet.
import { defineField, defineType } from 'sanity';

/**
 * @constant planning
 * @description
 * Définit le type de document "planning".
 */
export const planning = defineType({
  name: 'planning', // Nom interne unique du schéma (utilisé dans les requêtes GROQ et le code).
  title: 'Planning', // Titre affiché dans le Sanity Studio pour ce type de document.
  type: 'document', // Indique que c'est un document de niveau supérieur (peut être créé directement dans le Studio).
  fields: [         // Tableau des champs qui composent ce document.
    /**
     * @field day
     * @description
     * Champ pour le jour de l'événement.
     * Utilise une liste déroulante de jours prédéfinis pour faciliter la saisie et éviter les erreurs.
     */
    defineField({
      name: 'day',    // Nom interne du champ.
      title: 'Jour',  // Titre affiché dans le Studio.
      type: 'string', // Type de données : chaîne de caractères.
      options: {      // Options spécifiques pour ce champ.
        list: [       // Définit une liste de choix prédéfinis.
          { title: 'Lundi', value: 'Lundi' },
          { title: 'Mardi', value: 'Mardi' },
          { title: 'Mercredi', value: 'Mercredi' },
          { title: 'Jeudi', value: 'Jeudi' },
          { title: 'Vendredi', value: 'Vendredi' },
          { title: 'Samedi', value: 'Samedi' },
          { title: 'Dimanche', value: 'Dimanche' },
        ],
        layout: 'dropdown', // Affiche la liste sous forme de menu déroulant.
      },
    }),
    /**
     * @field place
     * @description
     * Champ pour le lieu de l'événement (ex: "Marché de Lamastre").
     */
    defineField({
      name: 'place',  // Nom interne du champ.
      title: 'Lieu',  // Titre affiché dans le Studio.
      type: 'string', // Type de données : chaîne de caractères.
    }),
    /**
     * @field time
     * @description
     * Champ pour la plage horaire de l'événement (ex: "10h-14h").
     */
    defineField({
      name: 'time',   // Nom interne du champ.
      title: 'Heure', // Titre affiché dans le Studio.
      type: 'string', // Type de données : chaîne de caractères.
    }),
    /**
     * @field location
     * @description
     * Champ pour l'emplacement géographique de l'événement.
     * Utilise le type 'geopoint' de Sanity pour stocker des coordonnées GPS.
     * Cela permet aux éditeurs de sélectionner un point sur une carte directement dans le Studio.
     */
    defineField({
      name: 'location', // Nom interne du champ.
      title: 'Emplacement sur la carte', // Titre affiché dans le Studio.
      type: 'geopoint', // Type de données : point géographique (latitude, longitude, altitude).
      description: 'Sélectionnez l\'emplacement exact du food truck sur la carte.', // Aide contextuelle pour l'éditeur.
    }),
  ],
});