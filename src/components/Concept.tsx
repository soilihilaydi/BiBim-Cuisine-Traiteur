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
    <section
      id="concept"
      className="relative py-20 px-6 flex flex-col lg:flex-row items-center justify-center bg-cover bg-no-repeat bg-center bg-fixed"
      style={{ backgroundImage: 'url(/images/hero.jpg)' }}
    >
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-black opacity-60"></div> {/* Adjust color and opacity as needed */}

      {/* Contenu principal de la section Concept, positionné au-dessus du calque. */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center w-full">
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
      </div>
    </section>
  );
};

// Exporte le composant Concept pour qu'il puisse être utilisé dans d'autres fichiers (ex: page.tsx).
export default Concept;
