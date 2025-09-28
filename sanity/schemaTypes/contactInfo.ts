/**
 * @file sanity/schemaTypes/contactInfo.ts
 * @description
 * Ce fichier définit le schéma de contenu pour le type de document "Contact Information" (informations de contact) dans Sanity.io.
 * Ce document est destiné à stocker les coordonnées générales du resto-ambulant,
 * telles que le numéro de téléphone, l'adresse e-mail et les liens vers les réseaux sociaux.
 *
 * Pour un développeur junior, il est important de comprendre que :
 * - Ce schéma permet de centraliser et de gérer facilement les informations de contact
 *   qui peuvent être affichées à plusieurs endroits sur le site.
 * - Il utilise le type 'url' de Sanity pour les liens de réseaux sociaux, ce qui inclut
 *   une validation automatique du format d'URL.
 */

// Importe les fonctions `defineField` et `defineType` de la bibliothèque Sanity.
import { defineField, defineType } from 'sanity';

/**
 * @constant contactInfo
 * @description
 * Définit le type de document "contactInfo".
 */
export const contactInfo = defineType({
  name: 'contactInfo',       // Nom interne unique du schéma.
  title: 'Contact Information', // Titre affiché dans le Sanity Studio.
  type: 'document',          // Indique que c'est un document de niveau supérieur.
  fields: [                  // Tableau des champs qui composent ce document.
    /**
     * @field phone
     * @description
     * Champ pour le numéro de téléphone du resto-ambulant.
     */
    defineField({
      name: 'phone',    // Nom interne du champ.
      title: 'Phone Number', // Titre affiché dans le Studio.
      type: 'string',   // Type de données : chaîne de caractères.
    }),
    /**
     * @field email
     * @description
     * Champ pour l'adresse e-mail de contact.
     */
    defineField({
      name: 'email',    // Nom interne du champ.
      title: 'Email Address', // Titre affiché dans le Studio.
      type: 'string',   // Type de données : chaîne de caractères.
    }),
    /**
     * @field facebook
     * @description
     * Champ pour l'URL de la page Facebook du resto-ambulant.
     * Utilise le type 'url' pour s'assurer que la valeur est une URL valide.
     */
    defineField({
      name: 'facebook', // Nom interne du champ.
      title: 'Facebook URL', // Titre affiché dans le Studio.
      type: 'url',      // Type de données : URL.
    }),
    /**
     * @field instagram
     * @description
     * Champ pour l'URL du profil Instagram du resto-ambulant.
     */
    defineField({
      name: 'instagram',// Nom interne du champ.
      title: 'Instagram URL', // Titre affiché dans le Studio.
      type: 'url',      // Type de données : URL.
    }),
    /**
     * @field twitter
     * @description
     * Champ pour l'URL du profil Twitter (ou X) du resto-ambulant.
     */
    defineField({
      name: 'twitter',  // Nom interne du champ.
      title: 'Twitter URL', // Titre affiché dans le Studio.
      type: 'url',      // Type de données : URL.
    }),
  ],
});