"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
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

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-10 sm:px-6">
        <div className="pt-2 pb-4">
          <ProgressSteps current={1} />
        </div>

        <section className="hero-photo relative -mx-4 grid grid-cols-[2.3fr_1fr] items-start gap-1 overflow-hidden px-4 pb-0 pt-3 sm:mx-0 sm:gap-4 sm:rounded-3xl sm:px-8 sm:pt-6">
          <div>
            <h1 className="text-[22px] font-extrabold leading-[1.1] text-brand-green-dark sm:text-4xl">
              Let&apos;s see how much
              <br />
              <span className="text-brand-gold-dark">you could save</span>
            </h1>
            <p className="mt-2 text-sm text-neutral-700 sm:mt-4 sm:text-lg">
              It takes about 30 minutes, costs nothing, and could put hundreds
              of dollars back in your pocket each year.
            </p>
            <p className="doodle mt-2 text-base leading-tight sm:mt-6 sm:text-2xl">
              Happier homes across
              <br />
              Australia! <span aria-hidden="true">☀️</span>
            </p>
          </div>
          <div className="relative -mb-4 w-full self-end sm:mb-0">
            <span className="doodle absolute -top-4 left-0 z-10 -translate-x-2 text-sm leading-tight sm:-top-8 sm:text-2xl">
              Same bills.
              <br />
              More living!
            </span>
            <Image
              src="/mascot/kangaroo-cartoon.png"
              alt="Aussie Savers kangaroo mascot giving a thumbs up"
              width={280}
              height={416}
              priority
              className="ml-auto h-auto w-[105%] sm:w-full"
              sizes="(min-width: 640px) 320px, 170px"
            />
          </div>
        </section>

        <ul className="mt-3 flex items-start justify-between gap-x-1 sm:mt-6 sm:gap-x-2">
          {TRUST_BADGES.map((badge) => (
            <li key={badge.title} className="flex min-w-0 flex-1 items-center gap-1 sm:gap-2">
              <TrustIcon />
              <div className="min-w-0">
                <p className="text-[9.5px] font-bold leading-[1.15] text-brand-green-dark sm:text-sm">
                  {badge.title}
                </p>
                <p className="hidden text-xs text-neutral-600 sm:block">
                  {badge.subtitle}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <form
          onSubmit={handleSubmit}
          className="mt-4 rounded-[2rem] bg-white p-4 shadow-md ring-1 ring-black/5 sm:p-6"
        >
          <h2 className="text-lg font-extrabold text-brand-green-dark sm:text-2xl">
            Start your free savings check
          </h2>
          <p className="mt-1 text-sm text-neutral-600 sm:text-base">
            Tell us a few details to get started. It only takes a minute.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-4">
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

          <div className="mt-3">
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

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
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

          <fieldset className="mt-4">
            <legend className="text-sm font-bold text-neutral-800 sm:text-base">
              Which bills would you like us to check?
              <span className="text-brand-red"> *</span>
            </legend>
            <div className="mt-2 grid grid-cols-3 gap-1 sm:gap-3">
              {BILL_TYPES.map((bt) => {
                const active = billTypes.includes(bt.id);
                return (
                  <button
                    key={bt.id}
                    type="button"
                    onClick={() => toggleBillType(bt.id)}
                    aria-pressed={active}
                    className={
                      "flex items-center gap-1 rounded-xl border-2 px-1 py-2 text-[11px] font-bold transition-colors sm:gap-2 sm:rounded-2xl sm:px-3 sm:py-3 sm:text-base " +
                      (active
                        ? "border-brand-green bg-brand-green-light text-brand-green-dark"
                        : "border-neutral-200 bg-white text-neutral-500")
                    }
                  >
                    <CheckSquare checked={active} />
                    <span className="text-xs sm:text-lg" aria-hidden="true">
                      {bt.icon}
                    </span>
                    <span>{bt.label}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <label className="mt-4 flex items-start gap-2.5">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              required
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-neutral-300 text-brand-green focus:ring-brand-green"
            />
            <span className="text-xs text-neutral-700 sm:text-sm">
              I&apos;d like Aussie Savers to compare my bills and contact me
              about possible savings. We&apos;ll only use your information to
              provide our service, in line with our{" "}
              <a href="#privacy" className="underline">
                Privacy Policy
              </a>
              .
            </span>
          </label>

          <button
            type="submit"
            disabled={billTypes.length === 0 || !consent}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-gold px-6 py-4 text-lg font-extrabold text-brand-green-dark shadow-sm transition hover:bg-brand-gold-dark disabled:cursor-not-allowed disabled:opacity-50 sm:text-xl"
          >
            Continue to Upload Bills
            <span aria-hidden="true">→</span>
          </button>
        </form>

        <div className="mt-5 flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="flex items-center gap-1.5 text-sm text-neutral-500">
            <ShieldMiniIcon />
            Trusted by Aussie households across Australia.
          </p>
          <p className="text-sm text-neutral-500">
            <span className="text-brand-gold-dark" aria-hidden="true">
              ★★★★★
            </span>{" "}
            &ldquo;Most households save $600&ndash;$800 per year.&rdquo;
          </p>
          <p className="doodle text-xl">
            A fairer deal for
            <br />
            Aussie households <span aria-hidden="true">♡</span>
          </p>
        </div>
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
      <label htmlFor={htmlFor} className="block text-base font-bold text-neutral-800">
        {label}
        {required && <span className="text-brand-red"> *</span>}
      </label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function ShieldMiniIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-brand-green" aria-hidden="true">
      <path d="M10 1.5 3 4v5.2c0 4.6 3 7.9 7 9.3 4-1.4 7-4.7 7-9.3V4l-7-2.5Z" />
    </svg>
  );
}

function TrustIcon() {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-green-light text-brand-green sm:h-9 sm:w-9">
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4.5 w-4.5 sm:h-5 sm:w-5" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.7-9.3a1 1 0 0 0-1.4-1.4L9 10.59l-1.3-1.3a1 1 0 0 0-1.4 1.42l2 2a1 1 0 0 0 1.4 0l4-4Z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
}

function CheckSquare({ checked }: { checked: boolean }) {
  return (
    <span
      className={
        "flex h-4 w-4 shrink-0 items-center justify-center rounded border sm:h-5 sm:w-5 " +
        (checked
          ? "border-brand-green bg-brand-green"
          : "border-neutral-300 bg-white")
      }
      aria-hidden="true"
    >
      {checked && (
        <svg viewBox="0 0 20 20" fill="white" className="h-3 w-3 sm:h-3.5 sm:w-3.5">
          <path
            fillRule="evenodd"
            d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 1 1 1.4-1.4l2.8 2.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
            clipRule="evenodd"
          />
        </svg>
      )}
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
