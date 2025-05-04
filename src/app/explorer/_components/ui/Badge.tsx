export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-fit flex items-center rounded-[0.6rem] gap-2 px-3 py-[0.3rem] bg-[#FFFFFF66] bg-blend-soft-light font-[500] text-sm">
      {children}
    </div>
  );
}
