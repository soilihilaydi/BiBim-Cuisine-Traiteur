/**
 * @file src/app/layout.tsx
 * @description
 * Ce fichier définit le "Root Layout" (la mise en page racine) de votre application Next.js.
 * C'est un composant essentiel qui enveloppe toutes les pages de votre application.
 * Il contient la structure HTML de base (<html>, <body>), les métadonnées globales,
 * et importe les styles globaux.
 *
 * Pour un développeur junior, il est important de comprendre que :
 * - Tout ce qui est défini ici sera présent sur TOUTES les pages de l'application.
 * - C'est l'endroit idéal pour importer des feuilles de style globales, des polices,
 *   ou des composants qui doivent apparaître sur chaque page (comme un en-tête ou un pied de page global).
 */

// Importe le type 'Metadata' de Next.js pour définir les métadonnées de la page (titre, description, etc.).
import type { Metadata } from "next";
// Importe les styles CSS globaux de l'application. Ces styles s'appliqueront à toutes les pages.
import { Mochiy_Pop_One } from "next/font/google";
// Importe les styles CSS globaux de l'application. Ces styles s'appliqueront à toutes les pages.
import "./globals.css";

// Initialise la police Mochiy Pop One avec le sous-ensemble "latin".
// Cela permet à Next.js d'optimiser le chargement de la police.
const mochiy = Mochiy_Pop_One({ subsets: ["latin"], weight: "400" });

/**
 * @property metadata
 * @description
 * Cet objet 'metadata' est une fonctionnalité de Next.js 13+ (App Router)
 * qui permet de définir les métadonnées SEO (Search Engine Optimization) pour l'ensemble de l'application.
 * Ces informations sont utilisées par les moteurs de recherche et les navigateurs.
 *
 * - `title.template`: Un modèle pour les titres de page, permettant d'ajouter un suffixe commun.
 * - `title.default`: Le titre par défaut de l'application qui apparaît dans l'onglet du navigateur.
 * - `description`: Une brève description de l'application, optimisée pour le SEO.
 *
 * Ces métadonnées globales peuvent être surchargées au niveau de chaque page si nécessaire.
 */
export const metadata: Metadata = {
  title: {
    template: "%s | BiBim-Cuisine Traiteur",
    default: "BiBim-Cuisine Traiteur - Food Truck Coréen",
  },
  description: "Découvrez BiBim-Cuisine, votre food truck et service traiteur spécialisé en cuisine coréenne authentique. Consultez notre menu, nos emplacements et réservez-nous pour vos événements.",
};

/**
 * @function RootLayout
 * @description
 * C'est le composant React principal qui définit la mise en page racine.
 * Il reçoit une prop 'children', qui représente le contenu de la page actuelle.
 *
 * @param {Readonly<{ children: React.ReactNode }>} props - Les propriétés du composant.
 *   - `children`: Le contenu de la page enfant qui sera rendu à l'intérieur du <body>.
 * @returns {JSX.Element} La structure HTML de base de l'application.
 */
export default function RootLayout({
  children, // 'children' est une prop spéciale de React qui représente le contenu imbriqué.
}: Readonly<{
  children: React.ReactNode; // 'React.ReactNode' peut être n'importe quel élément rendu par React (JSX, string, number, etc.).
}>) {
  return (
    // Le tag <html> est la racine de tout document HTML. 'lang="fr"' spécifie la langue du contenu.
    <html lang="fr">
      {/* Le tag <body> contient tout le contenu visible de la page. */}
      {/* La classe CSS de la police 'inter' est appliquée ici pour affecter tout le texte de l'application. */}
      <body className={mochiy.className}>{children}</body>
    </html>
  );
}