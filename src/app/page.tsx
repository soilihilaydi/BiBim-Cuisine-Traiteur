/**
 * @file src/app/page.tsx
 * @description
 * Ce fichier représente la page d'accueil principale de l'application.
 * Dans Next.js, un fichier `page.tsx` (ou `.jsx`) dans un dossier `app`
 * définit une route. Ici, `src/app/page.tsx` correspond à la route racine (`/`).
 *
 * Pour un développeur junior, il est important de comprendre que :
 * - C'est le point d'entrée visuel de l'application.
 * - Il importe et assemble différents composants UI pour construire la page complète.
 * - Chaque composant importé représente une section distincte de la page d'accueil.
 */

// Importe le type 'NextPage' de Next.js, qui est un type générique pour les composants de page.
import type { NextPage } from 'next';
// Importe les différents composants UI qui composent la page d'accueil.
// Chaque import correspond à une section spécifique du site.
import Hero from "../components/Hero";         // Le composant d'en-tête ou de bannière principale.
import Concept from "../components/Concept";   // La section expliquant le concept du resto-ambulant.
import Menu from "../components/Menu";         // La section affichant le menu.
import Gallery from "../components/Gallery";   // La section de la galerie d'images.
import Planning from "../components/Planning"; // La section affichant le planning ou les événements.
import Contact from "../components/Contact";   // La section avec les informations de contact.

/**
 * @function Home
 * @description
 * C'est le composant fonctionnel React qui représente la page d'accueil.
 * Il est typé comme `NextPage` pour bénéficier des fonctionnalités spécifiques de Next.js.
 *
 * @returns {JSX.Element} La structure JSX de la page d'accueil, composée de plusieurs sous-composants.
 */
const Home: NextPage = () => {
  return (
    // Un conteneur div qui englobe tous les composants de la page.
    // La classe "scroll-smooth" est une utilité Tailwind CSS qui rend le défilement de la page plus fluide.
    <div className="scroll-smooth">
      {/* Chaque composant est rendu ici dans l'ordre où il doit apparaître sur la page. */}
      <Hero />      {/* Affiche la section Hero */}
      <Concept />   {/* Affiche la section Concept */}
      <Menu />      {/* Affiche la section Menu */}
      <Gallery />   {/* Affiche la section Galerie */}
      <Planning />  {/* Affiche la section Planning */}
      <Contact />   {/* Affiche la section Contact */}
    </div>
  );
};

// Exporte le composant 'Home' comme export par défaut.
// C'est ainsi que Next.js identifie le composant à rendre pour cette route.
export default Home;
