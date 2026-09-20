import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";
import type { L } from "@/lib/i18n";

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" aria-label="XRagency. — Accueil" className={cn("group relative inline-flex min-h-11 items-center px-1", className)}>
      <span className="relative font-black text-[24px] leading-none tracking-[-0.16em] text-current sm:text-[28px]">X</span>
      <span aria-hidden className="absolute -bottom-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-[var(--warm)] shadow-[0_0_14px_rgba(207,157,78,.85)] transition-transform duration-300 group-hover:scale-125" /><span className="label-mono flex-1 text-muted-foreground">{t(title)}</span><span className="label-mono text-muted-foreground/70">{page}</span></div>}
export function SectionHeading({label,line1,line2,lead}:{label:L;line1:L;line2:L;lead?:L}){const{t}=useLang();return <Parallax speed={-.03} className="max-w-3xl"><Reveal><p className="label-mono text-primary">{t(label)}</p></Reveal><Reveal delay={80}><h2 className="display-serif mt-6 text-4xl sm:text-5xl lg:text-6xl">{t(line1)} <em className="text-primary not-italic italic">{t(line2)}</em></h2></Reveal>{lead?<Reveal delay={150}><p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">{t(lead)}</p></Reveal>:null}</Parallax>}
export function EmberButton({children,href,variant="solid",onClick,className,type="button",disabled}:{children:ReactNode;href?:string;variant?:"solid"|"ghost"|"outline";onClick?:()=>void;className?:string;type?:"button"|"submit";disabled?:boolean}){const base="label-mono inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full px-7 py-3.5 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40";const styles={solid:"bg-primary text-primary-foreground hover:brightness-110 hover:shadow-[var(--shadow-ember)] hover:-translate-y-0.5",outline:"border border-primary/60 text-primary hover:bg-primary/10 hover:-translate-y-0.5",ghost:"border border-border text-foreground hover:border-primary/60 hover:text-primary hover:-translate-y-0.5"}[variant];return href?<a href={href} className={cn(base,styles,className)}>{children}</a>:<button type={type} onClick={onClick} disabled={disabled} className={cn(base,styles,className)}>{children}</button>}
