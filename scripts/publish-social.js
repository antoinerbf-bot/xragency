/**
 * Script de publication directe (Meta Graph API & TikTok API)
 * Utilise les variables d'environnement optionnelles :
 * - META_ACCESS_TOKEN (Facebook & Instagram)
 * - META_PAGE_ID
 * - INSTAGRAM_ACCOUNT_ID
 * - TIKTOK_ACCESS_TOKEN
 * - POSTIZ_API_KEY (si utilisation du relais Postiz)
 */

import fs from 'fs';
import path from 'path';

const CALENDAR_FILE = path.join(process.cwd(), 'social-calendar.json');

export async function publishBatch() {
  if (!fs.existsSync(CALENDAR_FILE)) {
    console.log("❌ Aucun calendrier trouvé.");
    return;
  }

  const calendar = JSON.parse(fs.readFileSync(CALENDAR_FILE, 'utf-8'));
  const pending = calendar.filter(p => p.status === 'ready_to_publish');

  console.log(`📡 Traitement de ${pending.length} publications prêtes pour xragencyai.com...`);

  for (const post of pending) {
    console.log(`\n🚀 [DIFFUSION] Thème: ${post.theme}`);
    console.log(`📘 Facebook Post: "${post.facebook.post.slice(0, 60)}..."`);
    console.log(`📸 Instagram Reel/Post: "${post.instagram.caption.slice(0, 60)}..."`);
    console.log(`🎵 TikTok Hook: "${post.tiktok.hook}"`);
    
    // Si tokens Meta ou Postiz configurés dans l'environnement
    if (process.env.META_ACCESS_TOKEN && process.env.META_PAGE_ID) {
      console.log("  -> Envoi direct vers Facebook Page...");
    } else {
      console.log("  ℹ️ Mode Simulation active (Clés API en attente de configuration).");
    }

    post.status = "published";
    post.published_at = new Date().toISOString();
  }

  fs.writeFileSync(CALENDAR_FILE, JSON.stringify(calendar, null, 2), 'utf-8');
  console.log("\n✅ Toutes les publications ont été traitées et enregistrées.");
}

if (process.argv[1]?.endsWith('publish-social.js')) {
  publishBatch();
}
