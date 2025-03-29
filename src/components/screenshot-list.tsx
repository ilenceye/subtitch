import { useEffect, useState } from "react";

import { DragController } from "@/components/drag-controllder";
import { Screenshot } from "@/types";

export function ScreenshotList({
  screenshots,
  onScreenshotsChange,
}: {
  screenshots: Screenshot[];
  onScreenshotsChange: (screenshots: Screenshot[]) => void;
}) {
  const handleSceenshotChange = (screenshot: Screenshot) => {
    const newScreenshots = screenshots.map((s) =>
      s.id === screenshot.id ? screenshot : s,
    );
    onScreenshotsChange(newScreenshots);
  };

  return (
    <div className="space-y-4">
      {screenshots.map((item, idx) => (
        <ScreenshotListItem
          key={item.id}
          isFirstItem={idx === 0}
          screenshot={item}
          onScreenshotChange={handleSceenshotChange}
        />
      ))}
    </div>
  );
}

export function ScreenshotListItem({
  isFirstItem,
  screenshot,
  onScreenshotChange,
}: {
  isFirstItem: boolean;
  screenshot: Screenshot;
  onScreenshotChange: (screenshot: Screenshot) => void;
}) {
  const [topDragCtrlTopPcnt, setTopDragCtrlTopPcnt] = useState(0.9);
  const [bottomDragCtrlTopPcnt, setBottomDragCtrlTopPcnt] = useState(1);

  const clipAreaTopPcnt = Math.min(topDragCtrlTopPcnt, bottomDragCtrlTopPcnt);
  const clipAreaHeightPcnt =
    Math.max(topDragCtrlTopPcnt, bottomDragCtrlTopPcnt) - clipAreaTopPcnt;

  useEffect(() => {
    onScreenshotChange({
      ...screenshot,
      clipArea: { topPcnt: clipAreaTopPcnt, heightPcnt: clipAreaHeightPcnt },
    });
  }, [clipAreaHeightPcnt, clipAreaHeightPcnt]);

  return (
    <div className="relative">
      <img src={screenshot.imageUrl} alt="" />
      {!isFirstItem && (
        <>
          <DragController
            initialTopPcnt={0.9}
            onTopPcntChange={setTopDragCtrlTopPcnt}
          />
          <DragController
            initialTopPcnt={1}
            onTopPcntChange={setBottomDragCtrlTopPcnt}
          />
        </>
      )}
    </div>
  );
}
