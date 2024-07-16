import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/app/db";

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
    async signIn({ account, profile }) {
      // console.log(account?.provider == "google", profile != null, "GOgle");
      if (account?.provider === "google" && profile != null) {
        let prisma_user = await prisma.user.upsert({
          where: { email: profile.email! },
          update: {},
          create: {
            name: profile.name!,
            email: profile.email!,
            password: "google",
          },
        });
      }

      return true; // Do different verification for other providers that don't have `email_verified`
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        let prisma_user = await prisma.user.findFirst({
          where: { email: user.email! },
        });
        if (prisma_user) {
          token.accessToken = prisma_user.id;
          token.user = user;
        }
      }
      return token;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
