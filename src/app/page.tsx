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
  { title: "100% free", subtitle: "No fees, no obligation", Icon: TagIcon },
  { title: "No lock-in contracts", subtitle: "You're always in control", Icon: PeopleIcon },
  { title: "Secure and private", subtitle: "Your information is safe with us", Icon: LockIcon },
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
        <div className="pt-2 pb-1">
          <ProgressSteps current={1} />
        </div>

        <section className="hero-photo relative -mx-4 grid grid-cols-[2.3fr_1fr] items-start gap-1 overflow-hidden px-4 pb-0 pt-0 sm:mx-0 sm:gap-4 sm:rounded-3xl sm:px-8 sm:pt-1">
          <div>
            <h1 className="text-[25px] font-extrabold leading-[1.1] text-brand-green-dark sm:text-4xl">
              Let&apos;s see how much
              <br />
              <span className="text-brand-gold-dark">you could save</span>
            </h1>
            <p className="mt-2 text-sm text-neutral-700 sm:mt-4 sm:text-lg">
              It takes about 3 minutes, costs nothing, and could put hundreds
              of dollars back in your pocket each year.
            </p>
          </div>
          <div className="relative -mb-4 w-full self-end sm:mb-0">
            <Image
              src="/mascot/kangaroo-cropped-shirt.png"
              alt="Aussie Savers kangaroo mascot giving a thumbs up"
              width={660}
              height={942}
              priority
              className="ml-auto h-auto w-[135%] sm:w-[128%]"
              sizes="(min-width: 640px) 380px, 210px"
            />
          </div>
        </section>

        <ul className="mt-3 flex items-start justify-between gap-x-1 sm:mt-6 sm:gap-x-2">
          {TRUST_BADGES.map((badge) => (
            <li key={badge.title} className="flex min-w-0 flex-1 items-center gap-1 sm:gap-2">
              <TrustIconWrap>
                <badge.Icon />
              </TrustIconWrap>
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
          <p className="mt-1 text-[11px] text-neutral-600 sm:text-base">
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

        <div className="mt-5 flex items-start justify-between gap-2 text-left">
          <p className="flex min-w-0 flex-1 items-start gap-1 text-[10px] text-neutral-500 sm:items-center sm:gap-1.5 sm:text-sm">
            <ShieldMiniIcon />
            <span>Trusted by Aussie households across Australia.</span>
          </p>
          <p className="min-w-0 flex-1 text-[10px] text-neutral-500 sm:text-sm">
            <span className="text-brand-gold-dark" aria-hidden="true">
              ★★★★★
            </span>{" "}
            &ldquo;Most households save $600&ndash;$800 per year.&rdquo;
          </p>
          <p className="doodle min-w-0 flex-1 text-sm sm:text-xl">
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

function TrustIconWrap({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-green-light text-brand-green sm:h-9 sm:w-9">
      {children}
    </span>
  );
}

function TagIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 -rotate-45 sm:h-4.5 sm:w-4.5" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M3 3a1 1 0 0 1 1-1h5.17a1 1 0 0 1 .71.29l7 7a1 1 0 0 1 0 1.42l-5.17 5.17a1 1 0 0 1-1.42 0l-7-7A1 1 0 0 1 3 8.17V3Zm3.5 3.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 sm:h-4.5 sm:w-4.5" aria-hidden="true">
      <path d="M7 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM1 17a6 6 0 0 1 12 0v.5a.5.5 0 0 1-.5.5H1.5a.5.5 0 0 1-.5-.5V17Zm12.2-6.4c2.5.4 4.3 2.4 4.3 5v1a1 1 0 0 1-1 1h-2v-1.5c0-1.8-.8-3.5-2.1-4.6.28-.35.6-.64.8-.9Z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 sm:h-4.5 sm:w-4.5" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M10 2a4 4 0 0 0-4 4v2H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-1V6a4 4 0 0 0-4-4Zm2 6V6a2 2 0 1 0-4 0v2h4Zm-2 4a1.2 1.2 0 0 1 .6 2.24V16a.6.6 0 1 1-1.2 0v-1.76A1.2 1.2 0 0 1 10 12Z"
        clipRule="evenodd"
      />
    </svg>
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
