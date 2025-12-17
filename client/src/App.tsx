import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ProductDetail from "@/pages/ProductDetail";
import Loja from "@/pages/Loja";
import Clientes from "@/pages/Clientes";
import AdsensePage from "@/pages/AdsensePage";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/loja" component={Loja} />
      <Route path="/clientes" component={Clientes} />
      <Route path="/produto/:id" component={ProductDetail} />
      <Route path="/adsensepage" component={AdsensePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <FloatingWhatsApp />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
