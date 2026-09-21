import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/types/commerce";
import { Clock3, Plus, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "wouter";

export function ProductCard({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants.find((variant) => variant.available)?.id ?? product.variants[0].id);
  const variant = product.variants.find((entry) => entry.id === variantId) ?? product.variants[0];
  const { addItem } = useCart();

  const add = () => {
    if (!variant.available) return;
    addItem(product.id, variant.id);
    toast.success(`${product.name} added`, { description: `${variant.label} · ₹${variant.price}` });
  };

  return (
    <article className="group overflow-hidden rounded-[1.4rem] bg-white shadow-[0_14px_40px_rgba(75,41,33,0.08)] ring-1 ring-black/[0.045] transition duration-200 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(75,41,33,0.13)]">
      <Link href={`/product/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-[#F5EFE9]">
        <img src={product.image} alt={product.name} className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]" />
        {product.badge && <span className="absolute left-3 top-3 rounded-full bg-[#B4232C] px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-wide text-white shadow-lg">{product.badge}</span>}
        <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-white/92 px-2.5 py-1 text-[0.68rem] font-bold text-[#4F423E] shadow-sm backdrop-blur"><Clock3 className="size-3" /> {product.deliveryMinutes} min</span>
      </Link>
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-1 text-xs font-bold text-[#267345]"><Star className="size-3.5 fill-current" /> {product.rating} <span className="font-medium text-muted-foreground">({product.reviewCount})</span></div>
        <Link href={`/product/${product.slug}`} className="mt-2 block min-h-12 text-base font-black leading-6 tracking-[-0.015em] text-[#261B18] transition-colors hover:text-[#B4232C] sm:text-lg">{product.name}</Link>
        <p className="mt-1 truncate text-xs text-muted-foreground sm:text-sm">{product.shortDescription}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {product.variants.map((entry) => (
            <button key={entry.id} onClick={() => setVariantId(entry.id)} disabled={!entry.available} className={`rounded-full border px-3 py-1.5 text-xs font-bold transition ${entry.id === variant.id ? "border-[#B4232C] bg-[#FCE9E8] text-[#B4232C]" : "border-[#E7DDD8] bg-white text-[#6E625E] hover:border-[#B4232C]/50"} disabled:cursor-not-allowed disabled:opacity-35`}>
              {entry.label}
            </button>
          ))}
        </div>

        <div className="mt-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-lg font-black tracking-tight text-[#251B18]">₹{variant.price}</p>
            {variant.mrp && <p className="text-xs text-muted-foreground"><span className="line-through">₹{variant.mrp}</span> <span className="ml-1 font-bold text-[#267345]">{Math.round((1 - variant.price / variant.mrp) * 100)}% off</span></p>}
          </div>
          <Button onClick={add} disabled={!variant.available} className="h-10 rounded-full bg-[#B4232C] px-4 font-black text-white shadow-[0_8px_18px_rgba(180,35,44,0.2)] hover:bg-[#921B22]">
            <Plus className="size-4" /> Add
          </Button>
        </div>
      </div>
    </article>
  );
}
