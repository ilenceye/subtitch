import { EmptyState } from "@/components/empty-state";
import { ScreenshotList } from "@/components/screenshot-list";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FilePicker } from "@/components/ui/file-picker";
import { fromImageSrcsToScreenshots } from "@/lib/business";
import { Screenshot } from "@/types";
import { FileImage, Plus, Trash2 } from "lucide-react";

export function EditPanel({
  screenshots,
  onScreenshotsChange,
}: {
  screenshots: Screenshot[];
  onScreenshotsChange: (screenshots: Screenshot[]) => void;
}) {
  const handleSceenshotsUpload = (filelist: FileList) => {
    const newImageUrls = Array.from(filelist, URL.createObjectURL);
    const newScreenshots = fromImageSrcsToScreenshots(newImageUrls);

    onScreenshotsChange([...screenshots, ...newScreenshots]);
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>
          <FileImage className="size-4 text-slate-500" /> 已上传截图
        </Card.Title>
        {screenshots.length > 0 && (
          <Card.Menu>
            <Button
              variant="ghost"
              className="size-8 rounded text-slate-500 hover:bg-slate-100 hover:text-slate-700"
              title="清空已上传截图"
              onClick={() => onScreenshotsChange([])}
            >
              <Trash2 />
            </Button>
          </Card.Menu>
        )}
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
