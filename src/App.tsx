import { useEffect, useState } from "react";

import { EditPanel } from "@/components/edit-panel";
import { PreviewPanel } from "@/components/preview-panel";
import { AnnotationSection } from "@/components/sidebar/annotation-section";
import { DownloadSection } from "@/components/sidebar/download-section";
import { ConfigProvider } from "@/context/config-provider";
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
    const demoScreenshots = fromImageSrcsToScreenshots(imagesPaths);
    setScreenshots(demoScreenshots);
  };

  useEffect(() => {
    if (import.meta.env.DEV) {
      loadDemoScreenshots();
    }
  }, []);

  return (
    <ConfigProvider>
      <div className="flex h-screen">
        <div className="mx-auto h-full max-w-7xl">
          <div className="grid h-full gap-4 p-4 lg:grid-cols-2">
            <EditPanel
              screenshots={screenshots}
              onScreenshotsChange={setScreenshots}
            />
            <PreviewPanel screenshots={screenshots} />
          </div>
        </div>
        <aside className="flex h-full w-[320px] shrink-0 flex-col bg-white">
          <AnnotationSection />
          <div className="grow" />
          <DownloadSection />
        </aside>
      </div>
    </ConfigProvider>
  );
}
