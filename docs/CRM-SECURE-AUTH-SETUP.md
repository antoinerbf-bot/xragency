# CRM — configuration serveur requise

Cette branche remplace l'authentification de secours côté navigateur par une validation côté serveur. **Ne déployer pas cette branche avant d'avoir configuré les variables ci-dessous** : sans elles, la connexion renvoie volontairement HTTP 503.

Dans Vercel (Project → Settings → Environment Variables), définir pour chaque environnement qui sera utilisé :

- `CRM_SESSION_SECRET` : secret aléatoire d'au moins 32 octets, idéalement 64 caractères hexadécimaux. Générer un secret distinct par environnement.
- `CRM_MEMBER_PINS` : objet JSON dont les clés sont les identifiants de membres et les valeurs leurs codes privés (minimum 6 caractères). Exemple de structure uniquement — remplacer les valeurs par des codes uniques, jamais utiliser cet exemple :
  ```json
  {
    "antoine": "REMPLACER_PAR_UN_CODE_UNIQUE",
    "martin": "REMPLACER_PAR_UN_CODE_UNIQUE",
    "lucas": "REMPLACER_PAR_UN_CODE_UNIQUE",
    "sarah": "REMPLACER_PAR_UN_CODE_UNIQUE",
    "christel": "REMPLACER_PAR_UN_CODE_UNIQUE",
    "camille": "REMPLACER_PAR_UN_CODE_UNIQUE",
    "karim": "REMPLACER_PAR_UN_CODE_UNIQUE",
    "emma": "REMPLACER_PAR_UN_CODE_UNIQUE",
    "studio": "REMPLACER_PAR_UN_CODE_UNIQUE"
  }
  ```
- `CRM_SCHOOL_PIN` : code XR School distinct, minimum 6 caractères (facultatif si XR School n'est pas activé).

Ne pas mettre ces valeurs dans `.env` commité, le code frontend, le JSON du CRM, ni dans une capture d'écran. Utiliser le coffre de variables Vercel ou un gestionnaire de secrets.

Après configuration, redéployer la branche de prévisualisation et tester : connexion de chaque rôle, refus d'un mauvais code, restauration après actualisation, déconnexion, et cookie HttpOnly/Secure en production.

## Limites restantes avant production

- Le rate limit est en mémoire par instance ; il ne remplace pas un limiteur distribué (Upstash/Redis/WAF).
- Les PIN sont actuellement fournis par variable serveur ; le changement de PIN depuis l'interface est suspendu et doit être implémenté via une route serveur sécurisée.
- Les opérations de données CRM et les politiques Supabase RLS doivent être testées avec une identité Supabase authentifiée. La session HMAC CRM n'est pas automatiquement équivalente à `auth.uid()`. Ne pas exposer de clé service-role dans le navigateur.
- Les données locales du navigateur ne sont pas une sauvegarde fiable ni une synchronisation multi-appareils.

La branche est destinée à une prévisualisation sécurisée, pas à une mise en production immédiate.
