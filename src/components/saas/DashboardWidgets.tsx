// ── ScoreRing — circular score indicator ──

import { scoreLabel } from "../../lib/saas/types";

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
}

export function ScoreRing({ score, size = 120, strokeWidth = 8, showLabel = true }: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const { label, color } = scoreLabel(score);

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} className="-rotate-90">
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-border"
          strokeWidth={strokeWidth}
        />
        {/* Score ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          className={`${color} transition-all duration-1000 ease-out`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      {showLabel && (
        <div className="absolute flex flex-col items-center justify-center" style={{ width: size, height: size }}>
          <span className={`text-2xl font-bold ${color}`}>{score}</span>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
        </div>
      )}
    </div>
  );
}

// ── StatCard — dashboard metric card ──

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: { value: string; positive: boolean };
}

export function StatCard({ label, value, icon, trend }: StatCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="mt-2 text-2xl font-bold text-foreground">{value}</p>
        </div>
        <div className="rounded-lg bg-primary/10 p-2 text-primary">{icon}</div>
      </div>
      {trend && (
        <p className={`mt-2 text-xs font-medium ${trend.positive ? "text-emerald-500" : "text-red-500"}`}>
          {trend.positive ? "↑" : "↓"} {trend.value}
        </p>
      )}
    </div>
  );
}

// ── StatusBadge — colored status indicator ──

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  audited: "bg-purple-100 text-purple-700",
  contacted: "bg-amber-100 text-amber-700",
  qualified: "bg-emerald-100 text-emerald-700",
  client: "bg-green-100 text-green-800",
  pending: "bg-gray-100 text-gray-600",
  crawling: "bg-blue-100 text-blue-600",
  analyzing: "bg-indigo-100 text-indigo-600",
  completed: "bg-emerald-100 text-emerald-700",
  failed: "bg-red-100 text-red-700",
};

export function StatusBadge({ status }: { status: string }) {
  const colors = STATUS_COLORS[status] ?? "bg-gray-100 text-gray-600";
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colors}`}>
      {status}
    </span>
  );
}

// ── CategoryBar — horizontal bar for category scores ──

interface CategoryBarProps {
  label: string;
  score: number;
  maxScore?: number;
}

export function CategoryBar({ label, score, maxScore = 20 }: CategoryBarProps) {
  const pct = Math.round((score / maxScore) * 100);
  const barColor =
    pct >= 80 ? "bg-emerald-500" : pct >= 60 ? "bg-green-500" : pct >= 40 ? "bg-amber-500" : "bg-red-500";

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold text-foreground">{score}/{maxScore}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-border">
        <div className={`h-full rounded-full ${barColor} transition-all duration-700`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
