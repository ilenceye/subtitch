import { EmptyState } from "@/components/empty-state";
import { Card } from "@/components/ui/card";
import { FileImage } from "lucide-react";

export function PreviewPanel({
  previewImageUrl,
}: {
  previewImageUrl?: string;
}) {
  return (
    <Card>
      <Card.Header>
        <Card.Title>
          <FileImage className="size-4 text-slate-500" /> 预览区域
        </Card.Title>
      </Card.Header>
      <Card.Body className="overflow-auto">
        {previewImageUrl ? (
          <img src={previewImageUrl} alt="" />
        ) : (
          <PreviewPanelEmptyState />
        )}
      </Card.Body>
    </Card>
  );
}

function PreviewPanelEmptyState() {
  return (
    <EmptyState>
      <EmptyState.Header>
        <FileImage className="text-slate-400" />
      </EmptyState.Header>
      <EmptyState.Title>暂无预览图</EmptyState.Title>
      <EmptyState.Description>
        添加并选择字幕截图后，实时查看效果
      </EmptyState.Description>
    </EmptyState>
  );
}
