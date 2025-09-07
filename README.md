# MJ Créations — Suite Frontend (HTML statique)

Quatre interfaces prêtes à l’emploi (100% HTML/CSS/JS) :

- `1-vitrine-commercial.PROD.html` — Vitrine (devis instantané, RDV, blog, zones, chat)
- `2-client-portal.html` — Espace client
- `3-admin-dashboard.with-full-catalog.html` — Admin (catalogue, RDV, tarifs)
- `4-comptable-interface.html` — Interface comptable (devis/factures, exports)

> ⚠️ Ces pages utilisent Firebase côté client. La **clé API** est publique par conception ; la sécurité se fait via les **Firestore Security Rules**.

---

## 🧰 Prérequis

- [VS Code](https://code.visualstudio.com/)
- Git (déjà installé si vous utilisez GitHub Desktop)
- Node.js (optionnel, pour `npx serve` ou déploiement)

---

## 🚀 Lancer en local (le plus simple)

1) Cloner le dépôt :

```bash
git clone https://github.com/TON-USER/mj-creations.git
cd mj-creations
```

2) Démarrer un petit serveur local (au choix) :
```bash
# Option A (recommandé)
npx serve .

# Option B (via VS Code)
# Installer l’extension "Live Server", puis clic droit sur le fichier -> "Open with Live Server"
```

3) Ouvrir l’une des pages dans le navigateur :
- `1-vitrine-commercial.PROD.html`
- `2-client-portal.html`
- `3-admin-dashboard.with-full-catalog.html`
- `4-comptable-interface.html`

---

## 🔐 Firebase (obligatoire)

Créer le fichier **/assets/js/firebase-config.js** avec votre configuration Firebase :
```js
// /assets/js/firebase-config.js
// IMPORTANT : ces clés sont publiques côté front. Protégez les données par Firestore Security Rules.
const firebaseConfig = {
  apiKey: "…",
  authDomain: "…",
  projectId: "…",
  storageBucket: "…",
  messagingSenderId: "…",
  appId: "…",
  measurementId: "…" // optionnel
};

// Initialisation
if (!firebase.apps?.length) {
  firebase.initializeApp(firebaseConfig);
}
```

### Firestore Rules (exemple de base)
Bloquer tout par défaut, puis ouvrir au cas par cas :
```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false; // blocage total par défaut
    }
  }
}
```
> Ensuite, autoriser seulement ce qui est nécessaire (ex : lecture publique du catalogue, écriture de devis par un utilisateur authentifié).

---

## 🌐 Déploiement (3 options)

### 1) GitHub Pages (statique, ultra simple)
- Settings → Pages → Branch: `main` / folder: `/root`
- URL publique générée automatiquement (pas d’API serveur).

### 2) Vercel (statique)
- Importer le repo → Deploy → URL en 1 clic.

### 3) Netlify (statique)
- Drag & drop du dossier ou connexion Git → Deploy.

> Pour Stripe/PayPal côté **paiement**, prévoir une petite API serveur (Node/Express) séparée.

---

## 🤝 Workflow Git conseillé

```bash
git checkout -b feat/devis
# … modifs …
git add .
git commit -m "feat: branchement devis Firebase"
git push -u origin feat/devis
# Ouvrir une Pull Request sur GitHub
```

Branches : `main` (prod), `dev` (intégration), puis features courtes (`feat/*`, `fix/*`).

---

## 🩺 Dépannage rapide

- **La page est blanche ?** Ouvrez la console (F12) → onglet *Console* → regarder les erreurs.
- **Firebase “app already exists” ?** Vérifier qu’on initialise une seule fois (voir snippet ci-dessus).
- **Images qui cassent ?** Les pages prévoient des *placeholders* automatiques.
- **PayPal/Stripe ne fonctionnent pas en local ?** Nécessite un backend (API) + https et clés secrètes côté serveur.
