/**
 * @file jest.config.js
 * @description
 * Ce fichier est le fichier de configuration principal pour Jest, le framework de test JavaScript.
 * Il indique à Jest comment trouver, exécuter et rapporter les résultats de vos tests.
 *
 * Pour un développeur junior, il est important de comprendre que :
 * - Jest est utilisé pour tester le code JavaScript/TypeScript de l'application.
 * - Cette configuration est spécifique à un projet Next.js, car elle utilise `next/jest`
 *   pour intégrer les configurations de Next.js dans l'environnement de test.
 * - Les tests sont essentiels pour s'assurer que le code fonctionne comme prévu et pour prévenir les régressions.
 */

// Importe la fonction `nextJest` de `next/jest`.
// Cette fonction est un wrapper qui aide Jest à comprendre et à charger la configuration de Next.js.
const nextJest = require('next/jest');

// Crée une fonction de configuration Jest en lui passant le chemin de votre application Next.js.
// Cela permet à Jest de charger les fichiers `next.config.js` et `.env` dans l'environnement de test.
const createJestConfig = nextJest({
  // Fournit le chemin de votre application Next.js.
  dir: './',
});

// Définit une configuration Jest personnalisée.
// C'est ici que vous pouvez ajouter ou modifier des options spécifiques à votre projet.
const customJestConfig = {
  // Fichiers de configuration à exécuter avant chaque suite de tests.
  // `<rootDir>/jest.setup.js` est un fichier où vous pouvez configurer des choses
  // comme des mocks globaux ou des extensions de matchers Jest.
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // L'environnement de test. `jest-environment-jsdom` simule un environnement de navigateur (DOM).
  // C'est crucial pour tester des composants React qui interagissent avec le DOM.
  testEnvironment: 'jest-environment-jsdom',

  // Mappe les alias de modules. Si vous utilisez des alias d'importation dans votre code
  // (ex: `@/components/MonComposant`), cette section indique à Jest comment les résoudre.
  moduleNameMapper: {
    // Gère les alias pour le dossier `src/components`.
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    // Gère les alias pour le dossier `lib`.
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    // Ajoutez d'autres alias si nécessaire.
  },

  // Indique à Jest quels fichiers doivent être inclus dans le rapport de couverture de code.
  // La couverture de code mesure le pourcentage de votre code qui est exécuté par les tests.
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}', // Inclut tous les fichiers JS, JSX, TS, TSX dans `src`.
    '!**/*.d.ts',               // Exclut les fichiers de déclaration de type TypeScript.
    '!**/node_modules/**',      // Exclut le dossier `node_modules`.
  ],

  // Le répertoire où les rapports de couverture de code seront générés.
  coverageDirectory: 'coverage',

  // Les formats des rapports de couverture de code à générer.
  // 'json', 'lcov', 'text' (pour la console), 'clover' (pour les outils CI/CD).
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
};

// Exporte la configuration Jest finale.
// `createJestConfig` est appelé avec la configuration personnalisée pour s'assurer
// que la configuration de Next.js est correctement chargée de manière asynchrone.
module.exports = createJestConfig(customJestConfig);