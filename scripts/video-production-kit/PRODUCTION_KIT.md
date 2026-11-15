# XR AGENCY — Kit de Production Vidéo Externe (24fps Photoréaliste)

Ce dossier centralise les **scripts validés, pistes audio masterisées, keyframes haute définition et prompts prêts à générer** pour produire les versions cinéma 24fps avec acteurs et caméras réelles (Runway Gen-4 / Google Veo 3 / Kling 1.6 Pro / Luma Ray 2) si une production studio filmée vient compléter les rendus web actuels.

---

## 1. Vidéo Principale Homepage (`xr-agency-vsl.mp4`)

- **Direction artistique** : Lumineuse, chaleureuse, crédible, profondeur de champ naturelle (`f/1.8`), lumière naturelle du matin/golden hour, mouvements steadicam lents et fluides. Zéro plan générique type « personne qui fixe l'écran dans le noir ».
- **Voix-off fournie** : `public/videos/xr-vsl-voiceover-v5.mp3` (Française naturelle · `fr-FR-VivienneMultilingualNeural` · mixable à `-2dB` sur musique ambiante `public/videos/music-inspired.mp3`).

### Découpage & Prompts prêts à générer

| Scène | Étape storytelling | Keyframe de référence | Prompt Vidéo IA (Runway / Veo 3 / Kling) |
|---|---|---|---|
| **01 · Le Problème** | Dirigeants invisibles malgré leur qualité | `src/assets/story-restaurant-owner.jpg` | *Handheld natural cinema camera, slow 35mm push-in on a warm sunlit Parisian café owner checking reservations thoughtfully by the terrace window, soft morning golden sunlight, shallow depth of field, authentic French hospitality atmosphere, 24fps, Kodak Portra aesthetic.* |
| **02 · Prise de conscience** | Réflexe Google Maps & site mobile | `src/assets/sector-realestate.jpg` | *Smooth over-the-shoulder steadicam shot in a bright architectural avenue, executive checking local businesses and glowing 5-star reviews on smartphone, warm natural daylight, crisp focus, shallow depth of field, modern commercial film.* |
| **03 · La Solution XR** | Rencontre & pilotage digital lumineux | `src/assets/story-business-meeting.jpg` | *Medium wide gimbal pan inside a sunlit glass creative agency in Paris overlooking rooftops, two directors collaborating calmly around an alabaster desk with clean UI designs, soft airy daylight, warm champagne and charcoal tones.* |
| **04 · Démonstration** | Sites web, Maps Top 3 & Réseaux | `src/assets/hero-luminous.jpg` | *Smooth tracking dolly across a bright modern design studio, screens displaying clean editorial luxury websites, Google Business analytics and vertical video previews, natural daylight rays, refined corporate look.* |
| **05 · Projection CRM & IA** | Acquisition structurée & automatisée | `src/assets/sector-hospitality.jpg` | *Steady cinematic shot of a thriving boutique hotel reception welcoming guests while an automated tablet CRM syncs bookings seamlessly, warm natural sunlight, calm luxury atmosphere.* |
| **06 · Appel à l'action** | Agent XR & conversion directe | `src/assets/agent-xr-portrait.jpg` | *Soft subtle push-in portrait shot of a confident, warm female digital advisor in a luminous ivory-toned studio, natural friendly expression, crisp skin tones, clean bokeh background.* |

---

## 2. Vidéo XR School 90 Jours (`xr-school-90j.mp4`)

- **Direction artistique** : Énergie entrepreneuriale lumineuse, progression tangible Jour 1 → Jour 90, mentorat humain, zéro esthétique sombre ou « vendeur de rêve ».
- **Musique d'accompagnement** : `public/videos/music-inspired.mp3`.
- **Voix-off incluse dans le rendu local** : synthétisée avec `edge-tts` (`fr-FR-VivienneMultilingualNeural`).

### Découpage & Prompts prêts à générer

| Chapitre | Thème | Keyframe de référence | Prompt Vidéo IA (Runway / Veo 3 / Kling) |
|---|---|---|---|
| **01 · Vision 90j** | Lancer son agence sans partir de zéro | `src/assets/story-entrepreneur-launch.jpg` | *Slow parallax cinema shot inside a sunlit Parisian loft workspace, young founder smiling naturally at a clean MacBook setup beside a coffee cup, Eiffel Tower subtly visible through tall arched windows, golden daylight.* |
| **02 · Jours 1–30** | Site, Identité de marque & Ligne pro | `src/assets/svc-web-editorial.jpg` | *Overhead smooth motorized slider over an oak desk with brand guidelines sketches, bespoke web typography displayed on a laptop screen, and a modern smartphone on stand, soft warm morning sunlight.* |
| **03 · Jours 31–60** | Mentorat Closing & Leads CRM | `src/assets/story-school-mentor.jpg` | *Handheld natural camera circling slowly around an experienced female mentor and a founder reviewing a live sales CRM pipeline together in a bright contemporary studio, authentic dialogue, warm color grading.* |
| **04 · Jours 61–90** | Recrutement équipe ou Sous-traitance XR | `src/assets/story-business-meeting.jpg` | *Crisp steadicam reveal of a growing small digital agency team reviewing client deliverables together by a sunny window, collaborative confidence, airy cream-and-bronze visual palette.* |
| **05 · Rejoindre (4 000 €)** | Transition vers autonomie financière | `src/assets/hero-luminous.jpg` | *Uplifting slow zoom-out on the agency studio bathed in warm daylight, clean luxury atmosphere, seamless ending card fade.* |

---

## 3. Spécifications d'export recommandées

- Format : **MP4 H.264 (`yuv420p`) · 1920×1080 · 25fps ou 24fps · `+faststart`**
- Audio normalisé : **-14 LUFS** (voix claire à `-2dB`, musique ambiante à `-18dB` avec ducking doux)
- Emplacements cibles dans le projet :
  - `public/videos/xr-agency-vsl.mp4` (+ poster `public/videos/vsl-poster.jpg`)
  - `public/videos/xr-school-90j.mp4` (+ poster `public/videos/school-poster.jpg`)

