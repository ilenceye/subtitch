import { useEffect, useState } from "react";

import { mergeImages } from "@/lib/business";
import { Config, Screenshot } from "@/types";

export const usePreviewImage = (screenshots: Screenshot[], config: Config) => {
  const { annotation } = config;
  const [previewImageUrl, setPreviewImageUrl] = useState<string>();

  useEffect(() => {
    if (screenshots.length > 0) {
      mergeImages(
        {
          screenshots,
          annotation: { text: annotation.text, position: annotation.position },
        },
        (outputImageUrl) => {
          setPreviewImageUrl(outputImageUrl);
        },
      );
    } else {
      setPreviewImageUrl(undefined);
    }
  }, [screenshots, annotation.text, annotation.position]);

  return previewImageUrl;
};
