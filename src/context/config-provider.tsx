import { createContext, useContext, useState } from "react";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { AnnotationPosition, Config } from "@/types";

//

export const useConfig = () => {
  const [annotationText, setAnnotationText] = useState("");
  const [annotationPosition, setAnnotationPosition] =
    useLocalStorage<AnnotationPosition>("annotation-position", "bottom-right");

  const config: Config = {
    annotation: {
      text: annotationText,
      position: annotationPosition,
    },
  };

  return {
    config,
    annotationText,
    annotationPosition,
    setAnnotationText,
    setAnnotationPosition,
  };
};

//

type ConfigContextType = ReturnType<typeof useConfig>;

const ConfigContext = createContext<ConfigContextType | null>(null);

export const useConfigContext = () => {
  const context = useContext(ConfigContext);

  if (context === null) {
    throw new Error("useConfig must be used inside ConfigProvider.");
  }

  return context;
};

export function ConfigProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: ConfigContextType;
}) {
  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
}
