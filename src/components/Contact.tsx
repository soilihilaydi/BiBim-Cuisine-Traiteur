'use client';

/**
 * @file src/components/Contact.tsx
 * @description
 * Ce composant représente la section "Contact" de l'application.
 * Il contient un formulaire permettant aux utilisateurs d'envoyer des messages
 * ou des demandes au resto-ambulant.
 *
 * Pour un développeur junior, ce fichier est une excellente ressource pour comprendre :
 * - La gestion de l'état d'un formulaire avec `useState`.
 * - La soumission de données à une API (ici, une API route Next.js).
 * - La validation simple côté client.
 * - L'affichage de messages de feedback à l'utilisateur (succès/erreur).
 * - L'importance de l'accessibilité (`aria-label`).
 */

// Importe le hook `useState` de React pour gérer l'état local du composant.
import { useState } from 'react';

/**
 * @interface FormData
 * @description
 * Définit la structure des données que le formulaire de contact va collecter.
 * C'est une interface TypeScript pour garantir la cohérence des types.
 */
interface FormData {
  name: string;    // Nom de l'expéditeur.
  email: string;   // Adresse e-mail de l'expéditeur.
  message: string; // Contenu du message.
}

/**
 * @function Contact
 * @description
 * Composant fonctionnel React qui affiche et gère le formulaire de contact.
 *
 * @returns {JSX.Element} La section de contact avec le formulaire.
 */
const Contact = () => {
  // --- Gestion de l'état local avec `useState` ---

  // `formData`: Contient les valeurs actuelles des champs du formulaire.
  // Initialisé avec des chaînes vides pour chaque champ.
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  // `isSubmitting`: Booléen indiquant si le formulaire est en cours de soumission.
  // Utilisé pour désactiver le bouton de soumission et afficher un état de chargement.
  const [isSubmitting, setIsSubmitting] = useState(false);

  // `submitMessage`: Contient un message de feedback à afficher à l'utilisateur après la soumission.
  // Peut être un message de succès ou d'erreur.
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  /**
   * @function handleChange
   * @description
   * Gère les changements dans les champs du formulaire (input, textarea).
   * Met à jour l'état `formData` en fonction du nom du champ et de sa nouvelle valeur.
   *
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - L'événement de changement.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData, // Conserve les autres champs du formulaire.
      [name]: value, // Met à jour le champ spécifique qui a changé.
    }));
  };

  /**
   * @function handleSubmit
   * @description
   * Gère la soumission du formulaire.
   * - Empêche le comportement par défaut du navigateur.
   * - Effectue une validation simple.
   * - Envoie les données du formulaire à une API route Next.js.
   * - Gère les réponses de l'API et met à jour le feedback utilisateur.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - L'événement de soumission du formulaire.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Empêche le rechargement de la page par défaut.

    setSubmitMessage(null); // Réinitialise le message de soumission précédent.
    setIsSubmitting(true);  // Active l'état de soumission.

    // --- Validation côté client ---
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitMessage("Veuillez remplir tous les champs obligatoires.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Envoie les données du formulaire à l'API route `/api/contact`.
      // Cette API route (définie dans `src/app/api/contact/route.ts`) traitera l'envoi de l'e-mail.
      const response = await fetch('/api/contact', {
        method: 'POST', // Méthode HTTP POST pour envoyer des données.
        headers: {
          'Content-Type': 'application/json', // Indique que le corps de la requête est au format JSON.
        },
        body: JSON.stringify(formData), // Convertit les données du formulaire en chaîne JSON.
      });

      // Vérifie si la réponse de l'API est OK (statut 2xx).
      if (response.ok) {
        setSubmitMessage("Votre message a été envoyé avec succès !");
        setFormData({ name: '', email: '', message: '' }); // Réinitialise le formulaire après succès.
      } else {
        // Si la réponse n'est pas OK, tente de lire le message d'erreur de l'API.
        const errorData = await response.json();
        setSubmitMessage(errorData.message || "Une erreur est survenue lors de l'envoi du message.");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire:", error);
      setSubmitMessage("Une erreur réseau est survenue. Veuillez réessayer plus tard.");
    } finally {
      setIsSubmitting(false); // Désactive l'état de soumission, que la requête ait réussi ou échoué.
    }
  };

  // --- Rendu principal : Affichage du formulaire de contact ---
  return (
    // La balise <section> pour la section de contact.
    // - `id="contact"`: Ancre pour la navigation.
    <section id="contact" className="py-20 px-6 bg-gray-100 text-center">
      <h2 className="text-4xl font-bold mb-10 text-primary">Contactez-nous</h2>
      <p className="max-w-2xl mx-auto mb-8 text-lg">
        Une question, une demande spéciale ou simplement envie de nous dire bonjour ?
        Utilisez le formulaire ci-dessous, nous vous répondrons dans les plus brefs délais !
      </p>

      {/* Le formulaire de contact. */}
      {/* - `aria-label`: Attribut d'accessibilité pour décrire le formulaire aux lecteurs d'écran. */}
      {/* - `onSubmit`: Appelle la fonction `handleSubmit` lorsque le formulaire est soumis. */}
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg" aria-label="Formulaire de contact">
        {/* Champ pour le nom. */}
        <div className="mb-4 text-left">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Nom:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required // Rend le champ obligatoire.
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Champ pour l'e-mail. */}
        <div className="mb-4 text-left">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            type="email" // Le type "email" active la validation d'e-mail native du navigateur.
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Champ pour le message. */}
        <div className="mb-6 text-left">
          <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5} // Définit la hauteur initiale du textarea.
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>

        {/* Bouton de soumission du formulaire. */}
        <button
          type="submit" // Le type "submit" déclenche la soumission du formulaire.
          disabled={isSubmitting} // Désactive le bouton pendant la soumission pour éviter les envois multiples.
          className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-accent transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'} {/* Texte dynamique selon l'état. */}
        </button>

        {/* Affiche le message de feedback après la soumission. */}
        {submitMessage && (
          <p className={`mt-4 ${submitMessage.includes('succès') ? 'text-green-500' : 'text-red-500'}`}>
            {submitMessage}
          </p>
        )}
      </form>
    </section>
  );
};

// Exporte le composant Contact pour qu'il puisse être utilisé dans d'autres fichiers.
export default Contact;