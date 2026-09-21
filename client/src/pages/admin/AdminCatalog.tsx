import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { products } from "@/data/mock";
import { Edit3, ImagePlus, MoreHorizontal, Plus, Search, Upload, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminCatalog() {
  const [query, setQuery] = useState("");
  const [showEditor, setShowEditor] = useState(window.location.search.includes("new=true"));
  const visible = products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <AdminShell
      title="Products & inventory"
      subtitle="Keep fresh cuts, variants, prices and availability accurate."
      action={
        <Button onClick={() => setShowEditor(true)} className="h-11 rounded-full bg-[#B4232C] px-5 font-black text-white hover:bg-[#951D24]">
          <Plus className="size-4" /> Add product
        </Button>
      }
    >
      <div className="rounded-[1.5rem] bg-white p-4 shadow-[0_12px_34px_rgba(61,33,27,.055)] ring-1 ring-black/[0.04] sm:p-5">
        <div className="relative max-w-lg">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(event) => setQuery(event.target.value)} className="h-11 rounded-xl bg-[#F7F4F1] pl-10" placeholder="Search products or variants" />
        </div>

        <div className="mt-5 space-y-3 md:hidden">
          {visible.map((product) => {
            const stock = product.variants.reduce((sum, variant) => sum + variant.stock, 0);
            return (
              <article key={product.id} className="rounded-2xl bg-[#FBF9F6] p-4 ring-1 ring-black/5">
                <div className="flex gap-3">
                  <img src={product.image} alt="" className="size-14 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-black">{product.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{product.variants.map((variant) => variant.label).join(", ")}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <span className="text-sm font-black">From ₹{Math.min(...product.variants.map((variant) => variant.price))}</span>
                      <span className={`text-xs font-black ${stock <= 9 ? "text-[#B4232C]" : "text-[#267345]"}`}>{stock} in stock</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <Switch defaultChecked={product.variants.some((variant) => variant.available)} onCheckedChange={(checked) => toast(checked ? `${product.name} is live` : `${product.name} is hidden`)} />
                    <Button variant="ghost" size="icon" onClick={() => setShowEditor(true)}><Edit3 className="size-4" /></Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-5 hidden overflow-x-auto md:block">
          <table className="w-full min-w-[860px] text-left">
            <thead><tr className="border-y border-black/5 bg-[#FBF9F6] text-[0.65rem] font-black uppercase tracking-[0.13em] text-muted-foreground"><th className="px-4 py-3">Product</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Variants</th><th className="px-4 py-3">From</th><th className="px-4 py-3">Stock</th><th className="px-4 py-3">Live</th><th className="px-4 py-3" /></tr></thead>
            <tbody>{visible.map((product) => { const stock = product.variants.reduce((sum, variant) => sum + variant.stock, 0); return <tr key={product.id} className="border-b border-black/5 hover:bg-[#FCFAF7]"><td className="px-4 py-4"><div className="flex items-center gap-3"><img src={product.image} alt="" className="size-12 rounded-xl object-cover" /><div><p className="text-sm font-black">{product.name}</p><p className="mt-1 text-xs text-muted-foreground">{product.slug}</p></div></div></td><td className="px-4 py-4 text-sm font-bold capitalize">{product.category}</td><td className="px-4 py-4 text-sm font-bold">{product.variants.map((variant) => variant.label).join(", ")}</td><td className="px-4 py-4 text-sm font-black">₹{Math.min(...product.variants.map((variant) => variant.price))}</td><td className="px-4 py-4"><span className={`text-sm font-black ${stock <= 9 ? "text-[#B4232C]" : "text-[#267345]"}`}>{stock}</span></td><td className="px-4 py-4"><Switch defaultChecked={product.variants.some((variant) => variant.available)} onCheckedChange={(checked) => toast(checked ? `${product.name} is live` : `${product.name} is hidden`)} /></td><td className="px-4 py-4"><Button variant="ghost" size="icon" onClick={() => setShowEditor(true)}><Edit3 className="size-4" /></Button><Button variant="ghost" size="icon"><MoreHorizontal className="size-4" /></Button></td></tr>; })}</tbody>
          </table>
        </div>
      </div>

      {showEditor && (
        <div className="fixed inset-0 z-[70]">
          <button className="absolute inset-0 bg-black/45 backdrop-blur-sm" onClick={() => setShowEditor(false)} aria-label="Close editor" />
          <aside className="absolute inset-y-0 right-0 w-full max-w-2xl overflow-y-auto bg-[#FFFDF9] p-5 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between"><div><p className="text-xs font-black uppercase tracking-[0.15em] text-[#B4232C]">Catalogue editor</p><h2 className="mt-2 font-display text-3xl font-black">Add a fresh product</h2><p className="mt-2 text-sm text-muted-foreground">Draft first. Publish only when content, price and stock are ready.</p></div><Button variant="ghost" size="icon" className="rounded-full bg-white" onClick={() => setShowEditor(false)}><X className="size-5" /></Button></div>
            <div className="mt-8 space-y-6">
              <div className="grid gap-5 sm:grid-cols-2"><Field label="Product name"><Input className="h-12 rounded-xl bg-white" placeholder="e.g. Ilish Bengali Cut" /></Field><Field label="Category"><select className="h-12 w-full rounded-xl border border-input bg-white px-3 text-sm"><option>Fish</option><option>Chicken</option><option>Mutton</option><option>Prawns</option><option>Crabs & Seafood</option><option>Combos</option></select></Field></div>
              <Field label="Short description"><Input className="h-12 rounded-xl bg-white" placeholder="Cleaned, descaled & curry cut" /></Field>
              <Field label="Product details"><Textarea className="min-h-28 rounded-xl bg-white" placeholder="Describe sourcing, cut and best uses" /></Field>
              <div><Label className="font-bold">Product photography</Label><button onClick={() => toast("Image uploader connected in the API integration phase.")} className="mt-2 flex min-h-40 w-full flex-col items-center justify-center rounded-[1.25rem] border border-dashed border-[#B4232C]/35 bg-[#FDF2F1] text-[#B4232C]"><span className="grid size-11 place-items-center rounded-full bg-white shadow-sm"><ImagePlus className="size-5" /></span><span className="mt-3 text-sm font-black">Upload product image</span><span className="mt-1 text-xs text-muted-foreground">JPG or PNG · 4:3 recommended</span></button></div>
              <div className="rounded-[1.25rem] bg-white p-5 ring-1 ring-black/5"><div className="flex items-center justify-between"><div><h3 className="font-black">Variants & pricing</h3><p className="mt-1 text-xs text-muted-foreground">Each pack size has its own price and stock.</p></div><Button variant="outline" className="rounded-full bg-white text-xs font-black"><Plus className="size-4" /> Variant</Button></div><div className="mt-5 grid gap-3 sm:grid-cols-[1fr_1fr_1fr_auto]"><Input className="h-11 rounded-xl" defaultValue="500 g" aria-label="Variant label" /><Input className="h-11 rounded-xl" placeholder="Price ₹" aria-label="Price" /><Input className="h-11 rounded-xl" placeholder="Stock" aria-label="Stock" /><Button variant="ghost" size="icon"><X className="size-4" /></Button></div></div>
              <div className="flex items-center justify-between rounded-[1.25rem] bg-[#EAF4E8] p-5"><div><p className="font-black text-[#275F3C]">Available for ordering</p><p className="mt-1 text-xs text-[#557662]">Customers can see and add this product.</p></div><Switch defaultChecked /></div>
              <div className="sticky bottom-0 -mx-5 flex gap-3 border-t border-black/5 bg-[#FFFDF9]/95 px-5 py-4 backdrop-blur sm:-mx-8 sm:px-8"><Button variant="outline" className="h-12 flex-1 rounded-full bg-white font-black">Save draft</Button><Button onClick={() => { toast.success("Product published in prototype"); setShowEditor(false); }} className="h-12 flex-1 rounded-full bg-[#B4232C] font-black text-white hover:bg-[#951D24]"><Upload className="size-4" /> Publish product</Button></div>
            </div>
          </aside>
        </div>
      )}
    </AdminShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-2"><Label className="font-bold">{label}</Label>{children}</div>;
}
