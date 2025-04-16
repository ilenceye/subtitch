import { useRef } from "react";

export type UseDraggableOptions = {
  onTopPcntChange: (topPcnt: number) => void;
  topPcntRange?: [number, number];
};

const DEFAULT_OPTIONS: Required<Pick<UseDraggableOptions, "topPcntRange">> = {
  topPcntRange: [-Infinity, Infinity],
};

export const useDraggable = <T extends HTMLElement>(
  options: UseDraggableOptions,
) => {
  const { topPcntRange, onTopPcntChange } = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

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
      onTopPcntChange(newTopPcnt);
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return { ref, handleMouseDown };
};
