declare module "next-auth" {
  interface Session {
    accessToken: string;
  }
}

declare global {
  export interface user {
    id: string;
  }
  export interface tag {
    tag: string;
  }
  export interface FlowerInfo {
    id: string;
    title: string;
    description: string;
    imgUrl?: string;
    alt: string;
    price: number;
    salePrice?: number | null;
    flowersLiked?: Array<user>;
    shoppingList?: Array<user>;
    tags?: Array<tag>;
    users?: Array<{ id: string }>;
  }
}
export {};
