/**
 * @file __tests__/Hero.test.tsx
 * @description
 * Ce fichier contient les tests unitaires pour le composant `Hero`.
 * Les tests unitaires sont essentiels pour s'assurer que chaque partie isolée de votre code
 * (ici, un composant React) fonctionne comme prévu.
 *
 * Pour un développeur junior, il est important de comprendre que :
 * - Les tests sont écrits avec Jest (le framework de test) et `@testing-library/react`
 *   (une bibliothèque pour tester les composants React de manière conviviale pour l'utilisateur).
 * - L'objectif est de simuler l'interaction d'un utilisateur avec le composant
 *   et de vérifier que le rendu et le comportement sont corrects.
 */

// Importe les fonctions `render` et `screen` de `@testing-library/react`.
// - `render`: Permet de rendre un composant React dans un environnement de test virtuel.
// - `screen`: Fournit des méthodes pour interroger le DOM rendu par `render`.
import { render, screen } from '@testing-library/react';
// Importe le composant `Hero` que nous allons tester.
import Hero from '@/components/Hero';

/**
 * @function describe
 * @description
 * `describe` est une fonction de Jest qui regroupe un ensemble de tests liés.
 * Le premier argument est une description de la suite de tests.
 */
describe('Hero', () => {
  /**
   * @function it (ou test)
   * @description
   * `it` (ou `test`) est une fonction de Jest qui définit un cas de test individuel.
   * Le premier argument est une description de ce que ce test est censé vérifier.
   */
  it('renders the main heading and call-to-action link', () => {
    // --- Étape 1: Rendre le composant ---
    // Rend le composant `Hero` dans un environnement de test virtuel.
    render(<Hero />);

    // --- Étape 2: Interroger le DOM ---
    // `screen.getByRole` est la méthode préférée de Testing Library pour trouver des éléments,
    // car elle imite la façon dont les utilisateurs et les technologies d'assistance interagissent avec la page.
    // Ici, on cherche un titre (heading) avec le texte "BiBim Cuisine" (insensible à la casse).
    const heading = screen.getByRole('heading', { name: /BiBim Cuisine/i });
    // On cherche un lien (link) avec le texte "Réserver / Nous trouver" (insensible à la casse).
    const ctaLink = screen.getByRole('link', { name: /Réserver ou nous trouver/i });

    // --- Étape 3: Effectuer des assertions ---
    // `expect(...).toBeInTheDocument()` est un matcher de `@testing-library/jest-dom`
    // qui vérifie si l'élément est présent dans le DOM.
    expect(heading).toBeInTheDocument();

    // Vérifie que le lien d'appel à l'action est présent dans le document.
    expect(ctaLink).toBeInTheDocument();
    // Vérifie que le lien a l'attribut `href` avec la valeur '#contact'.
    expect(ctaLink).toHaveAttribute('href', '#contact');
    // Vérifie que le lien a l'attribut `aria-label` pour l'accessibilité.
    expect(ctaLink).toHaveAttribute('aria-label', 'Réserver ou nous trouver');
  });
});