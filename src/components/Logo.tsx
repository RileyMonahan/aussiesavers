import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex flex-col leading-none">
      <span className="text-xl sm:text-2xl font-extrabold tracking-tight">
        <span className="text-brand-green-dark">Aussie</span>{" "}
        <span className="text-brand-gold-dark">Savers</span>
      </span>
      <span className="mt-1 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-brand-green/70">
        Same bills. A brighter tomorrow.
      </span>
    </Link>
  );
}
