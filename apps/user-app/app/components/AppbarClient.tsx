
import Link from "next/link";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";
import { handleSignOut } from "../lib/actions/authActions";


export default async function AppbarClient() {

    const session = await auth();

    return (
        <div className="flex justify-between border-b px-4">
            <div className="text-lg flex flex-col justify-center">
                PayTM
            </div>
            <div className="flex flex-col justify-center pt-2">
                {!session ? (
                    <Link href="/auth/signin">
                        <Button variant="default">Sign In</Button>
                    </Link>
                ) : (
                    <form action={handleSignOut}>
                        <Button variant="default" type="submit">
                            Sign Out
                        </Button>
                    </form>
                )}
            </div>
        </div>
    );
};
