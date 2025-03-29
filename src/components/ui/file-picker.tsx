import { useRef } from "react";

export function FilePicker({
  children = "Import",
  className,
  accept,
  id = "file-picker",
  onUpload,
}: {
  children?: React.ReactNode;
  className?: string;
  accept: string[];
  id?: string;
  onUpload?: (data: FileList) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const fileList = event.target.files;

    if (!fileList) return;

    onUpload?.(fileList);
  };

  return (
    <label
      className={className}
      htmlFor={id}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
    >
      {children}
      <input
        style={{ display: "none" }}
        id={id}
        type="file"
        multiple
        accept={accept.join(",")}
        ref={inputRef}
        onChange={handleChange}
      />
    </label>
  );
}
