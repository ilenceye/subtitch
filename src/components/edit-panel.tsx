import { EmptyState } from "@/components/empty-state";
import { ScreenshotList } from "@/components/screenshot-list";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FilePicker } from "@/components/ui/file-picker";
import { Screenshot } from "@/types";
import { FileImage, Plus } from "lucide-react";

export function EditPanel({
  screenshots,
  onScreenshotsChange,
}: {
  screenshots: Screenshot[];
  onScreenshotsChange: (screenshots: Screenshot[]) => void;
}) {
  const handleSceenshotsUpload = (filelist: FileList) => {
    const newUrls: string[] = [];

    for (const file of filelist) {
      const url = URL.createObjectURL(file);
      newUrls.push(url);
    }

    const newScreenshots = newUrls.map((imageUrl, idx) => {
      const clipArea: Screenshot["clipArea"] =
        screenshots.length === 0 && idx === 0
          ? {
              topPcnt: 0,
              heightPcnt: 1,
            }
          : {
              topPcnt: 0.9,
              heightPcnt: 0.1,
            };

      const newScreenshot: Screenshot = {
        id: crypto.randomUUID(),
        imageUrl,
        clipArea,
      };

      return newScreenshot;
    });

    onScreenshotsChange([...screenshots, ...newScreenshots]);
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>
          <FileImage className="size-4 text-slate-500" /> 已上传截图
        </Card.Title>
      </Card.Header>
      <Card.Body className="overflow-auto">
        {screenshots.length > 0 ? (
          <ScreenshotList
            screenshots={screenshots}
            onScreenshotsChange={onScreenshotsChange}
          />
        ) : (
          <EditPanelEmptyState />
        )}
      </Card.Body>
      <Card.Footer>
        <FilePicker
          accept={["image/*"]}
          className={buttonVariants({
            variant: "default",
            size: "lg",
            class: "w-full",
          })}
          onUpload={handleSceenshotsUpload}
        >
          <Plus /> 添加屏幕截图
        </FilePicker>
      </Card.Footer>
    </Card>
  );
}

function EditPanelEmptyState() {
  return (
    <EmptyState>
      <EmptyState.Header>
        <FileImage className="text-slate-400" />
      </EmptyState.Header>
      <EmptyState.Title>暂无上传屏幕截图</EmptyState.Title>
      <EmptyState.Description>
        点击下方的"添加屏幕截图"按钮上传字幕截图
      </EmptyState.Description>
    </EmptyState>
  );
}
