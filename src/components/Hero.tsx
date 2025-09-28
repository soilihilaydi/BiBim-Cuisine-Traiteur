/**
 * @file src/components/Hero.tsx
 * @description
 * Ce composant représente la section "Hero" (ou bannière principale) de la page d'accueil.
 * C'est généralement la première chose que les utilisateurs voient en arrivant sur le site.
 * Il est conçu pour capter l'attention avec une image de fond, un titre accrocheur et un appel à l'action.
 *
 * Pour un développeur junior, il est important de noter :
 * - L'utilisation de Tailwind CSS pour le stylisme rapide et réactif.
 * - La gestion des images de fond via des styles inline.
 * - La superposition d'un calque pour améliorer la lisibilité du texte.
 * - L'importance de l'accessibilité (`aria-label`) pour les éléments interactifs.
 */

// Définition du composant fonctionnel Hero.
const Hero = () => {
  return (
    // La balise <section> est utilisée pour regrouper un contenu thématiquement lié.
    // Classes Tailwind CSS :
    // - `h-screen`: Définit la hauteur de la section à 100% de la hauteur de la fenêtre (viewport).
    // - `flex flex-col justify-center items-center`: Centre le contenu verticalement et horizontalement.
    // - `text-white text-center`: Définit la couleur du texte en blanc et l'aligne au centre.
    // - `px-4`: Ajoute un padding horizontal de 16px.
    // - `bg-cover bg-fixed bg-center`: Configure l'image de fond pour couvrir la section, être fixe au défilement et centrée.
    <section
      className="h-screen flex flex-col justify-center items-center text-white text-center px-4 bg-cover bg-fixed bg-center"
      // Style inline pour définir l'image de fond.
      // L'image 'foodtruck.jpg' est un placeholder.
      style={{ backgroundImage: 'url(/foodtruck.jpg)' }} // Placeholder image
    >
      {/* Calque de superposition (overlay) pour améliorer la lisibilité du texte sur l'image de fond. */}
      {/* - `absolute inset-0`: Positionne le div absolument pour couvrir toute la section. */}
      {/* - `bg-primary opacity-70`: Définit la couleur de fond avec une opacité de 70%. */}
      <div className="absolute inset-0 bg-primary opacity-70"></div> {/* Overlay for text readability */}

      {/* Contenu principal de la section Hero, positionné au-dessus du calque. */}
      {/* - `relative z-10`: Positionne le contenu relativement et lui donne un z-index plus élevé */}
      {/*   pour qu'il apparaisse au-dessus du calque d'opacité. */}
      <div className="relative z-10">
        {/* Titre principal de la page. */}
        {/* - `text-5xl md:text-7xl`: Taille du texte responsive (5xl par défaut, 7xl sur écrans moyens et plus). */}
        {/* - `font-bold mb-4`: Texte en gras avec une marge inférieure. */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4">BiBim Cuisine</h1>

        {/* Paragraphe descriptif. */}
        {/* - `text-xl md:text-2xl`: Taille du texte responsive. */}
        {/* - `mb-8`: Marge inférieure. */}
        <p className="text-xl md:text-2xl mb-8">La restauration nomade qui régale vos papilles !</p>

        {/* Bouton d'appel à l'action. */}
        {/* - `href="#contact"`: Lien vers la section contact de la page (ancre). */}
        {/* - `bg-secondary text-primary`: Couleurs de fond et de texte définies par les variables Tailwind. */}
        {/* - `px-6 py-3 rounded-full`: Padding horizontal/vertical et bords arrondis. */}
        {/* - `font-semibold hover:bg-accent transition`: Texte semi-gras, changement de couleur au survol avec transition. */}
        {/* - `aria-label`: Attribut d'accessibilité pour les lecteurs d'écran. */}
        <a
          href="#contact"
          className="bg-secondary text-primary px-6 py-3 rounded-full font-semibold hover:bg-accent transition"
          aria-label="Réserver ou nous trouver"
        >
          Réserver / Nous trouver
        </a>
      </div>
    </section>
  );
};

// Exporte le composant Hero pour qu'il puisse être utilisé dans d'autres fichiers (ex: page.tsx).
export default Hero;
