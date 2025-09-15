'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Plus, Eye, EyeOff, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Mock data - Em produção virá do Supabase
const mockCreditCards = [
  {
    id: '1',
    card_name: 'Nubank Roxinho',
    card_number: '4532',
    limit_amount: 5000,
    current_balance: 1250,
    due_day: 15,
    closing_date: 8,
    active: true
  },
  {
    id: '2',
    card_name: 'Inter Gold',
    card_number: '5678',
    limit_amount: 8000,
    current_balance: 3200,
    due_day: 10,
    closing_date: 3,
    active: true
  },
  {
    id: '3',
    card_name: 'C6 Bank',
    card_number: '9012',
    limit_amount: 3000,
    current_balance: 150,
    due_day: 20,
    closing_date: 13,
    active: false
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

export default function Cartoes() {
  const [showNumbers, setShowNumbers] = useState<{ [key: string]: boolean }>({});

  const toggleNumberVisibility = (cardId: string) => {
    setShowNumbers(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const getUsagePercentage = (current: number, limit: number) => {
    return (current / limit) * 100;
  };

  const getUsageColor = (percentage: number) => {
    if (percentage < 50) return 'bg-green-500';
    if (percentage < 80) return 'bg-yellow-500';
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
            Meus Cartões 💳
          </h1>
          <p className="text-muted-foreground">
            Gerencie seus cartões de crédito e acompanhe os limites
          </p>
        </div>
        <Button className="glass hover-lift w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Cartão
        </Button>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      >
        <motion.div variants={itemVariants}>
          <Card className="glass hover-lift">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Disponível
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">
                R$ {mockCreditCards.reduce((acc, card) => 
                  acc + (card.limit_amount - card.current_balance), 0
                ).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="glass hover-lift">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Usado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-400">
                R$ {mockCreditCards.reduce((acc, card) => 
                  acc + card.current_balance, 0
                ).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="sm:col-span-2 lg:col-span-1">
          <Card className="glass hover-lift">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Cartões Ativos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyan-400">
                {mockCreditCards.filter(card => card.active).length} de {mockCreditCards.length}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Credit Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6"
      >
        {mockCreditCards.map((card) => {
          const usagePercentage = getUsagePercentage(card.current_balance, card.limit_amount);
          const available = card.limit_amount - card.current_balance;

          return (
            <motion.div key={card.id} variants={itemVariants}>
              <Card className="glass hover-lift relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <Badge variant={card.active ? "default" : "secondary"}>
                    {card.active ? "Ativo" : "Inativo"}
                  </Badge>
                </div>

                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-white">{card.card_name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-muted-foreground">
                          **** **** **** {showNumbers[card.id] ? card.card_number : '****'}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleNumberVisibility(card.id)}
                          className="h-6 w-6 p-0"
                        >
                          {showNumbers[card.id] ? 
                            <EyeOff className="w-3 h-3" /> : 
                            <Eye className="w-3 h-3" />
                          }
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Limite usado</span>
                      <span className="text-white font-medium">
                        {usagePercentage.toFixed(1)}%
                      </span>
                    </div>
                    <Progress 
                      value={usagePercentage} 
                      className="h-2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Disponível</p>
                      <p className="font-semibold text-green-400">
                        R$ {available.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Usado</p>
                      <p className="font-semibold text-red-400">
                        R$ {card.current_balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Vencimento</p>
                      <p className="font-semibold text-white">Dia {card.due_day}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Fechamento</p>
                      <p className="font-semibold text-white">Dia {card.closing_date}</p>
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-3 h-3 mr-1" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Trash2 className="w-3 h-3 mr-1" />
                      Excluir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}