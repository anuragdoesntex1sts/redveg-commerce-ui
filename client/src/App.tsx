import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/CartContext";
import NotFound from "@/pages/NotFound";
import { lazy, Suspense, useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

const HomePage = lazy(() => import("@/pages/storefront/HomePage"));
const ShopPage = lazy(() => import("@/pages/storefront/ShopPage"));
const ProductPage = lazy(() => import("@/pages/storefront/ProductPage"));
const CartPage = lazy(() => import("@/pages/storefront/CartPage"));
const CheckoutPage = lazy(() => import("@/pages/storefront/CheckoutPage"));
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const AdminOrders = lazy(() => import("@/pages/admin/AdminOrders"));
const AdminCatalog = lazy(() => import("@/pages/admin/AdminCatalog"));
const AdminOffers = lazy(() => import("@/pages/admin/AdminOffers"));
const AdminModule = lazy(() => import("@/pages/admin/AdminModule"));

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return null;
}

function RouteLoader() {
  return <div className="grid min-h-screen place-items-center bg-[#FFFDF9]"><div className="text-center"><div className="mx-auto size-9 animate-spin rounded-full border-2 border-[#E9D8D4] border-t-[#B4232C]" /><p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-[#B4232C]">Preparing RedVeg</p></div></div>;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<RouteLoader />}>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/product/:slug" component={ProductPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/admin/orders" component={AdminOrders} />
          <Route path="/admin/catalog" component={AdminCatalog} />
          <Route path="/admin/offers" component={AdminOffers} />
          <Route path="/admin/coupons" component={AdminModule} />
          <Route path="/admin/delivery" component={AdminModule} />
          <Route path="/admin/customers" component={AdminModule} />
          <Route path="/admin/analytics" component={AdminModule} />
          <Route path="/admin/settings" component={AdminModule} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <CartProvider>
            <Router />
            <Toaster richColors position="top-center" />
          </CartProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
