import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/storefront/ProductCard";
import { StoreShell } from "@/components/storefront/StoreShell";
import { categories, products } from "@/data/mock";
import { assets } from "@/lib/assets";
import { ArrowRight, BadgeCheck, Clock3, MapPin, ShieldCheck, Sparkles, ThermometerSnowflake } from "lucide-react";
import { Link } from "wouter";

const promises = [
  { icon: ThermometerSnowflake, title: "Freshness locked", text: "Temperature-controlled handling from source to doorstep." },
  { icon: ShieldCheck, title: "Cleaned with care", text: "Hygienic cuts prepared by trained specialists." },
  { icon: Clock3, title: "Quick local delivery", text: "Clear delivery windows across serviceable Kolkata areas." },
];

export default function HomePage() {
  return (
    <StoreShell>
      <section className="container pt-5 sm:pt-7">
        <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] bg-[#17110f] text-white shadow-[0_24px_70px_rgba(46,24,20,.18)] sm:min-h-[560px] lg:min-h-[590px]">
          <img src={assets.hero} alt="Fresh meat and seafood arranged for RedVeg" className="absolute inset-0 size-full object-cover object-center lg:object-right" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(19,12,10,.96)_0%,rgba(19,12,10,.88)_34%,rgba(19,12,10,.35)_67%,rgba(19,12,10,.08)_100%)]" />
          <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_15%_20%,rgba(180,35,44,.55),transparent_34%)]" />
          <div className="relative z-10 flex min-h-[520px] max-w-2xl flex-col justify-center px-6 py-14 sm:min-h-[560px] sm:px-12 lg:min-h-[590px] lg:px-16">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.15em] backdrop-blur">
              <span className="size-2 rounded-full bg-[#72B556] shadow-[0_0_0_5px_rgba(114,181,86,.12)]" /> Delivering fresh across Kolkata
            </div>
            <h1 className="mt-7 max-w-[640px] font-display text-[3.1rem] font-black leading-[0.96] tracking-[-0.055em] sm:text-6xl lg:text-[5rem]">
              Fresh cuts.<br /><span className="text-[#F05B5F]">Properly done.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/70 sm:text-lg">Premium chicken, mutton, fish and seafood—cleaned to your preference, hygienically packed and ready for your kitchen.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/shop" className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-[#D62F37] px-7 text-sm font-black text-white shadow-[0_14px_35px_rgba(214,47,55,.28)] transition hover:bg-[#E53A42] active:scale-[.97]">Shop fresh cuts <ArrowRight className="size-4" /></Link>
              <button className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15"><MapPin className="size-4 text-[#86CC68]" /> Check delivery area</button>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold text-white/65">
              <span className="flex items-center gap-2"><BadgeCheck className="size-4 text-[#86CC68]" /> 4.9 Google rating · 275 reviews</span>
              <span className="flex items-center gap-2"><BadgeCheck className="size-4 text-[#86CC68]" /> No frozen stock</span>
              <span className="flex items-center gap-2"><BadgeCheck className="size-4 text-[#86CC68]" /> Cut to order</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16 sm:py-20">
        <SectionHeading eyebrow="Find your cut" title="What are you cooking today?" description="Only premium non-vegetarian essentials, arranged so the right cut is never more than a tap away." />
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {categories.map((category, index) => (
            <Link key={category.id} href={`/shop?category=${category.id}`} className="group relative overflow-hidden rounded-[1.4rem] p-3.5 ring-1 ring-black/[0.04] transition duration-200 hover:-translate-y-1 hover:shadow-xl" style={{ background: category.accent }}>
              <div className="aspect-square overflow-hidden rounded-[1rem] bg-white/50"><img src={category.image} alt="" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" /></div>
              <div className="mt-3 flex items-center justify-between"><div><h3 className="text-sm font-black sm:text-base">{category.name}</h3><p className="mt-1 hidden text-[0.68rem] leading-4 text-[#645852] lg:block">{category.description}</p></div><ArrowRight className="size-4 shrink-0 text-[#B4232C] transition-transform group-hover:translate-x-1" /></div>
              <span className="absolute right-3 top-3 grid size-6 place-items-center rounded-full bg-white text-[0.62rem] font-black text-[#B4232C]">0{index + 1}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#F6F1EC] py-16 sm:py-20">
        <div className="container">
          <div className="flex items-end justify-between gap-4"><SectionHeading eyebrow="Most loved" title="Everyone’s ordering these" description="Reliable favourites with clear pack sizes, prices and delivery expectations." /><Link href="/shop" className="hidden shrink-0 items-center gap-2 pb-2 text-sm font-black text-[#B4232C] sm:flex">View all <ArrowRight className="size-4" /></Link></div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">{products.filter((product) => product.bestseller).map((product) => <ProductCard key={product.id} product={product} />)}</div>
        </div>
      </section>

      <section className="container py-16 sm:py-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#B4232C] px-6 py-10 text-white shadow-[0_20px_55px_rgba(180,35,44,.18)] sm:px-10 lg:px-14 lg:py-14">
          <div className="absolute -right-16 -top-24 size-80 rounded-full bg-[#E5474E] opacity-60 blur-2xl" />
          <div className="absolute bottom-0 right-[12%] size-36 rounded-t-full border-[22px] border-[#72B556]/30" />
          <div className="relative z-10 grid items-center gap-7 lg:grid-cols-[1fr_auto]">
            <div><p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-white/70"><Sparkles className="size-4" /> Sunday table special</p><h2 className="mt-4 font-display text-3xl font-black tracking-[-0.04em] sm:text-5xl">A full family spread for ₹1,499</h2><p className="mt-4 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">Chicken curry cut, premium mutton and cleaned tiger prawns—planned as one generous weekend combo. Available while stocks last.</p></div>
            <Link href="/product/sunday-family-combo" className="inline-flex h-12 w-fit items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-black text-[#B4232C] shadow-lg transition hover:-translate-y-0.5">Explore combo <ArrowRight className="size-4" /></Link>
          </div>
        </div>
      </section>

      <section className="container pb-6 pt-4 sm:pb-12">
        <SectionHeading eyebrow="The RedVeg standard" title="Freshness you can see. Care you can trust." centered />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {promises.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-[1.5rem] bg-white p-6 shadow-[0_12px_36px_rgba(61,33,27,.06)] ring-1 ring-black/[0.045]">
              <span className="grid size-12 place-items-center rounded-2xl bg-[#E8F3E5] text-[#267345]"><Icon className="size-5" /></span><h3 className="mt-5 text-lg font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </StoreShell>
  );
}

function SectionHeading({ eyebrow, title, description, centered = false }: { eyebrow: string; title: string; description?: string; centered?: boolean }) {
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#B4232C]">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-black tracking-[-0.04em] text-[#251B18] sm:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">{description}</p>}
    </div>
  );
}
