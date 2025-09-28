/**
 * @file lib/sanityClient.ts
 * @description
 * Ce fichier configure le client Sanity.io, qui est utilisé pour interagir
 * avec votre base de données Sanity (votre CMS headless).
 * C'est le point de connexion entre votre application Next.js et le contenu géré dans Sanity.
 *
 * Pour un développeur junior, il est important de comprendre que :
 * - Ce client permet de "parler" à Sanity pour récupérer les données (menu, galerie, planning, etc.).
 * - Les informations de connexion (projectId, dataset, apiVersion) sont stockées dans des variables d'environnement
 *   pour des raisons de sécurité et de flexibilité (permet de changer facilement entre environnements de dev/prod).
 */

// Importe la fonction `createClient` de la bibliothèque `@sanity/client`.
// Cette fonction est utilisée pour initialiser et configurer le client Sanity.
import { createClient } from '@sanity/client';

/**
 * @constant sanityClient
 * @description
 * Instance configurée du client Sanity.
 * Elle est exportée pour être utilisée dans d'autres parties de l'application
 * afin de faire des requêtes à l'API de Sanity.
 */
export const sanityClient = createClient({
  /**
   * @property projectId
   * @description
   * L'ID de votre projet Sanity.io. Il est unique à chaque projet Sanity.
   * `process.env.NEXT_PUBLIC_SANITY_PROJECT_ID` : Récupère l'ID depuis une variable d'environnement.
   * Les variables préfixées par `NEXT_PUBLIC_` sont accessibles côté client et côté serveur dans Next.js.
   */
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,

  /**
   * @property dataset
   * @description
   * Le nom du dataset (ensemble de données) dans votre projet Sanity.
   * Un projet peut avoir plusieurs datasets (ex: 'production', 'staging', 'development').
   * `process.env.NEXT_PUBLIC_SANITY_DATASET` : Récupère le nom du dataset depuis une variable d'environnement.
   */
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,

  /**
   * @property apiVersion
   * @description
   * La version de l'API Sanity à utiliser. Il est recommandé d'utiliser une date (ex: '2023-05-03')
   * ou une version stable pour éviter les changements inattendus de l'API.
   * `process.env.NEXT_PUBLIC_SANITY_API_VERSION` : Récupère la version depuis une variable d'environnement.
   */
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION, // utilise la date du jour ou version stable

  /**
   * @property useCdn
   * @description
   * Indique si le client doit utiliser le CDN (Content Delivery Network) de Sanity pour récupérer les données.
   * - `true` : Recommandé pour les applications en production qui servent des données publiques, car le CDN
   *   met en cache les données et les distribue plus rapidement.
   * - `false` : Utile en développement pour toujours obtenir les données les plus récentes, ou si vous avez
   *   des données privées qui ne doivent pas être mises en cache par un CDN.
   * Ici, il est défini sur `false`, probablement pour s'assurer d'avoir les données les plus fraîches
   * pendant le développement ou pour des raisons spécifiques au projet.
   */
  useCdn: false, // `true` pour les données publiques
});
