import 'next-auth';
import 'next-auth/jwt';
import { AdapterUser as PrismaAdapterUser } from '@next-auth/prisma-adapter';

// Extend the AdapterUser type to include the 'role' property
declare module '@next-auth/prisma-adapter' {
    interface AdapterUser extends PrismaAdapterUser {
        role: string;
    }
}

// Extend NextAuth types
declare module 'next-auth' {
    interface User {
        id: string;
        role: string;
    }

    interface Session {
        user: User;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string;
        role: string;
    }
}
