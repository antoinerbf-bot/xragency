import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Mic,
  MicOff,
  Terminal,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Sparkles,
  MapPin,
  Calendar,
  Instagram,
  Users,
  Volume2,
  VolumeX,
  ChevronUp,
  ChevronDown,
  Lock,
  Cpu,
  Radio,
  Copy,
  Check,
  Send,
} from "lucide-react";
import { XR_ADVISORS } from "../../lib/xr-advisors";
import {
  INITIAL_SUPABASE_PROSPECTS,
  isLeadInactive48h,
  generateLovableArchitecturePrompt,
  playXpChime,
} from "../../lib/rpg-engine";
import type { Prospect } from "../../lib/saas/types";

export interface JarvisLogEntry {
  id: string;
  timestamp: string;
  level: "SYSTEM" | "VOICE" | "CRM" | "AUTONOMOUS" | "SECURITY";
  message: string;
}

export interface PendingChefAction {
  id: string;
  category:
    | "EXTERNAL_WHATSAPP"
    | "AD_SPEND"
    | "META_PUBLISH"
    | "DATA_DELETION";
  title: string;
  target: string;
  impact: string;
  payloadPreview: string;
  advisorName?: string;
}

interface JarvisCommandHUDProps {
  prospects?: Prospect[];
  onSelectProspect?: (prospect: Prospect) => void;
  onGenerateLovable?: (prospect: Prospect) => void;
  defaultExpanded?: boolean;
}

export function JarvisCommandHUD({
  prospects = INITIAL_SUPABASE_PROSPECTS,
  onSelectProspect,
  onGenerateLovable,
  defaultExpanded = false,
}: JarvisCommandHUDProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [activeModule, setActiveModule] = useState<
    "CONSOLE" | "MAPS_RADAR" | "META_STUDIO" | "IPHONE_SYNC"
  >("CONSOLE");
  const [vadListening, setVadListening] = useState(false);
  const [wakeWordDetected, setWakeWordDetected] = useState(false);
  const [voiceMuted, setVoiceMuted] = useState(false);
  const [jarvisReply, setJarvisReply] = useState(
    "À vos ordres, Chef. Tous les systèmes XR Agency sont nominaux : 2 leads prioritaires > 48h détectés dans le pipeline.",
  );
  const [commandInput, setCommandInput] = useState("");
  const [copiedNote, setCopiedNote] = useState(false);

  const [logs, setLogs] = useState<JarvisLogEntry[]>([
    {
      id: "log-1",
      timestamp: "09:00:02",
      level: "SYSTEM",
      message:
        "JARVIS Kernel v4.8 initialisé — Mode VAD longue portée (Gain +14dB / 2-3m) prêt.",
    },
    {
      id: "log-2",
      timestamp: "09:00:05",
      level: "CRM",
      message:
        "Scan Supabase 'prospects' terminé : 2 alertes SLA > 48h identifiées (Clinique Esthétique Vendôme, Groupe Immobilier Haussmann).",
    },
    {
      id: "log-3",
      timestamp: "09:00:09",
      level: "AUTONOMOUS",
      message:
        "Brouillons Lovable pré-compilés en arrière-plan pour Romain & Hugo (100% autonome).",
    },
    {
      id: "log-4",
      timestamp: "09:00:12",
      level: "SECURITY",
      message:
        "Protocole Gatekeeper actif : 3 actions externes en attente de validation explicite du Chef.",
    },
  ]);

  const [pendingActions, setPendingActions] = useState<PendingChefAction[]>([
    {
      id: "act-whatsapp-1",
      category: "EXTERNAL_WHATSAPP",
      title: "Envoi Relance WhatsApp SLA > 48h",
      target: "Dr. Laurent Moreau — Clinique Esthétique Vendôme (+33 6 14 28 99 10)",
      impact: "Envoi externe WhatsApp Business API au nom de Romain",
      payloadPreview:
        "Bonjour Dr. Moreau, c'est Romain chez XR Agency. Notre audit révèle 18 points critiques de conversion mobile. On bloque 10 min aujourd'hui ?",
      advisorName: "Romain",
    },
    {
      id: "act-meta-2",
      category: "META_PUBLISH",
      title: "Publication Instagram & Facebook Reels + Carrousel",
      target: "@xragency.official — Étude de cas +310% Appels Maps",
      impact: "Publication publique immédiate sur Meta Graph API",
      payloadPreview:
        "Comment ce groupe de restauration a capté +310% d'appels locaux en 45 jours grâce au Pack Domination Maps + Plaques NFC...",
      advisorName: "Edgar",
    },
    {
      id: "act-ads-3",
      category: "AD_SPEND",
      title: "Allocation Budget Meta Ads Retargeting",
      target: "Campagne Closers & Dirigeants PME (Île-de-France / Suisse)",
      impact: "Engagement financier : 450 € HT / jour",
      payloadPreview:
        "Audience Lookalike 1% Dirigeants PME + Retargeting visiteurs /refonte-site-internet & /services/maps.",
      advisorName: "Martin",
    },
  ]);

  const [selectedActionModal, setSelectedActionModal] =
    useState<PendingChefAction | null>(null);

  // Maps autonomous prospecting state
  const [mapsQuery, setMapsQuery] = useState("Cliniques esthétiques & Cabinets dentaires Paris 8");
  const [mapsScanning, setMapsScanning] = useState(false);
  const [mapsLeads, setMapsLeads] = useState([
    {
      name: "Maison Lutèce Dermatologie",
      rating: "4.1 ★ (34 avis)",
      gap: "Hors Top 3 Pack Local — Manque à gagner estimé 6 400 €/mois",
      assignedTo: "Martin",
      draftReady: true,
    },
    {
      name: "Cabinet Dentaire Madeleine Champs-Élysées",
      rating: "4.3 ★ (52 avis)",
      gap: "LCP Mobile 5.2s + Zéro plaque NFC — Perte estimée 8 900 €/mois",
      assignedTo: "Romain",
      draftReady: true,
    },
    {
      name: "Institut Haussmann Laser",
      rating: "3.9 ★ (19 avis)",
      gap: "Fiche GMB non optimisée — Perte estimée 5 200 €/mois",
      assignedTo: "Martin",
      draftReady: true,
    },
  ]);

  // Canvas soundwave animation ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<any>(null);

  const appendLog = useCallback(
    (level: JarvisLogEntry["level"], message: string) => {
      const now = new Date();
      const timestamp = now.toTimeString().slice(0, 8);
      setLogs((prev) => [
        {
          id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          timestamp,
          level,
          message,
        },
        ...prev.slice(0, 24),
      ]);
    },
    [],
  );

  const speakToChef = useCallback(
    (text: string) => {
      setJarvisReply(text);
      if (voiceMuted || typeof window === "undefined" || !("speechSynthesis" in window)) {
        return;
      }
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "fr-FR";
        utterance.rate = 1.05;
        utterance.pitch = 0.94;
        window.speechSynthesis.speak(utterance);
      } catch {
        // Ignore speech synthesis errors on restricted browsers
      }
    },
    [voiceMuted],
  );

  const processJarvisCommand = useCallback(
    (rawCommand: string) => {
      const cmd = rawCommand.toLowerCase().trim();
      appendLog("VOICE", `Commande reçue : "${rawCommand}"`);

      const inactiveCount = prospects.filter((p) =>
        isLeadInactive48h(p.updated_at, p.status),
      ).length;

      if (cmd.includes("statut") || cmd.includes("rapport") || cmd.includes("brief")) {
        const reply = `Chef, le pipeline compte ${prospects.length} dossiers actifs dont ${inactiveCount} en alerte rouge 48 heures. Le MRR sécurisé par Julie atteint 18 400 euros ce mois-ci.`;
        speakToChef(reply);
        appendLog("CRM", reply);
      } else if (cmd.includes("lovable") || cmd.includes("maquette")) {
        const target = prospects[0];
        if (target && onGenerateLovable) {
          onGenerateLovable(target);
        }
        const reply = `Bien reçu Chef. J'ai généré en autonomie le prompt d'architecture Lovable pour ${target?.business_name || "le prospect prioritaire"} et l'ai copié dans votre presse-papier.`;
        speakToChef(reply);
        appendLog("AUTONOMOUS", reply);
      } else if (cmd.includes("maps") || cmd.includes("prospection") || cmd.includes("scan")) {
        setActiveModule("MAPS_RADAR");
        const reply = `Chef, j'ai scanné Google Maps sur votre secteur cible : 3 établissements à fort potentiel sont hors du Top 3 local. Les brouillons d'audit sont prêts pour Martin.`;
        speakToChef(reply);
        appendLog("AUTONOMOUS", reply);
      } else if (cmd.includes("meta") || cmd.includes("instagram") || cmd.includes("post")) {
        setActiveModule("META_STUDIO");
        const reply = `Chef, le carrousel Instagram et la campagne Meta sont prêts en brouillon. Conformément au protocole de sécurité, j'attends votre validation explicite avant publication.`;
        speakToChef(reply);
        appendLog("SECURITY", reply);
      } else if (cmd.includes("agenda") || cmd.includes("iphone") || cmd.includes("note")) {
        setActiveModule("IPHONE_SYNC");
        const reply = `Chef, votre synchronisation iPhone iCloud et votre fichier agenda ICS sont prêts avec vos 3 créneaux de closing prioritaires.`;
        speakToChef(reply);
        appendLog("SYSTEM", reply);
      } else {
        const reply = `À vos ordres, Chef. J'ai préparé l'analyse dans le hub de commande et mis en file d'attente les actions externes pour votre validation.`;
        speakToChef(reply);
        appendLog("AUTONOMOUS", reply);
      }
    },
    [appendLog, onGenerateLovable, prospects, speakToChef],
  );

  // Toggle microphone + Web Audio VAD gain boost (2-3m distance sensitivity) + SpeechRecognition ("Hey Jarvis")
  const toggleVadMicrophone = async () => {
    if (vadListening) {
      setVadListening(false);
      setWakeWordDetected(false);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((t) => t.stop());
        mediaStreamRef.current = null;
      }
      appendLog("SYSTEM", "Micro VAD longue portée désactivé par le Chef.");
      return;
    }

    setVadListening(true);
    setExpanded(true);
    playXpChime();
    appendLog(
      "SYSTEM",
      "Micro VAD longue portée activé (Gain +14dB — Portée 2 à 3 mètres). En écoute de 'Hey Jarvis'...",
    );
    speakToChef("Écoute vocale longue portée activée, Chef. Dites Hey Jarvis suivi de votre ordre.");

    if (typeof window !== "undefined") {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true,
            },
          });
          mediaStreamRef.current = stream;
          const AudioCtx =
            window.AudioContext || (window as any).webkitAudioContext;
          const ctx = new AudioCtx();
          audioCtxRef.current = ctx;
          const source = ctx.createMediaStreamSource(stream);
          // Gain node boosted for 2-3 meters distance sensitivity
          const gainNode = ctx.createGain();
          gainNode.gain.value = 3.2;
          const analyser = ctx.createAnalyser();
          analyser.fftSize = 128;
          source.connect(gainNode);
          gainNode.connect(analyser);
          analyserRef.current = analyser;
        }
      } catch {
        appendLog(
          "SYSTEM",
          "Oscillateur neuronal simulé actif (accès micro matériel restreint ou non requis).",
        );
      }

      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.lang = "fr-FR";
          recognition.continuous = true;
          recognition.interimResults = false;
          recognition.onresult = (event: any) => {
            const transcript =
              event.results[event.results.length - 1][0].transcript || "";
            const lower = transcript.toLowerCase();
            if (
              lower.includes("jarvis") ||
              lower.includes("hey jarvis") ||
              wakeWordDetected
            ) {
              setWakeWordDetected(true);
              const cleaned = transcript
                .replace(/hey jarvis/gi, "")
                .replace(/jarvis/gi, "")
                .trim();
              processJarvisCommand(cleaned || "Rapport de statut");
            }
          };
          recognition.start();
          recognitionRef.current = recognition;
        } catch {
          // SpeechRecognition fallback via quick voice buttons
        }
      }
    }
  };

  // Oscillating reactive soundwave canvas (60fps)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let phase = 0;
    const dataArray = new Uint8Array(64);

    const renderWave = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      let energy = vadListening ? 0.55 : 0.18;
      if (analyserRef.current && vadListening) {
        analyserRef.current.getByteFrequencyData(dataArray);
        const avg =
          dataArray.reduce((acc, v) => acc + v, 0) / (dataArray.length || 1);
        energy = Math.max(0.3, Math.min(1.4, avg / 95));
      }

      // Draw dual harmonic waves: Champagne Gold (#D4AF37) & Emerald (#10B981)
      const waves = [
        { color: "#D4AF37", freq: 0.035, amp: h * 0.34 * energy, speed: 0.09 },
        { color: "#10B981", freq: 0.055, amp: h * 0.25 * energy, speed: -0.07 },
        {
          color: "rgba(212, 175, 55, 0.35)",
          freq: 0.02,
          amp: h * 0.18 * energy,
          speed: 0.05,
        },
      ];

      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 2;
        for (let x = 0; x < w; x++) {
          const envelope = Math.sin((x / w) * Math.PI);
          const y =
            h / 2 +
            Math.sin(x * wave.freq + phase * (wave.speed * 20)) *
              wave.amp *
              envelope;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      phase += 0.06;
      animId = requestAnimationFrame(renderWave);
    };

    animId = requestAnimationFrame(renderWave);
    return () => cancelAnimationFrame(animId);
  }, [vadListening]);

  const handleApproveAction = (action: PendingChefAction) => {
    playXpChime();
    setPendingActions((prev) => prev.filter((a) => a.id !== action.id));
    setSelectedActionModal(null);
    const msg = `Ordre exécuté, Chef : "${action.title}" a été validé et transmis.`;
    appendLog("SECURITY", msg);
    speakToChef(msg);
  };

  const handleRejectAction = (action: PendingChefAction) => {
    setPendingActions((prev) => prev.filter((a) => a.id !== action.id));
    setSelectedActionModal(null);
    const msg = `Action annulée, Chef : "${action.title}" a été bloquée et archivée.`;
    appendLog("SECURITY", msg);
    speakToChef(msg);
  };

  const triggerMapsScan = () => {
    setMapsScanning(true);
    appendLog("AUTONOMOUS", `Scan Google Maps lancé sur "${mapsQuery}"...`);
    setTimeout(() => {
      setMapsScanning(false);
      setMapsLeads((prev) => [
        {
          name: `Centre Expert — ${mapsQuery.slice(0, 26)}`,
          rating: "4.0 ★ (28 avis)",
          gap: "Position #7 Google Maps — Perte estimée 7 400 €/mois",
          assignedTo: "Martin",
          draftReady: true,
        },
        ...prev,
      ]);
      const msg = `Scan terminé, Chef. 1 nouvelle cible à haute valeur ajoutée détectée et attribuée à Martin en brouillon.`;
      appendLog("AUTONOMOUS", msg);
      speakToChef(msg);
    }, 650);
  };

  const downloadChefIcsCalendar = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//XR Agency//JARVIS Command Center//FR",
      "BEGIN:VEVENT",
      "SUMMARY:Closing Prioritaire — Clinique Esthétique Vendôme (Romain)",
      "DESCRIPTION:Validation Audit 5 Piliers + Devis Refonte Flagship 4 900€",
      "DTSTART:20261116T093000Z",
      "DTEND:20261116T101500Z",
      "END:VEVENT",
      "BEGIN:VEVENT",
      "SUMMARY:Revue Direction MRR & Leaderboard RPG — XR Agency",
      "DESCRIPTION:Point hebdomadaire avec Martin, Romain, Hugo, Julie, Christelle, Damien et Edgar",
      "DTSTART:20261116T140000Z",
      "DTEND:20261116T150000Z",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "xr-agency-jarvis-chef-agenda.ics";
    a.click();
    URL.revokeObjectURL(url);
    appendLog("SYSTEM", "Fichier Agenda iPhone (.ics) généré et téléchargé pour le Chef.");
  };

  const copyAppleNotesBrief = () => {
    const text = `📋 BRIEF OPÉRATIONNEL DU CHEF — XR AGENCY\n• Alertes 48h : Clinique Esthétique Vendôme (Romain), Groupe Immobilier Haussmann (Hugo)\n• MRR WebCare (Julie) : 18 400 €/mois\n• Actions en attente Gatekeeper : ${pendingActions.length}\n• Prochain RDV : Demain 09h30 (Closing Flagship 4 900 €)`;
    navigator.clipboard?.writeText(text);
    setCopiedNote(true);
    setTimeout(() => setCopiedNote(false), 2000);
    appendLog("SYSTEM", "Synthèse Apple Notes copiée dans le presse-papier universel iCloud.");
  };

  return (
    <>
      {/* FLOATING NON-INTRUSIVE HUD COMMAND BAR + EXPANDABLE PANEL */}
      <div className="fixed bottom-5 right-5 z-50 max-w-[96vw] w-[460px] font-sans">
        <div
          className="rounded-2xl border border-[#D4AF37]/40 bg-[#080B10]/95 backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.85)] overflow-hidden text-[#F8FAFC]"
          data-testid="jarvis-command-hud"
        >
          {/* Top HUD Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0F172A] border-b border-white/10">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleVadMicrophone}
                data-testid="jarvis-vad-toggle"
                className={`relative flex items-center justify-center w-10 h-10 rounded-xl border transition-all ${
                  vadListening
                    ? "bg-[#10B981]/20 border-[#10B981] text-[#10B981] shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                    : "bg-[#080B10] border-[#D4AF37]/50 text-[#D4AF37] hover:border-[#D4AF37]"
                }`}
                title="Activer / Désactiver la détection vocale 'Hey Jarvis' (VAD 2-3m)"
              >
                {vadListening ? (
                  <Mic className="w-5 h-5 animate-pulse" />
                ) : (
                  <MicOff className="w-5 h-5" />
                )}
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37] font-bold">
                    J.A.R.V.I.S. HUD
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                    <Radio className="w-2.5 h-2.5 animate-pulse" />
                    {vadListening ? "VAD 3M ACTIF" : "VEILLE ACTIVE"}
                  </span>
                  {pendingActions.length > 0 && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      {pendingActions.length} VALIDATIONS CHEF
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400">
                  Wake-word : <strong className="text-white">"Hey Jarvis"</strong> · Adresse exclusive :{" "}
                  <strong className="text-[#D4AF37]">"Chef"</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setVoiceMuted((m) => !m)}
                className="p-2 rounded-lg bg-[#080B10] border border-white/10 text-slate-300 hover:text-[#D4AF37]"
                title={voiceMuted ? "Réactiver la voix de synthèse" : "Couper la voix"}
              >
                {voiceMuted ? (
                  <VolumeX className="w-4 h-4 text-rose-400" />
                ) : (
                  <Volume2 className="w-4 h-4 text-[#D4AF37]" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setExpanded((e) => !e)}
                data-testid="jarvis-expand-toggle"
                className="p-2 rounded-lg bg-[#080B10] border border-white/10 text-slate-300 hover:text-white"
                title={expanded ? "Réduire le HUD" : "Déployer le Command Center"}
              >
                {expanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronUp className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Oscillating Soundwave & Concise Voice Response (Always visible) */}
          <div className="px-4 py-2.5 bg-[#080B10] border-b border-white/10 flex items-center gap-3">
            <canvas
              ref={canvasRef}
              width={110}
              height={34}
              className="shrink-0 rounded-lg bg-[#0F172A] border border-white/5"
            />
            <p
              className="text-xs text-slate-200 leading-snug line-clamp-2"
              data-testid="jarvis-voice-reply"
            >
              <span className="text-[#D4AF37] font-semibold mr-1">JARVIS :</span>
              "{jarvisReply}"
            </p>
          </div>

          {/* EXPANDED COMMAND CENTER */}
          {expanded && (
            <div className="p-4 space-y-4 max-h-[72vh] overflow-y-auto">
              {/* Quick Voice / Text Command Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!commandInput.trim()) return;
                  processJarvisCommand(commandInput);
                  setCommandInput("");
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  placeholder='Ex: "Hey Jarvis, rapport statut CRM" ou "Génère maquette Lovable"...'
                  className="flex-1 px-3 py-2 rounded-xl bg-[#0F172A] border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded-xl bg-[#D4AF37] text-[#080B10] font-bold text-xs hover:bg-[#e3be42] transition flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  Ordre
                </button>
              </form>

              {/* Quick Preset Voice Simulations */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: "Hey Jarvis, statut CRM", cmd: "Hey Jarvis, rapport statut CRM" },
                  { label: "Générer prompt Lovable", cmd: "Hey Jarvis, génère la maquette Lovable" },
                  { label: "Scan Google Maps", cmd: "Hey Jarvis, lance la prospection Maps" },
                  { label: "Sync iPhone & Agenda", cmd: "Hey Jarvis, synchronise mon agenda iPhone" },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => processJarvisCommand(preset.cmd)}
                    className="px-2.5 py-1 rounded-lg bg-[#0F172A] hover:bg-white/10 border border-white/10 text-[11px] text-slate-300 hover:text-[#D4AF37] transition"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {/* Navigation Tabs inside HUD */}
              <div className="grid grid-cols-4 gap-1.5 p-1 rounded-xl bg-[#0F172A] border border-white/10 text-[11px]">
                <button
                  type="button"
                  onClick={() => setActiveModule("CONSOLE")}
                  className={`py-1.5 px-2 rounded-lg font-medium flex items-center justify-center gap-1 transition ${
                    activeModule === "CONSOLE"
                      ? "bg-[#D4AF37] text-[#080B10] font-bold"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  Logs & Sécu
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModule("MAPS_RADAR")}
                  className={`py-1.5 px-2 rounded-lg font-medium flex items-center justify-center gap-1 transition ${
                    activeModule === "MAPS_RADAR"
                      ? "bg-[#D4AF37] text-[#080B10] font-bold"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Radar Maps
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModule("META_STUDIO")}
                  className={`py-1.5 px-2 rounded-lg font-medium flex items-center justify-center gap-1 transition ${
                    activeModule === "META_STUDIO"
                      ? "bg-[#D4AF37] text-[#080B10] font-bold"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <Instagram className="w-3.5 h-3.5" />
                  Meta Studio
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModule("IPHONE_SYNC")}
                  className={`py-1.5 px-2 rounded-lg font-medium flex items-center justify-center gap-1 transition ${
                    activeModule === "IPHONE_SYNC"
                      ? "bg-[#D4AF37] text-[#080B10] font-bold"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  iPhone / ICS
                </button>
              </div>

              {/* MODULE 1: CONSOLE LOGS & GATEKEEPER SECURITY QUEUE */}
              {activeModule === "CONSOLE" && (
                <div className="space-y-3">
                  {/* Gatekeeper Security Doctrine Banner */}
                  <div className="p-3 rounded-xl bg-[#0F172A] border border-[#D4AF37]/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5" />
                        Protocole de Sécurité des Initiatives (Gatekeeper)
                      </span>
                      <span className="text-[10px] font-mono text-[#10B981]">
                        100% Autonome en brouillon
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Jarvis audite, cherche et prépare les maquettes Lovable en autonomie.{" "}
                      <strong className="text-white">
                        Validation explicite du Chef obligatoire
                      </strong>{" "}
                      avant tout envoi externe, dépense publicitaire, publication Meta ou suppression.
                    </p>

                    {pendingActions.length === 0 ? (
                      <div className="text-xs text-[#10B981] flex items-center gap-1.5 pt-1">
                        <CheckCircle2 className="w-4 h-4" />
                        Aucune action externe en attente d'approbation, Chef.
                      </div>
                    ) : (
                      <div className="space-y-2 pt-1">
                        {pendingActions.map((act) => (
                          <div
                            key={act.id}
                            className="p-2.5 rounded-lg bg-[#080B10] border border-amber-500/30 flex items-center justify-between gap-2"
                          >
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-amber-500/20 text-amber-300">
                                  {act.category}
                                </span>
                                <span className="text-xs font-semibold text-white truncate">
                                  {act.title}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-400 truncate mt-0.5">
                                {act.target}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setSelectedActionModal(act)}
                              data-testid={`jarvis-review-action-${act.id}`}
                              className="shrink-0 px-2.5 py-1.5 rounded-lg bg-[#D4AF37] text-[#080B10] font-bold text-[11px] hover:bg-[#e3be42] transition"
                            >
                              Examiner
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Live Console Logs */}
                  <div className="rounded-xl bg-[#05070B] border border-white/10 p-3 font-mono text-[11px] space-y-1.5 max-h-44 overflow-y-auto">
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 pb-1 border-b border-white/5 flex justify-between">
                      <span>FLUX TÉLÉMÉTRIQUE EN DIRECT</span>
                      <span className="text-[#10B981]">● ONLINE</span>
                    </div>
                    {logs.map((entry) => (
                      <div key={entry.id} className="leading-relaxed">
                        <span className="text-slate-500">[{entry.timestamp}]</span>{" "}
                        <span
                          className={
                            entry.level === "SECURITY"
                              ? "text-amber-400 font-bold"
                              : entry.level === "CRM"
                                ? "text-[#10B981] font-bold"
                                : entry.level === "VOICE"
                                  ? "text-[#D4AF37] font-bold"
                                  : "text-sky-400"
                          }
                        >
                          [{entry.level}]
                        </span>{" "}
                        <span className="text-slate-300">{entry.message}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MODULE 2: GOOGLE MAPS AUTONOMOUS PROSPECTING RADAR */}
              {activeModule === "MAPS_RADAR" && (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={mapsQuery}
                      onChange={(e) => setMapsQuery(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl bg-[#0F172A] border border-white/15 text-xs text-white"
                      placeholder="Secteur & Ville à scanner sur Google Maps..."
                    />
                    <button
                      type="button"
                      onClick={triggerMapsScan}
                      disabled={mapsScanning}
                      className="px-3 py-2 rounded-xl bg-[#10B981] text-[#080B10] font-bold text-xs hover:bg-[#14d496] transition"
                    >
                      {mapsScanning ? "Scan IA..." : "Scanner Maps"}
                    </button>
                  </div>
                  <div className="space-y-2">
                    {mapsLeads.map((lead, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-[#0F172A] border border-white/10 space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">
                            {lead.name}
                          </span>
                          <span className="text-[11px] font-mono text-[#D4AF37]">
                            {lead.rating}
                          </span>
                        </div>
                        <p className="text-[11px] text-rose-400">{lead.gap}</p>
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[10px] text-slate-400">
                            Attribué en brouillon à :{" "}
                            <strong className="text-white">{lead.assignedTo}</strong>
                          </span>
                          <span className="text-[10px] font-mono text-[#10B981]">
                            ✓ Audit & Prompt Lovable prêts
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MODULE 3: META (INSTAGRAM / FACEBOOK) WATCH & SCHEDULER */}
              {activeModule === "META_STUDIO" && (
                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-[#0F172A] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">
                        Veille & Programmation Meta (Edgar)
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                        Brouillon Verrouillé
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      1. <strong>Reels Instagram (18h30)</strong> : Démonstration en direct du manque à gagner Google Maps + Plaque NFC en laiton brossé.
                    </p>
                    <p className="text-[11px] text-slate-300">
                      2. <strong>Carrousel LinkedIn & Facebook (Demain 08h45)</strong> : Avant / Après refonte sous 7 jours (Score Lighthouse 99/100).
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        const metaAct = pendingActions.find(
                          (a) => a.category === "META_PUBLISH",
                        );
                        if (metaAct) setSelectedActionModal(metaAct);
                      }}
                      className="w-full py-2 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-semibold hover:bg-[#D4AF37] hover:text-[#080B10] transition"
                    >
                      Ouvrir la modale d'approbation Meta du Chef
                    </button>
                  </div>
                </div>
              )}

              {/* MODULE 4: IPHONE / AGENDA ICS / NOTES SYNC */}
              {activeModule === "IPHONE_SYNC" && (
                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-[#0F172A] border border-white/10 space-y-2.5">
                    <div className="text-xs font-bold text-white">
                      Synchronisation Directe iPhone du Chef (Agenda & Notes)
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Exportez vos créneaux de closing prioritaires au format Apple Calendar (`.ics`) ou copiez le brief quotidien formaté pour Apple Notes.
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={downloadChefIcsCalendar}
                        className="py-2 px-3 rounded-xl bg-[#10B981] text-[#080B10] font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#14d496] transition"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        Exporter Agenda .ICS
                      </button>
                      <button
                        type="button"
                        onClick={copyAppleNotesBrief}
                        className="py-2 px-3 rounded-xl bg-[#080B10] border border-[#D4AF37]/50 text-[#D4AF37] font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#D4AF37] hover:text-[#080B10] transition"
                      >
                        {copiedNote ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Brief Copié !
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" /> Copier Apple Notes
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* MANDATORY CHEF APPROVAL MODAL (GATEKEEPER) */}
      {selectedActionModal && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          data-testid="jarvis-approval-modal"
        >
          <div className="max-w-lg w-full rounded-2xl bg-[#0F172A] border-2 border-[#D4AF37] p-6 text-white shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-6 h-6 text-[#D4AF37]" />
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37]">
                    AUTORISATION EXPLICITE DU CHEF REQUISE
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {selectedActionModal.title}
                  </h3>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40">
                {selectedActionModal.category}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-[#080B10] border border-white/10">
                <div className="text-slate-400">Cible :</div>
                <div className="font-semibold text-white mt-0.5">
                  {selectedActionModal.target}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#080B10] border border-white/10">
                <div className="text-slate-400">Impact Opérationnel :</div>
                <div className="font-semibold text-amber-300 mt-0.5">
                  {selectedActionModal.impact}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#080B10] border border-white/10">
                <div className="text-slate-400">
                  Contenu préparé en autonomie par Jarvis ({selectedActionModal.advisorName}) :
                </div>
                <p className="text-slate-200 italic mt-1 leading-relaxed">
                  "{selectedActionModal.payloadPreview}"
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedActionModal(null)}
                className="px-4 py-2 rounded-xl border border-white/15 text-xs text-slate-300 hover:text-white"
              >
                Différer
              </button>
              <button
                type="button"
                onClick={() => handleRejectAction(selectedActionModal)}
                className="px-4 py-2 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center gap-1.5 hover:bg-rose-500/30"
              >
                <XCircle className="w-4 h-4" />
                Refuser l'initiative
              </button>
              <button
                type="button"
                onClick={() => handleApproveAction(selectedActionModal)}
                data-testid="jarvis-confirm-approve-btn"
                className="px-5 py-2 rounded-xl bg-[#10B981] text-[#080B10] text-xs font-bold flex items-center gap-1.5 hover:bg-[#14d496] shadow-[0_0_25px_rgba(16,185,129,0.4)]"
              >
                <CheckCircle2 className="w-4 h-4" />
                Valider & Exécuter, Chef
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default JarvisCommandHUD;
