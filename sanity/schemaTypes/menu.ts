/**
 * @file sanity/schemaTypes/menu.ts
 * @description
 * Ce fichier définit le schéma de contenu pour le type de document "Menu Item" (élément de menu) dans Sanity.io.
 * Chaque document de ce type représente un plat ou une boisson disponible sur le menu du resto-ambulant.
 *
 * Pour un développeur junior, il est important de comprendre que :
 * - Ce schéma dicte la structure des données pour chaque élément de menu.
 * - Il inclut des types de champs variés comme le texte simple, le texte riche (Portable Text),
 *   les nombres, les images et les références à d'autres documents (catégories).
 * - Les règles de validation (`validation`) sont utilisées pour garantir la qualité des données saisies.
 */

// Importe les fonctions `defineField` et `defineType` de la bibliothèque Sanity.
import { defineField, defineType } from 'sanity';

/**
 * @constant menu
 * @description
 * Définit le type de document "menu".
 */
export const menu = defineType({
  name: 'menu',       // Nom interne unique du schéma.
  title: 'Menu Item', // Titre affiché dans le Sanity Studio.
  type: 'document',   // Indique que c'est un document de niveau supérieur.
  fields: [           // Tableau des champs qui composent ce document.
    /**
     * @field name
     * @description
     * Champ pour le nom de l'élément de menu (ex: "Burger Végétarien").
     */
    defineField({
      name: 'name',     // Nom interne du champ.
      title: 'Name',    // Titre affiché dans le Studio.
      type: 'string',   // Type de données : chaîne de caractères.
      validation: (rule) => rule.required(), // Règle de validation : le champ est obligatoire.
    }),
    /**
     * @field description
     * @description
     * Champ pour la description détaillée de l'élément de menu.
     * Utilise le type 'array' avec 'block' pour permettre du texte riche (Portable Text).
     * Cela offre des options de formatage comme les titres, les listes, le gras, l'italique.
     */
    defineField({
      name: 'description', // Nom interne du champ.
      title: 'Description',// Titre affiché dans le Studio.
      type: 'array',       // Type de données : tableau (pour le Portable Text).
      of: [                // Définit les types d'éléments que le tableau peut contenir.
        {
          type: 'block',   // Type 'block' pour le texte riche.
          styles: [        // Styles de blocs disponibles (ex: titres, paragraphe normal).
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [{ title: 'Bullet', value: 'bullet' }], // Types de listes disponibles (ex: puces).
          marks: {         // Marques (inline styles) disponibles (ex: gras, italique).
            decorators: [
              { title: 'Strong', value: 'strong' }, // Texte en gras.
              { title: 'Emphasis', value: 'em' },   // Texte en italique.
            ],
            annotations: [], // Annotations personnalisées (liens, etc. - non utilisées ici).
          },
        },
      ],
    }),
    /**
     * @field price
     * @description
     * Champ pour le prix de l'élément de menu.
     */
    defineField({
      name: 'price',    // Nom interne du champ.
      title: 'Price',   // Titre affiché dans le Studio.
      type: 'number',   // Type de données : nombre.
      validation: (rule) => rule.required().positive(), // Règle de validation : obligatoire et doit être un nombre positif.
    }),
    /**
     * @field image
     * @description
     * Champ pour l'image de l'élément de menu.
     */
    defineField({
      name: 'image',    // Nom interne du champ.
      title: 'Image',   // Titre affiché dans le Studio.
      type: 'image',    // Type de données : image.
      options: {
        hotspot: true,  // Permet de définir un "hotspot" sur l'image pour un recadrage intelligent.
      },
    }),
    /**
     * @field category
     * @description
     * Champ pour la catégorie de l'élément de menu.
     * Utilise une référence pour lier cet élément à un document de type 'category'.
     * Cela permet de regrouper les éléments de menu par catégorie (ex: "Plats", "Boissons").
     */
    defineField({
      name: 'category', // Nom interne du champ.
      title: 'Category',// Titre affiché dans le Studio.
      type: 'reference',// Type de données : référence à un autre document.
      to: [{ type: 'category' }], // Spécifie le type de document auquel cette référence peut pointer.
    }),
  ],
});