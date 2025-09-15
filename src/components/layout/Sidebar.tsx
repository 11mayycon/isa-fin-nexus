'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { 
  Home, 
  CreditCard, 
  Receipt, 
  Bell, 
  Target, 
  BarChart3, 
  Settings,
  DollarSign,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isMobile: boolean;
}

const menuItems = [
  { icon: Home, name: 'Dashboard', path: '/dashboard', description: 'Visão geral' },
  { icon: CreditCard, name: 'Meus Cartões', path: '/dashboard/cartoes', description: 'Gestão de cartões' },
  { icon: Receipt, name: 'Transações', path: '/dashboard/transacoes', description: 'Histórico financeiro' },
  { icon: Bell, name: 'Lembretes', path: '/dashboard/lembretes', description: 'Alertas importantes' },
  { icon: Target, name: 'Minhas Metas', path: '/dashboard/metas', description: 'Objetivos financeiros' },
  { icon: BarChart3, name: 'Relatórios', path: '/dashboard/relatorios', description: 'Análises detalhadas' },
  { icon: Settings, name: 'Configurações', path: '/dashboard/configuracoes', description: 'Perfil e preferências' },
];

export function Sidebar({ isOpen, onToggle, isMobile }: SidebarProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
      }
    },
    closed: {
      x: isMobile ? -280 : 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
      }
    }
  };

  const itemVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25,
      }
    },
    closed: {
      opacity: isMobile ? 0 : 1,
      x: isMobile ? -20 : 0,
    }
  };

  return (
    <motion.aside
      initial={false}
      animate={isOpen || !isMobile ? "open" : "closed"}
      variants={sidebarVariants}
      className={cn(
        "fixed left-0 top-0 bottom-0 z-50 flex flex-col",
        "glass border-r border-sidebar-border",
        isMobile ? "w-72 shadow-2xl" : "w-64"
      )}
    >
      {/* Logo Section */}
      <div className="p-6 border-b border-sidebar-border">
        <motion.div 
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-accent rounded-xl flex items-center justify-center shadow-glow">
              <DollarSign className="w-6 h-6 text-primary-foreground" />
            </div>
            <motion.div 
              className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-2 h-2 text-white" />
            </motion.div>
          </div>
          <div>
            <h2 className="text-lg font-bold gradient-text">ISA AI</h2>
            <p className="text-xs text-muted-foreground">Assistente Financeira</p>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <div className="space-y-1">
          {menuItems.map((item, index) => {
            const isActive = currentPath === item.path;
            const Icon = item.icon;

            return (
              <motion.div
                key={item.path}
                variants={itemVariants}
                initial={false}
                animate={isOpen || !isMobile ? "open" : "closed"}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={item.path}
                  className={cn(
                    "group flex items-center px-3 py-3 rounded-xl transition-all duration-200",
                    "hover:bg-sidebar-accent hover:shadow-md hover:translate-x-1",
                    isActive && "bg-primary/20 border border-primary/30 shadow-glow text-primary",
                    !isActive && "text-sidebar-foreground hover:text-primary"
                  )}
                >
                  <Icon className={cn(
                    "w-5 h-5 flex-shrink-0",
                    isMobile || isOpen ? "mr-3" : "mr-0"
                  )} />
                  
                  <div className={cn(
                    "flex-1 transition-all duration-200",
                    (!isMobile && !isOpen) && "opacity-0 w-0 overflow-hidden"
                  )}>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground group-hover:text-primary/70">
                      {item.description}
                    </p>
                  </div>

                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="w-1 h-8 bg-primary rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center space-x-3 p-3 bg-success/10 rounded-xl">
          <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className={cn(
            "flex-1 transition-all duration-200",
            (!isMobile && !isOpen) && "opacity-0 w-0 overflow-hidden"
          )}>
            <p className="text-sm font-medium text-success">Plano Premium</p>
            <p className="text-xs text-success/70">Recursos ilimitados</p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}