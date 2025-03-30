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
