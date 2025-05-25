export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type Screenshot = {
  id: string;
  imageUrl: string;
  clipArea: {
    topPcnt: number;
    heightPcnt: number;
  };
};

export type AnnotationPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export type Annotation = {
  text: string;
  position: AnnotationPosition;
};
