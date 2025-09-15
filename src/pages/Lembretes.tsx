'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Bell, Calendar, Clock, Check, X, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Mock data - Em produção virá do Supabase
const mockReminders = [
  {
    id: '1',
    title: 'Pagar cartão Nubank',
    description: 'Vencimento da fatura do cartão de crédito',
    due_date: '2024-12-20',
    type: 'payment',
    status: 'ativo',
    created_at: '2024-12-10T10:00:00Z'
  },
  {
    id: '2',
    title: 'Revisar investimentos',
    description: 'Analisar performance da carteira de investimentos',
    due_date: '2024-12-22',
    type: 'investment',
    status: 'ativo',
    created_at: '2024-12-11T14:00:00Z'
  },
  {
    id: '3',
    title: 'Renovar seguro do carro',
    description: 'Seguro do veículo vence no final do mês',
    due_date: '2024-12-28',
    type: 'insurance',
    status: 'ativo',
    created_at: '2024-12-08T09:00:00Z'
  },
  {
    id: '4',
    title: 'Declarar Imposto de Renda',
    description: 'Organizar documentos para declaração',
    due_date: '2024-12-30',
    type: 'tax',
    status: 'ativo',
    created_at: '2024-12-05T16:00:00Z'
  },
  {
    id: '5',
    title: 'Pagar IPVA',
    description: 'Imposto pago antecipadamente',
    due_date: '2024-12-15',
    type: 'payment',
    status: 'concluido',
    created_at: '2024-12-01T11:00:00Z'
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

export default function Lembretes() {
  const [filter, setFilter] = useState('all');

  const activeReminders = mockReminders.filter(r => r.status === 'ativo');
  const completedReminders = mockReminders.filter(r => r.status === 'concluido');
  const overdueReminders = activeReminders.filter(r => new Date(r.due_date) < new Date());

  const filteredReminders = mockReminders.filter(reminder => {
    if (filter === 'all') return true;
    if (filter === 'active') return reminder.status === 'ativo';
    if (filter === 'completed') return reminder.status === 'concluido';
    if (filter === 'overdue') return reminder.status === 'ativo' && new Date(reminder.due_date) < new Date();
    return true;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'payment': return '💳';
      case 'investment': return '📈';
      case 'insurance': return '🛡️';
      case 'tax': return '📋';
      default: return '📝';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'payment': return 'Pagamento';
      case 'investment': return 'Investimento';
      case 'insurance': return 'Seguro';
      case 'tax': return 'Imposto';
      default: return 'Geral';
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUrgencyColor = (daysUntil: number, status: string) => {
    if (status === 'concluido') return 'text-green-400';
    if (daysUntil < 0) return 'text-red-400';
    if (daysUntil <= 3) return 'text-yellow-400';
    return 'text-cyan-400';
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
            Lembretes 🔔
          </h1>
          <p className="text-muted-foreground">
            Mantenha suas finanças organizadas com lembretes inteligentes
          </p>
        </div>
        <Button className="glass hover-lift w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Novo Lembrete
        </Button>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6"
      >
        <motion.div variants={itemVariants}>
          <Card className="glass hover-lift">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Ativos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyan-400">
                {activeReminders.length}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="glass hover-lift">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Em Atraso
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-400">
                {overdueReminders.length}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="glass hover-lift">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Concluídos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">
                {completedReminders.length}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="glass hover-lift">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {mockReminders.length}
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
          { key: 'all', label: 'Todos', count: mockReminders.length },
          { key: 'active', label: 'Ativos', count: activeReminders.length },
          { key: 'overdue', label: 'Em Atraso', count: overdueReminders.length },
          { key: 'completed', label: 'Concluídos', count: completedReminders.length }
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

      {/* Reminders List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6"
      >
        {filteredReminders.map((reminder) => {
          const daysUntil = getDaysUntilDue(reminder.due_date);
          const urgencyColor = getUrgencyColor(daysUntil, reminder.status);

          return (
            <motion.div key={reminder.id} variants={itemVariants}>
              <Card className="glass hover-lift">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">
                        {getTypeIcon(reminder.type)}
                      </div>
                      <div>
                        <CardTitle className="text-lg text-white">{reminder.title}</CardTitle>
                        <Badge variant="outline" className="mt-1">
                          {getTypeLabel(reminder.type)}
                        </Badge>
                      </div>
                    </div>
                    <Badge variant={reminder.status === 'ativo' ? 'default' : 'secondary'}>
                      {reminder.status === 'ativo' ? 'Ativo' : 'Concluído'}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {reminder.description && (
                    <p className="text-sm text-muted-foreground">
                      {reminder.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(reminder.due_date).toLocaleDateString('pt-BR')}</span>
                    </div>
                    
                    <div className={`flex items-center space-x-1 font-medium ${urgencyColor}`}>
                      <Clock className="w-4 h-4" />
                      <span>
                        {reminder.status === 'concluido' ? 'Concluído' :
                         daysUntil < 0 ? `${Math.abs(daysUntil)} dias em atraso` :
                         daysUntil === 0 ? 'Hoje' :
                         daysUntil === 1 ? 'Amanhã' :
                         `${daysUntil} dias`}
                      </span>
                    </div>
                  </div>

                  {reminder.status === 'ativo' && (
                    <div className="flex space-x-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Check className="w-3 h-3 mr-1" />
                        Concluir
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="w-3 h-3 mr-1" />
                        Editar
                      </Button>
                      <Button variant="outline" size="sm">
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {filteredReminders.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-muted-foreground">
            Nenhum lembrete encontrado.
          </div>
        </motion.div>
      )}
    </div>
  );
}