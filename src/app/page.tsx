"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import Mascot from "@/components/Mascot";
import ProgressSteps from "@/components/ProgressSteps";
import SiteHeader from "@/components/SiteHeader";

const BILL_TYPES = [
  { id: "electricity", label: "Electricity", icon: "⚡" },
  { id: "gas", label: "Gas", icon: "🔥" },
  { id: "internet", label: "Internet", icon: "📶" },
] as const;

const TRUST_BADGES = [
  { title: "100% free", subtitle: "No fees, no obligation" },
  { title: "No lock-in contracts", subtitle: "You're always in control" },
  { title: "Secure and private", subtitle: "Your information is safe with us" },
];

export default function DetailsPage() {
  const router = useRouter();
  const [billTypes, setBillTypes] = useState<string[]>([
    "electricity",
    "gas",
    "internet",
  ]);
  const [consent, setConsent] = useState(true);

  function toggleBillType(id: string) {
    setBillTypes((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push("/upload");
  }

  return (
    <div className="flex min-h-full flex-col bg-brand-mint">
      <SiteHeader right={<HamburgerButton />} />

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-16 sm:px-6">
        <div className="pt-2 pb-6">
          <ProgressSteps current={1} />
        </div>

        <section className="grid grid-cols-1 items-center gap-6 sm:grid-cols-[1.2fr_0.8fr] sm:gap-4">
          <div>
            <h1 className="text-3xl font-extrabold leading-tight text-brand-green-dark sm:text-4xl">
              Let&apos;s see how much
              <br />
              <span className="text-brand-gold-dark">you could save</span>
            </h1>
            <p className="mt-4 text-base text-neutral-700 sm:text-lg">
              It takes about 5 minutes, costs nothing, and could put hundreds
              of dollars back in your pocket each year.
            </p>
          </div>
          <div className="mx-auto w-40 sm:w-full">
            <Mascot priority className="h-auto w-full" sizes="(min-width: 640px) 260px, 160px" />
          </div>
        </section>

        <ul className="mt-2 grid grid-cols-1 gap-3 sm:mt-6 sm:grid-cols-3">
          {TRUST_BADGES.map((badge) => (
            <li
              key={badge.title}
              className="flex items-center gap-3 rounded-2xl bg-white/70 p-3 shadow-sm ring-1 ring-black/5"
            >
              <TrustIcon />
              <div>
                <p className="text-sm font-bold text-brand-green-dark">
                  {badge.title}
                </p>
                <p className="text-xs text-neutral-600">{badge.subtitle}</p>
              </div>
            </li>
          ))}
        </ul>

        <form
          onSubmit={handleSubmit}
          className="mt-6 rounded-3xl bg-white p-5 shadow-md ring-1 ring-black/5 sm:p-8"
        >
          <h2 className="text-xl font-extrabold text-brand-green-dark sm:text-2xl">
            Start your free savings check
          </h2>
          <p className="mt-1 text-sm text-neutral-600">
            Tell us a few details to get started. It only takes a minute.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="First name" htmlFor="firstName" required>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                placeholder="e.g. Sarah"
                className="input"
              />
            </Field>
            <Field label="Last name" htmlFor="lastName" required>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                placeholder="e.g. Taylor"
                className="input"
              />
            </Field>
          </div>

          <div className="mt-4">
            <Field label="Email" htmlFor="email" required>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="e.g. sarah@email.com"
                className="input"
              />
            </Field>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Mobile number" htmlFor="mobile" required>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                required
                placeholder="e.g. 0412 345 678"
                className="input"
              />
            </Field>
            <Field label="Postcode" htmlFor="postcode" required>
              <input
                id="postcode"
                name="postcode"
                type="text"
                inputMode="numeric"
                pattern="[0-9]{4}"
                maxLength={4}
                required
                placeholder="e.g. 3000"
                className="input"
              />
            </Field>
          </div>

          <fieldset className="mt-6">
            <legend className="text-sm font-bold text-neutral-800">
              Which bills would you like us to check?
              <span className="text-brand-red"> *</span>
            </legend>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {BILL_TYPES.map((bt) => {
                const active = billTypes.includes(bt.id);
                return (
                  <button
                    key={bt.id}
                    type="button"
                    onClick={() => toggleBillType(bt.id)}
                    aria-pressed={active}
                    className={
                      "flex flex-col items-center gap-1 rounded-2xl border-2 px-2 py-3 text-sm font-semibold transition-colors sm:flex-row sm:justify-center sm:gap-2 " +
                      (active
                        ? "border-brand-green bg-brand-green-light text-brand-green-dark"
                        : "border-neutral-200 bg-white text-neutral-500")
                    }
                  >
                    <span aria-hidden="true">{bt.icon}</span>
                    {bt.label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <label className="mt-5 flex items-start gap-3 rounded-2xl bg-brand-green-light/60 p-3">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              required
              className="mt-0.5 h-5 w-5 shrink-0 rounded border-neutral-300 text-brand-green focus:ring-brand-green"
            />
            <span className="text-sm text-neutral-700">
              I&apos;d like Aussie Savers to compare my bills and contact me
              about possible savings.
              <br />
              <span className="text-xs text-neutral-500">
                We&apos;ll only use your information to provide our service.
              </span>
            </span>
          </label>

          <button
            type="submit"
            disabled={billTypes.length === 0 || !consent}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-gold px-6 py-4 text-base font-extrabold text-brand-green-dark shadow-sm transition hover:bg-brand-gold-dark disabled:cursor-not-allowed disabled:opacity-50 sm:text-lg"
          >
            Continue to Upload Bills
            <span aria-hidden="true">→</span>
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-neutral-500">
          Trusted by Aussie households across Australia. Most households save
          $600&ndash;$800 per year.
        </p>
      </main>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-bold text-neutral-800">
        {label}
        {required && <span className="text-brand-red"> *</span>}
      </label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function TrustIcon() {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-green-light text-brand-green">
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.7-9.3a1 1 0 0 0-1.4-1.4L9 10.59l-1.3-1.3a1 1 0 0 0-1.4 1.42l2 2a1 1 0 0 0 1.4 0l4-4Z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
}

function HamburgerButton() {
  return (
    <button
      type="button"
      aria-label="Open menu"
      className="flex h-10 w-10 items-center justify-center rounded-full text-brand-green-dark hover:bg-black/5"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
        <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  );
}
