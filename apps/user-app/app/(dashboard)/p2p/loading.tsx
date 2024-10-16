import { Skeleton } from '@/components/ui/skeleton'

const Loading = () => {
    return (
        <div className="flex  pt-20 justify-around " >
            <Skeleton className="mt-4 p-2 py-4 bg-slate-200 h-[30vh]  w-[25vw]" />
            <div className="flex flex-col gap-9 min-h-fit ">
                <Skeleton className="h-[200px] w-[380px] rounded-xl bg-slate-200" />
            </div>
        </div>)
}

export default Loading


