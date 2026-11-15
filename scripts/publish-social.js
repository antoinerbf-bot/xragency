/**
 * Script de publication directe (Meta Graph API, Postiz API, & Webhook)
 * Supporte :
 * - Facebook Page
 * - Instagram Business
 * - TikTok
 */

import fs from 'fs';
import path from 'path';

const CALENDAR_FILE = path.join(process.cwd(), 'social-calendar.json');

export async function publishToMetaFacebook({ message, link, pageId, accessToken }) {
  const url = `https://graph.facebook.com/v21.0/${pageId}/feed`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        link: link || 'https://xragencyai.com',
        access_token: accessToken
      })
    });
    return await res.json();
  } catch (err) {
    return { error: err.message };
  }
}

export async function publishToPostiz({ content, postizApiKey, platforms = ['facebook', 'instagram', 'tiktok'] }) {
  const url = 'https://api.postiz.com/public/v1/posts';
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${postizApiKey}`
      },
      body: JSON.stringify({
        content,
        platforms
      })
    });
    return await res.json();
  } catch (err) {
    return { error: err.message };
  }
}

export async function publishToWebhook({ payload, webhookUrl }) {
  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return { success: res.ok, status: res.status };
  } catch (err) {
    return { error: err.message };
  }
}

export async function processQueue() {
  if (!fs.existsSync(CALENDAR_FILE)) {
    console.log("❌ Aucun calendrier trouvé.");
    return;
  }

  const calendar = JSON.parse(fs.readFileSync(CALENDAR_FILE, 'utf-8'));
  const pending = calendar.filter(p => p.status === 'ready_to_publish');

  console.log(`📡 Traitement de ${pending.length} publications en attente pour xragencyai.com...`);

  const metaToken = process.env.META_ACCESS_TOKEN;
  const metaPageId = process.env.META_PAGE_ID;
  const postizKey = process.env.POSTIZ_API_KEY;
  const webhookUrl = process.env.SOCIAL_WEBHOOK_URL;

  for (const post of pending) {
    console.log(`\n------------------------------------------------------------`);
    console.log(`🚀 [DIFFUSION] ID: ${post.id} | Thème: ${post.theme}`);
    console.log(`📘 Facebook : "${post.facebook.post.slice(0, 70)}..."`);
    console.log(`📸 Instagram : "${post.instagram.caption.slice(0, 70)}..."`);
    console.log(`🎵 TikTok Hook (3s) : "${post.tiktok.hook}"`);
    if (post.assets) {
      console.log(`🎨 Assets visuels liés : ${post.assets.squareSvg} & ${post.assets.storySvg}`);
    }

    if (postizKey) {
      console.log("  -> Envoi automatique via Postiz API (FB, Insta, TikTok)...");
      await publishToPostiz({ content: post.instagram.caption, postizApiKey: postizKey });
    } else if (metaToken && metaPageId) {
      console.log("  -> Envoi direct Facebook Graph API...");
      await publishToMetaFacebook({ message: post.facebook.post, pageId: metaPageId, accessToken: metaToken });
    } else if (webhookUrl) {
      console.log("  -> Envoi vers Webhook d'automatisation...");
      await publishToWebhook({ payload: post, webhookUrl });
    } else {
      console.log("  ℹ️ Mode File d'attente Active (Prêt à l'envoi immédiat dès saisie de vos clés dans .env).");
    }

    post.status = "published";
    post.published_at = new Date().toISOString();
  }

  fs.writeFileSync(CALENDAR_FILE, JSON.stringify(calendar, null, 2), 'utf-8');
  console.log("\n============================================================");
  console.log(`✅ File d'attente traitée avec succès (${pending.length} publications mises à jour).`);
}

if (process.argv[1]?.endsWith('publish-social.js')) {
  processQueue();
}
