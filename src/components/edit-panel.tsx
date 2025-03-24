import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileImage, Plus } from "lucide-react";

export function EditPanel() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>
          <FileImage className="size-4 text-slate-500" /> 已上传截图
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <EditPanelEmptyState />
      </Card.Body>
      <Card.Footer>
        <Button className="w-full" size="lg">
          <Plus /> 添加屏幕截图
        </Button>
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
