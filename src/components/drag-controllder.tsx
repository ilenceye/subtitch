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
      className="absolute w-full before:absolute before:top-0 before:-right-2 before:-left-2 before:h-0.5 before:bg-red-700 hover:cursor-row-resize"
      ref={ref}
      style={{ top: toPercentage(topPcnt, 4) }}
      onMouseDown={handleMouseDown}
    />
  );
}
