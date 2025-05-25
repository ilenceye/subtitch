import { useState } from "react";

import { AnnotationPositionPicker } from "@/components/annotation-position-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Annotation, AnnotationPosition } from "@/types";
import { Label } from "@radix-ui/react-label";
import { TypeIcon } from "lucide-react";

export function AnnotationPopover({
  defaultAnnotation,
  onAnnotationChanage,
}: {
  defaultAnnotation: Annotation;
  onAnnotationChanage: (annotation: Annotation) => void;
}) {
  const label = defaultAnnotation.text === "" ? "添加标注" : "编辑标注";

  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const text = data.get("text") as string;
    const position = data.get("position") as AnnotationPosition;

    setIsOpen(false);

    if (
      text !== defaultAnnotation.text ||
      position !== defaultAnnotation.position
    ) {
      setTimeout(() => {
        onAnnotationChanage({ text, position });
      }, 150);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="size-8 rounded text-slate-500 hover:bg-slate-100 hover:text-slate-700"
          title={label}
        >
          <TypeIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="text">{label}</Label>
            <Input
              id="text"
              name="text"
              defaultValue={defaultAnnotation.text}
              autoComplete="off"
              placeholder="请输入文字标注内容..."
            />
          </div>
          <div className="grid gap-2">
            <Label>标注位置</Label>
            <AnnotationPositionPicker
              defaultValue={defaultAnnotation.position}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsOpen(false)}
            >
              取消
            </Button>
            <Button type="submit">确认</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
