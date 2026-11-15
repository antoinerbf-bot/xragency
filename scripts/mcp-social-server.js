#!/usr/bin/env node
/**
 * MCP Server 100% Autonome & Gratuit pour les Réseaux Sociaux de XR Agency (xragencyai.com)
 * Réseaux : Facebook, Instagram, TikTok
 * Protocole : Model Context Protocol (MCP) JSON-RPC 2.0 sur stdio
 */

import readline from 'readline';
import fs from 'fs';
import path from 'path';
import { generateFullCampaignBatch, CAMPAIGN_CATALOG } from './generate-social-posts.js';
import { processQueue } from './publish-social.js';

const CALENDAR_FILE = path.join(process.cwd(), 'social-calendar.json');

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

const TOOLS = [
  {
    name: "generate_viral_batch",
    description: "Génère un lot massif de publications optimisées (Facebook + Instagram + TikTok) avec hooks de 3s, scripts vidéo verticaux, carrousels et assets visuels SVG pour xragencyai.com.",
    inputSchema: {
      type: "object",
      properties: {
        count: {
          type: "number",
          description: "Nombre de campagnes à générer (ex: 5, 10, 30). Par défaut: 10."
        }
      }
    }
  },
  {
    name: "get_content_calendar",
    description: "Récupère l'état complet du calendrier de publication, les hooks TikTok, les textes et les liens vers les visuels.",
    inputSchema: {
      type: "object",
      properties: {}
    }
  },
  {
    name: "publish_pending_queue",
    description: "Déclenche la publication de toutes les publications en attente vers Facebook, Instagram et TikTok.",
    inputSchema: {
      type: "object",
      properties: {}
    }
  }
];

function handleRequest(request) {
  const { id, method, params } = request;

  if (method === "initialize") {
    return {
      jsonrpc: "2.0",
      id,
      result: {
        protocolVersion: "2024-11-05",
        capabilities: { tools: {} },
        serverInfo: {
          name: "xragency-social-mcp",
          version: "2.0.0"
        }
      }
    };
  }

  if (method === "notifications/initialized") return null;

  if (method === "tools/list") {
    return {
      jsonrpc: "2.0",
      id,
      result: { tools: TOOLS }
    };
  }

  if (method === "tools/call") {
    const { name, arguments: args } = params;

    if (name === "generate_viral_batch") {
      const count = args?.count || 10;
      const created = generateFullCampaignBatch(count);
      return {
        jsonrpc: "2.0",
        id,
        result: {
          content: [
            {
              type: "text",
              text: `🚀 ${created.length} campagnes multicanales (Facebook, Instagram, TikTok) créées avec succès avec leurs visuels SVG prêts pour xragencyai.com !`
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
              text: JSON.stringify({
                total_posts: cal.length,
                pending: cal.filter(p => p.status === 'ready_to_publish').length,
                published: cal.filter(p => p.status === 'published').length,
                items: cal.slice(-5)
              }, null, 2)
            }
          ]
        }
      };
    }

    if (name === "publish_pending_queue") {
      processQueue();
      return {
        jsonrpc: "2.0",
        id,
        result: {
          content: [
            {
              type: "text",
              text: "✅ File d'attente exécutée et synchronisée avec succès."
            }
          ]
        }
      };
    }

    return {
      jsonrpc: "2.0",
      id,
      error: { code: -32601, message: `Outil inconnu : ${name}` }
    };
  }

  return {
    jsonrpc: "2.0",
    id,
    error: { code: -32601, message: `Méthode non gérée : ${method}` }
  };
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  if (!line.trim()) return;
  try {
    const req = JSON.parse(line);
    const res = handleRequest(req);
    if (res) process.stdout.write(JSON.stringify(res) + '\n');
  } catch (err) {
    process.stdout.write(JSON.stringify({ jsonrpc: "2.0", id: null, error: { code: -32700, message: err.message } }) + '\n');
  }
});
