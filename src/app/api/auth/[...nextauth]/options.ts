import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const options: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    signOut: "/signout",
    // error: '/auth/error', // Error code passed in query string as ?error=
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "mail",
          placeholder: "Email",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials: any) {
        // Retrive credentials?
        // Id requried
        let prisma_user = await prisma.user.findFirst({
          where: { email: credentials?.email, password: credentials?.password },
        });
        return prisma_user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.id;
        token.user = user;
      }
      return token;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
