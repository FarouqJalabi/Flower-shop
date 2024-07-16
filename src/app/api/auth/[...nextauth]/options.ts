import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const options: NextAuthOptions = {
providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
  CredentialsProvider({
      name:"Credentials",
      credentials : {
        email: {
          label: "Email:",
          type:"mail",
          placeholder: "Email"
        },
        password: {
          label: "Password:",
          type:"password",
          placeholder: "Password"
        },
      },async authorize (credentials:any) {
        // Retrive credentials?
        // Id requried
        let prisma_user = await prisma.user.findFirst({where:{email:credentials?.email, password:credentials?.password}})
        return prisma_user
      },
    })
  ],
  callbacks:{
 async jwt({ token, user }) {
  return { ...token, ...user }
 }, 
    async session({ session, token, user }) {
    if (token){
      session.user.prismaId = 0;
      session.user.afterName = token.afterName as string;
      console.log(token, "token")
      console.log(user, "token")
    }
    return session
  }
    },secret:process.env.NEXTAUTH_SECRET
    
}