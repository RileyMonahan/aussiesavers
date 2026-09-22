"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import ProgressSteps from "@/components/ProgressSteps";
import SiteHeader from "@/components/SiteHeader";

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function UploadPage() {
  const router = useRouter();
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [analysing, setAnalysing] = useState(false);

  function handleFilesChosen(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const incoming = Array.from(fileList);
    setFiles((prev) => {
      const existingKeys = new Set(
        prev.map((f) => `${f.name}-${f.size}-${f.lastModified}`)
      );
      const deduped = incoming.filter(
        (f) => !existingKeys.has(`${f.name}-${f.size}-${f.lastModified}`)
      );
      return [...prev, ...deduped];
    });
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function handleAnalyse() {
    if (files.length === 0) return;
    setAnalysing(true);
    // Demo-only: simulate the automatic bill analysis step before moving on.
    window.setTimeout(() => {
      router.push("/compare");
    }, 15000);
  }

  if (analysing) {
    return <AnalysingScreen fileCount={files.length} />;
  }

  return (
    <div className="flex min-h-full flex-col bg-brand-mint">
      <SiteHeader right={<HamburgerButton />} />

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-16 sm:px-6">
        <div className="pt-2 pb-1">
          <ProgressSteps current={2} />
        </div>

        <section className="hero-photo relative -mx-4 grid grid-cols-[3.6fr_1fr] items-start gap-1 overflow-hidden px-4 pb-3 pt-0 sm:mx-0 sm:gap-4 sm:rounded-3xl sm:px-8 sm:pt-2 sm:pb-4">
          <div>
            <h1 className="text-[28px] font-extrabold leading-[1.1] text-brand-green-dark sm:text-5xl">
              Upload your
              <br />
              <span className="text-brand-gold-dark">energy bill</span>
            </h1>
            <p className="mt-3 text-base font-normal text-neutral-800 sm:mt-5 sm:text-xl">
              Upload a recent electricity and/or gas bill and we&apos;ll find
              the best deals for your home. It only takes a minute.
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

        <div className="mt-6 rounded-[2rem] bg-white p-6 shadow-md ring-1 ring-black/5 sm:p-8">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-green-light text-brand-green">
              <UploadDocIcon />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-brand-green-dark sm:text-2xl">
                Upload your bill
              </h2>
              <p className="mt-0.5 text-sm text-neutral-600 sm:text-base">
                Choose a recent electricity or gas bill (from the last 6
                months).
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <UploadOption
              icon={<CameraIcon />}
              title="Take a photo"
              subtitle="Use your camera"
              onClick={() => cameraInputRef.current?.click()}
            />
            <UploadOption
              icon={<FileIcon />}
              title="Upload file"
              subtitle="Choose from your device"
              onClick={() => fileInputRef.current?.click()}
            />
          </div>

          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            multiple
            className="hidden"
            onChange={(e) => {
              handleFilesChosen(e.target.files);
              e.target.value = "";
            }}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
            multiple
            className="hidden"
            onChange={(e) => {
              handleFilesChosen(e.target.files);
              e.target.value = "";
            }}
          />

          <p className="mt-4 text-center text-sm text-neutral-500">
            We accept PDF, JPG, PNG (max 10MB) &mdash; add as many bills as
            you need
          </p>

          {files.length > 0 && (
            <ul className="mt-4 space-y-2">
              {files.map((file, i) => (
                <li
                  key={`${file.name}-${file.size}-${file.lastModified}`}
                  className="flex items-center gap-3 rounded-2xl bg-brand-green-light p-3 text-sm text-brand-green-dark"
                >
                  <span className="text-brand-green">✓</span>
                  <span className="min-w-0 flex-1 truncate font-semibold">
                    {file.name}
                  </span>
                  <span className="shrink-0 text-xs text-brand-green-dark/70">
                    {formatFileSize(file.size)}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    aria-label={`Remove ${file.name}`}
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-brand-green-dark/60 hover:bg-white/60 hover:text-brand-green-dark"
                  >
                    <CloseIcon />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-neutral-500">
            <ShieldIcon />
            Your info is safe &mdash; used only to compare plans.
          </p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-2xl bg-brand-green-light px-5 py-3 text-sm font-bold text-brand-green-dark"
          >
            <span aria-hidden="true">←</span> Back
          </Link>
          <button
            type="button"
            onClick={handleAnalyse}
            disabled={files.length === 0}
            className="flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-brand-gold px-6 py-3 text-sm font-extrabold text-brand-green-dark shadow-sm transition hover:bg-brand-gold-dark disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
          >
            Analyse my bills
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </main>
    </div>
  );
}

const ANALYSIS_STEPS = [
  "Reading your bill details…",
  "Identifying your usage and tariffs…",
  "Comparing 30+ electricity, gas and internet plans…",
  "Calculating your potential savings…",
];

function AnalysingScreen({ fileCount }: { fileCount: number }) {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setStepIndex((i) => Math.min(i + 1, ANALYSIS_STEPS.length - 1));
    }, 15000 / ANALYSIS_STEPS.length);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-mint px-6 text-center">
      <div className="relative">
        <Image
          src="/mascot/kangaroo-cropped-shirt.png"
          alt="Aussie Savers kangaroo mascot"
          width={220}
          height={314}
          priority
          className="h-auto w-40 sm:w-56"
        />
      </div>
      <BigSpinner />
      <h1 className="mt-6 text-2xl font-extrabold text-brand-green-dark sm:text-3xl">
        Analysing your bill{fileCount > 1 ? "s" : ""}&hellip;
      </h1>
      <p className="mt-2 min-h-[3.5rem] max-w-xs text-sm text-neutral-600 sm:max-w-sm sm:text-base">
        {ANALYSIS_STEPS[stepIndex]}
      </p>
      <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-neutral-500">
        <ShieldIcon />
        Your info is safe &mdash; used only to compare plans.
      </p>
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
      className="flex flex-col items-center gap-2 rounded-2xl border-2 border-brand-gold/40 bg-white p-4 text-center shadow-sm transition hover:border-brand-gold hover:bg-brand-gold/10 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-row sm:gap-3 sm:text-left"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-gold/20 text-brand-gold-dark sm:h-14 sm:w-14">
        {icon}
      </span>
      <span>
        <span className="block text-sm font-bold text-brand-gold-dark sm:text-base">
          {title}
        </span>
        <span className="block text-xs text-neutral-600 sm:text-sm">{subtitle}</span>
      </span>
    </button>
  );
}

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-7 w-7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
      <circle cx="12" cy="13" r="3.2" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-7 w-7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 3v5h5M9 13h6M9 16h6" />
    </svg>
  );
}

function UploadDocIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-8 w-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 3v5h5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v6M9.2 14.5 12 11.7l2.8 2.8" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 shrink-0 text-brand-green">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 5 6v5c0 4.5 3 7.7 7 9 4-1.3 7-4.5 7-9V6l-7-3Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
    </svg>
  );
}

function BigSpinner() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="mt-6 h-10 w-10 shrink-0 animate-spin text-brand-green">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
      <path strokeLinecap="round" d="M5 5l10 10M15 5 5 15" />
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
