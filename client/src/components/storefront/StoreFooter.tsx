import { assets } from "@/lib/assets";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "wouter";

export function StoreFooter() {
  return (
    <footer className="mt-24 bg-[#17110f] text-white">
      <div className="container grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <img src={assets.logoMaster} alt="RedVeg" className="h-28 w-28 rounded-2xl object-contain" />
          <p className="mt-5 text-sm leading-6 text-white/60">Fresh meat and seafood, carefully sourced, cut to order and delivered across Kolkata.</p>
          <div className="mt-6 space-y-3 text-sm text-white/70">
            <p className="flex items-center gap-2"><MapPin className="size-4 text-[#72B556]" /> Dumdum Cantonment, Kolkata 700065</p>
            <p className="flex items-center gap-2"><Phone className="size-4 text-[#72B556]" /> +91 89105 58446</p>
            <p className="flex items-center gap-2"><Mail className="size-4 text-[#72B556]" /> support@redveg.in</p>
          </div>
        </div>
        <FooterGroup title="Shop" links={["Chicken", "Mutton", "Fish", "Prawns", "Combos"]} />
        <FooterGroup title="Help" links={["Delivery areas", "FAQs", "Contact us", "Order support"]} />
        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.15em] text-white/45">Delivery hours</h3>
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
            <Clock3 className="size-5 text-[#72B556]" />
            <p className="mt-3 font-bold">Every day</p>
            <p className="mt-1 text-sm text-white/55">9:00 AM – 8:00 PM</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-3 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 RedVeg. All rights reserved.</span>
          <span>Privacy · Terms · Refund policy</span>
        </div>
      </div>
    </footer>
  );
}

function FooterGroup({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-black uppercase tracking-[0.15em] text-white/45">{title}</h3>
      <div className="mt-5 space-y-3">
        {links.map((link) => <Link key={link} href="/shop" className="block text-sm font-semibold text-white/75 transition-colors hover:text-white">{link}</Link>)}
      </div>
    </div>
  );
}
