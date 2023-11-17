import { prisma } from "@/lib/prima";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
          throw new Error("Email not found");
        }

        const password = bcrypt.compare(
          user.password,
          credentials?.password ?? ""
        );
        if (!password) {
          throw new Error("Invalid password");
        }
        return user;
      },
    }),
  ],
  secret: process.env.SECRET,
  session: { strategy: "jwt" },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
