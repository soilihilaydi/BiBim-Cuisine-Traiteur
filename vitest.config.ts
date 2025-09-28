/**
 * @file vitest.config.ts
 * @description
 * Ce fichier configure Vitest, un framework de test rapide,
 * particulièrement utilisé ici pour tester les composants Storybook.
 * Il permet d'exécuter des tests unitaires et d'intégration directement
 * sur les stories de vos composants.
 *
 * Pour un développeur junior, il est important de comprendre que :
 * - Vitest est une alternative à Jest, souvent plus rapide et avec une meilleure intégration TypeScript.
 * - Cette configuration est spécifique à l'intégration avec Storybook, permettant de tester
 *   les composants dans leur environnement de Storybook.
 * - Les tests peuvent être exécutés dans un environnement de navigateur réel (headless)
 *   pour une meilleure fidélité.
 */

// Importe le module `path` de Node.js pour manipuler les chemins de fichiers.
import path from 'node:path';
// Importe `fileURLToPath` pour convertir une URL de fichier en chemin de fichier.
import { fileURLToPath } from 'node:url';

// Importe `defineConfig` de Vitest pour définir la configuration.
import { defineConfig } from 'vitest/config';

// Importe le plugin `storybookTest` pour l'intégration de Vitest avec Storybook.
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

// Calcule le nom du répertoire courant de manière compatible avec CommonJS et ES Modules.
const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// Plus d'informations sur : https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    // Vitest peut exécuter plusieurs "projets" de test avec des configurations différentes.
    // Ici, nous définissons un projet spécifiquement pour les tests Storybook.
    projects: [
      {
        // `extends: true` indique que ce projet hérite de la configuration de test par défaut de Vitest.
        extends: true,
        plugins: [
          // Le plugin `storybookTest` est essentiel pour exécuter des tests sur les stories Storybook.
          // Il va parcourir votre configuration Storybook pour trouver les stories à tester.
          // `configDir`: Spécifie le répertoire de configuration de Storybook.
          storybookTest({ configDir: path.join(dirname, '.storybook') }),
        ],
        test: {
          // Nomme ce projet de test "storybook".
          name: 'storybook',
          // Configuration pour l'exécution des tests dans un navigateur.
          browser: {
            enabled: true,   // Active l'exécution des tests dans un navigateur.
            headless: true,  // Exécute le navigateur en mode "headless" (sans interface graphique visible).
            provider: 'playwright', // Utilise Playwright comme fournisseur de navigateur.
            instances: [{ browser: 'chromium' }] // Spécifie d'utiliser le navigateur Chromium.
          },
          // Fichiers de configuration à exécuter avant les tests de ce projet Storybook.
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
});