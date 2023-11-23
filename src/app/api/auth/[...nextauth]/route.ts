import { prisma } from "@/lib/prisma";
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
    }),
  ],
  secret: process.env.SECRET,
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },

  callbacks: {
    async session({ session }) {
      const userFull = await prisma.user.findUnique({
        where: {
          email: session.user?.email!,
        },
      });
      return {
        ...session,
        user: { ...userFull },
      };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
