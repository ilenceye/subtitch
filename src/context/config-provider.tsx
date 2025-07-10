import { createContext, useContext, useState } from "react";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { AnnotationPosition } from "@/types";

type ConfigContextType = {
  annotationText: string;
  setAnnotationText: React.Dispatch<React.SetStateAction<string>>;
  annotationPosition: AnnotationPosition;
  setAnnotationPosition: React.Dispatch<
    React.SetStateAction<AnnotationPosition>
  >;
};

const ConfigContext = createContext<ConfigContextType | null>(null);

export const useConfig = () => {
  const context = useContext(ConfigContext);

  if (context === null) {
    throw new Error("useConfig must be used inside ConfigProvider.");
  }

  return context;
};

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [annotationText, setAnnotationText] = useState("");
  const [annotationPosition, setAnnotationPosition] =
    useLocalStorage<AnnotationPosition>("annotation-position", "bottom-right");

  return (
    <ConfigContext.Provider
      value={{
        annotationText,
        setAnnotationText,
        annotationPosition,
        setAnnotationPosition,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}
