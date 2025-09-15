'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Filter, TrendingUp, TrendingDown, Calendar, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data - Em produção virá do Supabase
const mockTransactions = [
  {
    id: '1',
    description: 'Salário',
    amount: 5000,
    type: 'receita',
    category: 'Salário',
    date: '2024-12-15',
    created_at: '2024-12-15T10:00:00Z'
  },
  {
    id: '2',
    description: 'Supermercado Extra',
    amount: 350.75,
    type: 'despesa',
    category: 'Alimentação',
    date: '2024-12-14',
    created_at: '2024-12-14T18:30:00Z'
  },
  {
    id: '3',
    description: 'Conta de Luz',
    amount: 180.50,
    type: 'despesa',
    category: 'Utilidades',
    date: '2024-12-13',
    created_at: '2024-12-13T14:20:00Z'
  },
  {
    id: '4',
    description: 'Freelance Design',
    amount: 800,
    type: 'receita',
    category: 'Trabalho Extra',
    date: '2024-12-12',
    created_at: '2024-12-12T16:45:00Z'
  },
  {
    id: '5',
    description: 'Netflix',
    amount: 45.90,
    type: 'despesa',
    category: 'Entretenimento',
    date: '2024-12-11',
    created_at: '2024-12-11T09:15:00Z'
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

export default function Transacoes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const totalReceitas = mockTransactions
    .filter(t => t.type === 'receita')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalDespesas = mockTransactions
    .filter(t => t.type === 'despesa')
    .reduce((acc, t) => acc + t.amount, 0);

  const saldoAtual = totalReceitas - totalDespesas;

  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || transaction.type === filterType;
    const matchesCategory = filterCategory === 'all' || transaction.category === filterCategory;
    
    return matchesSearch && matchesType && matchesCategory;
  });

  const categories = [...new Set(mockTransactions.map(t => t.category))];

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
            Transações 💰
          </h1>
          <p className="text-muted-foreground">
            Acompanhe todas as suas movimentações financeiras
          </p>
        </div>
        <Button className="glass hover-lift w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Nova Transação
        </Button>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6"
      >
        <motion.div variants={itemVariants}>
          <Card className="glass hover-lift">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-green-400" />
                Total Receitas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">
                R$ {totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="glass hover-lift">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <TrendingDown className="w-4 h-4 mr-2 text-red-400" />
                Total Despesas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-400">
                R$ {totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="glass hover-lift">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Saldo Atual
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${saldoAtual >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                R$ {saldoAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar transações..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 glass"
          />
        </div>
        
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-[140px] glass">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="receita">Receitas</SelectItem>
            <SelectItem value="despesa">Despesas</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-full sm:w-[160px] glass">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline" className="glass w-full sm:w-auto">
          <Filter className="w-4 h-4 mr-2" />
          Filtros
        </Button>
      </motion.div>

      {/* Transactions List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {filteredTransactions.map((transaction) => (
          <motion.div key={transaction.id} variants={itemVariants}>
            <Card className="glass hover-lift">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'receita' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {transaction.type === 'receita' 
                        ? <TrendingUp className="w-5 h-5" />
                        : <TrendingDown className="w-5 h-5" />
                      }
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-white">{transaction.description}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(transaction.date).toLocaleDateString('pt-BR')}
                        </span>
                        <Badge variant="outline" className="w-fit mt-1 sm:mt-0">
                          {transaction.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-lg font-bold ${
                      transaction.type === 'receita' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {transaction.type === 'receita' ? '+' : '-'}R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(transaction.created_at).toLocaleTimeString('pt-BR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {filteredTransactions.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-muted-foreground">
            Nenhuma transação encontrada com os filtros aplicados.
          </div>
        </motion.div>
      )}
    </div>
  );
}