import { useConfig } from "@/context/config-provider";
import type { AnnotationPosition } from "@/types";
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from "@radix-ui/react-radio-group";
import { CheckIcon } from "lucide-react";

const ANNOTATION_POSITIONS: AnnotationPosition[] = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
];

export function AnnotationPositionPicker() {
  const { annotationPosition, setAnnotationPosition } = useConfig();

  return (
    <RadioGroup
      name="position"
      className="grid grid-cols-2 gap-2 rounded-md border p-2"
      value={annotationPosition}
      onValueChange={(v) => setAnnotationPosition(v as AnnotationPosition)}
    >
      {ANNOTATION_POSITIONS.map((pos) => (
        <RadioGroupItem
          key={pos}
          className="flex aspect-square cursor-pointer items-center justify-center rounded-md border border-slate-200 transition-colors hover:bg-slate-100 data-[state=checked]:border-slate-400 data-[state=checked]:bg-slate-200"
          value={pos}
        >
          <RadioGroupIndicator asChild>
            <CheckIcon className="size-4" />
          </RadioGroupIndicator>
        </RadioGroupItem>
      ))}
    </RadioGroup>
  );
}
