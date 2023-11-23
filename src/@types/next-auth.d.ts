import "next-auth";
import { User as PrismaUser } from "prisma/prisma-client";
declare module "next-auth" {
  interface User extends PrismaUser {}
}
