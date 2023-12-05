import { prisma } from "@/_lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { type: "email", placeholder: "Insira seu email" },
        password: { type: "password", placeholder: "Insira sua senha" },
      },
      async authorize(credentials, req): Promise<any> {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user) {
          throw new Error("Email incorreto!");
        }

        const password = await bcrypt.compare(
          credentials?.password!,
          user.password!
        );

        if (!password) {
          throw new Error("Senha incorreta!");
        }

        return { ...user };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET_CLIENT!,
      authorization: {
        params: {
          scope:
            "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid",
        },
      },
      idToken: true,
    }),
  ],
  secret: process.env.SECRET,
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },

  callbacks: {
    async session({ session }) {
      const user =
        (await prisma.user.findUnique({
          where: {
            email: session.user?.email!,
          },
        })) ?? undefined;
      return {
        ...session,
        user,
      };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
