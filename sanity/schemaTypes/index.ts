/**
 * @file sanity/schemaTypes/index.ts
 * @description
 * Ce fichier est le point d'entrée central pour toutes les définitions de schémas de contenu
 * de votre projet Sanity.io.
 *
 * Pour un développeur junior, il est important de comprendre que :
 * - Chaque fichier importé ici (`planning`, `menu`, etc.) définit la structure d'un type de document
 *   que vous pouvez créer et gérer dans le Sanity Studio.
 * - L'array `schemaTypes` est ce que Sanity Studio utilise pour savoir quels types de contenu
 *   il doit afficher et comment les formulaires d'édition doivent être construits.
 * - Si vous créez un nouveau type de document Sanity, vous devrez l'importer ici et l'ajouter
 *   à l'array `schemaTypes` pour qu'il apparaisse dans le Studio.
 */

// Importe chaque définition de schéma de contenu depuis son fichier respectif.
// Chaque import représente un type de document que vous pouvez gérer dans Sanity.
import { planning } from './planning';       // Schéma pour les événements de planning.
import { menu } from './menu';               // Schéma pour les éléments du menu.
import { gallery } from './gallery';         // Schéma pour les images de la galerie.
import { contactInfo } from './contactInfo'; // Schéma pour les informations de contact.
import { category } from './category';       // Schéma pour les catégories (utilisé par le menu).

/**
 * @constant schemaTypes
 * @description
 * Cet array contient toutes les définitions de schémas de documents et d'objets
 * qui seront disponibles dans le Sanity Studio.
 * C'est la liste que Sanity utilise pour générer l'interface utilisateur
 * de gestion de contenu.
 */
export const schemaTypes = [planning, menu, gallery, contactInfo, category];