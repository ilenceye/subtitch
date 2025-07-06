import { cn } from "@/lib/classnames";
import { toPercentage } from "@/lib/helper";

export function Mask({
  topPcnt,
  bottomPcnt,
  children,
}: {
  topPcnt: number;
  bottomPcnt: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative",
        "before:absolute before:top-0 before:h-[var(--top-mask-height)] before:w-full before:bg-black/50",
        "after:absolute after:bottom-0 after:h-[var(--bottom-mask-height)] after:w-full after:bg-black/50",
      )}
      style={
        {
          "--top-mask-height": toPercentage(topPcnt, 4),
          "--bottom-mask-height": toPercentage(1 - bottomPcnt, 4),
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
