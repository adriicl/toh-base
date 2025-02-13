export interface Hero {
    id: number;
    name: string;
    description?: string;
    thumbnail: {
      path: string;
      extension: string;
    };
    comics?: {
      items: { resourceURI: string; name: string }[];
    };
    series?: {
      items: { resourceURI: string; name: string }[];
    };
}
