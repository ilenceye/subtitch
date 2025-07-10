import { useEffect, useState } from "react";

import { EmptyState } from "@/components/empty-state";
import { Card } from "@/components/ui/card";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { mergeImages } from "@/lib/business";
import { AnnotationPosition, Screenshot } from "@/types";
import { FileImage } from "lucide-react";

export function PreviewPanel({ screenshots }: { screenshots: Screenshot[] }) {
  const [previewImageUrl, setPreviewImageUrl] = useState<string>();
  const [annotationText, setAnnotationText] = useState("");
  const [annotationPosition, setAnnotationPosition] =
    useLocalStorage<AnnotationPosition>("annotation-position", "bottom-right");

  useEffect(() => {
    if (screenshots.length > 0) {
      mergeImages(
        {
          screenshots,
          annotation: { text: annotationText, position: annotationPosition },
        },
        (outputImageUrl) => {
          setPreviewImageUrl(outputImageUrl);
        },
      );
    } else {
      setPreviewImageUrl(undefined);
    }
  }, [screenshots, annotationText, annotationPosition]);

  useEffect(() => {
    if (screenshots.length === 0) {
      setAnnotationText("");
    }
  }, [screenshots]);

  return (
    <Card>
      <Card.Header>
        <Card.Title>
          <FileImage className="size-4 text-slate-500" /> 预览区域
        </Card.Title>
      </Card.Header>
      <Card.Body className="overflow-auto">
        {screenshots.length > 0 ? (
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
