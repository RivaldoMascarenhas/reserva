import { User as UserPrisma } from "@prisma/client";
import { DefaultUser } from 'next-auth';
declare module 'next-auth' {
    interface Session {
        user?: DefaultUser & UserPrisma
    }
    interface User extends DefaultUser, UserPrisma {}
}