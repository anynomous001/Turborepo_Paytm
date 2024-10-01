
import prisma from '@repo/db/client'

import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import authConfig from './auth.config'




export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    ...authConfig
})
