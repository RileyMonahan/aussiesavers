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

const PROVIDER_COLORS: Record<string, string> = {
  AGL: "#0a6ac2",
  GloBird: "#f2b705",
  "Origin Energy": "#f2622e",
  "Tango Energy": "#7c3aed",
  Telstra: "#0d4ea6",
  Superloop: "#0ea5a4",
};

function providerColor(name: string) {
  return PROVIDER_COLORS[name] ?? "#0f6b42";
}

function ProviderBadge({ name, size = 40 }: { name: string; size?: number }) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full font-extrabold text-white"
      style={{
        backgroundColor: providerColor(name),
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
            className="flex items-center gap-1.5 text-sm font-semibold text-brand-green-dark"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-green-light text-xs">
              ?
            </span>
            Need help?
          </a>
        }
      />

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-16 sm:px-6">
        <section className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[1.3fr_0.7fr]">
          <div>
            <h1 className="text-3xl font-extrabold leading-tight text-brand-green-dark sm:text-4xl">
              Good news &ndash; you could
              <br />
              <span className="text-brand-gold-dark">
                save {formatCurrency(saving)} a year
              </span>
            </h1>
            <p className="mt-3 text-base text-neutral-700">{result.headline}</p>
          </div>
          <div className="mx-auto w-28 sm:w-full">
            <span className="doodle block text-center text-base leading-tight sm:text-right sm:text-xl">
              Lower bills.
              <br />
              Brighter tomorrows!
            </span>
            <Mascot priority className="h-auto w-full" sizes="(min-width: 640px) 200px, 130px" />
          </div>
        </section>

        <ul className="mt-4 grid grid-cols-1 gap-2 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5 sm:grid-cols-3">
          {result.contextItems.map((item, i) => (
            <li
              key={item.label}
              className="flex items-center justify-center gap-2 px-2 py-1 text-center sm:justify-start sm:text-left"
            >
              {i === 0 && <ProviderBadge name={result.current.provider} size={26} />}
              <span>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">
                  {item.label}
                </p>
                <p className="text-sm font-bold text-brand-green-dark">
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
                  "flex flex-1 items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-sm font-bold transition-colors " +
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

        <div className="mt-5 rounded-3xl border-2 border-brand-red bg-brand-red-light p-5">
          <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-red">
            Your current plan
          </span>
          <div className="mt-3 flex items-center gap-3">
            <ProviderBadge name={result.current.provider} />
            <p className="text-lg font-extrabold text-neutral-900">
              {result.current.planName}
            </p>
          </div>
          <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Estimated annual cost
          </p>
          <p className="text-3xl font-extrabold text-neutral-900">
            {formatCurrency(result.current.annualCost)}
            <span className="text-base font-semibold text-neutral-500">
              /year
            </span>
          </p>
        </div>

        <div className="mt-4 rounded-3xl border-2 border-brand-green bg-brand-green-light p-5">
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-green px-3 py-1 text-xs font-bold text-white">
            🏆 Best deal
          </span>
          <div className="mt-3 flex items-center gap-3">
            <ProviderBadge name={result.bestDeal.provider} />
            <p className="text-lg font-extrabold text-neutral-900">
              {result.bestDeal.planName}
            </p>
          </div>
          <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Estimated annual cost
          </p>
          <p className="text-3xl font-extrabold text-neutral-900">
            {formatCurrency(result.bestDeal.annualCost)}
            <span className="text-base font-semibold text-neutral-500">
              /year
            </span>
          </p>

          <div className="mt-4 flex items-center justify-center gap-3 rounded-xl bg-white/70 px-3 py-2 text-sm font-semibold text-brand-green-dark">
            <span>⏱ {result.bestDeal.minutesToSwitch} min to switch</span>
            <span className="text-neutral-300">|</span>
            <span>🌿 Save {formatCurrency(saving)} a year</span>
          </div>

          <a
            href={result.bestDeal.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-gold px-6 py-4 text-base font-extrabold text-brand-green-dark shadow-sm transition hover:bg-brand-gold-dark sm:text-lg"
          >
            Choose {result.bestDeal.provider}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </main>
    </div>
  );
}
