"use client";

import { Button } from "@repo/ui/button"
import { signIn, signOut, useSession } from "next-auth/react"
import { stringify } from "querystring";

const Appbar = () => {

    const session = useSession()

    return (
        <div className="h-24 bg-gray-600 font-semibold text-xl">
            <button className="w-20 h-12" onClick={() => signIn()}>Sign in</button>
            <button className="w-20 h-12" onClick={() => signOut()}>Sign out</button>
            {JSON.stringify(session)}

        </div>
    )
}

export default Appbar


