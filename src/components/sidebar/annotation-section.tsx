import { AnnotationPositionPicker } from "@/components/sidebar/annotation-position-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useConfigContext } from "@/context/config-provider";

export function AnnotationSection() {
  const { annotationText, setAnnotationText } = useConfigContext();

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
          value={annotationText}
          onChange={(e) => setAnnotationText(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label>位置</Label>
        <AnnotationPositionPicker />
      </div>
    </div>
  );
}
