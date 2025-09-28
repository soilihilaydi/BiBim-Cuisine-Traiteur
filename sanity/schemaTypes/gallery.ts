/**
 * @file sanity/schemaTypes/gallery.ts
 * @description
 * Ce fichier définit le schéma de contenu pour le type de document "Gallery Item" (élément de galerie) dans Sanity.io.
 * Chaque document de ce type représente une image individuelle à afficher dans la galerie du site.
 *
 * Pour un développeur junior, il est important de comprendre que :
 * - Ce schéma dicte la structure des données pour chaque image de la galerie.
 * - Il utilise le type 'image' de Sanity, qui offre des fonctionnalités avancées comme le "hotspot"
 *   pour un recadrage intelligent des images.
 * - Le champ 'caption' est optionnel, permettant d'ajouter une description textuelle à l'image.
 */

// Importe les fonctions `defineField` et `defineType` de la bibliothèque Sanity.
import { defineField, defineType } from 'sanity';

/**
 * @constant gallery
 * @description
 * Définit le type de document "gallery".
 */
export const gallery = defineType({
  name: 'gallery',       // Nom interne unique du schéma.
  title: 'Gallery Item', // Titre affiché dans le Sanity Studio.
  type: 'document',      // Indique que c'est un document de niveau supérieur.
  fields: [              // Tableau des champs qui composent ce document.
    /**
     * @field image
     * @description
     * Champ pour l'image de la galerie.
     */
    defineField({
      name: 'image',    // Nom interne du champ.
      title: 'Image',   // Titre affiché dans le Studio.
      type: 'image',    // Type de données : image.
      options: {
        hotspot: true,  // Permet de définir un "hotspot" sur l'image pour un recadrage intelligent.
      },
      validation: (rule) => rule.required(), // Règle de validation : le champ image est obligatoire.
    }),
    /**
     * @field caption
     * @description
     * Champ pour la légende de l'image.
     * Ce champ est optionnel, ce qui signifie qu'une image peut exister sans légende.
     */
    defineField({
      name: 'caption',  // Nom interne du champ.
      title: 'Caption', // Titre affiché dans le Studio.
      type: 'string',   // Type de données : chaîne de caractères.
    }),
  ],
});