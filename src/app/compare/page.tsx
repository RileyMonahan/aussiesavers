"use client";

import Image from "next/image";
import { useState } from "react";
import ProgressSteps from "@/components/ProgressSteps";
import SiteHeader from "@/components/SiteHeader";
import {
  DEMO_COMPARISONS,
  formatCurrency,
  type ServiceComparison,
} from "@/lib/demoData";

type TabKey = "energy" | "internet";

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: "energy", label: "Electricity & Gas", icon: "⚡" },
  { key: "internet", label: "Internet", icon: "📶" },
];

function buildEnergyComparison(): ServiceComparison {
  const elec = DEMO_COMPARISONS.electricity;
  const gas = DEMO_COMPARISONS.gas;
  return {
    service: "electricity",
    label: "Electricity & Gas",
    icon: "⚡",
    headline: "Cheaper electricity and gas plans are available for your household.",
    contextItems: [
      {
        label: "Current providers",
        value: `${elec.current.provider} & ${gas.current.provider}`,
      },
      {
        label: "Usage",
        value: `${elec.contextItems[1].value} & ${gas.contextItems[1].value}`,
      },
      { label: "Network", value: elec.contextItems[2].value },
    ],
    current: {
      provider: "",
      planName: `${elec.current.provider} & ${gas.current.provider}`,
      annualCost: elec.current.annualCost + gas.current.annualCost,
    },
    bestDeal: {
      provider: "",
      planName: `${elec.bestDeal.provider} & ${gas.bestDeal.provider}`,
      annualCost: elec.bestDeal.annualCost + gas.bestDeal.annualCost,
      minutesToSwitch: Math.max(
        elec.bestDeal.minutesToSwitch,
        gas.bestDeal.minutesToSwitch
      ),
      affiliateUrl: elec.bestDeal.affiliateUrl,
    },
  };
}

export default function ComparePage() {
  const [active, setActive] = useState<TabKey>("energy");
  const result: ServiceComparison =
    active === "internet" ? DEMO_COMPARISONS.internet : buildEnergyComparison();
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
        <div className="pt-2 pb-1">
          <ProgressSteps current={3} />
        </div>

        <section className="hero-photo relative -mx-4 grid grid-cols-[3.6fr_1fr] items-start gap-1 overflow-hidden px-4 pb-3 pt-0 sm:mx-0 sm:gap-4 sm:rounded-3xl sm:px-8 sm:pt-2 sm:pb-4">
          <div>
            <h1 className="text-2xl font-extrabold leading-[1.15] text-brand-green-dark sm:text-4xl">
              Good news &ndash; you could
            </h1>
            <p className="text-[29px] font-extrabold leading-[1.05] text-brand-gold-dark sm:text-7xl">
              save {formatCurrency(saving)} a year
            </p>
            <p className="mt-2 text-base font-normal text-neutral-800 sm:text-lg">
              {result.headline}
            </p>
          </div>
          <div className="relative -mb-3 w-full self-end overflow-visible pt-14 sm:mb-0 sm:pt-24">
            <Image
              src="/mascot/kangaroo-cropped-shirt.png"
              alt="Aussie Savers kangaroo mascot giving a thumbs up"
              width={660}
              height={942}
              priority
              className="ml-auto h-auto w-full origin-bottom-left [transform:scale(1.4)]"
              sizes="(min-width: 640px) 320px, 180px"
            />
          </div>
        </section>

        <ul className="mt-4 grid grid-cols-3 gap-1 rounded-[1.75rem] bg-white p-3 shadow-sm ring-1 ring-black/5 sm:gap-3 sm:p-4">
          {result.contextItems.map((item) => (
            <li
              key={item.label}
              className="flex items-center justify-center px-0.5 py-1 text-center sm:justify-start sm:text-left"
            >
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
            const isActive = tab.key === active;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActive(tab.key)}
                className={
                  "flex flex-1 items-center justify-center gap-1.5 rounded-xl px-2 py-3 text-sm font-bold transition-colors sm:text-base " +
                  (isActive
                    ? "bg-brand-gold/20 text-brand-gold-dark ring-2 ring-brand-gold"
                    : "text-neutral-500 hover:bg-neutral-50")
                }
              >
                <span aria-hidden="true">{tab.icon}</span>
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="mt-4 rounded-[1.75rem] border-2 border-brand-red bg-brand-red-light p-4 sm:p-5">
          <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-red sm:text-sm">
            Your current plan
          </span>
          <p className="mt-3 whitespace-nowrap text-lg font-extrabold text-neutral-900 sm:text-2xl">
            {result.current.planName}
          </p>
          {result.current.provider && (
            <p className="text-xs font-semibold text-indigo-900/60 sm:text-sm">
              {result.current.provider}
            </p>
          )}
          <p className="mt-1 text-2xl font-extrabold text-neutral-900 sm:text-3xl">
            {formatCurrency(result.current.annualCost)}
            <span className="text-sm font-semibold text-indigo-900/60">
              /year
            </span>
          </p>
        </div>

        <div className="mt-3 rounded-[1.75rem] border-2 border-brand-green bg-brand-green-light p-4 sm:p-5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-green px-3 py-1 text-xs font-bold text-white sm:text-sm">
            🏆 Best deal
          </span>
          <p className="mt-3 whitespace-nowrap text-lg font-extrabold text-neutral-900 sm:text-2xl">
            {result.bestDeal.planName}
          </p>
          {result.bestDeal.provider && (
            <p className="text-xs font-semibold text-indigo-900/60 sm:text-sm">
              {result.bestDeal.provider}
            </p>
          )}
          <p className="mt-1 text-2xl font-extrabold text-neutral-900 sm:text-3xl">
            {formatCurrency(result.bestDeal.annualCost)}
            <span className="text-sm font-semibold text-indigo-900/60">
              /year
            </span>
          </p>

          <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-white/70 px-2 py-2.5 text-xs font-bold text-brand-green-dark sm:gap-3 sm:px-3 sm:py-3 sm:text-sm">
            <span className="inline-flex items-center gap-1 whitespace-nowrap">
              <ClockIcon /> {result.bestDeal.minutesToSwitch} min to switch
            </span>
            <span className="text-neutral-300">|</span>
            <span className="inline-flex items-center gap-1 whitespace-nowrap">
              <LeafIcon /> Save {formatCurrency(saving)} a year
            </span>
          </div>

          <a
            href={result.bestDeal.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-gold px-6 py-3.5 text-base font-extrabold text-neutral-900 shadow-sm transition hover:bg-brand-gold-dark sm:text-lg"
          >
            Choose {result.bestDeal.provider || result.bestDeal.planName}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </main>
    </div>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-3.5 w-3.5 shrink-0">
      <circle cx="10" cy="10" r="7.5" />
      <path strokeLinecap="round" d="M10 6v4l2.5 2" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 shrink-0">
      <path d="M16 4c-6.5 0-11 4.2-11 10.5 0 .5 0 1 .1 1.5 6-1 10-4.7 10.9-9.5-1.8 4-5.3 6.8-9.8 7.7.6.2 1.2.3 1.8.3C13.5 14.5 16 10.7 16 4Z" />
    </svg>
  );
}
