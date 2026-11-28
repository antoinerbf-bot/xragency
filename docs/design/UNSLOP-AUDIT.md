# XR Agency V2 — audit initial (20 novembre 2026)

## Direction

Voir `UNSLOP-DIRECTION.md`. La direction conserve les actifs de marque existants et la palette ivoire / charbon / bronze, avec des photographies documentaires réelles et une signature éditoriale discrète.

## Signes relevés et zones

- Couleurs d'accent concurrentes (bleu, cyan, violet, vert, or) dans les interfaces commerciales, le CRM et plusieurs pages de service.
- Dégradés de teintes, halos radiaux, grilles lumineuses et effets de flou utilisés comme remplissage décoratif dans les outils interactifs et les pages immersives.
- Typographie trop souvent en capitales mono avec tracking excessif, y compris dans les libellés de cartes et de navigation.
- Cartes répétitives, bordures et ombres appuyées, rayons de 2xl/3xl utilisés presque partout.
- Animations `transition-all`, hover scale, `animate-pulse`, boucles automatiques et effets de célébration qui distraient du contenu.
- Chiffres et preuves non vérifiés (ex. classement Top 3 garanti, PageSpeed 95+ garanti, taux et métriques de campagnes, trésorerie statique, adresse/SIREN/RIB d'une entité non valide).
- Données de démonstration présentées comme des clients ou des résultats réels dans certains modules.
- Traductions incomplètes : plusieurs pages et blocs restent en français malgré les cinq langues disponibles.
- RTL arabe : le `dir` global existe, mais les alignements et propriétés directionnelles de plusieurs composants ne sont pas systématiquement logiques.
- Navigation et liens de services : certains chemins ne correspondaient pas au routeur dynamique.
- Accessibilité : petits labels (7–9 px), contrôles sans focus visible uniforme et densité trop forte sur mobile.

## Corrections déjà appliquées dans cette passe

- Harmonisation des tarifs Social Media à 349 / 599 / 799 € par mois dans les principales offres et le configurateur.
- Suppression de plusieurs promesses de classement Google et de performance garanties.
- Suppression des faux identifiants légaux, adresses et coordonnées bancaires d'entreprise ; les champs restent à confirmer avant émission.
- Correction des chemins de services vers la route dynamique.
- Correction de 47 erreurs TypeScript initiales ; `npm run typecheck` passe désormais.
- Ajout du mapping d'images des secteurs manquant.
- Traduction des contenus et caractéristiques des forfaits Social Media dans les cinq langues.

## À terminer

- Refonte visuelle cohérente de l'ensemble des pages publiques et du CRM, sans casser les fonctionnalités.
- Traductions intégrales de recrutement, affiliation, pages de vente, configurateur et contenus secondaires.
- Audit RTL complet, tests de clavier et contrastes.
- Nettoyage des animations et couleurs résiduelles.
- Vérification fonctionnelle des formulaires, CRM, génération de devis/factures et intégrations.
- Vérification de chaque lien et route, rendu desktop/mobile, performance et SEO.
- Validation des mentions légales, coordonnées de l'entité contractante, hébergeur et données bancaires avant activation.

## Contrôles du 20 novembre 2026 — passe en cours

- `npm run typecheck` : OK (0 erreur).
- `npm run build` : OK.
- ESLint sur les fichiers modifiés : 0 erreur, 3 avertissements Fast Refresh (exports de helpers hors composants).
- Smoke test local : 20 routes testées en HTTP 200, dont `/`, `/services/*`, `/crm`, `/affiliation`, `/recrutement`, `/mentions-legales` et `/agence-web/danang`.
- `git diff --check` : OK.
- Les formulaires de recrutement et d'affiliation sont maintenant reliés à `/api/contact` et enregistrent les demandes dans le CRM ; les messages de succès ne promettent plus de délai ni d'activation automatique.
- Le serveur local reste sur `http://localhost:3000`. Aucun push, merge ou déploiement de production effectué.

## État de livraison

**Pas prêt à déclarer terminé.** Le build et les contrôles statiques passent, mais l'audit visuel mobile/desktop de toutes les pages, la traduction intégrale de toutes les sections (notamment recrutement et affiliation), la vérification RTL arabe, les tests réels des parcours CRM et la validation des mentions légales restent à faire.

## Contrôles complémentaires après comparaison aux maquettes — 20 novembre 2026

- Retrouvé le storyboard `Maquette complète du site XR Agency(1).png` (16 novembre) et la planche `Sept concepts web premium pour XR Agency.png` ; Direction 1 « Premium Éditorial » identifiée comme base. Détails dans `REFERENCE-MOCKUPS.md`.
- Comparaison visuelle de la page d'accueil sur le navigateur local : le poster vidéo contenait déjà un slogan incrusté, superposé au titre HTML et provoquait un double texte. Le hero utilise désormais une photographie propre sans texte incrusté ; la capture de contrôle confirme la disparition du chevauchement.
- Vérification visuelle responsive du hero dans une fenêtre étroite : titre, paragraphe et CTA restent dans la largeur disponible ; la vérification mobile complète de toutes les sections reste à effectuer.
- Correction du catalogue serveur de paiement : Social Media — Croissance Active à 599 €/mois, engagement 6 mois.
- Nettoyage de libellés CRM obsolètes mentionnant KARMA/SASU et de promesses de cash par deal non confirmées ; les libellés renvoient maintenant aux conditions contractuelles.
- `npm run typecheck` : OK ; `npm run build` : OK ; ESLint ciblé sur les fichiers touchés : OK ; `git diff --check` : OK.
- Le lint global du dépôt reste en échec sur un important passif de formatage Prettier et quelques règles historiques dans des fichiers non touchés ; aucun reformatage global n'a été lancé pour éviter une réécriture massive et risquée.

- Social Media Content Experience : complétion des textes arabes et russes (objectifs, piliers, plateformes, forfaits, engagement WhatsApp) et activation du RTL pour l'arabe.
- Page Vietnam : retrait de l'adresse locale fictive et des horaires non confirmés du balisage structuré ; délais, support linguistique et intégrations de paiement reformulés pour ne pas promettre des prestations ou compatibilités non vérifiées.
- Ancienne route `/webcare` : redirection permanente vers `/services/webcare`, qui est la page maintenue et traduite ; suppression de l'ancienne page concurrente qui contenait des SLA et une attribution à une conseillère non confirmés.
- Vérifications après ces changements : TypeScript OK, build OK, ESLint ciblé OK, `git diff --check` OK.
