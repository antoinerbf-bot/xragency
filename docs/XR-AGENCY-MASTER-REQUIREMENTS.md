# XR Agency — référentiel maître chronologique et critères de livraison

Dernière consolidation : 20 novembre 2026. Ce document rassemble les décisions connues, leur ordre chronologique, les références retrouvées dans la bibliothèque et les critères de fin. Il complète les documents de design existants ; il ne remplace pas les sources commerciales (`src/lib/content-services-a.ts`, `content-services-b.ts`, `checkout-catalog.ts`) ni les données existantes.

## 0. Règles de lecture et de priorité

1. Une instruction utilisateur explicite prime sur une proposition de l'assistant.
2. Une correction plus récente prime sur une ancienne valeur (ex. Croissance Active : 599 €, pas 499 €).
3. Une esquisse sert de référence de composition et de hiérarchie, mais ses faux chiffres, faux logos clients, fausses preuves ou textes erronés ne deviennent pas des faits commerciaux.
4. Ne pas fusionner des directions portant le même nom si elles proviennent de planches différentes. Les sélections du 16 et du 18 novembre sont consignées séparément ci-dessous ; la direction applicable doit être arbitrée par les messages utilisateur exacts et les rejets ultérieurs, pas par un résumé assistant.
5. Conserver toutes les modifications présentes dans l'arbre Git. Aucun reset, clean, stash, rebase, commit, push, merge ou déploiement sans autorisation explicite.
6. Le travail de site public et le CRM interne sont deux périmètres distincts, mais reliés par les parcours et données existants. Jarvis reste sur le HP Windows, jamais sur le Mac.
7. Ne jamais annoncer « terminé » sans tests fonctionnels, visuels et responsive, pas seulement TypeScript/build.

## 1. Chronologie des demandes et décisions retrouvées

### 19–20 décembre 2025 — socle commercial initial
- Site XR-AGENCY / xr-agency.fr structuré en sections et pages de prestations.
- Produire pour chaque service un contenu complet, en anglais puis en français, prêt à intégrer : description, valeur, raisons de choisir l'offre, SEO et conversion.
- Catalogue demandé à cette période : création de site, maintenance/gestion, SEO, réseaux sociaux, chatbot IA, branding, software, audit digital et portfolio.
- Priorité donnée au SEO, au ROI et à l'acquisition organique ; ne jamais promettre une position Google garantie.

### 23 septembre 2026 — SEO et visibilité de marque
- Objectif utilisateur : apparaître tout en haut de la première page sur la recherche « XR Agency ».
- Accepter cet objectif comme cible, sans garantie de classement.
- Travailler l'indexabilité, la qualité réelle, le SEO local et multilingue, le contenu utile, les pages services et villes non clonées, les données structurées, le maillage interne, le sitemap et la Search Console.
- Parcours visé : recherche Google → preuve crédible → offre pertinente → réalisations → devis/WhatsApp.

### 20 octobre 2026 — intégration technique et accès
- L'utilisateur a autorisé des modifications directes du dépôt GitHub dans le cadre du projet.
- L'authentification CRM doit fonctionner pour le propriétaire et l'équipe commerciale.
- Cette autorisation historique ne vaut pas autorisation de déploiement aujourd'hui : les règles plus récentes imposent une validation explicite avant publication.

### 31 octobre – 2 novembre 2026 — premiers storyboards immersifs complets
- Références retrouvées : `Planche de refonte immersive XR Agency.png` (31/10), `Refonte immersive du site XR Agency.png` et `XR Agency — Expérience digitale immersive.png` (01/11), `XRAGENCY — L’Art du Digital Sur-Mesure.png` et `Maquette XRAGENCY : l’art du digital sur-mesure.png` (02/11).
- Principes explorés : hero vidéo cinématique, profondeur/parallaxe, scènes 3D, portfolio, services, diagnostic, configurateur, méthode, contact, mobile.
- Plusieurs planches comportent des statistiques, clients, garanties et prix fictifs : ne jamais les reprendre sans validation documentaire.
- Les versions très sombres/néon/violet et la gamification publique ne sont pas une autorisation permanente ; elles ont ensuite été rejetées comme esthétique générale.

### 13 novembre 2026 — expérience de studio premium et mobile
- Demande d'un rendu aussi abouti sur ordinateur que sur mobile, avec interactions tactiles, animations optimisées et lisibilité sans compromis.
- Souhait d'un studio/agence premium, Paris visible, équipe au travail, pas d'aspect artificiel/IA.
- Demandes de scroll vers un devis interactif, services cinématiques, audit, simulateur Google Maps et conversion forte.
- L'utilisateur valide le principe de homepage mais demande une vidéo immersive, le vrai logo et des illustrations de meilleure qualité ; apprécie l'illustration de visibilité locale et le footer.
- Référence `L’art du digital sur mesure.png` (13/11) : studio parisien, tour Eiffel, ambiance lumineuse, titre éditorial, CTA projet et showreel, raccourcis expertises, diagnostic/devis, bandeau final WhatsApp.
- Référence `Écosystème digital XR Agency en or et noir.png` (13/11) : sept piliers, hub de services, pages détaillées, Academy, processus et CTA. Conserver l'architecture et la profondeur, pas les chiffres ou preuves non vérifiés.

### 14 novembre 2026 — rejet du gaming/neon, puis préférence éditoriale
- L'utilisateur rejette une proposition trop gaming/futuriste et demande un rendu professionnel premium.
- Concepts explorés : 1 « Minimalisme premium » (crème/noir/bronze, typographie éditoriale), 2 immersion cinématique, 3 studio tech haut de gamme.
- L'utilisateur indique préférer le concept 1 « Minimalisme premium » ; souhaite une esquisse complète de homepage avec services et prix officiels.
- Les références violettes/néon du 14/11 sont des concepts rejetés et ne doivent pas être reprises.
- Inspiration Lusion : qualité des mouvements, profondeur, transitions, lumière, spatialité ; pas une copie ni un prétexte pour un effet 3D gratuit.

### 15 novembre 2026 — catalogue de prestations et tarifs de référence historiques
- `Maquette luxueuse de site XR Agency en français.png` présente une architecture détaillée des services : sites web, branding, SEO, Google Maps, Social Media, WebCare, POS/CRM/robotique.
- Cette planche contient des valeurs historiques. Les prix actuels doivent être lus depuis les fichiers canoniques et corrections utilisateur, pas depuis cette planche seule.
- Références de site web : Site Vitrine Pro 499 €, Site Business 799 €, E-commerce/Réservation dès 1 499 € (à confirmer contre le catalogue actuel avant affichage).
- Branding, SEO, Maps et WebCare ont des niveaux d'offres historiques ; ne pas les modifier sans vérifier la source commerciale actuelle.

### 16 novembre 2026 — storyboard multi-pages et sélection de la direction
- `Sept concepts web premium pour XR Agency.png` (07:07 UTC) : sept directions. Direction 01 « Premium Éditorial » : façade/studio architectural, crème/bronze, typographie sérif, navigation discrète, expertise et conversion. Direction 02 « Immersif / Game Experience » : île 3D, quêtes et progression. Ne pas confondre les deux.
- `Maquette complète du site XR Agency.png` (07:12 UTC) : storyboard de 10 vues : Accueil, Services, détail Social Media, Tarifs/Sélection, Réalisations, À propos, Affiliation/Recrutement, Contact/Devis, CRM espace client, parcours mobile.
- `Maquette complète du site XR Agency(1).png` (20:16 UTC) : version étendue à 13 vues : services individuels (Site web, SEO, Google Maps, Social Media, Branding, WebCare), portfolio, méthode, À propos, international, offres Social Media. Les tarifs de la maquette incluent encore l'ancien 499 € pour Croissance Active ; valeur remplacée depuis par 599 €.
- `Maquette XR Agency : l’art du digital sur mesure.png` (20:16 UTC) : référence éditoriale détaillée. Hero « L’art du digital sur mesure », équipe de 4–5 personnes dans un bureau parisien avec tour Eiffel, grille d'expertises, six pages de service, portfolio, À propos, méthode, contact. Cette maquette est un storyboard de structure et direction ; les éléments de preuve/clients/coordonnées doivent être vérifiés.
- La référence complète implique une vraie version mobile, pas seulement un desktop réduit.

### 18 novembre 2026 — autre sélection « Direction 1 » à ne pas fusionner sans preuve
- Message utilisateur retrouvé : « Pour XR Agency, je choisis la direction 1. »
- Le contexte assistant de cette sélection la décrivait comme « Univers immersif et gamification » (noir/champagne, 3D, navigation façon Sims, quêtes/niveaux/interactions).
- Ce choix porte le même libellé « Direction 1 » mais ne correspond pas nécessairement à la planche des sept concepts du 16/11 où Direction 01 = Premium Éditorial.
- Ne pas résoudre cette ambiguïté en inventant une fusion : le rejet explicite du 19/11 et les maquettes antérieures doivent être respectés. La gamification RPG du CRM reste une exigence explicite distincte.

### 19 novembre 2026 — rejet du redesign récent
- L'utilisateur rejette clairement le nouveau rendu et demande de repartir des esquisses précédemment validées.
- Références à respecter : Lusion pour les effets/profondeur/mouvement et NexPro Digital pour la structure et l'expérience de conversion.
- Demande de ne pas se contenter de modifier des couleurs : les propositions doivent être réellement différentes, personnalisées et cohérentes avec XR.
- Demande de traduction intégrale de toutes les pages et contenus.
- La maquette du 19/11 `Maquette web premium de XR Agency.png` contient des idées utiles (navigation Agence/Services/Réalisations/Outils/Ressources, ville/équipes, tunnel) mais elle n'est pas à considérer comme validation si elle a été rejetée dans l'échange correspondant.

### 20 novembre 2026 — hero international avec équipe constante
- Demande utilisateur : séquence immersive avec scènes de bureaux dans plusieurs pays ; Paris et tour Eiffel nettement reconnaissables, Dubaï et Burj Khalifa, New York, Japon/Tokyo, autres environnements.
- Demande complémentaire essentielle : mêmes collaborateurs identifiables dans chaque destination, mêmes visages et continuité d'équipe ; le client/projet peut changer, les lieux et l'environnement changent, mais pas les personnes.
- Les scènes doivent montrer une équipe humaine en réunion marketing, en train de travailler ensemble, photographiée comme par un photographe/vidéaste professionnel. Le monument est visible à travers les fenêtres ; il ne doit pas être un simple skyline sans équipe.
- Pas de personnages IA déformés, yeux manquants, visages incohérents, répétition de scènes, faux flous, textes incrustés dans l'image, texte HTML posé sur des visages, superpositions vidéo/photos, ou cadrages qui entrent en conflit avec la typographie.
- Composition exacte à viser : titre « L’art du digital sur mesure » intégré à une zone de respiration, CTA cohérents, contrôle du carrousel, sélecteur des villes, scène adaptée par breakpoint. Même équipe de cinq personnes d'une ville à l'autre. Une image de concept IA n'est pas une photographie réelle ni un asset final validé.

## 2. Références visuelles prioritaires à appliquer

1. `Maquette XR Agency : l’art du digital sur mesure.png` (16/11, 20:16) : storyboard multi-pages éditorial et scène d'équipe Paris/Eiffel.
2. `Maquette complète du site XR Agency(1).png` (16/11, 20:16) : architecture de 13 vues et parcours mobile.
3. `Sept concepts web premium pour XR Agency.png` (16/11, 07:07) : Direction 01 Premium Editorial pour la base de la planche des sept concepts ; vérifier le message utilisateur correspondant avant de déclarer que c'est la seule direction validée.
4. `L’art du digital sur mesure.png` (13/11) : première direction photo/studio Paris, CTA et diagnostic.
5. `Lusion` : grammaire de mouvement et spatialité ; `NexPro Digital` : clarté commerciale et conversion. Ne pas copier.
6. Les images du 20/11 générées dans le fil peuvent servir de moodboard de composition pour le hero international, mais ne sont pas des photographies documentaires finales.

## 3. Design et architecture du site public

### Identité et système
- Logo officiel `public/logo-xr-agency.svg` à conserver à l'identique.
- Typographies éditoriales : grand titre sérif, texte et UI sans-serif ; hiérarchie et espaces généreux.
- Palette selon les références éditoriales : crème/ivoire, charbon/noir profond, bronze/champagne discret. Éviter néon violet/bleu électrique, halos et look jeu vidéo sur le site public.
- Photographie documentaire/professionnelle, scènes de travail crédibles, actifs réels si disponibles ; pas de banques d'images artificielles ni d'images IA présentées comme de vraies réalisations.
- Parallaxe, transitions, mouvement, micro-interactions et 3D uniquement s'ils servent la narration, sont fluides, accessibles et performants.
- Mobile-first (environ 70 % de trafic mobile évoqué) : navigation tactile, recadrage propre, typographie, CTA, sections et carrousels adaptés séparément.
- Cinq langues : FR, EN, VI, AR, RU ; toutes les routes, formulaires, erreurs, confirmations, boutons, prix, FAQ et PDF doivent être traduits. Arabe RTL réel.

### Navigation et pages
- Navigation à définir selon les esquisses : Agence/Accueil, Services, Réalisations, Méthode, À propos, International, Contact/Devis, langue, CTA devis ; les pages Carrières/Affiliation et CRM doivent rester accessibles par les parcours pertinents.
- Accueil : hero, preuves vérifiées, expertises, services, portfolio, méthode, outils interactifs (Maps, devis, diagnostic), FAQ, CTA final.
- Hub services et détail par discipline : Site web, SEO, Google Maps, Social Media, Branding, WebCare, robotique/IA, POS/CRM et toutes les prestations déjà dans le catalogue.
- Réalisations : filtres par secteur (hôtellerie, restauration, immobilier, commerce/autres) ; cas réels documentés uniquement, sinon concepts clairement étiquetés.
- Méthode : échange/diagnostic, stratégie, production, suivi/optimisation.
- À propos : histoire, équipe, fondateur, présence internationale ; n'afficher que les informations biographiques et chiffres confirmés.
- International : pays et lieux de travail, sans prétendre à des bureaux physiques là où il n'y en a pas.
- Affiliation et recrutement : deux parcours et formulaires distincts, conditions de commission clairement indicatives tant que le contrat n'est pas défini.
- Contact/devis : WhatsApp exact, email existant à vérifier, formulaire backend réel.
- School/Academy et ressources : conserver routes et contenus existants.
- Mentions légales : bloquées jusqu'à confirmation de la raison sociale, adresse, immatriculation, TVA, hébergeur et informations contractuelles.

### Parcours de vente — priorité majeure
- Parcours cohérent et continu : découverte → compréhension du besoin → choix d'un ou plusieurs services → qualification → recommandation → devis/contact → suivi CRM.
- CTA contextuels sur chaque page ; pas de bouton mort ni de lien de démonstration.
- Sélection panier persistante et récapitulatif correct ; libellé « Ajouter à ma sélection » conservé.
- Configurateur de devis personnalisé en 3 étapes, données tarifaires provenant du catalogue canonique.
- Diagnostic digital à 5 piliers, jauges SVG, rapport/export PDF ; les scores doivent être issus des réponses, pas de valeurs inventées.
- Simulateur Google Maps : clairement présenté comme simulation pédagogique, pas comme donnée Google live si aucune API/autorisation ne le fournit.
- WhatsApp commercial : `https://wa.me/33767566783` ; conserver le préremplissage utile sans promettre un délai de réponse non confirmé.
- Formulaires reliés au backend ; état de succès uniquement après réponse positive réelle.
- Checkout/paiement : tester chaque méthode et les webhooks ; ne pas déclarer Apple Pay/Wise/carte actifs sans configuration et transaction de test vérifiées.

### SEO et acquisition
- Marque XR Agency : viser la première page et la meilleure position possible, sans garantie de rang.
- Pages locales et pages villes uniques et utiles, pas de contenu cloné. Villes évoquées : Paris, Lyon, Marseille, Bordeaux, Toulouse, Lille, Nantes, Nice, Strasbourg, Montpellier, Rennes, Grenoble ; ajouter uniquement celles justifiées par l'offre et les marchés réels.
- SEO FR/EN/VI ; hreflang/canonical/sitemap/robots/schema/breadcrumbs, maillage interne, métadonnées uniques, Search Console.
- Contenu par service et par intention, FAQ utile, blog/ressources, optimisation images/vidéos, performance mobile/Core Web Vitals.
- Google Maps / Google Business Profile : création/optimisation, visibilité locale, gestion des avis, cohérence NAP ; pas de garantie Top 3.
- Pas de Google Ads / AdWords : le service n'est pas proposé.
- Le site doit convertir le trafic organique en demandes qualifiées ; suivre les événements sans exposer de fausses statistiques.

## 4. Catalogue commercial et invariants

- Social Media : Présence Essentielle 349 €/mois, engagement 3 mois ; Croissance Active 599 €/mois, engagement 6 mois, « Le plus choisi » ; Domination Sociale 799 €/mois, engagement 6 mois.
- Conserver les livrables, conditions, périodes de facturation et CTA canoniques ; ne pas simplifier ni réécrire l'offre à partir des maquettes.
- Site web : offres historiques 499 € / 799 € / dès 1 499 € observées dans les maquettes ; vérifier le catalogue source avant tout affichage ou modification.
- Branding, SEO, Google Maps, WebCare, robotique, POS/CRM : tarifs des fichiers canoniques uniquement ; plusieurs anciennes planches contiennent des tarifs historiques différents.
- Aucun faux client, logo, témoignage, classement, métrique, garantie, délai ou promesse de performance.
- Le service Google Ads est exclu.
- Conserver « Ajouter à ma sélection » et le WhatsApp exact ci-dessus.

## 5. CRM interne — périmètre complet distinct du site public

- Authentification et rôles pour propriétaire et équipe commerciale ; garder l'accès et les données existantes.
- Pipeline prospects/leads : création, enrichissement, qualification, affectation, étapes, relances, notes, historique, tâches, activités, recherche/filtres.
- Fiche prospect/client, projets, suivi d'état et documents.
- Dashboard direction : CA mensuel, MRR, opportunités, conversions, activités, leaderboard ; chiffres calculés depuis données réelles.
- Gamification RPG : choix personnage/avatar, XP, rangs, quêtes, missions, progression, récompenses et classements ; ludique, fluide, mais lisible et utilisable.
- Catalogue de prestations et devis : calcul HT/TTC, devis détaillé, PDF vectoriel, envoi, statut, signature électronique, conversion en facture.
- Factures, paiements, statut, export PDF et suivi ; données bancaires/légales jamais inventées.
- Intégration Supabase : vérifier schéma, RLS, auth, fonctions, migrations et données avant modification ; ne jamais reset ni supprimer.
- `/crm` séparé de la navigation publique, CRM interne uniquement ; les données clients ne doivent pas être rendues publiques.
- Vérifier la synchronisation entre formulaire public, prospects CRM, configurateur, devis et suivi commercial.

## 6. Jarvis et agents — hors installation Mac

- Jarvis est destiné au PC HP Windows ; ne pas installer/associer au Mac.
- Mot-clé vocal « Hey Jarvis », réponse concise, VAD/micro réactif à distance, interface HUD/Command Center, états et logs.
- Orchestration d'agents : XR Client Ops, XR Commercial, XR Designer, XR SEO Auditor, XR Social Content, XR Web Builder et Jarvis orchestrateur (liste retrouvée, à vérifier contre l'inventaire réel).
- Capacités demandées : CRM (lecture/mise à jour prospects), génération maquettes à partir briefs CRM, prospection Google Maps, synchronisation agenda/notes iPhone, programmation Meta, pilotage de l'ordinateur.
- Ne pas mélanger le chantier Jarvis avec le déploiement du site ou du CRM ; les intégrations se testent séparément.

## 7. Définition de terminé — tests obligatoires

### Audit design
- Comparer chaque page aux références validées et au système visuel.
- Vérifier logo officiel, typographies, grille, espaces, couleurs, images, cohérence, hiérarchie, transitions et absence de superpositions/flou involontaire.
- Captures desktop, tablette et mobile ; contrôle visuel manuel de chaque route.
- Hero international : même équipe de cinq personnes, continuité des visages/tenues, scènes crédibles, villes reconnaissables, cadrage texte/CTA et sélecteur fonctionnel. Ne pas substituer une simple photo répétée à cinq scènes.

### Audit tunnel et métier
- Tester de bout en bout sélection → configurateur → devis → formulaire → API → CRM → notification/confirmation.
- Tester calculs HT/TTC, prix, engagements, devis, facture, export PDF, signature, checkout/webhooks et erreurs.
- Tester toutes les CTA, liens, filtres, accordéons, carrousels, simulateurs et téléchargements.

### Audit technique et qualité
- `npm run typecheck`, `npm run build`, lint ciblé, `git diff --check`.
- Smoke test toutes les routes, erreurs serveur et console navigateur.
- Tests clavier, focus, contrastes, labels, touch targets, `prefers-reduced-motion`, RTL arabe.
- Performance mobile, tailles d'images, lazy loading, stabilité de layout, SSR/hydratation.
- Cinq langues sur chaque route et états d'erreur/succès/chargement.
- SEO technique : metadata, canonical, hreflang, sitemap, robots, schema, liens internes, indexabilité.
- Ne pas confondre build réussi avec validation UX ou fonctionnelle.

## 8. État de départ constaté au 20 novembre 2026

- Repo `/Users/rousseauantoine/xragency`, branche `redesign/editorial-conversion-2026`.
- Environ 65 fichiers modifiés/non suivis : préserver tout le travail présent.
- Vite local port 3001, serveur PID 48072, homepage HTTP 200.
- `npm run typecheck` et `npm run build` passaient après la correction d'un état React résiduel du Hero ; cela ne prouve pas que le site est fini.
- CRM et nombreuses pages publiques sont modifiés mais les tests bout en bout et l'audit visuel complet ne sont pas terminés.
- Aucune publication, commit, push ou déploiement effectué.

## 9. Ordre d'exécution obligatoire

1. Geler les invariants et faire l'inventaire des modifications existantes (sans réinitialiser le dépôt).
2. Résoudre le référentiel visuel exact à partir des fichiers du 16/11 et des corrections du 19–20/11 ; produire une seule homepage de référence desktop/mobile.
3. Finaliser la homepage et son tunnel d'entrée ; faire revue visuelle avant de généraliser.
4. Construire/aligner le design system et le hub services.
5. Finaliser chaque page de service et le catalogue/offres.
6. Relier et tester sélection, devis 3 étapes, audit 5 piliers, Maps, formulaires et CRM handoff.
7. Finaliser portfolio, méthode, agence/international, affiliation, recrutement, contact, FAQ, Academy et pages locales/ressources.
8. Audit intégral des cinq langues, RTL, SEO, accessibilité, responsive et performance.
9. Audit fonctionnel de bout en bout et correction itérative jusqu'à zéro anomalie bloquante.
10. Livrer le lien local, rapport des tests, liste précise des limites et attendre validation avant publication.
