export default function LogoPlaceholder({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center bg-[#dcd8c0] border-2 border-[#bab5a1] ${className}`}
    >
      <div className="text-[#454138]/50 text-4xl font-light tracking-[0.5rem]">LOGO</div>
    </div>
  );
}
