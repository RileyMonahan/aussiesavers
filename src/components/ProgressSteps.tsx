import { STEPS } from "@/lib/steps";

export default function ProgressSteps({ current }: { current: 1 | 2 | 3 }) {
  return (
    <ol className="flex items-start justify-center gap-2 sm:gap-4">
      {STEPS.map((step, i) => {
        const state =
          step.number < current
            ? "done"
            : step.number === current
              ? "current"
              : "upcoming";

        return (
          <li key={step.number} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5 w-20 sm:w-24">
              <span
                className={
                  "flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full text-sm font-bold " +
                  (state === "done"
                    ? "bg-brand-green text-white"
                    : state === "current"
                      ? "bg-white text-brand-green-dark ring-2 ring-brand-gold"
                      : "bg-white text-neutral-400 ring-1 ring-neutral-300")
                }
              >
                {state === "done" ? (
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 1 1 1.4-1.4l2.8 2.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  step.number
                )}
              </span>
              <span
                className={
                  "text-center text-[11px] sm:text-xs font-semibold leading-tight " +
                  (state === "upcoming"
                    ? "text-neutral-400"
                    : "text-brand-green-dark")
                }
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <span
                aria-hidden="true"
                className={
                  "mx-0.5 sm:mx-1 mt-[-18px] h-0.5 w-6 sm:w-12 rounded-full " +
                  (step.number < current ? "bg-brand-green" : "bg-neutral-300")
                }
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
