import { BrandLogo } from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { ChevronDown, MapPin, Menu, Search, ShoppingBag, UserRound } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Link, useLocation } from "wouter";

const navItems = [
  ["Chicken", "chicken"],
  ["Mutton", "mutton"],
  ["Fish", "fish"],
  ["Prawns", "prawns"],
  ["Crabs & Seafood", "seafood"],
  ["Combos", "combos"],
] as const;

export function StoreHeader() {
  const { itemCount } = useCart();
  const [search, setSearch] = useState("");
  const [, navigate] = useLocation();

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(`/shop${search.trim() ? `?q=${encodeURIComponent(search.trim())}` : ""}`);
  };

  return (
    <>
      <div className="bg-[#17110f] text-white">
        <div className="container flex h-8 items-center justify-between text-[0.7rem] font-semibold tracking-wide">
          <span>Freshly cut · Hygienically packed · Delivered across Kolkata</span>
          <span className="hidden sm:inline">Order before 6 PM for same-day delivery</span>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-black/5 bg-[#fffdf9]/95 text-foreground shadow-[0_8px_30px_rgba(55,28,22,0.05)] backdrop-blur-xl">
        <div className="container">
          <div className="flex h-[74px] items-center gap-3 lg:h-[84px] lg:gap-7">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => toast("Category menu is available in the bar below.")} aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
            <BrandLogo compact />

            <button
              className="hidden min-w-[190px] items-center gap-2 border-l border-border pl-6 text-left lg:flex"
              onClick={() => toast.success("Delivery available in your area", { description: "Dumdum Cantonment · 700065" })}
            >
              <span className="grid size-9 place-items-center rounded-full bg-[#E9F5E8] text-[#207346]"><MapPin className="size-4" /></span>
              <span>
                <span className="block text-[0.68rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">Deliver to</span>
                <span className="mt-0.5 flex items-center gap-1 text-sm font-bold">Dumdum · 700065 <ChevronDown className="size-3.5" /></span>
              </span>
            </button>

            <form onSubmit={submitSearch} className="relative ml-auto hidden max-w-xl flex-1 md:block">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={search} onChange={(event) => setSearch(event.target.value)} className="h-12 rounded-full border-transparent bg-[#F4EFEA] pl-11 pr-4 shadow-none focus-visible:bg-white" placeholder="Search fish, chicken, mutton..." aria-label="Search products" />
            </form>

            <Button variant="ghost" className="hidden h-11 gap-2 px-3 md:inline-flex" onClick={() => toast("Customer accounts are planned for a later release.")}>
              <UserRound className="size-5" />
              <span className="hidden xl:inline">Account</span>
            </Button>
            <Link href="/cart" className="relative grid size-11 shrink-0 place-items-center rounded-full bg-[#B4232C] text-white shadow-[0_8px_22px_rgba(180,35,44,0.25)] transition-transform duration-150 active:scale-[0.97]" aria-label={`Cart with ${itemCount} items`}>
              <ShoppingBag className="size-5" />
              {itemCount > 0 && <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-[#2A7B48] px-1 text-[0.65rem] font-black leading-5 ring-2 ring-white">{itemCount}</span>}
            </Link>
          </div>

          <form onSubmit={submitSearch} className="relative mb-3 md:hidden">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={search} onChange={(event) => setSearch(event.target.value)} className="h-11 rounded-xl border-transparent bg-[#F4EFEA] pl-11" placeholder="Search fish, chicken, mutton..." aria-label="Search products" />
          </form>
        </div>

        <nav className="border-t border-black/5" aria-label="Product categories">
          <div className="container flex items-center gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:justify-center lg:gap-3">
            {navItems.map(([label, category]) => (
              <Link key={category} href={`/shop?category=${category}`} className="shrink-0 rounded-full px-4 py-2 text-sm font-bold text-[#4D403D] transition-colors hover:bg-[#F9E8E8] hover:text-[#B4232C]">
                {label}
              </Link>
            ))}
            <Link href="/shop?offer=true" className="shrink-0 rounded-full bg-[#FFF0CF] px-4 py-2 text-sm font-black text-[#8A4B00]">Offers</Link>
          </div>
        </nav>
      </header>
    </>
  );
}
