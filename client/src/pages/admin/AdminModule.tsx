import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { BarChart3, MapPinned, Settings2, Tags, Users } from "lucide-react";
import { useLocation } from "wouter";

const modules = {
  "/admin/coupons": { title: "Coupons", subtitle: "Create controlled discounts without compromising margin.", icon: Tags, stat: "4 active codes", detail: "Usage limits, date windows and minimum-order rules will connect to the pricing API." },
  "/admin/delivery": { title: "Delivery areas", subtitle: "Manage serviceability, fees and minimum orders by pincode.", icon: MapPinned, stat: "28 pincodes live", detail: "Keep area availability accurate and stop unsupported orders before checkout." },
  "/admin/customers": { title: "Customers", subtitle: "Find order history and repeat customers without exposing unnecessary data.", icon: Users, stat: "184 customers", detail: "This view will use role-aware access and redact personal data where appropriate." },
  "/admin/analytics": { title: "Reports", subtitle: "Understand sales, products and campaign sources.", icon: BarChart3, stat: "₹3.8L this month", detail: "Revenue, order value and attribution will use backend-confirmed order data." },
  "/admin/settings": { title: "Store settings", subtitle: "Configure store hours, support and order rules.", icon: Settings2, stat: "Store is open", detail: "WhatsApp number, store details, fee rules and notification preferences live here." },
};

export default function AdminModule() {
  const [location] = useLocation();
  const module = modules[location as keyof typeof modules] ?? modules["/admin/settings"];
  const Icon = module.icon;
  return <AdminShell title={module.title} subtitle={module.subtitle}><div className="rounded-[1.7rem] bg-white p-7 shadow-[0_16px_44px_rgba(61,33,27,.06)] ring-1 ring-black/[0.04] sm:p-10"><span className="grid size-14 place-items-center rounded-2xl bg-[#F8E7E6] text-[#B4232C]"><Icon className="size-6" /></span><p className="mt-7 text-xs font-black uppercase tracking-[0.16em] text-muted-foreground">Live summary</p><h2 className="mt-2 font-display text-4xl font-black tracking-[-0.04em]">{module.stat}</h2><p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">{module.detail}</p><div className="mt-8 grid gap-4 sm:grid-cols-3">{["Clear permissions", "Fast everyday actions", "Audit-ready changes"].map((item) => <div key={item} className="rounded-[1.15rem] bg-[#F7F4F1] p-4 text-sm font-bold">{item}</div>)}</div><Button className="mt-8 h-11 rounded-full bg-[#17110F] px-5 font-black text-white">Configure module</Button></div></AdminShell>;
}
