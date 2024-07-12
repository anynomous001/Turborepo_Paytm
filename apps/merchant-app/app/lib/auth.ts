// pages/api/auth/[...nextauth].js
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';


console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
console.log("GITHUB_CLIENT_ID:", process.env.GITHUB_CLIENT_ID);





export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || ""
        }),
    ],

    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async session({ session, token }: any) {
            session.user.id = token.sub;
            return session;
        },
    },
    debug: true,
};


