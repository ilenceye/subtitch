import { useEffect, useState } from "react";

import { AnnotationPopover } from "@/components/annotation-popover";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { mergeImages } from "@/lib/business";
import { downloadImage } from "@/lib/helper";
import { Screenshot } from "@/types";
import { Download, FileImage } from "lucide-react";

export function PreviewPanel({ screenshots }: { screenshots: Screenshot[] }) {
  const [previewImageUrl, setPreviewImageUrl] = useState<string>();
  const [annotation, setAnnotation] = useState("");

  useEffect(() => {
    if (screenshots.length > 0) {
      mergeImages({ screenshots, annotation }, (outputImageUrl) => {
        setPreviewImageUrl(outputImageUrl);
      });
    } else {
      setPreviewImageUrl(undefined);
    }
  }, [screenshots, annotation]);

  useEffect(() => {
    if (screenshots.length === 0) {
      setAnnotation("");
    }
  }, [screenshots]);

  return (
    <Card>
      <Card.Header>
        <Card.Title>
          <FileImage className="size-4 text-slate-500" /> 预览区域
        </Card.Title>
        {screenshots.length > 0 && (
          <Card.Menu>
            <AnnotationPopover
              initialAnnotation={annotation}
              onAnnotationChanage={setAnnotation}
            />
          </Card.Menu>
        )}
      </Card.Header>
      <Card.Body className="overflow-auto">
        {screenshots.length > 0 ? (
          <img src={previewImageUrl} alt="" />
        ) : (
          <PreviewPanelEmptyState />
        )}
      </Card.Body>
      <Card.Footer>
        <Button
          className="w-full"
          size="lg"
          disabled={!previewImageUrl}
          onClick={() => downloadImage(previewImageUrl!)}
        >
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
