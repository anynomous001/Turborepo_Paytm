'use client'

import { Appbar } from "@repo/ui/Appbar";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AppbarClient = () => {
    const router = useRouter();

    const { data: session } = useSession();
    console.log(session + " client server")

    return (
        <>
            <Appbar
                onSignin={signIn}
                onSignout={async () => {
                    await signOut();
                    router.push('/api/auth/signin');
                }}
                user={session?.user}
            />
        </>
    );
};

export default AppbarClient;
