import { Adapter } from "next-auth/adapters";
import { prisma } from "./prisma";

export function PrismaAdapter(): Adapter {
  return {
    async createUser(user) {
      const user = await prisma.user.create({ user });
      return user;
    },
    async getUser(id) {
      const user = await prisma.user.findUniqueOrThrow({ where: { id } });
      return {
        id: user.id,
        name: user.name,
        agree: user.agree,
        company: user.company,
        createdAt: user.createdAt,
        email: user.email!,
        emailVerified: user.emailVerified,
        updatedAt: user.updatedAt,
        image: user.image,
        password: user.password,
      };
    },
    async getUserByEmail(email) {
      const user = await prisma.user.findUniqueOrThrow({ where: { email } });
      return {
        id: user.id,
        name: user.name,
        agree: user.agree,
        company: user.company,
        createdAt: user.createdAt,
        email: user.email!,
        emailVerified: user.emailVerified,
        updatedAt: user.updatedAt,
        image: user.image,
        password: user.password,
      };
    },
    async getUserByAccount({ provider, providerAccountId }) {
      const account = await prisma.account.findUniqueOrThrow({
        where: {
          provider_providerAccountId: { provider, providerAccountId },
        },
        include: {
          user: true,
        },
      });
      const userId = account?.userId;
      if (userId) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        return user || null;
      }
      return null;
    },
    async updateUser(user) {
      return await prisma.user.update({
        where: { id: user.id },
        data: {
          company: user.company,
          image: user.image,
          agree: user.agree,
          email: user.email,
        },
      });
    },
    async deleteUser(id) {
      return await prisma.user.delete({ where: { id } });
    },
    async linkAccount(data) {
      return await prisma.account.create({ data });
    },
    async unlinkAccount({ provider, providerAccountId }) {
      return await prisma.account.delete({
        where: {
          provider_providerAccountId: { provider, providerAccountId },
        },
      });
    },
    async getSessionAndUser(sessionToken) {
      const userAndSession = await prisma.session.findUnique({
        where: { sessionToken },
        include: { user: true },
      });
      if (!userAndSession) return null;
      const { user, ...session } = userAndSession;
      return { user, session };
    },
    async createSession(data) {
      return await prisma.session.create({ data });
    },
    async updateSession(data) {
      return await prisma.session.update({
        where: { sessionToken: data.sessionToken },
        data,
      });
    },
    async deleteSession(sessionToken) {
      return prisma.session.delete({ where: { sessionToken } });
    },
    async createVerificationToken(data) {
      const verificationToken = await prisma.verificationRequest.create({
        data,
      });
      if (verificationToken.id) delete verificationToken.id;
      return verificationToken;
    },
    async useVerificationToken({ identifier }) {
      try {
        const verificationToken = await prisma.verificationToken.delete({
          where: { identifier: identifier_token },
        });
        if (verificationToken.id) delete verificationToken.id;
        return verificationToken;
      } catch (error) {
        if (error.code === "P2025") return null;
        throw error;
      }
    },
  };
}
