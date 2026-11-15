# Système Autonome Réseaux Sociaux - XR Agency (xragencyai.com)
## Architecture 100% Gratuite : Facebook, Instagram & TikTok

Ce système permet la création et la publication automatisée de contenus à fort taux de conversion pour **xragencyai.com**.

---

### 1. Composants du Système

| Fichier | Rôle |
| :--- | :--- |
| `scripts/mcp-social-server.js` | **Serveur MCP JSON-RPC 2.0** pilotable par IA (outils de création, calendrier et publication). |
| `scripts/generate-social-posts.js` | Générateur de concepts viraux multicanaux (TikTok 3s hooks, scripts Reels, posts Facebook). |
| `scripts/generate-visual-assets.js` | Générateur autonome de visuels graphiques 1080x1920 (Story/TikTok) et 1080x1080 (Feed). |
| `scripts/publish-social.js` | Moteur d'envoi multi-canaux (Postiz API, Meta Graph API directe, ou Webhook Make/n8n). |
| `scripts/social-daemon.js` | Démon autonome qui surveille la file et auto-régénère du contenu en continu. |
| `social-calendar.json` | Base de données locale de la file d'attente et historique des publications. |

---

### 2. Commandes NPM rapides

```bash
# Générer un lot de 10 campagnes complètes avec visuels
npm run social:generate

# Lancer la boucle de publication de la file d'attente
npm run social:publish

# Lancer le serveur MCP pour Antigravity / Claude Code / Cursor
npm run social:mcp

# Lancer le démon en arrière-plan (auto-refill & publication toutes les 30 min)
npm run social:daemon
```

---

### 3. Connecter la diffusion réelle (100% Gratuit)

Vous avez 3 options gratuites selon votre préférence :

#### Option A : Postiz (La plus simple, tout-en-un)
1. Créez votre compte gratuit sur [postiz.com](https://postiz.com) et connectez vos 3 comptes (Page Facebook, Instagram Pro, TikTok).
2. Récupérez votre clé API dans **Settings > Public API**.
3. Dans votre environnement ou fichier `.env` :
   ```env
   POSTIZ_API_KEY=votre_cle_api_ici
   ```

#### Option B : Meta Graph API Directe (Facebook & Instagram)
1. Créez une app gratuite sur [developers.facebook.com](https://developers.facebook.com).
2. Récupérez le token d'accès de votre page et définissez :
   ```env
   META_ACCESS_TOKEN=votre_page_access_token
   META_PAGE_ID=votre_page_id
   ```

#### Option C : Webhook Gratuit (Make / n8n / Zapier)
Si vous utilisez déjà un scénario Make ou n8n qui publie sur vos réseaux :
```env
SOCIAL_WEBHOOK_URL=https://hook.eu1.make.com/xxxx
```
Le script enverra automatiquement le payload complet JSON (titre, hooks, textes, visuels SVG hébergés) à chaque déclenchement !
