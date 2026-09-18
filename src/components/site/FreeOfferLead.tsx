import { useState } from "react";
import { ArrowRight, Check, FileImage, Globe, Upload, X } from "lucide-react";

type Mode = "audit" | "mockup";

export function FreeOfferLead() {
  const [mode, setMode] = useState<Mode>("mockup");
  const [files, setFiles] = useState<File[]>([]);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    setFiles((current) => [...current, ...Array.from(incoming)].slice(0, 8));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    setMessage("");
    const form = new FormData(event.currentTarget);
    const payloadFiles = await Promise.all(
      files.map(async (file) => ({
        name: file.name,
        type: file.type,
        content: (await file.arrayBuffer()).byteLength
          ? btoa(String.fromCharCode(...new Uint8Array(await file.arrayBuffer())))
          : "",
      })),
    );

    try {
      const response = await fetch("/api/send-free-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          name: form.get("name"),
          company: form.get("company"),
          email: form.get("email"),
          whatsapp: form.get("whatsapp"),
          website: form.get("website"),
          brief: form.get("brief"),
          references: form.get("references"),
          files: payloadFiles,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Envoi impossible.");
      setSent(true);
      setMessage(mode === "mockup" ? "Votre demande de maquette est bien reçue." : "Votre demande d’audit est bien reçue.");
      (event.target as HTMLFormElement).reset();
      setFiles([]);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Une erreur est survenue.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="free-offer" className="scroll-mt-20 border-y border-border/50 bg-card/[0.35] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
        <div className="max-w-3xl">
          <div className="label-mono text-[9px] uppercase tracking-[0.22em] text-primary">02 · Premier contact sans engagement</div>
          <h2 className="display-serif mt-3 text-4xl leading-[0.95] tracking-tight sm:text-6xl">Commencez gratuitement.</h2>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Pas besoin de passer par XR Intelligence. Choisissez directement ce dont vous avez besoin et envoyez-nous les éléments nécessaires pour que notre équipe puisse travailler.
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="grid gap-3">
            <button type="button" onClick={() => { setMode("mockup"); setSent(false); }} className={`rounded-2xl border p-5 text-left transition ${mode === "mockup" ? "border-primary bg-primary/[0.06] shadow-lg" : "border-border bg-background hover:border-primary/40"}`}>
              <div className="flex items-center justify-between"><span className="label-mono text-[9px] uppercase tracking-[0.18em] text-primary">Maquette gratuite</span><FileImage className="h-4 w-4 text-primary" /></div>
              <div className="mt-2 text-lg font-medium">Une première direction créative · valeur 200 €</div>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">Envoyez votre site, logo, images et références. Nous avons tout le contexte nécessaire dès le départ.</p>
            </button>
            <button type="button" onClick={() => { setMode("audit"); setSent(false); }} className={`rounded-2xl border p-5 text-left transition ${mode === "audit" ? "border-primary bg-primary/[0.06] shadow-lg" : "border-border bg-background hover:border-primary/40"}`}>
              <div className="flex items-center justify-between"><span className="label-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Audit digital gratuit</span><Globe className="h-4 w-4 text-muted-foreground" /></div>
              <div className="mt-2 text-lg font-medium">Identifiez vos priorités avant d’investir</div>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">Nous analysons votre présence digitale et vous indiquons les leviers à travailler en priorité.</p>
            </button>
          </div>

          <form onSubmit={submit} className="rounded-3xl border border-border bg-background p-5 shadow-[0_25px_80px_-50px_rgba(0,0,0,.8)] sm:p-7">
            {sent ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/[0.08] text-primary"><Check className="h-5 w-5" /></div>
                <h3 className="mt-5 text-2xl font-medium">{message}</h3>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">Notre équipe dispose maintenant de votre dossier et des fichiers transmis.</p>
                <button type="button" onClick={() => setSent(false)} className="mt-6 text-[10px] uppercase tracking-[0.16em] text-primary">Nouvelle demande</button>
              </div>
            ) : (
              <>
                <div className="mb-6"><div className="text-lg font-medium">{mode === "mockup" ? "Préparez votre maquette" : "Préparez votre audit"}</div><div className="mt-1 text-xs text-muted-foreground">Les informations sont envoyées directement à notre équipe.</div></div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input required name="name" placeholder="Nom & prénom *" className="field" />
                  <input required name="company" placeholder="Entreprise *" className="field" />
                  <input required type="email" name="email" placeholder="Email professionnel *" className="field" />
                  <input required name="whatsapp" placeholder="WhatsApp / téléphone *" className="field" />
                  <input required type="url" name="website" placeholder="Site internet *" className="field sm:col-span-2" />
                  <textarea required name="brief" placeholder={mode === "mockup" ? "Que souhaitez-vous améliorer ? Objectifs, pages, offre..." : "Quels problèmes voulez-vous que nous analysions ?"} className="field min-h-24 resize-y sm:col-span-2" />
                  {mode === "mockup" && <textarea name="references" placeholder="Sites / univers visuels que vous aimez (liens ou références)" className="field min-h-20 resize-y sm:col-span-2" />}
                </div>

                {mode === "mockup" && (
                  <div className="mt-4 rounded-2xl border border-dashed border-border p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div><div className="text-sm font-medium">Logo, images & fichiers</div><div className="mt-1 text-[10px] text-muted-foreground">Jusqu’à 8 fichiers · PNG, JPG, SVG, PDF</div></div>
                      <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-3 py-2 text-[10px] uppercase tracking-wider hover:border-primary"><Upload className="h-3.5 w-3.5" /> Ajouter<input type="file" multiple accept=".png,.jpg,.jpeg,.svg,.pdf" className="hidden" onChange={(e) => addFiles(e.target.files)} /></label>
                    </div>
                    {files.length > 0 && <div className="mt-3 grid gap-1.5">{files.map((file) => <div key={file.name} className="flex items-center justify-between rounded-lg bg-card px-3 py-2 text-[10px]"><span className="truncate">{file.name}</span><button type="button" onClick={() => setFiles((current) => current.filter((x) => x !== file))}><X className="h-3 w-3 text-muted-foreground" /></button></div>)}</div>}
                  </div>
                )}

                {message && <div className="mt-4 rounded-xl border border-primary/25 bg-primary/[0.05] p-3 text-center text-[10px] text-muted-foreground">{message}</div>}
                <button disabled={sending} className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary-foreground transition hover:-translate-y-0.5 disabled:opacity-50">
                  {sending ? "Transmission du dossier…" : mode === "mockup" ? "Demander ma maquette gratuite" : "Demander mon audit gratuit"}
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
