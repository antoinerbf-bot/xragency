# MCP Social Media Integration - XR Agency (xragencyai.com)
## Configuration Facebook, Instagram & TikTok (100% GRATUIT via Postiz)

Ce document récapitule la mise en place du serveur MCP officiel **Postiz** pour automatiser la publication sur :
- **Facebook** (Page XR Agency)
- **Instagram** (Compte Pro / Creator)
- **TikTok** (Profil XR Agency)

---

### 1. Activer l'accès gratuit Postiz

1. Crée un compte sur [postiz.com](https://postiz.com) (Tier gratuit à vie disponible) ou héberge le conteneur Docker open-source (`docker run -p 3000:3000 gitroomhq/postiz-app`).
2. Dans le menu **Integrations**, connecte :
   - Ta Page Facebook
   - Ton compte Instagram Pro / Creator (lié à la Page Facebook)
   - Ton compte TikTok
3. Va dans **Settings > Public API** et copie ton **API Key**.

---

### 2. Configuration MCP (Antigravity / Claude Code / Cursor)

Ajoute cette configuration dans tes paramètres MCP (ex: `~/.gemini/antigravity/mcp_config.json` ou `claude_desktop_config.json`) :

```json
{
  "mcpServers": {
    "postiz": {
      "command": "npx",
      "args": ["-y", "postiz-mcp"],
      "env": {
        "POSTIZ_API_KEY": "TON_API_KEY_POSTIZ",
        "POSTIZ_URL": "https://api.postiz.com"
      }
    }
  }
}
```

*Note : Si tu utilises le transport direct HTTP/SSE fourni par Postiz :*
```
https://mcp.postiz.com/mcp-oauth-dynamic
```

---

### 3. Outils disponibles via le MCP Postiz

Une fois connecté, l'agent dispose des outils MCP natifs suivants :
- `integrationList` : Liste les comptes connectés (FB, Insta, TikTok) et leurs IDs.
- `integrationSchema` : Analyse les contraintes et règles requises par chaque réseau (durée vidéo, format, tags).
- `schedulePost` : Publie ou programme un post, Reel ou TikTok avec médias (images/vidéos), légendes, hashtags et paramètres d'interaction (autoriser duos, collabs, commentaires).

