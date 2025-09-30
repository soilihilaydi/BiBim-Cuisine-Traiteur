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
Pour le déploiement CI/CD via GitHub Actions ou directement sur Vercel, configurez ces variables comme des [Secrets GitHub](https://docs.github.com/fr/actions/security-guides/encrypted-secrets) ou directement dans les paramètres de votre projet Vercel.

Voici la liste des variables requises :

### Variables Sanity.io (pour la connexion au CMS)
*   `NEXT_PUBLIC_SANITY_PROJECT_ID` : L'ID de votre projet Sanity.io.
*   `NEXT_PUBLIC_SANITY_DATASET` : Le nom de votre dataset Sanity (ex: `production`).
*   `NEXT_PUBLIC_SANITY_API_VERSION` : La version de l'API Sanity à utiliser (ex: `2023-05-03`).

### Variables Vercel (pour le déploiement automatique via GitHub Actions)
*   `VERCEL_TOKEN` : Un jeton d'API Vercel pour l'authentification.
*   `VERCEL_ORG_ID` : L'ID de votre organisation Vercel.
*   `VERCEL_PROJECT_ID` : L'ID de votre projet Vercel.

### Variables pour le Système d'E-mails (via Nodemailer et l'API de contact)
Ces variables sont utilisées par l'API `/api/contact` pour envoyer des e-mails via un serveur SMTP.
*   `EMAIL_HOST` : L'hôte de votre serveur SMTP (ex: `smtp.gmail.com` pour Gmail).
*   `EMAIL_PORT` : Le port de votre serveur SMTP (ex: `465` ou `587` pour Gmail). Utilisez `465` avec `EMAIL_SECURE=true`.
*   `EMAIL_SECURE` : `true` ou `false` selon si la connexion SMTP est sécurisée (généralement `true` pour Gmail).
*   `EMAIL_USER` : Votre adresse e-mail complète (ex: `votre.email@gmail.com`).
*   `EMAIL_PASS` : **Très important pour Gmail :** Il doit s'agir d'un **mot de passe d'application** généré depuis les paramètres de sécurité de votre compte Google, et non de votre mot de passe principal. La validation en deux étapes doit être activée pour générer un mot de passe d'application. Pour générer un mot de passe d'application : [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)

**Configuration sur Vercel :** Pour les déploiements en production sur Vercel, ces variables doivent être configurées directement dans les "Environment Variables" des paramètres de votre projet Vercel, et non dans le fichier `.env.local`.

### Variables Sentry (pour le suivi des erreurs en production)
*   `SENTRY_DSN` : Votre DSN (Data Source Name) Sentry.

## Optimisations SEO (Search Engine Optimization)

Le projet a été configuré avec des bases solides pour le SEO afin d'améliorer sa visibilité sur les moteurs de recherche et son partage sur les réseaux sociaux.

### Métadonnées (Next.js App Router)
*   **`src/app/layout.tsx`** : Contient les métadonnées globales par défaut (titre, description, langue `fr`) et un modèle de titre (`%s | BiBim-Cuisine Traiteur`) pour une cohérence sur tout le site.
*   **`src/app/page.tsx`** : Définit les métadonnées spécifiques à la page d'accueil, incluant un titre et une description uniques, une URL canonique, ainsi que les balises Open Graph et Twitter Cards pour un affichage optimisé lors du partage de liens.

### Fichiers pour les Robots
*   **`public/robots.txt`** : Indique aux robots des moteurs de recherche les pages qu'ils peuvent explorer et pointe explicitement vers le `sitemap.xml`.
*   **`public/sitemap.xml`** : Liste les URL importantes du site (actuellement la page d'accueil) pour aider les moteurs de recherche à indexer le contenu. L'URL et la date de dernière modification sont à jour.

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
