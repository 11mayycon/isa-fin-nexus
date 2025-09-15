'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, PieChart as PieChartIcon, BarChart3 } from 'lucide-react';

// Mock data - Em produção viria do Supabase
const expensesByCategory = [
  { name: 'Alimentação', value: 1200, color: '#ef4444' },
  { name: 'Transporte', value: 800, color: '#f59e0b' },
  { name: 'Saúde', value: 600, color: '#10b981' },
  { name: 'Lazer', value: 400, color: '#3b82f6' },
  { name: 'Outros', value: 300, color: '#8b5cf6' },
];

const monthlyBalance = [
  { month: 'Jul', receita: 4500, despesa: 3200, saldo: 1300 },
  { month: 'Ago', receita: 5200, despesa: 3800, saldo: 1400 },
  { month: 'Set', receita: 4800, despesa: 3500, saldo: 1300 },
  { month: 'Out', receita: 5500, despesa: 4000, saldo: 1500 },
  { month: 'Nov', receita: 4900, despesa: 3600, saldo: 1300 },
  { month: 'Dez', receita: 5300, despesa: 3900, saldo: 1400 },
];

const cardUsage = [
  { name: 'Nubank', limit: 5000, used: 1500 },
  { name: 'Inter', limit: 3000, used: 800 },
  { name: 'Itaú', limit: 7000, used: 2500 },
];

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Expenses by Category - Simplified Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="glass hover-lift">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <div className="w-8 h-8 bg-destructive/20 rounded-lg flex items-center justify-center">
                <PieChartIcon className="w-4 h-4 text-destructive" />
              </div>
              <span>Gastos por Categoria</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expensesByCategory.map((category, index) => {
                const total = expensesByCategory.reduce((sum, cat) => sum + cat.value, 0);
                const percentage = (category.value / total) * 100;
                
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="text-muted-foreground">{category.name}</span>
                      </div>
                      <span className="font-medium text-card-foreground">
                        R$ {category.value.toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full"
                        style={{ backgroundColor: category.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                      />
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-muted-foreground">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Monthly Balance - Simplified */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="lg:col-span-1 xl:col-span-2"
      >
        <Card className="glass hover-lift">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
              <span>Evolução Financeira (6 meses)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-success/10 rounded-lg">
                <p className="text-2xl font-bold text-success">R$ 30.2k</p>
                <p className="text-sm text-muted-foreground">Total Receitas</p>
              </div>
              <div className="text-center p-4 bg-destructive/10 rounded-lg">
                <p className="text-2xl font-bold text-destructive">R$ 22.0k</p>
                <p className="text-sm text-muted-foreground">Total Despesas</p>
              </div>
              <div className="text-center p-4 bg-primary/10 rounded-lg md:col-span-1 col-span-2">
                <p className="text-2xl font-bold text-primary">R$ 8.2k</p>
                <p className="text-sm text-muted-foreground">Saldo Acumulado</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {monthlyBalance.map((month, index) => (
                <motion.div
                  key={month.month}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                >
                  <span className="font-medium text-card-foreground">{month.month}</span>
                  <div className="flex space-x-4 text-sm">
                    <span className="text-success">+R$ {month.receita.toLocaleString('pt-BR')}</span>
                    <span className="text-destructive">-R$ {month.despesa.toLocaleString('pt-BR')}</span>
                    <span className="text-primary font-medium">=R$ {month.saldo.toLocaleString('pt-BR')}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Card Usage - Simplified */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="lg:col-span-2 xl:col-span-1"
      >
        <Card className="glass hover-lift">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-accent" />
              </div>
              <span>Uso dos Cartões</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cardUsage.map((card, index) => {
                const usagePercentage = (card.used / card.limit) * 100;
                const getColor = (percentage: number) => {
                  if (percentage < 30) return 'bg-success';
                  if (percentage < 70) return 'bg-warning';
                  return 'bg-destructive';
                };
                
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-card-foreground">{card.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {usagePercentage.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <motion.div
                        className={`h-3 rounded-full ${getColor(usagePercentage)}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${usagePercentage}%` }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Usado: R$ {card.used.toLocaleString('pt-BR')}</span>
                      <span>Limite: R$ {card.limit.toLocaleString('pt-BR')}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 pt-4 border-t border-muted/50">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total disponível:</span>
                <span className="font-semibold text-success">
                  R$ {cardUsage.reduce((sum, card) => sum + (card.limit - card.used), 0).toLocaleString('pt-BR')}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}