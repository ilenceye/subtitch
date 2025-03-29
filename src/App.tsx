import { useEffect, useState } from "react";

import { EditPanel } from "@/components/edit-panel";
import { PreviewPanel } from "@/components/preview-panel";
import { fromImageSrcsToScreenshots } from "@/lib/business";
import { Screenshot } from "@/types";

const loadDemoImages = async () => {
  if (import.meta.env.DEV) {
    const a = await import("@/assets/screenshots/achtsam-morden-01.jpg");
    const b = await import("@/assets/screenshots/achtsam-morden-02.jpg");
    const c = await import("@/assets/screenshots/achtsam-morden-03.jpg");
    const d = await import("@/assets/screenshots/achtsam-morden-04.jpg");
    return [a, b, c, d].map((mod) => mod.default);
  } else {
    return [];
  }
};

export default function App() {
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);

  const loadDemoScreenshots = async () => {
    const imagesPaths = await loadDemoImages();
    const demoScreenshots = fromImageSrcsToScreenshots(imagesPaths, []);
    setScreenshots(demoScreenshots);
  };

  useEffect(() => {
    if (import.meta.env.DEV) {
      loadDemoScreenshots();
    }
  }, []);

  return (
    <div className="h-screen p-4">
      <div className="mx-auto h-full max-w-7xl">
        <div className="grid h-full grid-cols-2 gap-4">
          <EditPanel
            screenshots={screenshots}
            onScreenshotsChange={setScreenshots}
          />
          <PreviewPanel screenshots={screenshots} />
        </div>
      </div>
    </div>
  );
}
