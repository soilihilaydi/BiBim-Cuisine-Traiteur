/**
 * @file jest.setup.js
 * @description
 * Ce fichier est exécuté une fois avant chaque suite de tests Jest.
 * Il est utilisé pour configurer l'environnement de test global,
 * comme l'importation de bibliothèques qui étendent les fonctionnalités de Jest.
 *
 * Pour un développeur junior, il est important de comprendre que :
 * - C'est l'endroit idéal pour ajouter des configurations globales nécessaires à vos tests.
 * - Il permet d'étendre les capacités de Jest pour mieux tester les composants React.
 */

// Importe `@testing-library/jest-dom`.
// Cette bibliothèque fournit des "matchers" Jest personnalisés pour les assertions sur le DOM.
// Par exemple, elle permet d'écrire `expect(element).toBeInTheDocument()` au lieu de `expect(element).not.toBeNull()`.
// Cela rend les tests plus lisibles et expressifs lors du travail avec des éléments du DOM.
import '@testing-library/jest-dom';