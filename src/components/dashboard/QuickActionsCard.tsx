'use client';

import { motion } from 'framer-motion';
import { Plus, Calculator, Target, FileText, TrendingUp, Receipt } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const quickActions = [
  {
    id: 'add-transaction',
    label: 'Nova Transação',
    icon: Plus,
    color: 'bg-primary/20 text-primary hover:bg-primary/30',
    description: 'Registrar receita ou despesa'
  },
  {
    id: 'add-goal',
    label: 'Nova Meta',
    icon: Target,
    color: 'bg-success/20 text-success hover:bg-success/30',
    description: 'Definir objetivo financeiro'
  },
  {
    id: 'calculate',
    label: 'Calculadora',
    icon: Calculator,
    color: 'bg-accent/20 text-accent hover:bg-accent/30',
    description: 'Ferramentas de cálculo'
  },
  {
    id: 'report',
    label: 'Gerar Relatório',
    icon: FileText,
    color: 'bg-warning/20 text-warning hover:bg-warning/30',
    description: 'Relatório personalizado'
  }
];

export function QuickActionsCard() {
  const handleAction = (actionId: string) => {
    // Em produção, estas ações navegariam para páginas específicas ou abririam modais
    console.log(`Ação executada: ${actionId}`);
  };

  return (
    <Card className="glass hover-lift">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          <span>Ações Rápidas</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Button
                variant="ghost"
                className="w-full justify-start h-auto p-3 hover:bg-muted/50"
                onClick={() => handleAction(action.id)}
              >
                <div className="flex items-center space-x-3 w-full">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.color} transition-colors`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-sm text-card-foreground">
                      {action.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                </div>
              </Button>
            </motion.div>
          );
        })}
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="pt-3 border-t border-muted/50"
        >
          <div className="flex items-center space-x-2 p-3 bg-muted/30 rounded-lg">
            <Receipt className="w-4 h-4 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-xs font-medium text-card-foreground">
                Última transação
              </p>
              <p className="text-xs text-muted-foreground">
                Supermercado - R$ 85,40
              </p>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}