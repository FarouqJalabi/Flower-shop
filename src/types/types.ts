import { FlowerInfo } from "@/components/flowers";
import { User } from "next-auth";

declare module 'next-auth' {
  interface Session {
    user: User & {
        prismaId: Number
        likedFlowers: Array<FlowerInfo>
        afterName: String
    }
  }
}

export {};