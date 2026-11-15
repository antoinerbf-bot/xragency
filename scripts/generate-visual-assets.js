/**
 * Générateur de visuels graphiques 100% autonome (SVG / Canvas)
 * Formats :
 * - 9:16 (1080x1920) pour TikTok & Instagram Reels (Stories / Cover)
 * - 1:1 (1080x1080) pour Instagram Post & Facebook
 */

import fs from 'fs';
import path from 'path';

const ASSETS_DIR = path.join(process.cwd(), 'public', 'social-assets');

if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

export function generateSvgImage({ title, hook, cta, format = 'story', id = 'post' }) {
  const isStory = format === 'story';
  const width = 1080;
  const height = isStory ? 1920 : 1080;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0a0f"/>
      <stop offset="50%" stop-color="#12121e"/>
      <stop offset="100%" stop-color="#050508"/>
    </linearGradient>
    <linearGradient id="cyan-glow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00f2fe"/>
      <stop offset="100%" stop-color="#4facfe"/>
    </linearGradient>
    <linearGradient id="purple-glow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#a18cd1"/>
      <stop offset="100%" stop-color="#fbc2eb"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="30" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Arrière-plan dark cinematic -->
  <rect width="${width}" height="${height}" fill="url(#bg-grad)"/>

  <!-- Cercles d'ambiance lumineuse néon -->
  <circle cx="850" cy="${isStory ? 400 : 250}" r="260" fill="#00f2fe" opacity="0.12" filter="url(#glow)"/>
  <circle cx="200" cy="${isStory ? 1400 : 800}" r="320" fill="#a18cd1" opacity="0.1" filter="url(#glow)"/>

  <!-- Grille cyberpunk discrète -->
  <g opacity="0.04" stroke="#ffffff" stroke-width="1">
    ${Array.from({ length: 11 }).map((_, i) => `<line x1="${i * 108}" y1="0" x2="${i * 108}" y2="${height}"/>`).join('')}
    ${Array.from({ length: isStory ? 20 : 11 }).map((_, i) => `<line x1="0" y1="${i * 108}" x2="${width}" y2="${i * 108}"/>`).join('')}
  </g>

  <!-- Header / Badge Marque -->
  <g transform="translate(80, ${isStory ? 140 : 90})">
    <rect width="240" height="48" rx="24" fill="#ffffff" fill-opacity="0.07" stroke="#ffffff" stroke-opacity="0.15" stroke-width="1.5"/>
    <circle cx="24" cy="24" r="6" fill="#00f2fe"/>
    <text x="42" y="30" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700" letter-spacing="3">XR AGENCY</text>
  </g>

  <!-- Tag Catégorie -->
  <g transform="translate(80, ${isStory ? 380 : 220})">
    <text fill="#00f2fe" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="${isStory ? 24 : 20}" font-weight="700" letter-spacing="4">STUDIO DIGITAL &amp; AGENTS IA</text>
  </g>

  <!-- Titre / Hook Viral Principal -->
  <g transform="translate(80, ${isStory ? 520 : 340})">
    <foreignObject width="920" height="${isStory ? 600 : 400}">
      <div xmlns="http://www.w3.org/1999/xhtml" style="color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: ${isStory ? '64px' : '52px'}; font-weight: 800; line-height: 1.15; letter-spacing: -1.5px; text-shadow: 0 10px 30px rgba(0,0,0,0.8);">
        ${title}
      </div>
    </foreignObject>
  </g>

  <!-- Sous-titre / Explication -->
  <g transform="translate(80, ${isStory ? 1050 : 660})">
    <foreignObject width="920" height="${isStory ? 300 : 200}">
      <div xmlns="http://www.w3.org/1999/xhtml" style="color: #94a3b8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: ${isStory ? '34px' : '28px'}; line-height: 1.4; font-weight: 400;">
        ${hook}
      </div>
    </foreignObject>
  </g>

  <!-- CTA Box & URL -->
  <g transform="translate(80, ${isStory ? 1560 : 880})">
    <rect width="920" height="${isStory ? 140 : 100}" rx="${isStory ? 28 : 20}" fill="#0f172a" fill-opacity="0.8" stroke="url(#cyan-glow)" stroke-width="2"/>
    <text x="${isStory ? 60 : 45}" y="${isStory ? 85 : 62}" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="${isStory ? 36 : 28}" font-weight="800" letter-spacing="1">${cta || 'TESTER LE CONFIGURATEUR IA'}</text>
    <text x="860" y="${isStory ? 85 : 62}" text-anchor="end" fill="#00f2fe" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="${isStory ? 32 : 24}" font-weight="700">xragencyai.com →</text>
  </g>
</svg>`;

  const fileName = `${id}-${format}.svg`;
  const filePath = path.join(ASSETS_DIR, fileName);
  fs.writeFileSync(filePath, svg, 'utf-8');
  return { fileName, filePath, relativeUrl: `/social-assets/${fileName}` };
}

export function generateAllAssetsForPost(post) {
  const story = generateSvgImage({
    id: post.id,
    title: post.theme.toUpperCase(),
    hook: post.tiktok.hook,
    cta: "DEVIS INSTANTANÉ EN LIGNE",
    format: "story"
  });

  const square = generateSvgImage({
    id: post.id,
    title: post.theme.toUpperCase(),
    hook: post.tiktok.hook,
    cta: "DÉCOUVRIR LE STUDIO",
    format: "square"
  });

  return { story, square };
}

if (process.argv[1]?.endsWith('generate-visual-assets.js')) {
  console.log("🎨 Génération des assets visuels...");
  const sample = {
    id: "demo",
    theme: "Configurateur IA de Devis",
    tiktok: { hook: "Pourquoi attendre 3 jours un devis alors qu'une IA le calcule en 30 secondes ?" }
  };
  const res = generateAllAssetsForPost(sample);
  console.log("✅ Assets générés avec succès :", res);
}
