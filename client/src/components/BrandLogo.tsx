import { assets } from "@/lib/assets";
import { Link } from "wouter";

export function BrandLogo({ inverse = false, compact = false }: { inverse?: boolean; compact?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5" aria-label="RedVeg home">
      <span className={`grid shrink-0 place-items-center overflow-hidden rounded-2xl ${compact ? "size-10" : "size-12"} ${inverse ? "bg-white/10" : "bg-[#17110f]"}`}>
        <img src={assets.logoMark} alt="" className="size-full object-contain p-1 transition-transform duration-200 group-hover:scale-105" />
      </span>
      <span className="leading-none">
        <span className={`block font-display text-[1.35rem] font-black tracking-[-0.04em] ${inverse ? "text-white" : "text-[#B4232C]"}`}>REDVEG</span>
        {!compact && <span className={`mt-1 block text-[0.62rem] font-bold uppercase tracking-[0.22em] ${inverse ? "text-white/55" : "text-[#6E625E]"}`}>Freshness delivered</span>}
      </span>
    </Link>
  );
}
