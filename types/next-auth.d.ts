import { User } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    id: string;
    sessionToken: string;
    userId: string;
    expires: string;
    user: User;
  }
}
