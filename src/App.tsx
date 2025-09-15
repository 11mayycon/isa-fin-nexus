import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Dashboard from "@/pages/Dashboard";
import Cartoes from "@/pages/Cartoes";
import Transacoes from "@/pages/Transacoes";
import Lembretes from "@/pages/Lembretes";
import Metas from "@/pages/Metas";
import Relatorios from "@/pages/Relatorios";
import Configuracoes from "@/pages/Configuracoes";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
          <Route path="/dashboard/cartoes" element={<DashboardLayout><Cartoes /></DashboardLayout>} />
          <Route path="/dashboard/transacoes" element={<DashboardLayout><Transacoes /></DashboardLayout>} />
          <Route path="/dashboard/lembretes" element={<DashboardLayout><Lembretes /></DashboardLayout>} />
          <Route path="/dashboard/metas" element={<DashboardLayout><Metas /></DashboardLayout>} />
          <Route path="/dashboard/relatorios" element={<DashboardLayout><Relatorios /></DashboardLayout>} />
          <Route path="/dashboard/configuracoes" element={<DashboardLayout><Configuracoes /></DashboardLayout>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
