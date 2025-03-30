import { useEffect } from "react";

import { type UseDraggableOptions, useDraggable } from "@/hooks/use-draggable";
import { toPercentage } from "@/lib/helper";
import { Prettify } from "@/types";

type DragControllerProps = Prettify<
  UseDraggableOptions & { onTopPcntChange: (topPcnt: number) => void }
>;

export function DragController({
  initialTopPcnt,
  onTopPcntChange,
}: DragControllerProps) {
  const { ref, topPcnt, handleMouseDown } = useDraggable<HTMLDivElement>({
    initialTopPcnt,
    topPcntRange: [0, 1],
  });

  useEffect(() => {
    onTopPcntChange(topPcnt);
  }, [topPcnt]);

  return (
    <div
      className="absolute w-full before:absolute before:top-0 before:-right-2 before:-left-2 before:h-0.5 before:bg-red-700 hover:cursor-row-resize"
      ref={ref}
      style={{ top: toPercentage(topPcnt, 4) }}
      onMouseDown={handleMouseDown}
    />
  );
}
