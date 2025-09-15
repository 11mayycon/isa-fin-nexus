'use client';

import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, TrendingDown, Calendar, Download, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

// Mock data - Em produção virá do Supabase
const monthlyData = [
  { month: 'Jan', receitas: 5200, despesas: 3800, saldo: 1400 },
  { month: 'Fev', receitas: 5000, despesas: 4200, saldo: 800 },
  { month: 'Mar', receitas: 5500, despesas: 3900, saldo: 1600 },
  { month: 'Abr', receitas: 4800, despesas: 4100, saldo: 700 },
  { month: 'Mai', receitas: 5300, despesas: 3700, saldo: 1600 },
  { month: 'Jun', receitas: 5100, despesas: 4000, saldo: 1100 },
  { month: 'Jul', receitas: 5400, despesas: 3600, saldo: 1800 },
  { month: 'Ago', receitas: 5200, despesas: 4300, saldo: 900 },
  { month: 'Set', receitas: 5600, despesas: 3800, saldo: 1800 },
  { month: 'Out', receitas: 5300, despesas: 4100, saldo: 1200 },
  { month: 'Nov', receitas: 5400, despesas: 3900, saldo: 1500 },
  { month: 'Dez', receitas: 5800, despesas: 4200, saldo: 1600 }
];

const categoryData = [
  { name: 'Alimentação', value: 1200, color: '#FF6B6B' },
  { name: 'Transporte', value: 800, color: '#4ECDC4' },
  { name: 'Moradia', value: 1500, color: '#45B7D1' },
  { name: 'Entretenimento', value: 400, color: '#96CEB4' },
  { name: 'Saúde', value: 600, color: '#FFEAA7' },
  { name: 'Educação', value: 300, color: '#DDA0DD' },
  { name: 'Outros', value: 500, color: '#98D8C8' }
];

const creditCardData = [
  { name: 'Nubank', limite: 5000, usado: 1250, disponivel: 3750 },
  { name: 'Inter', limite: 8000, usado: 3200, disponivel: 4800 },
  { name: 'C6 Bank', limite: 3000, usado: 150, disponivel: 2850 }
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

export default function Relatorios() {
  const totalReceitas = monthlyData.reduce((acc, month) => acc + month.receitas, 0);
  const totalDespesas = monthlyData.reduce((acc, month) => acc + month.despesas, 0);
  const saldoTotal = totalReceitas - totalDespesas;
  const mediaReceitas = totalReceitas / monthlyData.length;
  const mediaDespesas = totalDespesas / monthlyData.length;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass p-3 rounded-lg border border-card-border">
          <p className="text-white font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: R$ {entry.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          ))}
        </div>
      );
    }
    return null;
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
            Relatórios 📊
          </h1>
          <p className="text-muted-foreground">
            Análises detalhadas da sua situação financeira
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select defaultValue="2024">
            <SelectTrigger className="w-full sm:w-[120px] glass">
              <SelectValue placeholder="Ano" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
          <Button className="glass hover-lift w-full sm:w-auto">
            <Download className="w-4 h-4 mr-2" />
            Exportar PDF
          </Button>
        </div>
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
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-green-400" />
                Total Receitas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">
                R$ {totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Média: R$ {mediaReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês
              </p>
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
              <p className="text-xs text-muted-foreground mt-1">
                Média: R$ {mediaDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="glass hover-lift">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Saldo Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${saldoTotal >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                R$ {saldoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {saldoTotal >= 0 ? 'Superávit' : 'Déficit'} acumulado
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="glass hover-lift">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Taxa de Poupança
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyan-400">
                {((saldoTotal / totalReceitas) * 100).toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Do total de receitas
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Charts Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Monthly Evolution */}
        <motion.div variants={itemVariants}>
          <Card className="glass hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <BarChart3 className="w-5 h-5 mr-2" />
                Evolução Mensal
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#9CA3AF"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    fontSize={12}
                    tickFormatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="receitas" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    name="Receitas"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="despesas" 
                    stroke="#EF4444" 
                    strokeWidth={2}
                    name="Despesas"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="saldo" 
                    stroke="#06B6D4" 
                    strokeWidth={2}
                    name="Saldo"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Category Distribution */}
        <motion.div variants={itemVariants}>
          <Card className="glass hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <BarChart3 className="w-5 h-5 mr-2" />
                Gastos por Categoria
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }: any) => {
                      const total = categoryData.reduce((acc, cat) => acc + cat.value, 0);
                      const percent = ((Number(value) / total) * 100).toFixed(0);
                      return `${name} (${percent}%)`;
                    }}
                    labelLine={false}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 'Valor']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Monthly Comparison */}
        <motion.div variants={itemVariants}>
          <Card className="glass hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <BarChart3 className="w-5 h-5 mr-2" />
                Receitas vs Despesas
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#9CA3AF"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    fontSize={12}
                    tickFormatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="receitas" fill="#10B981" name="Receitas" />
                  <Bar dataKey="despesas" fill="#EF4444" name="Despesas" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Credit Card Usage */}
        <motion.div variants={itemVariants}>
          <Card className="glass hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <BarChart3 className="w-5 h-5 mr-2" />
                Uso dos Cartões de Crédito
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={creditCardData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#9CA3AF"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    fontSize={12}
                    tickFormatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="limite" fill="#374151" name="Limite Total" />
                  <Bar dataKey="usado" fill="#EF4444" name="Valor Usado" />
                  <Bar dataKey="disponivel" fill="#10B981" name="Disponível" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Category Details */}
      <motion.div variants={itemVariants}>
        <Card className="glass hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Filter className="w-5 h-5 mr-2" />
              Detalhamento por Categoria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {categoryData.map((category, index) => (
                <div key={index} className="p-4 rounded-lg border border-card-border bg-muted/20">
                  <div className="flex items-center justify-between mb-2">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm font-medium text-white">{category.name}</span>
                  </div>
                  <div className="text-lg font-bold text-white">
                    R$ {category.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {((category.value / totalDespesas) * 100).toFixed(1)}% do total
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}