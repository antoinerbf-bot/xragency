/**
 * Démon autonome de publication en continu pour XR Agency
 * Tourne en tâche de fond pour publier automatiquement les campagnes selon leur date prévue.
 */

import { processQueue } from './publish-social.js';
import { generateFullCampaignBatch } from './generate-social-posts.js';
import fs from 'fs';
import path from 'path';

const CALENDAR_FILE = path.join(process.cwd(), 'social-calendar.json');
const CHECK_INTERVAL_MS = 60 * 1000 * 30; // Toutes les 30 minutes

async function checkAndAutoRefill() {
  console.log(`[${new Date().toLocaleTimeString()}] 🔄 Vérification de la file d'attente réseaux sociaux...`);
  
  let calendar = [];
  if (fs.existsSync(CALENDAR_FILE)) {
    try {
      calendar = JSON.parse(fs.readFileSync(CALENDAR_FILE, 'utf-8'));
    } catch (e) {
      calendar = [];
    }
  }

  const pending = calendar.filter(p => p.status === 'ready_to_publish');
  
  // Si moins de 3 posts d'avance, on régénère automatiquement un lot de 5 campagnes
  if (pending.length < 3) {
    console.log("⚡ Moins de 3 publications d'avance : génération automatique d'un nouveau lot...");
    generateFullCampaignBatch(5);
  }

  // Exécution de la file de diffusion
  await processQueue();
}

console.log("🚀 Démarrage du Démon Autonome XR Agency Social Media...");
checkAndAutoRefill();

setInterval(checkAndAutoRefill, CHECK_INTERVAL_MS);
