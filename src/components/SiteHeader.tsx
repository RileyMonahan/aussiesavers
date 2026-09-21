import type { ReactNode } from "react";
import Logo from "./Logo";

export default function SiteHeader({ right }: { right?: ReactNode }) {
  return (
    <header className="flex items-center justify-between px-4 sm:px-6 py-4">
      <Logo />
      {right}
    </header>
  );
}
