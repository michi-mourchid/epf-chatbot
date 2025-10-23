# EPF Chatbot Interface

Assistant virtuel pour EPF Engineering School - Interface de chat moderne et responsive.

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+ ou pnpm 8+
- Git

### Installation

1. **Cloner le repository**
\`\`\`bash
git clone https://github.com/michi-mourchid/epf-chatbot.git
cd epf-chatbot
\`\`\`

2. **Installer les dépendances**
\`\`\`bash
pnpm install
# ou
npm install
\`\`\`

3. **Lancer le serveur de développement**
\`\`\`bash
pnpm dev
# ou
npm run dev
\`\`\`

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir l'application.

## 📁 Structure du projet

\`\`\`
epf-chatbot/
├── app/
│   ├── layout.tsx          # Layout racine avec configuration des fonts
│   ├── page.tsx            # Page d'accueil
│   └── globals.css         # Styles globaux et variables CSS
├── components/
│   ├── chat-interface.tsx  # Composant principal du chatbot
│   ├── theme-provider.tsx  # Provider pour le thème
│   └── ui/                 # Composants shadcn/ui réutilisables
├── public/
│   └── epf-logo.png        # Logo EPF
├── lib/
│   └── utils.ts            # Utilitaires (fonction cn)
├── hooks/
│   ├── use-mobile.ts       # Hook pour détecter mobile
│   └── use-toast.ts        # Hook pour les notifications
├── next.config.mjs         # Configuration Next.js
├── tailwind.config.ts      # Configuration Tailwind CSS
├── tsconfig.json           # Configuration TypeScript
└── package.json            # Dépendances du projet
\`\`\`

## 🎨 Design & Branding

Le projet suit la **Charte Graphique EPF** :

- **Couleurs principales** :
  - Purple: `#470A68` (messages utilisateur)
  - Red: `#DF231D` (accents)
  - Black: `#000000` (texte)

- **Couleurs secondaires** :
  - Orange: `#FF611B`
  - Pink: `#F7429F`
  - Purple: `#7A37E4`

- **Typographie** : Montserrat (Google Fonts)

## 🛠️ Stack technologique

- **Framework** : Next.js 16 (App Router)
- **Styling** : Tailwind CSS v4
- **UI Components** : shadcn/ui
- **Analytics** : Vercel Analytics
- **Language** : TypeScript

## 📝 Développement

### Ajouter un nouveau composant

1. Créer le fichier dans `components/`
2. Utiliser les composants shadcn/ui existants
3. Respecter la charte graphique EPF

### Modifier les styles

Les styles globaux se trouvent dans `app/globals.css`. Les variables CSS pour les couleurs et le thème y sont définies.

### Ajouter une nouvelle page

1. Créer un dossier dans `app/`
2. Ajouter un fichier `page.tsx`
3. Exporter un composant React par défaut

## 🔌 Intégration API

Le chatbot est prêt pour l'intégration avec un backend. Vous pouvez :

- Créer des route handlers dans `app/api/`
- Utiliser `fetch` ou une librairie comme `axios`
- Integrer les webhook declencheur de Workflows (n8n)
- Intégrer FastAPI, Langchain ou tout autre framework

Exemple de route handler :
\`\`\`typescript
// app/api/chat/route.ts
export async function POST(request: Request) {
  const { message } = await request.json()
  // mettre logique ici
  return Response.json({ reply: "..." })
}
\`\`\`

## 📱 Responsive Design

L'interface est **mobile-first** et fully responsive :
- Mobile (< 640px)
- Tablet (640px - 1024px)
- Desktop (> 1024px)

## ♿ Accessibilité

- Sémantique HTML correcte
- ARIA labels et roles
- Contraste des couleurs conforme WCAG
- Navigation au clavier supportée

## 🚀 Déploiement

\`\`\`bash
pnpm build
pnpm start
\`\`\`

## 📦 Dépendances principales

- `next` - Framework React
- `react` - Librairie UI
- `tailwindcss` - Utility-first CSS
- `@radix-ui/primitives` - Composants accessibles
- `class-variance-authority` - Gestion des variantes CSS
- `clsx` - Utilitaire pour les classes conditionnelles

## 🤝 Contribution

1. Fork le repository
2. Créer une branche (`git checkout -b feature/amazing-feature`)
3. Commit vos changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est propriété d'EPF Engineering School.

## 📞 Support

Pour toute question ou problème :
- Me contacter : mourchid.moutuidine@hotmail.com
- Contacter l'équipe EPF (Generation IA)

## 🔗 Ressources

- [Documentation Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Charte Graphique EPF](https://epf.fr)

---

**Développé avec ❤️ par Mourchid Moutuidine pour EPF Engineering School**
