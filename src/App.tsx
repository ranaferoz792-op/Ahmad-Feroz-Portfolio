import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
<<<<<<< HEAD
import WhatsAppButton from "./components/WhatsAppButton";
=======
>>>>>>> 12e4a61da714230c45878209f4faa69c40231357

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
<<<<<<< HEAD
        <WhatsAppButton />
=======
>>>>>>> 12e4a61da714230c45878209f4faa69c40231357
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
