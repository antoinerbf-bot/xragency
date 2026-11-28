# XR Agency — suivi du chantier en prévisualisation locale

## Environnement
- Projet : `/Users/rousseauantoine/xragency`
- Prévisualisation : `http://localhost:3001/`
- Serveur : Vite, port 3001, hôte `127.0.0.1`
- Rechargement à chaud : HMR Vite (actif par défaut)
- Déploiement : interdit sans accord explicite de l'utilisateur
- CRM : hors périmètre jusqu'à instruction explicite

## Règles de travail
1. Travailler par lots limités à une page ou fonctionnalité cohérente.
2. Avant chaque lot, annoncer dans la conversation le périmètre et les fichiers ciblés.
3. Préserver les modifications existantes : inspecter `git status` et le diff avant toute édition ; ne jamais reset, clean, stash ou écraser le travail non validé.
4. Enregistrer les changements pour les rendre visibles via HMR dans le navigateur local.
5. Après chaque lot, exécuter les contrôles adaptés (typecheck, lint ciblé, build, tests de routes et vérifications fonctionnelles).
6. Signaler clairement ce qui est modifié, testé, non testé et bloqué. Ne jamais présenter un contrôle technique comme une validation visuelle.
7. L'utilisateur peut demander une correction à tout moment ; les retours visuels priment sur les préférences supposées.
8. Aucun commit, push ou déploiement sans demande/autorisation explicite.

## État initial — 2026-11-20
- Serveur local : démarré, réponse HTTP 200 sur `/`.
- URL ouverte dans le navigateur du Mac : `http://localhost:3001/`.
- HMR : configuration Vite standard, non désactivée.
- Référence visuelle : Direction 1 « Premium Editorial » validée ; crème/ivoire, charbon, bronze discret, photographie professionnelle ; inspirations Lusion (profondeur/mouvement) et NexPro (structure commerciale), sans copie.
- À finaliser : hero équipe + Tour Eiffel, Réalisations sur l'accueil, audit des 5 langues et RTL arabe, vérification complète des parcours et interactions, contrôle responsive.
- Périmètre exclu : CRM.

## Journal des lots
| Date | Lot | Modifications | Vérifications | État |
|---|---|---|---|---|
| 2026-11-20 | Mise en place du suivi live | Documentation du protocole ; maintien du serveur local sur 3001 | HTTP 200 ; navigateur local ouvert | En place |
| 2026-11-20 | Audit initial du hero | Vérifié les textes, l'image et le lien secondaire ; remplacé le faux libellé « Voir le film » par un lien explicite vers la méthode dans les 5 langues ; retiré l'alt text qui affirmait à tort que l'image montrait l'équipe à Paris | `npm run typecheck` réussi ; contrôle HTTP à refaire après HMR | Corrigé, contrôle visuel à valider |


## Reprise complète du cahier des charges — 20 novembre 2026
- Création de `docs/XR-AGENCY-MASTER-REQUIREMENTS.md` avec la chronologie des validations/rejets, les sept directions combinées, le storyboard 17 panneaux, les exigences du tunnel, SEO, i18n/RTL, CRM et séparation Jarvis.
- Correction du document de références : sept directions du 16 novembre validées ensemble ; sélection top-left parmi dix le 17 novembre.
- Homepage : hero éditorial clair avec la photo panoramique existante de l'équipe à Paris, CTA projet/méthode et légende ; social offers exactes depuis les données canoniques avec ajout au panier ; portfolio concept localisé cinq langues ; section équipe internationale distribuée sans faux bureaux.
- Navigation et rail du tunnel : labels traduits, prix issus du catalogue ; retrait du libellé « audit gratuit » non confirmé.
- Nettoyage d'allégations non vérifiées (réponse 2 h, lancement sous 7 jours, délais 7/14/21 jours) et correction des prix branding dans le configurateur.
- Vidéos locales inspectées : vidéos existantes = ancien module Maps avec texte incrusté, inadaptées au hero ; elles ne sont pas utilisées en fond.
- Contrôles : typecheck/build réussis sur la dernière passe complète ; smoke test 24 routes HTTP 200.
- Non terminé : cinq scènes internationales cohérentes avec les mêmes collaborateurs, audit visuel complet, i18n/RTL de toutes les routes, tests end-to-end du tunnel et intégrations, puis CRM.
