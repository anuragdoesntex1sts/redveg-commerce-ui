import { AdminShell } from "@/components/admin/AdminShell";
import { OrderStatusBadge } from "@/components/admin/OrderStatusBadge";
import { Button } from "@/components/ui/button";
import { orders, products, stats } from "@/data/mock";
import { AlertTriangle, ArrowRight, CalendarClock, ChevronRight, PackagePlus, Plus, TrendingUp } from "lucide-react";
import { Link } from "wouter";

export default function AdminDashboard() {
  const lowStock = products.flatMap((product) => product.variants.filter((variant) => variant.stock <= 9).map((variant) => ({ product, variant }))).slice(0, 4);
  return (
    <AdminShell title="Good morning, Amit" subtitle="Here’s what needs your attention across RedVeg today." action={<Link href="/admin/catalog?new=true"><Button className="h-11 rounded-full bg-[#B4232C] px-5 font-black text-white hover:bg-[#951D24]"><Plus className="size-4" /> Add product</Button></Link>}>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {stats.map((stat) => <div key={stat.label} className="rounded-[1.35rem] bg-white p-5 shadow-[0_12px_34px_rgba(61,33,27,.055)] ring-1 ring-black/[0.04]"><div className="flex items-start justify-between"><p className="text-sm font-bold text-muted-foreground">{stat.label}</p><span className={`grid size-9 place-items-center rounded-xl ${stat.tone === "red" ? "bg-[#FBE8E7] text-[#B4232C]" : stat.tone === "green" ? "bg-[#E8F3E5] text-[#267345]" : stat.tone === "amber" ? "bg-[#FFF0D2] text-[#996200]" : "bg-[#EFECE9] text-[#625752]"}`}><TrendingUp className="size-4" /></span></div><p className="mt-5 text-3xl font-black tracking-[-0.035em]">{stat.value}</p><p className="mt-2 text-xs font-bold text-[#267345]">{stat.trend}</p></div>)}
      </div>

      <div className="mt-7 grid gap-7 xl:grid-cols-[1.5fr_.8fr]">
        <section className="overflow-hidden rounded-[1.5rem] bg-white shadow-[0_12px_34px_rgba(61,33,27,.055)] ring-1 ring-black/[0.04]">
          <div className="flex items-center justify-between border-b border-black/5 px-5 py-5 sm:px-6"><div><h2 className="text-lg font-black">Orders needing action</h2><p className="mt-1 text-xs text-muted-foreground">Newest orders and live fulfilment status</p></div><Link href="/admin/orders" className="flex items-center gap-1 text-xs font-black text-[#B4232C]">View all <ChevronRight className="size-4" /></Link></div>
          <div className="overflow-x-auto"><table className="w-full min-w-[650px] text-left"><thead><tr className="border-b border-black/5 bg-[#FBF9F6] text-[0.65rem] font-black uppercase tracking-[0.13em] text-muted-foreground"><th className="px-6 py-3">Order</th><th className="px-4 py-3">Customer</th><th className="px-4 py-3">Placed</th><th className="px-4 py-3">Amount</th><th className="px-4 py-3">Status</th><th className="px-6 py-3" /></tr></thead><tbody>{orders.slice(0, 4).map((order) => <tr key={order.id} className="border-b border-black/5 last:border-0"><td className="px-6 py-4 font-black">{order.id}</td><td className="px-4 py-4"><p className="text-sm font-bold">{order.customer}</p><p className="mt-1 text-xs text-muted-foreground">{order.itemCount} item{order.itemCount > 1 ? "s" : ""} · {order.pincode}</p></td><td className="px-4 py-4 text-xs font-semibold text-muted-foreground">{order.placedAt}</td><td className="px-4 py-4 text-sm font-black">₹{order.total.toLocaleString("en-IN")}</td><td className="px-4 py-4"><OrderStatusBadge status={order.status} /></td><td className="px-6 py-4"><Link href="/admin/orders" className="grid size-8 place-items-center rounded-full bg-[#F5F2EE]"><ArrowRight className="size-4" /></Link></td></tr>)}</tbody></table></div>
        </section>

        <div className="space-y-7">
          <section className="rounded-[1.5rem] bg-[#17110F] p-6 text-white shadow-[0_18px_42px_rgba(32,18,15,.14)]"><div className="flex items-center justify-between"><span className="grid size-11 place-items-center rounded-2xl bg-[#B4232C]"><AlertTriangle className="size-5" /></span><span className="text-xs font-bold text-white/45">Live inventory</span></div><h2 className="mt-5 text-xl font-black">{lowStock.length} variants need stock</h2><div className="mt-5 space-y-4">{lowStock.map(({ product, variant }) => <div key={variant.id} className="flex items-center gap-3"><img src={product.image} alt="" className="size-10 rounded-xl object-cover" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{product.name}</p><p className="mt-0.5 text-xs text-white/45">{variant.label}</p></div><span className="text-xs font-black text-[#F5B8B9]">{variant.stock} left</span></div>)}</div><Link href="/admin/catalog" className="mt-6 flex h-10 items-center justify-center rounded-full bg-white text-xs font-black text-[#17110F]">Review inventory</Link></section>
          <section className="rounded-[1.5rem] bg-[#E8F3E5] p-6 text-[#244A32] ring-1 ring-[#267345]/10"><CalendarClock className="size-6 text-[#267345]" /><h2 className="mt-4 text-lg font-black">Sunday Combo is active</h2><p className="mt-2 text-sm leading-6 text-[#4D6E58]">Ends tomorrow at 11:59 PM. 12 packs remain in stock.</p><Link href="/admin/offers" className="mt-5 inline-flex items-center gap-1 text-xs font-black text-[#267345]">Manage offer <ChevronRight className="size-4" /></Link></section>
        </div>
      </div>

      <section className="mt-7 grid gap-4 md:grid-cols-3"><QuickAction icon={PackagePlus} title="Add a fresh product" text="Create details, images, variants and stock." href="/admin/catalog?new=true" /><QuickAction icon={CalendarClock} title="Schedule an offer" text="Set campaign price, start date and expiry." href="/admin/offers" /><QuickAction icon={AlertTriangle} title="Update availability" text="Pause an unavailable cut in one step." href="/admin/catalog" /></section>
    </AdminShell>
  );
}

function QuickAction({ icon: Icon, title, text, href }: { icon: typeof PackagePlus; title: string; text: string; href: string }) { return <Link href={href} className="group rounded-[1.35rem] bg-white p-5 shadow-[0_10px_30px_rgba(61,33,27,.045)] ring-1 ring-black/[0.04] transition hover:-translate-y-0.5"><span className="grid size-10 place-items-center rounded-xl bg-[#F8E8E7] text-[#B4232C]"><Icon className="size-[18px]" /></span><h3 className="mt-4 font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p><span className="mt-4 inline-flex items-center gap-1 text-xs font-black text-[#B4232C]">Open <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" /></span></Link>; }
