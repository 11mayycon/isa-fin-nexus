'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface BalanceCardProps {
  currentBalance: number;
  variation: number;
  variationAmount: number;
}

export function BalanceCard({ currentBalance, variation, variationAmount }: BalanceCardProps) {
  const isPositive = variation > 0;
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <Card className="glass hover-lift">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
              <Wallet className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-card-foreground">Saldo Atual</h3>
          </div>
        </div>
        
        <div className="space-y-2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-3xl font-bold text-card-foreground">
              {formatCurrency(currentBalance)}
            </p>
          </motion.div>
          
          <div className="flex items-center space-x-2">
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
              isPositive 
                ? 'bg-success/20 text-success' 
                : 'bg-destructive/20 text-destructive'
            }`}>
              {isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>{Math.abs(variation).toFixed(1)}%</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {isPositive ? '+' : ''}{formatCurrency(variationAmount)} este mês
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}