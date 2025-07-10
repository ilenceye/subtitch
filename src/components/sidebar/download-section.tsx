import { Button } from "@/components/ui/button";
import { useConfigContext } from "@/context/config-provider";
import { downloadImage } from "@/lib/helper";
import { DownloadIcon } from "lucide-react";

export function DownloadSection({
  previewImageUrl,
}: {
  previewImageUrl?: string;
}) {
  const { annotationText } = useConfigContext();

  return (
    <div className="space-y-4 bg-slate-100 p-4">
      <div className="font-bold">下载</div>
      <Button
        className="w-full"
        size="lg"
        disabled={!previewImageUrl}
        onClick={() => downloadImage(previewImageUrl!, annotationText)}
      >
        <DownloadIcon /> 保存预览图
      </Button>
    </div>
  );
}
