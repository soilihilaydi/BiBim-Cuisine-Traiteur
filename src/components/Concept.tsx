/**
 * @file src/components/Concept.tsx
 * @description
 * Ce composant représente la section "Notre Concept" de la page d'accueil.
 * Il est dédié à la présentation de l'idée principale et des services offerts par le resto-ambulant.
 *
 * Pour un développeur junior, il est utile de voir :
 * - Comment une section de contenu simple est structurée.
 * - L'utilisation d'un `id` pour permettre la navigation directe vers cette section (par exemple, depuis un bouton "Réserver / Nous trouver").
 * - L'application de classes Tailwind CSS pour le stylisme du texte et de l'arrière-plan.
 */

import Image from 'next/image';

// Définition du composant fonctionnel Concept.
const Concept = () => {
  return (
    // La balise <section> est utilisée pour regrouper un contenu thématiquement lié.
    // - `id="concept"`: Permet de créer une ancre pour la navigation interne (ex: #concept dans l'URL).
    // - `py-20 px-6`: Ajoute un padding vertical (haut/bas) de 80px et horizontal (gauche/droite) de 24px.
    // - `text-center`: Centre le texte à l'intérieur de la section.
    // - `bg-accent`: Définit la couleur de fond de la section en utilisant la couleur 'accent' définie dans Tailwind.
    <section id="concept" className="py-20 px-6 flex flex-col lg:flex-row items-center justify-center bg-accent/50">
      {/* Left Image */}
      <div className="hidden lg:block w-1/4">
        <Image src="/foodtruck.png" alt="Food Truck" width={200} height={200} className="mx-auto" />
      </div>

      {/* Text Content */}
      <div className="text-center lg:w-1/2">
        <h2 className="text-4xl font-bold mb-6 text-white">Notre Concept</h2>
        <p className="max-w-2xl mx-auto text-lg text-white">
          Sur le marché de Lamastre les mardis / réalisation de repas pour groupes, buffets froids/chauds/apéro.
          <br/>
          Une restauration nomade qui se déplace pour venir à vous : convivialité, authenticité et gourmandise. 🌮🍲
        </p>
      </div>

      {/* Right Image */}
      <div className="hidden lg:block w-1/4">
        <Image src="/foodtruck.png" alt="Food Truck" width={200} height={200} className="mx-auto" />
      </div>
    </section>
  );
};

// Exporte le composant Concept pour qu'il puisse être utilisé dans d'autres fichiers (ex: page.tsx).
export default Concept;
