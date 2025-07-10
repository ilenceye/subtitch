import { EmptyState } from "@/components/empty-state";
import { ScreenshotList } from "@/components/screenshot-list";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FilePicker } from "@/components/ui/file-picker";
import { useConfigContext } from "@/context/config-provider";
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
  const { setAnnotationText } = useConfigContext();

  const handleSceenshotsUpload = (filelist: FileList) => {
    const newImageUrls = Array.from(filelist, URL.createObjectURL);
    const newScreenshots = fromImageSrcsToScreenshots(newImageUrls);

    onScreenshotsChange([...screenshots, ...newScreenshots]);
  };

  const handleClear = () => {
    onScreenshotsChange([]);
    setAnnotationText("");
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>
          <FileImage className="size-4 text-slate-500" /> 已上传截图
        </Card.Title>
        <Card.Menu>
          <FilePicker
            accept={["image/*"]}
            title="添加屏幕截图"
            className={buttonVariants({
              variant: "ghost",
              class:
                "size-8 rounded text-slate-500 hover:bg-slate-100 hover:text-slate-700",
            })}
            onUpload={handleSceenshotsUpload}
          >
            <Plus />
          </FilePicker>
          <Button
            variant="ghost"
            className="size-8 rounded text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            title="清空已上传截图"
            disabled={screenshots.length === 0}
            onClick={handleClear}
          >
            <Trash2 />
          </Button>
        </Card.Menu>
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
        点击上方的"添加屏幕截图"按钮上传字幕截图
      </EmptyState.Description>
    </EmptyState>
  );
}
