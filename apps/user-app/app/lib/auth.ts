import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import client from "@repo/db/client"


export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                phone: { label: "Phone Number", type: "text", placeholder: "123-456-789" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any) {

                const hashedPassword = await bcrypt.hash(credentials.password, 10)
                const existingUser = await client.user.findFirst({
                    where: {
                        number: credentials.phone
                    }
                });


                if (existingUser) {
                    const paswordValidation = await bcrypt.compare(credentials.password, existingUser.password)
                    if (paswordValidation) {
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.email
                        }
                    }
                    return null
                }

                try {
                    const user = await client.user.create({
                        data: {
                            number: credentials.phone,
                            password: credentials.password
                        }
                    })
                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.email
                    }
                } catch (e) {
                    console.error(e);
                }
                return null
            },

        })

    ],

    secret: process.env.JWT_SECRET || 'secret',

    callbacks: {
        async session({ token, session }: any) {
            console.log(token)
            session.user.id = token.sub
            console.log(session)
            return session
        }
    }


}
