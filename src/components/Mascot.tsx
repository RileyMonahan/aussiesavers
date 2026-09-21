import Image from "next/image";

interface MascotProps {
  className?: string;
  priority?: boolean;
  sizes?: string;
}

/**
 * The one and only Aussie Savers kangaroo mascot.
 * Reuse this component everywhere instead of the image directly, so every
 * page renders the exact same asset.
 */
export default function Mascot({ className, priority, sizes }: MascotProps) {
  return (
    <Image
      src="/mascot/kangaroo.png"
      alt="Aussie Savers kangaroo mascot giving a thumbs up"
      width={874}
      height={1516}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}
