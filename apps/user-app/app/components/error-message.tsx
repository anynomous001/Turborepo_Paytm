import { TriangleIcon } from "lucide-react"

export default function ErrorMessage({ error }: { error: string }) {
    return (
        <div
            className="flex w-full items-center text-red-500 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-sm gap-2 mb-4 pb-4"

            role="alert"
        >

            <TriangleIcon className="h-4 w-4 text-red-500" />
            <span className="sr-only">Error</span>
            <div>{error}</div>
        </div>

    )
}