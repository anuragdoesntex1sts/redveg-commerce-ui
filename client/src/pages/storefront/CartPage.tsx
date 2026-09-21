import { StoreShell } from "@/components/storefront/StoreShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { ArrowRight, Minus, Plus, ShieldCheck, ShoppingBag, Trash2, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "wouter";

export default function CartPage() {
  const { resolvedItems, subtotal, deliveryFee, total, updateQuantity, removeItem } = useCart();
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const discount = couponApplied ? Math.min(100, subtotal) : 0;

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "REDVEG100") {
      setCouponApplied(true);
      toast.success("Coupon applied", { description: "₹100 saved on this order." });
    } else {
      toast.error("Coupon not recognized", { description: "Try REDVEG100 for this demo." });
    }
  };

  if (!resolvedItems.length) {
    return <StoreShell><div className="container py-20 sm:py-28"><div className="mx-auto max-w-lg rounded-[2rem] bg-white p-8 text-center shadow-[0_20px_60px_rgba(61,33,27,.08)] sm:p-12"><span className="mx-auto grid size-16 place-items-center rounded-full bg-[#F8E7E5] text-[#B4232C]"><ShoppingBag className="size-7" /></span><h1 className="mt-6 font-display text-3xl font-black">Your basket is waiting</h1><p className="mt-3 text-sm leading-6 text-muted-foreground">Choose from today’s fresh chicken, mutton, fish and seafood cuts.</p><Link href="/shop" className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-[#B4232C] px-6 text-sm font-black text-white">Explore fresh cuts <ArrowRight className="size-4" /></Link></div></div></StoreShell>;
  }

  return (
    <StoreShell>
      <div className="container py-10 sm:py-14">
        <div><p className="text-xs font-black uppercase tracking-[0.18em] text-[#B4232C]">Your basket</p><h1 className="mt-2 font-display text-4xl font-black tracking-[-0.04em]">Fresh cuts, almost home.</h1></div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_390px]">
          <div className="space-y-4">
            {resolvedItems.map((item) => (
              <article key={`${item.productId}-${item.variantId}`} className="grid grid-cols-[92px_1fr] gap-4 rounded-[1.4rem] bg-white p-3 shadow-[0_10px_30px_rgba(61,33,27,.055)] ring-1 ring-black/[0.045] sm:grid-cols-[130px_1fr_auto] sm:p-4">
                <img src={item.product.image} alt="" className="aspect-square size-[92px] rounded-2xl object-cover sm:size-[130px]" />
                <div className="py-1"><h2 className="font-black sm:text-lg">{item.product.name}</h2><p className="mt-1 text-sm text-muted-foreground">{item.variant.label} · {item.product.shortDescription}</p><p className="mt-3 text-lg font-black">₹{item.lineTotal}</p><button onClick={() => removeItem(item.productId, item.variantId)} className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#B4232C] sm:hidden"><Trash2 className="size-3.5" /> Remove</button></div>
                <div className="col-span-2 flex items-center justify-between border-t border-black/5 pt-3 sm:col-span-1 sm:flex-col sm:items-end sm:border-0 sm:pt-1"><div className="flex h-11 items-center rounded-full border border-[#E2D8D2] bg-white p-1"><button onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)} className="grid size-8 place-items-center rounded-full hover:bg-[#F6F1EC]" aria-label="Decrease quantity"><Minus className="size-4" /></button><span className="w-8 text-center text-sm font-black">{item.quantity}</span><button onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)} className="grid size-8 place-items-center rounded-full hover:bg-[#F6F1EC]" aria-label="Increase quantity"><Plus className="size-4" /></button></div><button onClick={() => removeItem(item.productId, item.variantId)} className="hidden items-center gap-1.5 text-xs font-bold text-[#B4232C] sm:inline-flex"><Trash2 className="size-3.5" /> Remove</button></div>
              </article>
            ))}
            <div className="flex items-center gap-3 rounded-2xl bg-[#EAF4E8] p-4 text-sm text-[#275F3C]"><Truck className="size-5 shrink-0" /><span>{subtotal >= 799 ? <><strong>You unlocked free delivery.</strong> We’ll confirm the delivery slot on WhatsApp.</> : <><strong>Add ₹{799 - subtotal} more for free delivery.</strong> Standard delivery is ₹49.</>}</span></div>
          </div>
          <aside className="h-fit rounded-[1.6rem] bg-white p-5 shadow-[0_16px_45px_rgba(61,33,27,.08)] ring-1 ring-black/[0.045] lg:sticky lg:top-40 sm:p-6">
            <h2 className="text-xl font-black">Order summary</h2>
            <div className="mt-5 flex gap-2"><Input value={coupon} onChange={(event) => setCoupon(event.target.value)} className="h-11 rounded-xl bg-[#F6F1EC]" placeholder="Coupon code" disabled={couponApplied} /><Button onClick={applyCoupon} variant="outline" className="h-11 rounded-xl bg-white font-black">Apply</Button></div>
            <p className="mt-2 text-xs text-muted-foreground">Demo code: <button className="font-bold text-[#B4232C]" onClick={() => setCoupon("REDVEG100")}>REDVEG100</button></p>
            <div className="mt-6 space-y-3 text-sm"><SummaryRow label="Subtotal" value={`₹${subtotal}`} /><SummaryRow label="Delivery" value={deliveryFee ? `₹${deliveryFee}` : "FREE"} green={!deliveryFee} />{couponApplied && <SummaryRow label="Coupon discount" value={`−₹${discount}`} green />}</div>
            <div className="my-5 border-t border-dashed border-black/15" />
            <div className="flex items-end justify-between"><div><p className="font-black">Total</p><p className="mt-1 text-xs text-muted-foreground">Taxes included</p></div><p className="text-2xl font-black">₹{total - discount}</p></div>
            <Link href="/checkout" className="mt-6 flex h-13 items-center justify-center gap-2 rounded-full bg-[#B4232C] text-sm font-black text-white shadow-[0_12px_28px_rgba(180,35,44,.2)]">Continue to checkout <ArrowRight className="size-4" /></Link>
            <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground"><ShieldCheck className="size-4 text-[#267345]" /> Order is saved before WhatsApp opens</p>
          </aside>
        </div>
      </div>
    </StoreShell>
  );
}

function SummaryRow({ label, value, green = false }: { label: string; value: string; green?: boolean }) {
  return <div className="flex justify-between gap-4"><span className="text-muted-foreground">{label}</span><span className={`font-bold ${green ? "text-[#267345]" : ""}`}>{value}</span></div>;
}
