import { AnnotationPositionPicker } from "@/components/sidebar/annotation-position-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AnnotationSection() {
  return (
    <div className="space-y-4 border-b p-4">
      <div className="font-bold">标注</div>
      <div className="grid gap-2">
        <Label htmlFor="text">内容</Label>
        <Input
          id="text"
          name="text"
          autoComplete="off"
          placeholder="请输入文字标注内容..."
        />
      </div>
      <div className="grid gap-2">
        <Label>位置</Label>
        <AnnotationPositionPicker defaultValue="bottom-right" />
      </div>
    </div>
  );
}
