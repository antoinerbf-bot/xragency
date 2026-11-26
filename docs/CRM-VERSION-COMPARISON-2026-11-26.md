# XR Agency CRM — comparaison v3002 / v3004 (26 novembre 2026)

## Versions retrouvées sur GitHub

### v3002 — base recommandée
- Dépôt `antoinerbf-bot/xragency`, branche `main`
- Commit `3f38e6dfea60541f9d3bab7d2e55bad7fe2fff2a` (23 novembre 2026)
- Le commit correspond exactement à la version de référence décrite dans l'historique.
- Fonctionnalités CRM visibles dans le code : Kanban/leads, rôles et commissions, XR School, leaderboard, QG Direction, espace Manager, synchronisation Supabase/realtime.
- Les données de leads sont synchronisées par `src/lib/crm/supabaseSync.ts`; l'implémentation dépend d'une configuration Supabase et de politiques RLS compatibles avec la session CRM.

### v3004 — branche complémentaire
- Même dépôt, branche `crm-2d`
- Commit `f1bcb8a8cc33a98f1952b071481abc0b0faa701e` (16 novembre 2026)
- Modules présents : clients, devis, factures, projets, prestataires, calendrier, journal/activité, notification, leaderboard et hubs Direction/Closer/School.
- Fichiers repérés : `src/components/crm/CrmClientsTab.tsx`, `CrmQuotesTab.tsx`, `CrmInvoicesTab.tsx`, `CrmProjectsTab.tsx`, `CrmProvidersTab.tsx`, `CrmCalendarTab.tsx`, et `src/lib/crm-store.ts`.

## Différence technique importante
La v3004 n'est pas simplement un store en mémoire : `src/lib/crm-store.ts` utilise un cache `globalThis` et tente une persistance JSON à `.data/xr-crm.json`. Cette persistance fichier n'est pas une base de données partagée et peut être éphémère/non inscriptible sur une plateforme serverless (notamment Vercel). Elle ne doit pas être considérée comme un stockage de production fiable pour plusieurs commerciaux ou instances.

La v3002 a une intégration Supabase plus adaptée à une base multi-utilisateurs, mais son authentification HMAC actuelle n'est pas liée à `auth.uid()` dans les policies RLS. Il faut corriger cette architecture avant de prétendre que la persistance/RLS fonctionne de bout en bout.

## Autres problèmes de sécurité observés dans v3004
- `src/lib/crm-store.ts` contient une clé de signature de session de secours codée en dur.
- La fonction de hash utilise un sel fixe commun.
- `src/routes/api/crm.ts` contient des codes d'accès de secours en dur dans la logique de login.
- Le cookie de session ne définit pas `Secure`.
- Le store JSON contient des données sensibles (leads, clients, factures, coordonnées bancaires) : il faut vérifier les permissions du filesystem, sauvegardes, chiffrement au repos et stratégie de rétention.

## Stratégie d'intégration
1. Garder la v3002 comme base de sécurité/fonctionnelle à condition de corriger les blocages listés dans l'audit.
2. Porter les composants UI de v3004 (clients, devis, factures, projets, prestataires, calendrier) sans reprendre son authentification ni son stockage JSON.
3. Concevoir des tables Supabase dédiées avec FK, contraintes, timestamps et RLS par rôle/propriétaire.
4. Déplacer toutes les mutations sensibles dans des endpoints serveur vérifiant la session et les permissions; utiliser Supabase Auth ou une couche serveur correctement intégrée à RLS.
5. Recalculer les commissions côté serveur à partir du catalogue officiel et du rôle, jamais depuis des valeurs modifiables par le navigateur.
6. Ajouter tests automatisés de permissions, persistance multi-session, migrations, build et smoke test avant déploiement.

## État du travail
- Branche de travail créée : `crm-audit-hardening-2026-11-26`, depuis `main`.
- Note d'audit sécurité initiale ajoutée à `docs/CRM-AUDIT-2026-11-26.md`.
- Cette branche contient pour l'instant des documents d'audit, pas de correctif applicatif ni de déploiement.
