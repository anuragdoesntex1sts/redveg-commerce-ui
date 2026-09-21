import { ProductCard } from "@/components/storefront/ProductCard";
import { StoreShell } from "@/components/storefront/StoreShell";
import { categories, products } from "@/data/mock";
import { ChevronDown, Filter, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useLocation } from "wouter";

export default function ShopPage() {
  const [location] = useLocation();
  const params = new URLSearchParams(location.split("?")[1] ?? "");
  const initialCategory = params.get("category") ?? "all";
  const initialSearch = params.get("q") ?? "";
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState(initialSearch);
  const [sort, setSort] = useState("popular");

  const filtered = useMemo(() => {
    const result = products.filter((product) => (category === "all" || product.category === category) && (!search.trim() || `${product.name} ${product.shortDescription}`.toLowerCase().includes(search.toLowerCase())));
    if (sort === "price-low") return [...result].sort((a, b) => a.variants[0].price - b.variants[0].price);
    if (sort === "price-high") return [...result].sort((a, b) => b.variants[0].price - a.variants[0].price);
    if (sort === "rating") return [...result].sort((a, b) => b.rating - a.rating);
    return result;
  }, [category, search, sort]);

  return (
    <StoreShell>
      <section className="border-b border-black/5 bg-[#F6F1EC]">
        <div className="container py-10 sm:py-14">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#B4232C]">Fresh catalogue</p>
          <div className="mt-3 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><h1 className="font-display text-4xl font-black tracking-[-0.045em] sm:text-5xl">Shop all fresh cuts</h1><p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">Chicken, mutton, fish, prawns and non-vegetarian combos—nothing else.</p></div><Link href="/" className="text-sm font-bold text-[#B4232C]">Home / <span className="text-muted-foreground">Shop</span></Link></div>
        </div>
      </section>
      <section className="container py-8 sm:py-12">
        <div className="flex gap-3 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button onClick={() => setCategory("all")} className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-black transition ${category === "all" ? "bg-[#17110F] text-white" : "bg-white ring-1 ring-black/10 hover:ring-[#B4232C]/30"}`}>All cuts</button>
          {categories.map((entry) => <button key={entry.id} onClick={() => setCategory(entry.id)} className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-black transition ${category === entry.id ? "bg-[#B4232C] text-white" : "bg-white ring-1 ring-black/10 hover:ring-[#B4232C]/30"}`}>{entry.name}</button>)}
        </div>
        <div className="mt-5 grid gap-4 rounded-[1.35rem] bg-white p-3 shadow-[0_10px_30px_rgba(61,33,27,.055)] ring-1 ring-black/[0.045] md:grid-cols-[1fr_auto_auto]">
          <label className="relative"><Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><input value={search} onChange={(event) => setSearch(event.target.value)} className="h-11 w-full rounded-xl bg-[#F6F1EC] pl-10 pr-4 text-sm outline-none ring-[#B4232C]/20 transition focus:ring-4" placeholder="Search within fresh cuts" /></label>
          <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-black/8 px-4 text-sm font-bold md:hidden"><Filter className="size-4" /> Filters</button>
          <div className="relative"><SlidersHorizontal className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><select value={sort} onChange={(event) => setSort(event.target.value)} className="h-11 min-w-48 appearance-none rounded-xl border border-black/8 bg-white pl-10 pr-9 text-sm font-bold outline-none"><option value="popular">Most popular</option><option value="rating">Top rated</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2" /></div>
        </div>
        <div className="mt-8 flex items-center justify-between"><div><h2 className="text-xl font-black">{category === "all" ? "All non-veg products" : categories.find((entry) => entry.id === category)?.name}</h2><p className="mt-1 text-xs text-muted-foreground">{filtered.length} products · prices updated today</p></div></div>
        {filtered.length ? <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">{filtered.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="mt-10 rounded-[1.5rem] border border-dashed border-black/15 bg-white px-6 py-16 text-center"><Search className="mx-auto size-7 text-muted-foreground" /><h3 className="mt-4 font-black">No matching fresh cuts</h3><p className="mt-2 text-sm text-muted-foreground">Try another category or a simpler search term.</p></div>}
      </section>
    </StoreShell>
  );
}
