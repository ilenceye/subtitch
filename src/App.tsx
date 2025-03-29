import { useState } from "react";

import { EditPanel } from "@/components/edit-panel";
import { PreviewPanel } from "@/components/preview-panel";
import { Screenshot } from "@/types";

export default function App() {
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);

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
