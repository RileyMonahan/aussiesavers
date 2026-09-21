export interface Step {
  number: 1 | 2 | 3;
  label: string;
  href: string;
}

export const STEPS: Step[] = [
  { number: 1, label: "Your Details", href: "/" },
  { number: 2, label: "Upload Bills", href: "/upload" },
  { number: 3, label: "Compare & Save", href: "/compare" },
];
