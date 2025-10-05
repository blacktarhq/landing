export default function LogoPlaceholder({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center bg-zinc-900 border-2 border-zinc-700 ${className}`}
    >
      <div className="text-zinc-500 text-4xl font-bold">LOGO</div>
    </div>
  );
}
