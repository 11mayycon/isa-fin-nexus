'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Target, Calendar, TrendingUp, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Mock data - Em produção virá do Supabase (reminders com type='meta')
const mockGoals = [
  {
    id: '1',
    title: 'Reserva de Emergência',
    description: 'Construir uma reserva de emergência equivalente a 6 meses de gastos',
    target_amount: 30000,
    current_amount: 18500,
    due_date: '2025-06-30',
    status: 'ativo',
    type: 'savings',
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Viagem para Europa',
    description: 'Economizar para uma viagem de 15 dias pela Europa',
    target_amount: 15000,
    current_amount: 8200,
    due_date: '2025-07-01',
    status: 'ativo',
    type: 'travel',
    created_at: '2024-03-10T14:00:00Z'
  },
  {
    id: '3',
    title: 'Carro Novo',
    description: 'Juntar dinheiro para dar entrada em um carro 0km',
    target_amount: 25000,
    current_amount: 12300,
    due_date: '2025-12-31',
    status: 'ativo',
    type: 'purchase',
    created_at: '2024-02-20T09:00:00Z'
  },
  {
    id: '4',
    title: 'Curso de Especialização',
    description: 'Investir em um MBA para crescimento profissional',
    target_amount: 8000,
    current_amount: 8000,
    due_date: '2024-12-01',
    status: 'concluido',
    type: 'education',
    created_at: '2024-01-05T16:00:00Z'
  },
  {
    id: '5',
    title: 'Investimento Imobiliário',
    description: 'Primeira entrada para investir em imóveis',
    target_amount: 50000,
    current_amount: 23800,
    due_date: '2026-03-31',
    status: 'ativo',
    type: 'investment',
    created_at: '2024-06-01T11:00:00Z'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 25,
    },
  },
};

export default function Metas() {
  const [filter, setFilter] = useState('all');

  const activeGoals = mockGoals.filter(g => g.status === 'ativo');
  const completedGoals = mockGoals.filter(g => g.status === 'concluido');
  const totalTargetAmount = activeGoals.reduce((acc, g) => acc + g.target_amount, 0);
  const totalCurrentAmount = activeGoals.reduce((acc, g) => acc + g.current_amount, 0);
  const overallProgress = totalTargetAmount > 0 ? (totalCurrentAmount / totalTargetAmount) * 100 : 0;

  const filteredGoals = mockGoals.filter(goal => {
    if (filter === 'all') return true;
    if (filter === 'active') return goal.status === 'ativo';
    if (filter === 'completed') return goal.status === 'concluido';
    return true;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'savings': return '💰';
      case 'travel': return '✈️';
      case 'purchase': return '🛒';
      case 'education': return '🎓';
      case 'investment': return '📈';
      default: return '🎯';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'savings': return 'Poupança';
      case 'travel': return 'Viagem';
      case 'purchase': return 'Compra';
      case 'education': return 'Educação';
      case 'investment': return 'Investimento';
      default: return 'Geral';
    }
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getDaysUntilDeadline = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 75) return 'bg-cyan-500';
    if (percentage >= 50) return 'bg-yellow-500';
    if (percentage >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Minhas Metas 🎯
          </h1>
          <p className="text-muted-foreground">
            Defina e acompanhe suas metas financeiras
          </p>
        </div>
        <Button className="glass hover-lift w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Nova Meta
        </Button>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
      >
        <motion.div variants={itemVariants}>
          <Card className="glass hover-lift">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Metas Ativas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyan-400">
                {activeGoals.length}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="glass hover-lift">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Progresso Geral
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {overallProgress.toFixed(1)}%
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="glass hover-lift">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Poupado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">
                R$ {totalCurrentAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="glass hover-lift">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Metas Concluídas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">
                {completedGoals.length}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap gap-2"
      >
        {[
          { key: 'all', label: 'Todas', count: mockGoals.length },
          { key: 'active', label: 'Ativas', count: activeGoals.length },
          { key: 'completed', label: 'Concluídas', count: completedGoals.length }
        ].map(({ key, label, count }) => (
          <Button
            key={key}
            variant={filter === key ? "default" : "outline"}
            onClick={() => setFilter(key)}
            className={`glass ${filter === key ? 'bg-primary/20' : ''}`}
          >
            {label} ({count})
          </Button>
        ))}
      </motion.div>

      {/* Goals Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6"
      >
        {filteredGoals.map((goal) => {
          const progressPercentage = getProgressPercentage(goal.current_amount, goal.target_amount);
          const daysUntil = getDaysUntilDeadline(goal.due_date);
          const isCompleted = goal.status === 'concluido';
          const remaining = goal.target_amount - goal.current_amount;

          return (
            <motion.div key={goal.id} variants={itemVariants}>
              <Card className="glass hover-lift">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">
                        {getTypeIcon(goal.type)}
                      </div>
                      <div>
                        <CardTitle className="text-lg text-white">{goal.title}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline">
                            {getTypeLabel(goal.type)}
                          </Badge>
                          <Badge variant={isCompleted ? 'default' : 'secondary'}>
                            {isCompleted ? 'Concluída' : 'Em Andamento'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    {isCompleted && (
                      <div className="text-2xl">🏆</div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {goal.description && (
                    <p className="text-sm text-muted-foreground">
                      {goal.description}
                    </p>
                  )}

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Progresso</span>
                      <span className="text-sm font-medium text-white">
                        {progressPercentage.toFixed(1)}%
                      </span>
                    </div>
                    <Progress 
                      value={progressPercentage} 
                      className="h-3"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Atual</p>
                      <p className="font-semibold text-green-400">
                        R$ {goal.current_amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Meta</p>
                      <p className="font-semibold text-white">
                        R$ {goal.target_amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>

                  {!isCompleted && (
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Faltam</p>
                        <p className="font-semibold text-yellow-400">
                          R$ {remaining.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Prazo</p>
                        <p className="font-semibold text-cyan-400">
                          {daysUntil < 0 ? `${Math.abs(daysUntil)} dias atrás` :
                           daysUntil === 0 ? 'Hoje' :
                           daysUntil === 1 ? 'Amanhã' :
                           `${daysUntil} dias`}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-card-border pt-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>Meta: {new Date(goal.due_date).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>Criada em {new Date(goal.created_at).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>

                  {!isCompleted && (
                    <div className="flex space-x-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="w-3 h-3 mr-1" />
                        Editar
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Plus className="w-3 h-3 mr-1" />
                        Adicionar Valor
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {filteredGoals.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-muted-foreground">
            Nenhuma meta encontrada.
          </div>
        </motion.div>
      )}
    </div>
  );
}