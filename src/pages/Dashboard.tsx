'use client';

import { motion } from 'framer-motion';
import { BalanceCard } from '@/components/dashboard/BalanceCard';
import { CreditLimitCard } from '@/components/dashboard/CreditLimitCard';
import { UpcomingRemindersCard } from '@/components/dashboard/UpcomingRemindersCard';
import { SubscriptionCard } from '@/components/dashboard/SubscriptionCard';
import { DashboardCharts } from '@/components/dashboard/DashboardCharts';
import { QuickActionsCard } from '@/components/dashboard/QuickActionsCard';
import { RecentTransactionsCard } from '@/components/dashboard/RecentTransactionsCard';

// Mock data - Em produção, estes dados viriam do Supabase
const mockData = {
  user: {
    name: 'Maria Silva',
    matricula: '2024001',
    email: 'maria.silva@email.com'
  },
  balance: {
    current: 2847.32,
    variation: 15.2,
    variationAmount: 425.18
  },
  creditLimit: {
    total: 15000,
    used: 4800,
    available: 10200
  },
  upcomingReminders: [
    { id: '1', title: 'Pagar cartão Nubank', dueDate: '2024-12-20', type: 'payment' as const },
    { id: '2', title: 'Investir R$ 500', dueDate: '2024-12-22', type: 'investment' as const },
    { id: '3', title: 'Revisar gastos do mês', dueDate: '2024-12-25', type: 'review' as const }
  ],
  subscription: {
    planType: 'Premium',
    status: 'ativo',
    currentPeriodEnd: '2025-01-15'
  }
};

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

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold gradient-text mb-2">
          Olá, {mockData.user.name}! 👋
        </h1>
        <p className="text-muted-foreground">
          Aqui está um resumo da sua situação financeira atual
        </p>
      </motion.div>

      {/* Main Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <motion.div variants={itemVariants}>
          <BalanceCard
            currentBalance={mockData.balance.current}
            variation={mockData.balance.variation}
            variationAmount={mockData.balance.variationAmount}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <CreditLimitCard
            totalLimit={mockData.creditLimit.total}
            usedAmount={mockData.creditLimit.used}
            availableAmount={mockData.creditLimit.available}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <UpcomingRemindersCard reminders={mockData.upcomingReminders} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <SubscriptionCard subscription={mockData.subscription} />
        </motion.div>
      </motion.div>

      {/* Secondary Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
      >
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <QuickActionsCard />
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-2">
          <RecentTransactionsCard />
        </motion.div>
      </motion.div>

      {/* Charts Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={itemVariants}>
          <DashboardCharts />
        </motion.div>
      </motion.div>
    </div>
  );
}