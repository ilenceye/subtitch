export type Screenshot = {
  id: string;
  imageUrl: string;
  clipArea: {
    topPcnt: number;
    heightPcnt: number;
  };
};
