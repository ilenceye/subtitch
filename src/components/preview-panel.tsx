import { EmptyState } from "@/components/empty-state";
import { PreviewImage } from "@/components/preview-image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Screenshot } from "@/types";
import { Download, FileImage } from "lucide-react";

export function PreviewPanel({ screenshots }: { screenshots: Screenshot[] }) {
  return (
    <Card>
      <Card.Header>
        <Card.Title>
          <FileImage className="size-4 text-slate-500" /> 预览区域
        </Card.Title>
      </Card.Header>
      <Card.Body className="overflow-auto">
        {screenshots.length > 0 ? (
          <PreviewImage screenshots={screenshots} />
        ) : (
          <PreviewPanelEmptyState />
        )}
      </Card.Body>
      <Card.Footer>
        <Button className="w-full" size="lg">
          <Download /> 保存预览图
        </Button>
      </Card.Footer>
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
