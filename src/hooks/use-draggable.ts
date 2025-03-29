import { useRef, useState } from "react";

export type UseDraggableOptions = {
  initialTopPcnt?: number;
  topPcntRange?: [number, number];
};

const DEFAULT_OPTIONS: Required<UseDraggableOptions> = {
  initialTopPcnt: 0,
  topPcntRange: [-Infinity, Infinity],
};

export const useDraggable = <T extends HTMLElement>(
  options?: UseDraggableOptions,
) => {
  const { initialTopPcnt, topPcntRange } = { ...DEFAULT_OPTIONS, ...options };

  const [topPcnt, setTopPcnt] = useState(initialTopPcnt);
  const ref = useRef<T>(null);
  const isDragging = useRef(false);

  const handleMouseDown: React.MouseEventHandler = () => {
    isDragging.current = true;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    const node = ref.current;

    if (!isDragging.current || !node) return;

    const parent = node.parentElement;

    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();
    const dy = e.clientY - parentRect.top;
    const newTopPcnt = dy / parentRect.height;

    if (topPcntRange[0] <= newTopPcnt && newTopPcnt <= topPcntRange[1]) {
      setTopPcnt(newTopPcnt);
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return { ref, topPcnt, handleMouseDown };
};
