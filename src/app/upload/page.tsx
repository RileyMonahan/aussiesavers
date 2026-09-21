"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, type ReactNode } from "react";
import Mascot from "@/components/Mascot";
import ProgressSteps from "@/components/ProgressSteps";
import SiteHeader from "@/components/SiteHeader";

export default function UploadPage() {
  const router = useRouter();
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [analysing, setAnalysing] = useState(false);

  function handleFileChosen(file: File | undefined) {
    if (!file) return;
    setFileName(file.name);
    setAnalysing(true);
    // Demo-only: simulate the automatic bill analysis step before moving on.
    window.setTimeout(() => {
      router.push("/compare");
    }, 1500);
  }

  return (
    <div className="flex min-h-full flex-col bg-brand-mint">
      <SiteHeader right={<HamburgerButton />} />

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-16 sm:px-6">
        <div className="pt-2 pb-6">
          <ProgressSteps current={2} />
        </div>

        <section className="hero-photo relative -mx-4 grid grid-cols-1 items-end gap-2 overflow-hidden px-4 pb-5 pt-3 sm:mx-0 sm:grid-cols-[1.3fr_0.7fr] sm:rounded-3xl sm:px-8 sm:pt-6">
          <div>
            <h1 className="text-3xl font-extrabold leading-tight text-brand-green-dark sm:text-4xl">
              Upload your
              <br />
              <span className="text-brand-gold-dark">energy bill</span>
            </h1>
            <p className="mt-3 max-w-md text-base text-neutral-700">
              Upload a recent electricity and/or gas bill and we&apos;ll find
              the best deals for your home. It only takes a minute.
            </p>
          </div>
          <div className="mx-auto w-28 sm:w-full">
            <span className="doodle block text-center text-base leading-tight sm:text-right sm:text-xl">
              Same bills.
              <br />A brighter tomorrow.
            </span>
            <Mascot priority className="h-auto w-full" sizes="(min-width: 640px) 200px, 130px" />
          </div>
        </section>

        <div className="mt-6 rounded-3xl bg-white p-5 shadow-md ring-1 ring-black/5 sm:p-8">
          <h2 className="text-lg font-extrabold text-brand-green-dark">
            Upload your bill
          </h2>
          <p className="mt-1 text-sm text-neutral-600">
            Choose a recent electricity or gas bill (from the last 6 months).
          </p>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <UploadOption
              icon={<CameraIcon />}
              title="Take a photo"
              subtitle="Use your camera"
              disabled={analysing}
              onClick={() => cameraInputRef.current?.click()}
            />
            <UploadOption
              icon={<FileIcon />}
              title="Upload file"
              subtitle="Choose from your device"
              disabled={analysing}
              onClick={() => fileInputRef.current?.click()}
            />
          </div>

          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => handleFileChosen(e.target.files?.[0])}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
            className="hidden"
            onChange={(e) => handleFileChosen(e.target.files?.[0])}
          />

          <p className="mt-3 text-center text-xs text-neutral-500">
            We accept PDF, JPG, PNG (max 10MB)
          </p>

          {fileName && (
            <div
              className="mt-4 flex items-center gap-3 rounded-2xl bg-brand-green-light p-3 text-sm text-brand-green-dark"
              role="status"
            >
              {analysing ? (
                <Spinner />
              ) : (
                <span className="text-brand-green">✓</span>
              )}
              <span className="min-w-0 flex-1 truncate font-semibold">
                {fileName}
              </span>
              <span className="shrink-0 text-xs">
                {analysing ? "Analysing your bill…" : "Uploaded"}
              </span>
            </div>
          )}

          <div className="mt-5 flex items-start gap-3 rounded-2xl bg-neutral-50 p-3">
            <ShieldIcon />
            <div>
              <p className="text-sm font-bold text-neutral-800">
                Your information is safe with us
              </p>
              <p className="text-xs text-neutral-500">
                We only use your bill to compare plans. It&apos;s secure and
                private.
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-green-light px-6 py-4 text-base font-bold text-brand-green-dark"
        >
          <span aria-hidden="true">←</span> Back
        </Link>
      </main>
    </div>
  );
}

function UploadOption({
  icon,
  title,
  subtitle,
  onClick,
  disabled,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-3 rounded-2xl bg-brand-green-light/60 p-4 text-left transition hover:bg-brand-green-light disabled:cursor-not-allowed disabled:opacity-50"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-brand-green">
        {icon}
      </span>
      <span>
        <span className="block text-sm font-bold text-brand-green-dark">
          {title}
        </span>
        <span className="block text-xs text-neutral-600">{subtitle}</span>
      </span>
    </button>
  );
}

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
      <circle cx="12" cy="13" r="3.2" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 3v5h5M9 13h6M9 16h6" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="mt-0.5 h-6 w-6 shrink-0 text-brand-green">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 5 6v5c0 4.5 3 7.7 7 9 4-1.3 7-4.5 7-9V6l-7-3Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0 animate-spin text-brand-green">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
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
