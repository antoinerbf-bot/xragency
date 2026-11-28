# XR Agency — matrice des directives et validations

Dernière consolidation : 20 novembre 2026. Cette matrice distingue les choix de direction acceptés, les demandes obligatoires, les éléments rejetés et les points qui ne peuvent pas être déclarés validés sans preuve.

## Identité et direction artistique

| Directive                                                                            | État                 | Critère de contrôle                                                                 |
| ------------------------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------- |
| Logo XR officiel conservé à l’identique                                              | Obligatoire          | Utiliser l’actif officiel existant ; aucun redraw                                   |
| Univers premium éditorial : ivoire, charbon, bronze/champagne discret                | Direction acceptée   | Cohérence des pages, composants et états interactifs                                |
| Photographie documentaire et scènes professionnelles réelles                         | Obligatoire          | Pas de faux témoignages ni d’images IA génériques présentées comme des réalisations |
| Profondeur, parallaxe et mouvement inspirés de Lusion, adaptés à XR                  | Inspiration acceptée | Effets maîtrisés, utiles et performants, pas de copie                               |
| Architecture commerciale inspirée de NexPro, sans copier son identité                | Inspiration acceptée | Parcours et clarté commerciale adaptés à XR                                         |
| Refonte récente rejetée par l’utilisateur le 19 novembre                             | Rejet explicite      | Ne pas la présenter comme validée ; retrouver les maquettes précédemment approuvées |
| Esthétique néon, bleu électrique, violet, halos et look jeu vidéo sur le site public | Rejetée              | Palette sobre ; gamification réservée au CRM interne                                |
| Priorité mobile                                                                      | Obligatoire          | Contrôle responsive sur petits écrans et navigation tactile                         |

## Offres et exactitude commerciale

| Directive                                          | État                                                                   | Critère de contrôle                                   |
| -------------------------------------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------- |
| Social Media — Présence Essentielle                | Tarif de référence : 349 €/mois, engagement 3 mois                     | Même valeur dans page, configurateur, CRM et checkout |
| Social Media — Croissance Active                   | Tarif de référence : 599 €/mois, engagement 6 mois, « Le plus choisi » | Même valeur dans page, configurateur, CRM et checkout |
| Social Media — Domination Sociale                  | Tarif de référence : 799 €/mois, engagement 6 mois                     | Même valeur dans page, configurateur, CRM et checkout |
| Sélecteur « Ajouter à ma sélection »               | Obligatoire                                                            | Vérifier sélection, récapitulatif et transmission     |
| WhatsApp commercial                                | URL imposée : https://wa.me/33767566783                                | Aucun autre numéro ni lien inventé                    |
| Google Ads / AdWords                               | Non proposé                                                            | Aucune offre ou promesse Ads dans les pages et le CRM |
| Avis, clients, résultats, classements et garanties | Pas d’invention                                                        | Toute preuve doit être traçable et autorisée          |
| Prix et périmètres des autres prestations          | À contrôler avec les offres sources                                    | Ne pas modifier arbitrairement les offres historiques |

## Langues et accessibilité

| Directive                                     | État        | Critère de contrôle                                                  |
| --------------------------------------------- | ----------- | -------------------------------------------------------------------- |
| Français, anglais, vietnamien, arabe et russe | Obligatoire | Toutes les routes et tous les états traduits, sans fuite de français |
| Arabe                                         | Obligatoire | RTL réel : direction, alignements, icônes, champs et navigation      |
| Accessibilité                                 | Obligatoire | Clavier, focus visible, labels, contraste, tailles lisibles          |

## Parcours et fonctions demandés

- Configurateur de devis, diagnostic numérique à cinq piliers avec export PDF et simulateur Google Maps.
- CRM existant conservé : aucun doublon, aucune suppression de données, aucun reset de base.
- Pipeline, devis/factures, calcul HT/TTC, export PDF, signature et suivi commercial : chaque fonction doit être testée de bout en bout avant d’être annoncée comme opérationnelle.
- Formulaires : envoi réel vers le backend ; succès uniquement après réponse serveur positive.
- Paiements (carte, Apple Pay, Wise) : non déclarés opérationnels tant que configuration et transaction de test contrôlée ne le prouvent pas.
- Recrutement et affiliation : formulaires reliés à `/api/contact` ; commissions et revenus de simulation explicitement indicatifs, jamais contractuels sans convention.

## Protection et livraison

- Ne pas inventer la raison sociale contractante, adresse, immatriculation, hébergeur, lieu d’hébergement, TVA ou coordonnées bancaires. Les mentions légales restent bloquées tant que ces données ne sont pas confirmées.
- Prévisualisation locale et branche de travail uniquement. Aucun commit, push, merge ni déploiement de production sans demande explicite.
- Le CRM local sur `http://localhost:3001/crm` est une instance de développement du même dépôt, pas une copie de production ni une preuve de fonctionnement de toutes les intégrations.

## État technique observé le 20 novembre 2026

- Branche : `redesign/editorial-conversion-2026`.
- `npm run typecheck` : réussi après la correction du tarif de checkout.
- `npm run build` : réussi après la correction du tarif de checkout.
- `git diff --check` : propre au dernier contrôle.
- Smoke tests précédents : 20 routes en HTTP 200 sur le serveur de prévisualisation ; `/` et `/crm` répondent aussi en HTTP 200 sur le port 3001.
- Tests visuels desktop/mobile, tests complets des formulaires et intégrations, audit RTL exhaustif, validation juridique et validation finale par l’utilisateur : non réalisés / non confirmés.

## Décision de validation

La direction générale et les contraintes de marque/offres sont documentées, mais le site complet n’est pas déclaré validé. La Direction 1 « Premium Éditorial » et le storyboard multi-pages du 16 novembre ont été retrouvés dans la bibliothèque ; voir `REFERENCE-MOCKUPS.md`. La dernière refonte a été rejetée et les maquettes antérieurement approuvées doivent rester la référence visuelle. Toute validation finale nécessite une revue visuelle et fonctionnelle complète, puis un accord explicite de l’utilisateur.
