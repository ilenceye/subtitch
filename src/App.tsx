import { EditPanel } from "@/components/edit-panel";
import { PreviewPanel } from "@/components/preview-panel";

export default function App() {
  return (
    <div className="h-screen p-4">
      <div className="mx-auto h-full max-w-7xl">
        <div className="grid h-full grid-cols-2 gap-4">
          <EditPanel />
          <PreviewPanel />
        </div>
      </div>
    </div>
  );
}
