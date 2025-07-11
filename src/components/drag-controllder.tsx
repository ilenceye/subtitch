import { useDraggable } from "@/hooks/use-draggable";
import { toPercentage } from "@/lib/helper";

export function DragController({
  topPcnt,
  onTopPcntChange,
}: {
  topPcnt: number;
  onTopPcntChange: (topPcnt: number) => void;
}) {
  const { ref, handleMouseDown } = useDraggable<HTMLDivElement>({
    topPcntRange: [0, 1],
    onTopPcntChange,
  });

  return (
    <div
      className="absolute w-full before:absolute before:top-0 before:right-0 before:left-0 before:h-0.5 before:-translate-y-1/2 before:bg-red-700 after:absolute after:top-0 after:-right-2 after:size-4 after:-translate-y-1/2 after:rotate-45 after:rounded-t-full after:rounded-br-full after:bg-red-700 hover:cursor-grab active:cursor-grabbing"
      ref={ref}
      style={{ top: toPercentage(topPcnt, 4) }}
      onMouseDown={handleMouseDown}
    />
  );
}
