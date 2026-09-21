"use client";

import { useState } from "react";
import Mascot from "@/components/Mascot";
import SiteHeader from "@/components/SiteHeader";
import {
  DEMO_COMPARISONS,
  formatCurrency,
  type ServiceKey,
} from "@/lib/demoData";

const TABS: ServiceKey[] = ["electricity", "gas", "internet"];

const FALLBACK_COLORS: Record<string, string> = {
  "Origin Energy": "#f2622e",
  "Tango Energy": "#7c3aed",
  Telstra: "#0d4ea6",
  Superloop: "#0ea5a4",
};

const AGL_SWOOSH_LINES: [number, number, number, number][] = [
  [0, 10, -34, -2],
  [0, 6, -22, -14],
  [0, 2, -8, -20],
  [0, 2, 8, -20],
  [0, 6, 22, -14],
  [0, 10, 34, -2],
];

function AglMark({ size }: { size: number }) {
  return (
    <svg viewBox="-42 -6 84 42" width={size} height={size * 0.55} fill="none">
      <defs>
        <linearGradient id="aglGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e3fd6" />
          <stop offset="100%" stopColor="#17c2e6" />
        </linearGradient>
      </defs>
      <g stroke="url(#aglGrad)" strokeWidth={6} strokeLinecap="round">
        {AGL_SWOOSH_LINES.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
        ))}
      </g>
    </svg>
  );
}

function AglLogo({ size = 64, iconOnly = false }: { size?: number; iconOnly?: boolean }) {
  if (iconOnly) {
    return (
      <span className="inline-flex shrink-0 items-center justify-center" aria-hidden="true">
        <AglMark size={size} />
      </span>
    );
  }
  return (
    <span
      className="inline-flex shrink-0 flex-col items-center justify-center"
      style={{ width: size }}
      aria-hidden="true"
    >
      <AglMark size={size} />
      <span
        className="font-extrabold text-neutral-900"
        style={{ fontSize: size * 0.34, lineHeight: 1, marginTop: size * 0.02 }}
      >
        agl
      </span>
    </span>
  );
}

function GloBirdMark({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 64 48" width={size} height={size * 0.75} fill="#f7b500">
      <ellipse cx="34" cy="26" rx="15" ry="10" transform="rotate(-18 34 26)" />
      <circle cx="17" cy="18" r="6.5" />
      <path d="M11 17 L4 15 L11 21 Z" />
      <path d="M46 32 L60 40 L47 24 Z" />
      <path d="M28 18 C 36 6, 50 2, 58 4 C 48 6, 40 14, 36 24 C 33 20, 30 18, 28 18 Z" />
    </svg>
  );
}

function GloBirdLogo({ size = 64, iconOnly = false }: { size?: number; iconOnly?: boolean }) {
  if (iconOnly) {
    return (
      <span className="inline-flex shrink-0 items-center justify-center" aria-hidden="true">
        <GloBirdMark size={size} />
      </span>
    );
  }
  return (
    <span className="inline-flex shrink-0 items-center gap-2" aria-hidden="true">
      <GloBirdMark size={size} />
      <span className="leading-[1.05]">
        <span
          className="block font-extrabold text-neutral-900"
          style={{ fontSize: size * 0.32 }}
        >
          GloBird
        </span>
        <span
          className="block font-bold text-neutral-700"
          style={{ fontSize: size * 0.3 }}
        >
          energy
        </span>
      </span>
    </span>
  );
}

function FallbackLogo({ name, size = 64 }: { name: string; size?: number }) {
  const color = FALLBACK_COLORS[name] ?? "#0f6b42";
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full font-extrabold text-white"
      style={{
        backgroundColor: color,
        width: size,
        height: size,
        fontSize: size * 0.42,
      }}
      aria-hidden="true"
    >
      {name.charAt(0)}
    </span>
  );
}

function ProviderLogo({
  name,
  size = 64,
  iconOnly = false,
}: {
  name: string;
  size?: number;
  iconOnly?: boolean;
}) {
  if (name === "AGL") return <AglLogo size={size} iconOnly={iconOnly} />;
  if (name === "GloBird") return <GloBirdLogo size={size} iconOnly={iconOnly} />;
  return <FallbackLogo name={name} size={size * (iconOnly ? 0.55 : 1)} />;
}

export default function ComparePage() {
  const [active, setActive] = useState<ServiceKey>("electricity");
  const result = DEMO_COMPARISONS[active];
  const saving = result.current.annualCost - result.bestDeal.annualCost;

  return (
    <div className="flex min-h-full flex-col bg-brand-mint">
      <SiteHeader
        right={
          <a
            href="#help"
            className="flex items-center gap-2 text-base font-semibold text-indigo-900"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green-light text-sm text-brand-green-dark">
              ?
            </span>
            Need help?
          </a>
        }
      />

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-16 sm:px-6">
        <section className="grid grid-cols-[1.7fr_1fr] items-start gap-1 pt-2 sm:gap-4">
          <div>
            <h1 className="text-2xl font-extrabold leading-[1.15] text-brand-green-dark sm:text-4xl">
              Good news &ndash; you could
            </h1>
            <p className="text-[44px] font-extrabold leading-[1.05] text-brand-gold-dark sm:text-7xl">
              save {formatCurrency(saving)} a year
            </p>
            <p className="mt-2 text-base font-medium text-indigo-900/80 sm:text-lg">
              {result.headline}
            </p>
          </div>
          <div className="relative w-full pt-6 sm:pt-10">
            <span className="doodle absolute -top-1 left-0 z-10 -translate-x-1 text-base leading-tight sm:text-2xl">
              Lower bills.
              <br />
              Brighter
              <br />
              tomorrows!
            </span>
            <Mascot
              priority
              className="ml-auto h-auto w-[88%] sm:w-full"
              sizes="(min-width: 640px) 280px, 150px"
            />
          </div>
        </section>

        <ul className="mt-4 grid grid-cols-3 gap-1 rounded-[1.75rem] bg-white p-3 shadow-sm ring-1 ring-black/5 sm:gap-3 sm:p-4">
          {result.contextItems.map((item, i) => (
            <li
              key={item.label}
              className="flex items-center justify-center gap-1.5 px-0.5 py-1 text-center sm:justify-start sm:gap-2.5 sm:text-left"
            >
              {i === 0 && (
                <ProviderLogo name={result.current.provider} size={22} iconOnly />
              )}
              <span>
                <p className="text-[10px] font-semibold text-neutral-400 sm:text-xs">
                  {item.label}
                </p>
                <p className="text-xs font-bold text-brand-green-dark sm:text-base">
                  {item.value}
                </p>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex gap-2 rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-black/5">
          {TABS.map((tab) => {
            const t = DEMO_COMPARISONS[tab];
            const isActive = tab === active;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActive(tab)}
                className={
                  "flex flex-1 items-center justify-center gap-1.5 rounded-xl px-2 py-3 text-base font-bold transition-colors " +
                  (isActive
                    ? "bg-brand-gold/20 text-brand-gold-dark ring-2 ring-brand-gold"
                    : "text-neutral-500 hover:bg-neutral-50")
                }
              >
                <span aria-hidden="true">{t.icon}</span>
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="mt-5 rounded-[2rem] border-[3px] border-brand-red bg-brand-red-light p-5 sm:p-6">
          <span className="inline-block rounded-full bg-white px-3.5 py-1.5 text-sm font-bold text-brand-red">
            Your current plan
          </span>
          <div className="mt-4 flex flex-nowrap items-center gap-3 sm:gap-4">
            <ProviderLogo name={result.current.provider} size={56} />
            <span className="hidden h-12 w-px shrink-0 bg-neutral-300/70 sm:block" aria-hidden="true" />
            <div className="min-w-0">
              <p className="text-xl font-extrabold text-neutral-900 sm:text-2xl">
                {result.current.planName}
              </p>
              <p className="mt-1 text-sm font-semibold text-indigo-900/60">
                Estimated annual cost
              </p>
              <p className="text-3xl font-extrabold text-neutral-900 sm:text-4xl">
                {formatCurrency(result.current.annualCost)}
                <span className="text-base font-semibold text-indigo-900/60">
                  /year
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-[2rem] border-[3px] border-brand-green bg-brand-green-light p-5 sm:p-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-green px-3.5 py-1.5 text-sm font-bold text-white">
            🏆 Best deal
          </span>
          <div className="mt-4 flex flex-nowrap items-center gap-3 sm:gap-4">
            <ProviderLogo name={result.bestDeal.provider} size={56} />
            <span className="hidden h-12 w-px shrink-0 bg-neutral-300/70 sm:block" aria-hidden="true" />
            <div className="min-w-0">
              <p className="text-xl font-extrabold text-neutral-900 sm:text-2xl">
                {result.bestDeal.planName}
              </p>
              <p className="mt-1 text-sm font-semibold text-indigo-900/60">
                Estimated annual cost
              </p>
              <p className="text-3xl font-extrabold text-neutral-900 sm:text-4xl">
                {formatCurrency(result.bestDeal.annualCost)}
                <span className="text-base font-semibold text-indigo-900/60">
                  /year
                </span>
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-center gap-3 rounded-xl bg-white/70 px-3 py-3 text-sm font-bold text-brand-green-dark sm:text-base">
            <span className="inline-flex items-center gap-1.5">
              <ClockIcon /> {result.bestDeal.minutesToSwitch} min to switch
            </span>
            <span className="text-neutral-300">|</span>
            <span className="inline-flex items-center gap-1.5">
              <LeafIcon /> Save {formatCurrency(saving)} a year
            </span>
          </div>

          <a
            href={result.bestDeal.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-gold px-6 py-4 text-lg font-extrabold text-neutral-900 shadow-sm transition hover:bg-brand-gold-dark sm:text-xl"
          >
            Choose {result.bestDeal.provider}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </main>
    </div>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
      <circle cx="10" cy="10" r="7.5" />
      <path strokeLinecap="round" d="M10 6v4l2.5 2" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
      <path d="M16 4c-6.5 0-11 4.2-11 10.5 0 .5 0 1 .1 1.5 6-1 10-4.7 10.9-9.5-1.8 4-5.3 6.8-9.8 7.7.6.2 1.2.3 1.8.3C13.5 14.5 16 10.7 16 4Z" />
    </svg>
  );
}
