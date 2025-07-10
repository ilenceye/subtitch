import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";

export function DownloadSection() {
  return (
    <div className="space-y-4 bg-slate-100 p-4">
      <div className="font-bold">下载</div>
      <Button className="w-full" size="lg">
        <DownloadIcon /> 保存预览图
      </Button>
    </div>
  );
}
