import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <div className="flex  pt-20 justify-around gap-6  min-h-full min-w-full" >
        <Skeleton className="mt-4 p-2 py-4 bg-slate-200 h-fit  w-[30vw]">
            <Skeleton className="text-xl font-semibold ml-4"></Skeleton>
        </Skeleton>
    </div>

}