import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@radix-ui/react-label";
import { TypeIcon } from "lucide-react";

export function AnnotationPopover({
  initialAnnotation,
  onAnnotationChanage,
}: {
  initialAnnotation: string;
  onAnnotationChanage: (annotation: string) => void;
}) {
  const label = initialAnnotation === "" ? "添加标注" : "编辑标注";

  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const annotation = data.get("annotation") as string;

    setIsOpen(false);

    if (annotation !== initialAnnotation) {
      setTimeout(() => {
        onAnnotationChanage(annotation);
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
        <form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="annotation">{label}</Label>
            <Input
              id="annotation"
              name="annotation"
              className="mt-2"
              defaultValue={initialAnnotation}
              autoComplete="off"
              placeholder="请输入文字标注内容..."
            />
          </div>
          <div className="mt-4 flex justify-end gap-2">
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
