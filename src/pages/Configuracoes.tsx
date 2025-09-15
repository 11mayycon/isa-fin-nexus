'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Shield, Bell, Palette, Download, Trash2, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// Mock data - Em produção virá do Supabase
const mockUser = {
  id: '1',
  name: 'Maria Silva',
  email: 'maria.silva@email.com',
  phone: '(11) 99999-9999',
  matricula: '2024001',
  created_at: '2024-01-15T10:00:00Z'
};

const mockSubscription = {
  plan_type: 'Premium',
  status: 'active',
  current_period_end: '2025-01-15T10:00:00Z',
  stripe_customer_id: 'cus_example123'
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

export default function Configuracoes() {
  const [formData, setFormData] = useState({
    name: mockUser.name,
    email: mockUser.email,
    phone: mockUser.phone
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false
  });

  const [preferences, setPreferences] = useState({
    darkMode: true,
    language: 'pt-BR',
    currency: 'BRL'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Aqui integraria com Supabase para salvar as configurações
    console.log('Saving configurations:', { formData, notifications, preferences });
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Configurações ⚙️
        </h1>
        <p className="text-muted-foreground">
          Gerencie seu perfil e preferências da conta
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Profile Information */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          <Card className="glass hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <User className="w-5 h-5 mr-2" />
                Informações Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Nome Completo</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="glass"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="matricula" className="text-white">Matrícula</Label>
                  <Input
                    id="matricula"
                    value={mockUser.matricula}
                    disabled
                    className="glass opacity-60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="glass"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">Telefone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="glass"
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button onClick={handleSave} className="glass hover-lift">
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Alterações
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="glass hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Bell className="w-5 h-5 mr-2" />
                Notificações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-white">Notificações por E-mail</h4>
                  <p className="text-sm text-muted-foreground">Receba lembretes e atualizações importantes</p>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(value) => handleNotificationChange('email', value)}
                />
              </div>

              <Separator className="bg-card-border" />

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-white">Notificações Push</h4>
                  <p className="text-sm text-muted-foreground">Alertas em tempo real no navegador</p>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(value) => handleNotificationChange('push', value)}
                />
              </div>

              <Separator className="bg-card-border" />

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-white">SMS</h4>
                  <p className="text-sm text-muted-foreground">Receber lembretes por mensagem de texto</p>
                </div>
                <Switch
                  checked={notifications.sms}
                  onCheckedChange={(value) => handleNotificationChange('sms', value)}
                />
              </div>

              <Separator className="bg-card-border" />

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-white">Marketing</h4>
                  <p className="text-sm text-muted-foreground">Dicas financeiras e novidades do produto</p>
                </div>
                <Switch
                  checked={notifications.marketing}
                  onCheckedChange={(value) => handleNotificationChange('marketing', value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card className="glass hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Shield className="w-5 h-5 mr-2" />
                Gerenciamento de Dados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="glass flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar Dados
                </Button>
                <Button variant="outline" className="glass flex-1 text-red-400 border-red-400/20 hover:bg-red-400/10">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Excluir Conta
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground">
                Seus dados são protegidos pela LGPD. Você pode exportar ou excluir todas as suas informações a qualquer momento.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sidebar - Subscription & Account */}
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Subscription Info */}
          <Card className="glass hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Palette className="w-5 h-5 mr-2" />
                Assinatura
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">👑</span>
                </div>
                <h3 className="font-bold text-white">{mockSubscription.plan_type}</h3>
                <Badge variant="default" className="mt-1">
                  {mockSubscription.status === 'active' ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plano:</span>
                  <span className="text-white font-medium">{mockSubscription.plan_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Renovação:</span>
                  <span className="text-white font-medium">
                    {new Date(mockSubscription.current_period_end).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="text-green-400 font-medium">Ativo</span>
                </div>
              </div>

              <Separator className="bg-card-border" />

              <div className="space-y-3">
                <h4 className="font-medium text-white">Recursos Premium:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    Relatórios ilimitados
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    Chat com IA avançado
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    Notificações em tempo real
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    Suporte prioritário
                  </li>
                </ul>
              </div>

              <Button variant="outline" className="w-full glass">
                Gerenciar Assinatura
              </Button>
            </CardContent>
          </Card>

          {/* Account Stats */}
          <Card className="glass hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <User className="w-5 h-5 mr-2" />
                Estatísticas da Conta
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 rounded-lg bg-muted/20">
                  <div className="text-lg font-bold text-cyan-400">348</div>
                  <div className="text-xs text-muted-foreground">Dias de uso</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/20">
                  <div className="text-lg font-bold text-green-400">1.2k</div>
                  <div className="text-xs text-muted-foreground">Transações</div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Membro desde:</span>
                  <span className="text-white font-medium">
                    {new Date(mockUser.created_at).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Último acesso:</span>
                  <span className="text-white font-medium">Hoje</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cartões conectados:</span>
                  <span className="text-white font-medium">3</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Help & Support */}
          <Card className="glass hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Shield className="w-5 h-5 mr-2" />
                Ajuda & Suporte
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full glass justify-start">
                <Mail className="w-4 h-4 mr-2" />
                Contatar Suporte
              </Button>
              <Button variant="outline" className="w-full glass justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Central de Ajuda
              </Button>
              <Button variant="outline" className="w-full glass justify-start">
                <Download className="w-4 h-4 mr-2" />
                Tutoriais
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}