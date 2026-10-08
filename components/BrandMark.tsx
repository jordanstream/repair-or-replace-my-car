import Image from "next/image";

type BrandMarkProps = {
  compact?: boolean;
  inverse?: boolean;
  className?: string;
};

export function BrandMark({ compact = false, inverse = false, className = "" }: BrandMarkProps) {
  return (
    <span
      role="img"
      aria-label="Car Second Opinion"
      className={`inline-flex shrink-0 items-center ${className}`}
    >
      <Image
        src="/brand/cso-logo-primary.png"
        alt=""
        width={759}
        height={233}
        priority={!compact}
        className={`${compact ? "h-8" : "h-11"} w-auto object-contain ${inverse ? "brightness-0 invert" : ""}`}
        sizes={compact ? "104px" : "144px"}
      />
    </span>
  );
}
