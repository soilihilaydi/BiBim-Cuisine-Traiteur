/**
 * @file sanity/schemaTypes/category.ts
 * @description
 * Ce fichier définit le schéma de contenu pour le type de document "Category" (catégorie) dans Sanity.io.
 * Les catégories sont utilisées pour organiser et regrouper les éléments du menu (définis dans `menu.ts`).
 *
 * Pour un développeur junior, il est important de comprendre que :
 * - Ce schéma permet de créer des catégories comme "Plats", "Boissons", "Desserts", etc.
 * - Ces catégories peuvent ensuite être référencées par d'autres documents (comme les "Menu Item")
 *   pour établir des relations entre les contenus.
 * - Le champ de description utilise le texte riche (Portable Text) pour permettre un formatage flexible.
 */

// Importe les fonctions `defineField` et `defineType` de la bibliothèque Sanity.
import { defineField, defineType } from 'sanity';

/**
 * @constant category
 * @description
 * Définit le type de document "category".
 */
export const category = defineType({
  name: 'category',       // Nom interne unique du schéma.
  title: 'Category',      // Titre affiché dans le Sanity Studio.
  type: 'document',       // Indique que c'est un document de niveau supérieur.
  fields: [               // Tableau des champs qui composent ce document.
    /**
     * @field name
     * @description
     * Champ pour le nom de la catégorie (ex: "Plats principaux", "Boissons").
     */
    defineField({
      name: 'name',         // Nom interne du champ.
      title: 'Category Name', // Titre affiché dans le Studio.
      type: 'string',       // Type de données : chaîne de caractères.
      validation: (rule) => rule.required(), // Règle de validation : le nom de la catégorie est obligatoire.
    }),
    /**
     * @field description
     * @description
     * Champ pour une description optionnelle de la catégorie.
     * Utilise le type 'array' avec 'block' pour permettre du texte riche (Portable Text),
     * offrant des options de formatage similaires à celles du champ de description du menu.
     */
    defineField({
      name: 'description', // Nom interne du champ.
      title: 'Description',// Titre affiché dans le Studio.
      type: 'array',       // Type de données : tableau (pour le Portable Text).
      of: [                // Définit les types d'éléments que le tableau peut contenir.
        {
          type: 'block',   // Type 'block' pour le texte riche.
          styles: [        // Styles de blocs disponibles.
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [{ title: 'Bullet', value: 'bullet' }], // Types de listes disponibles.
          marks: {         // Marques (inline styles) disponibles.
            decorators: [
              { title: 'Strong', value: 'strong' }, // Texte en gras.
              { title: 'Emphasis', value: 'em' },   // Texte en italique.
            ],
            annotations: [], // Annotations personnalisées (non utilisées ici).
          },
        },
      ],
    }),
  ],
});