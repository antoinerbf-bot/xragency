#!/usr/bin/env node
/**
 * MCP Server 100% Autonome & Gratuit pour les Réseaux Sociaux de XR Agency (xragencyai.com)
 * Réseaux : Facebook, Instagram, TikTok
 * Protocole : Model Context Protocol (MCP) JSON-RPC 2.0 sur stdio
 */

import readline from 'readline';
import fs from 'fs';
import path from 'path';

const CALENDAR_FILE = path.join(process.cwd(), 'social-calendar.json');

// Initialiser le calendrier de contenu local s'il n'existe pas
function getCalendar() {
  if (fs.existsSync(CALENDAR_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(CALENDAR_FILE, 'utf-8'));
    } catch (e) {
      return [];
    }
  }
  return [];
}

function saveCalendar(data) {
  fs.writeFileSync(CALENDAR_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Générateur de contenu haute conversion pour XR Agency
const CONTENT_TEMPLATES = [
  {
    theme: "Configurateur IA de Devis",
    tiktokHook: "Pourquoi les devis d'agences prennent 3 jours alors qu'on peut en avoir un en 30 secondes ?",
    tiktokScript: "Plan 1 (0-3s) : Gros plan sur l'écran avec le curseur qui bouge sur xragencyai.com.\nPlan 2 (3-8s) : Ajustement en temps réel des modules (Site 3D, Agent IA, Automations).\nPlan 3 (8-15s) : Le prix et le calendrier se calculent en direct. Voix off : 'Lien en bio pour tester le tien gratuitement.'",
    instaCaption: `Combien coûte un site web nouvelle génération ou une solution IA en 2026 ? 🚀\n\nChez XR Agency, on a automatisé tout le processus : notre configurateur intelligent calcule votre devis en direct.\n\n✨ 3D temps réel\n⚡ Stack ultra-rapide (React 19 / TanStack)\n🤖 Intégration d'agents IA autonomes\n\n👉 Testez-le en direct : xragencyai.com (lien en bio)\n\n#agenceia #webdesign #tanstack #react #automation #intelligenceartificielle #tech`,
    facebookPost: `Finies les attentes de 3 jours pour recevoir une proposition commerciale.\n\nSur notre nouvelle plateforme XR Agency, configurez votre projet digital en temps réel (Site Web 3D immersif, Agent IA autonome, Automatisation métier) et obtenez un chiffrage immédiat.\n\n👉 Découvrir la démo en direct : https://xragencyai.com`,
  },
  {
    theme: "Agents IA Autonomes en Entreprise",
    tiktokHook: "Voici comment une IA qualifie des prospects et gère le CRM 24h/24 sans jamais dormir.",
    tiktokScript: "Plan 1 (0-3s) : Alerte prospect reçue à 2h du matin.\nPlan 2 (3-9s) : L'agent IA analyse le besoin, vérifie le calendrier et booke un appel qualifié.\nPlan 3 (9-15s) : Tableau de bord des leads convertis. CTA : 'Toutes les infos sur xragencyai.com'",
    instaCaption: `Automatiser 80% des tâches répétitives de son entreprise, c'est possible dès aujourd'hui ⚡\n\nOn déploie des agents IA connectés directement à vos bases de données, CRM et réseaux pour qualifier et convertir vos prospects en continu.\n\nDécouvrez nos architectures sur xragencyai.com 🔥\n\n#ia #agentsia #automation #crm #businessonline #entrepreneuriat #productivite`,
    facebookPost: `Comment les entreprises modernes automatisent leurs opérations avec des agents IA sur-mesure.\n\nDe la qualification automatique de leads au support client autonome 24/7, découvrez nos études de cas et solutions sur https://xragencyai.com`,
  },
  {
    theme: "Sites Web Immersifs & 3D Temps Réel",
    tiktokHook: "Les sites web en 2026 ressemblent à ça, et votre site actuel a pris 10 ans d'un coup.",
    tiktokScript: "Plan 1 (0-3s) : Scroll ultra-fluide avec interaction 3D dynamique.\nPlan 2 (3-9s) : Transitions cinématiques et vitesse de chargement instantanée.\nPlan 3 (9-15s) : 'Ton site convertit ou il fait fuir tes visiteurs ? Rendez-vous sur xragencyai.com pour un audit gratuit.'",
    instaCaption: `Pourquoi se contenter d'un template classique quand votre marque peut offrir une expérience visuelle digne d'un film ? 🎬✨\n\nFluidité 120 FPS, 3D interactive, temps de chargement éclair.\n\nExplorez nos réalisations sur xragencyai.com\n\n#webgl #threejs #uxdesign #webdesigninspiration #creativecoding #luxurybrand`,
    facebookPost: `L'immersion visuelle au service de votre taux de conversion.\n\nDécouvrez comment nous concevons des plateformes web immersives alliant performance technique extrême et design cinématique.\n\nVisitez https://xragencyai.com`,
  }
];

// Outils MCP disponibles
const TOOLS = [
  {
    name: "generate_viral_campaign",
    description: "Génère un lot complet de posts viraux optimisés pour Facebook, Instagram et TikTok avec hooks de 3s, scripts vidéo, légendes et CTAs pour xragencyai.com.",
    inputSchema: {
      type: "object",
      properties: {
        theme_index: {
          type: "number",
          description: "Index du thème (0: Devis IA, 1: Agents IA, 2: 3D Immersif). Optionnel.",
        }
      }
    }
  },
  {
    name: "get_content_calendar",
    description: "Récupère le calendrier des publications en attente et l'historique des posts programmés pour Facebook, Instagram et TikTok.",
    inputSchema: {
      type: "object",
      properties: {}
    }
  },
  {
    name: "schedule_or_publish_post",
    description: "Programme ou publie un post pour Facebook, Instagram ou TikTok.",
    inputSchema: {
      type: "object",
      properties: {
        platform: {
          type: "string",
          enum: ["facebook", "instagram", "tiktok", "all"],
          description: "Plateforme cible"
        },
        caption: {
          type: "string",
          description: "Légende / texte du post"
        },
        hook: {
          type: "string",
          description: "Hook TikTok / Reel vidéo de 3 secondes"
        },
        status: {
          type: "string",
          enum: ["draft", "scheduled", "published"],
          description: "Statut du post"
        }
      },
      required: ["platform", "caption"]
    }
  },
  {
    name: "auto_pilot_publish",
    description: "Mode pilote automatique : génère et enregistre instantanément le prochain lot de publications optimisé pour Facebook, Instagram et TikTok.",
    inputSchema: {
      type: "object",
      properties: {}
    }
  }
];

// Gestion des requêtes JSON-RPC
function handleRequest(request) {
  const { id, method, params } = request;

  if (method === "initialize") {
    return {
      jsonrpc: "2.0",
      id,
      result: {
        protocolVersion: "2024-11-05",
        capabilities: {
          tools: {}
        },
        serverInfo: {
          name: "xragency-social-mcp",
          version: "1.0.0"
        }
      }
    };
  }

  if (method === "notifications/initialized") {
    return null;
  }

  if (method === "tools/list") {
    return {
      jsonrpc: "2.0",
      id,
      result: {
        tools: TOOLS
      }
    };
  }

  if (method === "tools/call") {
    const { name, arguments: args } = params;

    if (name === "generate_viral_campaign") {
      const idx = (args?.theme_index !== undefined && CONTENT_TEMPLATES[args.theme_index]) 
        ? args.theme_index 
        : Math.floor(Math.random() * CONTENT_TEMPLATES.length);
      const template = CONTENT_TEMPLATES[idx];

      return {
        jsonrpc: "2.0",
        id,
        result: {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                theme: template.theme,
                target_url: "https://xragencyai.com",
                tiktok: {
                  hook_3s: template.tiktokHook,
                  storyboard_script: template.tiktokScript
                },
                instagram: {
                  caption: template.instaCaption
                },
                facebook: {
                  post: template.facebookPost
                }
              }, null, 2)
            }
          ]
        }
      };
    }

    if (name === "get_content_calendar") {
      const cal = getCalendar();
      return {
        jsonrpc: "2.0",
        id,
        result: {
          content: [
            {
              type: "text",
              text: JSON.stringify({ total_posts: cal.length, calendar: cal }, null, 2)
            }
          ]
        }
      };
    }

    if (name === "schedule_or_publish_post") {
      const cal = getCalendar();
      const newPost = {
        id: "post_" + Date.now(),
        created_at: new Date().toISOString(),
        platform: args.platform,
        caption: args.caption,
        hook: args.hook || null,
        status: args.status || "scheduled",
        target_site: "https://xragencyai.com"
      };
      cal.push(newPost);
      saveCalendar(cal);

      return {
        jsonrpc: "2.0",
        id,
        result: {
          content: [
            {
              type: "text",
              text: `✅ Post enregistré avec succès dans le calendrier pour [${args.platform.toUpperCase()}]. ID: ${newPost.id}`
            }
          ]
        }
      };
    }

    if (name === "auto_pilot_publish") {
      const cal = getCalendar();
      const generated = [];

      CONTENT_TEMPLATES.forEach((tpl, i) => {
        const item = {
          id: `auto_${Date.now()}_${i}`,
          created_at: new Date().toISOString(),
          theme: tpl.theme,
          status: "ready_to_publish",
          tiktok: {
            hook: tpl.tiktokHook,
            script: tpl.tiktokScript
          },
          instagram: {
            caption: tpl.instaCaption
          },
          facebook: {
            post: tpl.facebookPost
          },
          target_site: "https://xragencyai.com"
        };
        cal.push(item);
        generated.push(item);
      });

      saveCalendar(cal);

      return {
        jsonrpc: "2.0",
        id,
        result: {
          content: [
            {
              type: "text",
              text: `🚀 Mode Pilote Automatique activé : ${generated.length} publications complètes (Facebook + Instagram + TikTok) créées et prêtes à être diffusées pour xragencyai.com !`
            }
          ]
        }
      };
    }

    return {
      jsonrpc: "2.0",
      id,
      error: {
        code: -32601,
        message: `Outil inconnu : ${name}`
      }
    };
  }

  return {
    jsonrpc: "2.0",
    id,
    error: {
      code: -32601,
      message: `Méthode non gérée : ${method}`
    }
  };
}

// Interface STDIO pour client MCP
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  if (!line.trim()) return;
  try {
    const request = JSON.parse(line);
    const response = handleRequest(request);
    if (response) {
      process.stdout.write(JSON.stringify(response) + '\n');
    }
  } catch (err) {
    const errorResponse = {
      jsonrpc: "2.0",
      id: null,
      error: {
        code: -32700,
        message: "Parse error: " + err.message
      }
    };
    process.stdout.write(JSON.stringify(errorResponse) + '\n');
  }
});
