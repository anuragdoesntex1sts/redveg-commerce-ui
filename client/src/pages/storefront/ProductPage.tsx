import { ProductCard } from "@/components/storefront/ProductCard";
import { StoreShell } from "@/components/storefront/StoreShell";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/data/mock";
import { BadgeCheck, ChevronLeft, Clock3, MapPin, Minus, Plus, ShieldCheck, Star, ThermometerSnowflake } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Link, useRoute } from "wouter";

export default function ProductPage() {
  const [, params] = useRoute("/product/:slug");
  const product = products.find((entry) => entry.slug === params?.slug) ?? products[0];
  const [variantId, setVariantId] = useState(product.variants.find((variant) => variant.available)?.id ?? product.variants[0].id);
  const [quantity, setQuantity] = useState(1);
  const variant = product.variants.find((entry) => entry.id === variantId) ?? product.variants[0];
  const { addItem } = useCart();
  const related = products.filter((entry) => entry.id !== product.id && (entry.category === product.category || entry.featured)).slice(0, 4);

  const add = () => {
    addItem(product.id, variant.id, quantity);
    toast.success("Added to your basket", { description: `${quantity} × ${product.name} (${variant.label})` });
  };

  return (
    <StoreShell>
      <div className="container py-6 sm:py-10">
        <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition hover:text-[#B4232C]"><ChevronLeft className="size-4" /> Back to fresh cuts</Link>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
          <div className="overflow-hidden rounded-[2rem] bg-[#F5EFE9] shadow-[0_20px_55px_rgba(61,33,27,.08)]"><img src={product.image} alt={product.name} className="aspect-[4/3] size-full object-cover" /></div>
          <div className="flex flex-col justify-center">
            {product.badge && <span className="w-fit rounded-full bg-[#FCE8E7] px-3 py-1.5 text-xs font-black uppercase tracking-wide text-[#B4232C]">{product.badge}</span>}
            <h1 className="mt-4 font-display text-4xl font-black tracking-[-0.045em] sm:text-5xl">{product.name}</h1>
            <p className="mt-3 text-base font-semibold text-muted-foreground">{product.shortDescription}</p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm"><span className="flex items-center gap-1 font-black text-[#267345]"><Star className="size-4 fill-current" /> {product.rating}</span><span className="text-muted-foreground">{product.reviewCount} verified reviews</span><span className="flex items-center gap-1.5 font-bold"><Clock3 className="size-4 text-[#B4232C]" /> Delivery in {product.deliveryMinutes} min</span></div>
            <p className="mt-7 max-w-xl text-sm leading-7 text-[#655955]">{product.description}</p>
            <div className="mt-8"><p className="text-xs font-black uppercase tracking-[0.15em] text-muted-foreground">Choose pack size</p><div className="mt-3 flex flex-wrap gap-3">{product.variants.map((entry) => <button key={entry.id} disabled={!entry.available} onClick={() => setVariantId(entry.id)} className={`min-w-28 rounded-2xl border p-3 text-left transition ${entry.id === variantId ? "border-[#B4232C] bg-[#FCE9E8] shadow-[0_0_0_3px_rgba(180,35,44,.08)]" : "border-[#E2D8D2] bg-white hover:border-[#B4232C]/40"} disabled:cursor-not-allowed disabled:opacity-40`}><span className="block text-sm font-black">{entry.label}</span><span className="mt-1 block text-xs text-muted-foreground">{entry.available ? `₹${entry.price}` : "Unavailable"}</span></button>)}</div></div>
            <div className="mt-7 flex items-center gap-4"><div><p className="text-3xl font-black tracking-tight">₹{variant.price * quantity}</p>{variant.mrp && <p className="mt-1 text-xs text-muted-foreground"><span className="line-through">₹{variant.mrp * quantity}</span> · You save ₹{(variant.mrp - variant.price) * quantity}</p>}</div><div className="ml-auto flex h-12 items-center rounded-full border border-[#E2D8D2] bg-white p-1"><button onClick={() => setQuantity((current) => Math.max(1, current - 1))} className="grid size-9 place-items-center rounded-full hover:bg-[#F6F1EC]" aria-label="Decrease quantity"><Minus className="size-4" /></button><span className="w-8 text-center text-sm font-black">{quantity}</span><button onClick={() => setQuantity((current) => Math.min(10, current + 1))} className="grid size-9 place-items-center rounded-full hover:bg-[#F6F1EC]" aria-label="Increase quantity"><Plus className="size-4" /></button></div></div>
            <Button onClick={add} disabled={!variant.available} className="mt-6 h-14 rounded-full bg-[#B4232C] text-base font-black text-white shadow-[0_14px_32px_rgba(180,35,44,.22)] hover:bg-[#951D24]">Add to basket · ₹{variant.price * quantity}</Button>
            <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#EAF4E8] p-4 text-sm text-[#275F3C]"><MapPin className="size-5 shrink-0" /><span><strong>Delivery available</strong> to Dumdum Cantonment 700065 today.</span></div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-xs font-bold text-muted-foreground sm:grid-cols-3"><span className="flex items-center gap-2"><ThermometerSnowflake className="size-4 text-[#267345]" /> Temperature controlled</span><span className="flex items-center gap-2"><ShieldCheck className="size-4 text-[#267345]" /> Hygienically packed</span><span className="flex items-center gap-2"><BadgeCheck className="size-4 text-[#267345]" /> Quality checked</span></div>
          </div>
        </div>
      </div>
      <section className="mt-12 bg-[#F6F1EC] py-16"><div className="container"><h2 className="font-display text-3xl font-black tracking-[-0.04em]">You may also like</h2><div className="mt-7 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">{related.map((entry) => <ProductCard key={entry.id} product={entry} />)}</div></div></section>
    </StoreShell>
  );
}
