import { AnnotationSection } from "@/components/sidebar/annotation-section";
import { DownloadSection } from "@/components/sidebar/download-section";

export function Sidebar() {
  return (
    <div className="flex h-full w-[320px] flex-col bg-white">
      <AnnotationSection />
      <div className="grow" />
      <DownloadSection />
    </div>
  );
}
