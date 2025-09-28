/**
 * @file src/app/api/contact/route.ts
 * @description
 * Ce fichier définit une route API Next.js pour gérer les soumissions du formulaire de contact.
 * Lorsqu'un utilisateur remplit et envoie le formulaire de contact sur le frontend,
 * les données sont envoyées à cette route API. Cette route est ensuite responsable
 * de l'envoi d'un e-mail avec les informations du formulaire.
 *
 * Pour un développeur junior, il est important de comprendre que :
 * - Les routes API de Next.js permettent de créer des endpoints backend directement dans votre projet Next.js.
 * - Elles sont utiles pour des tâches côté serveur comme l'envoi d'e-mails, l'interaction avec des bases de données, etc.
 * - Les informations sensibles (comme les identifiants de messagerie) doivent être stockées dans des variables d'environnement.
 */

// Importe `NextResponse` de Next.js pour créer des réponses HTTP au format JSON.
import { NextResponse } from 'next/server';
// Importe la bibliothèque `nodemailer` pour envoyer des e-mails via un serveur SMTP.
import nodemailer from 'nodemailer';

/**
 * @function POST
 * @description
 * Cette fonction est le gestionnaire pour les requêtes HTTP POST envoyées à l'endpoint `/api/contact`.
 * Next.js détecte automatiquement les fonctions exportées nommées d'après les méthodes HTTP (GET, POST, PUT, DELETE, etc.).
 *
 * @param {Request} request - L'objet `Request` de Next.js, contenant les données de la requête HTTP.
 * @returns {Promise<NextResponse>} Une promesse qui résout en une réponse JSON.
 */
export async function POST(request: Request) {
  try {
    // Extrait les données JSON du corps de la requête.
    // Le formulaire de contact envoie le nom, l'e-mail et le message.
    const { name, email, message } = await request.json();

    // --- Validation basique des données ---
    // Vérifie si tous les champs obligatoires sont présents.
    if (!name || !email || !message) {
      // Si des champs sont manquants, retourne une réponse JSON avec un message d'erreur
      // et un statut HTTP 400 (Bad Request).
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // --- Configuration de Nodemailer ---
    // Crée un objet "transporter" Nodemailer. C'est l'objet qui va envoyer l'e-mail.
    // Les informations de connexion au serveur SMTP (host, port, user, pass) sont récupérées
    // depuis les variables d'environnement pour des raisons de sécurité.
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587', 10),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // --- Contenu de l'e-mail ---
    // Définit les options de l'e-mail à envoyer.
    const mailOptions = {
      from: process.env.EMAIL_USER, // Adresse e-mail de l'expéditeur (doit correspondre à EMAIL_USER pour certains serveurs).
      to: process.env.EMAIL_USER,   // Adresse e-mail du destinataire (ici, l'e-mail du propriétaire du site).
      subject: `Nouveau message de contact de ${name}`,
      html: `
        <p>Nom: ${name}</p>
        <p>Email: ${email}</p>
        <p>Message: ${message}</p>
      `,
    };

    // --- Envoi de l'e-mail ---
    // Utilise le transporter pour envoyer l'e-mail avec les options définies.
    await transporter.sendMail(mailOptions);

    // Si l'e-mail est envoyé avec succès, retourne une réponse JSON de succès
    // avec un statut HTTP 200 (OK).
    return NextResponse.json({ message: 'Message sent successfully!' }, { status: 200 });
  } catch (error) {
    // --- Gestion des erreurs ---
    // En cas d'erreur pendant le traitement de la requête (ex: problème de connexion SMTP).
    console.error('Error processing contact form submission:', error); // Log l'erreur dans la console du serveur.
    // Retourne une réponse JSON avec un message d'erreur générique
    // et un statut HTTP 500 (Internal Server Error).
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}