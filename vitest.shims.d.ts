/**
 * @file vitest.shims.d.ts
 * @description
 * Ce fichier est un fichier de déclaration TypeScript (shim).
 * Il est utilisé pour étendre l'environnement TypeScript avec des types spécifiques
 * nécessaires pour Vitest, en particulier lorsque Vitest est configuré pour
 * exécuter des tests dans un environnement de navigateur (browser).
 *
 * Pour un développeur junior, il est important de comprendre que :
 * - Les fichiers `.d.ts` ne contiennent pas de code JavaScript exécutable,
 *   mais uniquement des déclarations de types pour aider TypeScript à comprendre
 *   les structures de données et les API.
 * - La directive `/// <reference types="..." />` est une façon pour TypeScript
 *   d'inclure des définitions de types provenant d'autres paquets ou fichiers.
 */

// Cette ligne indique à TypeScript d'inclure les définitions de types
// fournies par le package `@vitest/browser/providers/playwright`.
// Cela garantit que lorsque vous écrivez des tests Vitest qui s'exécutent
// dans un navigateur via Playwright, TypeScript connaît les types et les API
// disponibles dans cet environnement.
/// <reference types="vitest/browser/providers/playwright" />
