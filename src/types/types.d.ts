declare module "next-auth" {
  interface Session {
    accessToken: string;
  }
}
declare global {
  export interface user {
    id: string;
  }
  export interface FlowerInfo {
    id: string;
    title: string;
    imgUrl?: string;
    alt: string;
    price: number;
    salePrice?: number | null;
    users?: Array<user>;
  }
}
export {};
