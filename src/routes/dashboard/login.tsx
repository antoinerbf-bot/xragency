// ── Login page — standalone, no sidebar ──

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useLang } from "../../lib/i18n";
import { UI } from "../../lib/copy";
import { useState } from "react";
import { signIn, signUp } from "../../lib/saas/auth";
import { isSupabaseConfigured } from "../../lib/saas/supabase";

export const Route = createFileRoute("/dashboard/login")({
  component: LoginPage,
});

function LoginPage() {
  const { lang } = useLang();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const result = await signUp(email, password, fullName);
        if (result.error) throw new Error(result.error.message);
      } else {
        const result = await signIn(email, password);
        if (result.error) throw new Error(result.error.message);
      }
      navigate({ to: "/dashboard" });
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  if (!isSupabaseConfigured()) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <h1 className="font-display text-2xl font-bold text-foreground">Configuration requise</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Configurez les variables d'environnement Supabase (<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">VITE_SUPABASE_URL</code> et <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">VITE_SUPABASE_ANON_KEY</code>) pour activer l'authentification.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
            XR
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            {UI.dashWelcomeBack[lang]}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {UI.dashLoginSubtitle[lang]}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="text-sm font-medium text-foreground">Nom complet</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          )}
          <div>
            <label className="text-sm font-medium text-foreground">{UI.dashEmail[lang]}</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">{UI.dashPassword[lang]}</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? "..." : isSignUp ? UI.dashSignUp[lang] : UI.dashLogin[lang]}
          </button>
        </form>

        {/* Toggle sign up / sign in */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {isSignUp ? "Déjà un compte ?" : UI.dashNoAccount[lang]}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="font-medium text-primary hover:underline"
          >
            {isSignUp ? UI.dashLogin[lang] : UI.dashSignUp[lang]}
          </button>
        </p>

        {/* Back link */}
        <div className="mt-4 text-center">
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
