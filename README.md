This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Vue d'ensemble du Projet

Ce projet est un site web pour un "resto-ambulant", conçu pour présenter le concept, le menu, la galerie de photos, le planning et les informations de contact. Il vise à offrir une expérience utilisateur fluide et moderne.

**Technologies Clés :**
*   **Next.js (React Framework) :** Utilisé pour le développement frontend, offrant le rendu côté serveur (SSR), la génération de sites statiques (SSG) et une excellente performance.
*   **Sanity.io (CMS Headless) :** Gère le contenu (menu, galerie, planning, etc.), permettant une mise à jour facile sans toucher au code.
*   **Tailwind CSS :** Framework CSS utilitaire pour un stylisme rapide et réactif.
*   **TypeScript :** Pour un code plus robuste et maintenable grâce au typage statique.

## Configuration des Variables d'Environnement / Secrets GitHub

Ce projet utilise des variables d'environnement pour gérer les informations sensibles ou spécifiques à l'environnement (développement, production). Elles sont nécessaires pour le bon fonctionnement de l'application en local et pour le déploiement via GitHub Actions/Vercel.

Pour le développement local, créez un fichier `.env.local` à la racine du projet et ajoutez-y les variables.
Pour le déploiement CI/CD via GitHub Actions, configurez ces variables comme des [Secrets GitHub](https://docs.github.com/fr/actions/security-guides/encrypted-secrets).

Voici la liste des variables requises :

### Variables Sanity.io (pour la connexion au CMS)
*   `NEXT_PUBLIC_SANITY_PROJECT_ID` : L'ID de votre projet Sanity.io.
*   `NEXT_PUBLIC_SANITY_DATASET` : Le nom de votre dataset Sanity (ex: `production`).
*   `NEXT_PUBLIC_SANITY_API_VERSION` : La version de l'API Sanity à utiliser (ex: `2023-05-03`).

### Variables Vercel (pour le déploiement automatique via GitHub Actions)
*   `VERCEL_TOKEN` : Un jeton d'API Vercel pour l'authentification.
*   `VERCEL_ORG_ID` : L'ID de votre organisation Vercel.
*   `VERCEL_PROJECT_ID` : L'ID de votre projet Vercel.

### Variables Nodemailer (pour l'envoi d'e-mails via l'API de contact)
*   `EMAIL_HOST` : L'hôte de votre serveur SMTP (ex: `smtp.gmail.com`).
*   `EMAIL_PORT` : Le port de votre serveur SMTP (ex: `587`).
*   `EMAIL_SECURE` : `true` ou `false` selon si la connexion SMTP est sécurisée.
*   `EMAIL_USER` : Votre nom d'utilisateur SMTP.
*   `EMAIL_PASS` : Votre mot de passe SMTP.

### Variables Sentry (pour le suivi des erreurs en production)
*   `SENTRY_DSN` : Votre DSN (Data Source Name) Sentry.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
