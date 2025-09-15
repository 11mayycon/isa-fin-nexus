'use client';

import { motion } from 'framer-motion';
import { ArrowUpCircle, ArrowDownCircle, MoreHorizontal, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'receita' | 'despesa';
  category: string;
  date: string;
}

// Mock data - Em produção viria do Supabase
const mockTransactions: Transaction[] = [
  {
    id: '1',
    description: 'Salário Dezembro',
    amount: 4500.00,
    type: 'receita',
    category: 'Salário',
    date: '2024-12-15'
  },
  {
    id: '2',
    description: 'Supermercado Extra',
    amount: 285.90,
    type: 'despesa',
    category: 'Alimentação',
    date: '2024-12-14'
  },
  {
    id: '3',
    description: 'Uber',
    amount: 32.50,
    type: 'despesa',
    category: 'Transporte',
    date: '2024-12-14'
  },
  {
    id: '4',
    description: 'Freelance Design',
    amount: 800.00,
    type: 'receita',
    category: 'Freelance',
    date: '2024-12-13'
  },
  {
    id: '5',
    description: 'Academia',
    amount: 89.90,
    type: 'despesa',
    category: 'Saúde',
    date: '2024-12-12'
  }
];

export function RecentTransactionsCard() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = today.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoje';
    if (diffDays === 1) return 'Ontem';
    if (diffDays < 7) return `${diffDays} dias atrás`;
    
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: 'short' 
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Salário': 'bg-success/20 text-success',
      'Freelance': 'bg-primary/20 text-primary',
      'Alimentação': 'bg-warning/20 text-warning',
      'Transporte': 'bg-accent/20 text-accent',
      'Saúde': 'bg-destructive/20 text-destructive',
    };
    return colors[category] || 'bg-muted/20 text-muted-foreground';
  };

  return (
    <Card className="glass hover-lift">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
            <Eye className="w-4 h-4 text-accent" />
          </div>
          <span>Transações Recentes</span>
        </CardTitle>
        
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary-hover">
          Ver todas
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {mockTransactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              transaction.type === 'receita' 
                ? 'bg-success/20' 
                : 'bg-destructive/20'
            }`}>
              {transaction.type === 'receita' ? (
                <ArrowUpCircle className="w-5 h-5 text-success" />
              ) : (
                <ArrowDownCircle className="w-5 h-5 text-destructive" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-medium text-sm text-card-foreground truncate">
                  {transaction.description}
                </p>
                <p className={`font-semibold text-sm ${
                  transaction.type === 'receita' 
                    ? 'text-success' 
                    : 'text-destructive'
                }`}>
                  {transaction.type === 'receita' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </p>
              </div>
              
              <div className="flex items-center justify-between mt-1">
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${getCategoryColor(transaction.category)}`}
                >
                  {transaction.category}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {formatDate(transaction.date)}
                </span>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </motion.div>
        ))}
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="pt-3 border-t border-muted/50"
        >
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Total do período:</span>
            <div className="flex space-x-4">
              <span className="text-success font-medium">
                +{formatCurrency(5300.00)}
              </span>
              <span className="text-destructive font-medium">
                -{formatCurrency(408.30)}
              </span>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}