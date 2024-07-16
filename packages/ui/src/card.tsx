export function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="mt-4 p-2 py-4 bg-slate-200 h-fit  w-[30vw]">
      <h1 className="text-xl font-semibold ml-4">
        {title}
      </h1>
      <div>{children}</div>
    </div>
  );
}
