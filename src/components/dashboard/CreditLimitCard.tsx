'use client';

import { motion } from 'framer-motion';
import { CreditCard, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface CreditLimitCardProps {
  totalLimit: number;
  usedAmount: number;
  availableAmount: number;
}

export function CreditLimitCard({ totalLimit, usedAmount, availableAmount }: CreditLimitCardProps) {
  const usagePercentage = (usedAmount / totalLimit) * 100;
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getUsageColor = (percentage: number) => {
    if (percentage < 30) return 'text-success';
    if (percentage < 70) return 'text-warning';
    return 'text-destructive';
  };

  const getProgressColor = (percentage: number) => {
    if (percentage < 30) return 'bg-success';
    if (percentage < 70) return 'bg-warning';
    return 'bg-destructive';
  };

  return (
    <Card className="glass hover-lift">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-accent" />
            </div>
            <h3 className="font-semibold text-card-foreground">Limite Total</h3>
          </div>
          {usagePercentage > 70 && (
            <AlertTriangle className="w-5 h-5 text-warning" />
          )}
        </div>
        
        <div className="space-y-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-2xl font-bold text-card-foreground">
              {formatCurrency(availableAmount)}
            </p>
            <p className="text-sm text-muted-foreground">
              Disponível de {formatCurrency(totalLimit)}
            </p>
          </motion.div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Usado</span>
              <span className={`text-sm font-medium ${getUsageColor(usagePercentage)}`}>
                {usagePercentage.toFixed(1)}%
              </span>
            </div>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Progress 
                value={usagePercentage} 
                className="h-2"
              />
            </motion.div>
            
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>Usado: {formatCurrency(usedAmount)}</span>
              <span>Total: {formatCurrency(totalLimit)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}