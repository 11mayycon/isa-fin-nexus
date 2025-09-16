import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Dashboard from "@/pages/Dashboard";
import Cartoes from "@/pages/Cartoes";
import Transacoes from "@/pages/Transacoes";
import Lembretes from "@/pages/Lembretes";
import Metas from "@/pages/Metas";
import Relatorios from "@/pages/Relatorios";
import Configuracoes from "@/pages/Configuracoes";
import Login from "@/pages/Login";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><Dashboard /></DashboardLayout></ProtectedRoute>} />
            <Route path="/dashboard/cartoes" element={<ProtectedRoute><DashboardLayout><Cartoes /></DashboardLayout></ProtectedRoute>} />
            <Route path="/dashboard/transacoes" element={<ProtectedRoute><DashboardLayout><Transacoes /></DashboardLayout></ProtectedRoute>} />
            <Route path="/dashboard/lembretes" element={<ProtectedRoute><DashboardLayout><Lembretes /></DashboardLayout></ProtectedRoute>} />
            <Route path="/dashboard/metas" element={<ProtectedRoute><DashboardLayout><Metas /></DashboardLayout></ProtectedRoute>} />
            <Route path="/dashboard/relatorios" element={<ProtectedRoute><DashboardLayout><Relatorios /></DashboardLayout></ProtectedRoute>} />
            <Route path="/dashboard/configuracoes" element={<ProtectedRoute><DashboardLayout><Configuracoes /></DashboardLayout></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
