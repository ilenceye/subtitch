import { DragController } from "@/components/drag-controllder";
import { toPercentage } from "@/lib/helper";
import { Screenshot } from "@/types";

export function ScreenshotList({
  screenshots,
  onScreenshotsChange,
}: {
  screenshots: Screenshot[];
  onScreenshotsChange: (screenshots: Screenshot[]) => void;
}) {
  const handleSceenshotChange = (screenshot: Screenshot, idx: number) => {
    const newScreenshots =
      idx === 0
        ? screenshots.map((s) => ({ ...s, clipArea: screenshot.clipArea }))
        : screenshots.map((s) => (s.id === screenshot.id ? screenshot : s));
    onScreenshotsChange(newScreenshots);
  };

  return (
    <div className="space-y-4">
      {screenshots.map((item, idx) => (
        <ScreenshotListItem
          key={item.id}
          idx={idx}
          screenshot={item}
          onScreenshotChange={(screenshot) =>
            handleSceenshotChange(screenshot, idx)
          }
        />
      ))}
    </div>
  );
}

export function ScreenshotListItem({
  idx,
  screenshot,
  onScreenshotChange,
}: {
  idx: number;
  screenshot: Screenshot;
  onScreenshotChange: (screenshot: Screenshot) => void;
}) {
  const topDragCtrlTopPcnt = screenshot.clipArea.topPcnt;
  const bottomDragCtrlTopPcnt =
    screenshot.clipArea.topPcnt + screenshot.clipArea.heightPcnt;

  const handleDrag = (
    topDragCtrlTopPcnt: number,
    bottomDragCtrlTopPcnt: number,
  ) => {
    const clipAreaTopPcnt = Math.min(topDragCtrlTopPcnt, bottomDragCtrlTopPcnt);
    const clipAreaHeightPcnt =
      Math.max(topDragCtrlTopPcnt, bottomDragCtrlTopPcnt) - clipAreaTopPcnt;

    onScreenshotChange({
      ...screenshot,
      clipArea: { topPcnt: clipAreaTopPcnt, heightPcnt: clipAreaHeightPcnt },
    });
  };

  return (
    <div className="relative">
      <img src={screenshot.imageUrl} alt="" />
      {idx > 0 && (
        <>
          <div
            className="absolute top-0 w-full bg-black/50"
            style={{ bottom: toPercentage(1 - topDragCtrlTopPcnt, 4) }}
          />
          <div
            className="absolute bottom-0 w-full bg-black/50"
            style={{ top: toPercentage(bottomDragCtrlTopPcnt, 4) }}
          />
        </>
      )}
      <DragController
        topPcnt={topDragCtrlTopPcnt}
        onTopPcntChange={(value) => handleDrag(value, bottomDragCtrlTopPcnt)}
      />
      <DragController
        topPcnt={bottomDragCtrlTopPcnt}
        onTopPcntChange={(value) => handleDrag(topDragCtrlTopPcnt, value)}
      />
    </div>
  );
}
