'use client';

import { motion } from 'framer-motion';
import { Crown, Check, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Subscription {
  planType: string;
  status: string;
  currentPeriodEnd: string;
}

interface SubscriptionCardProps {
  subscription: Subscription;
}

export function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  const isPremium = subscription.planType === 'Premium';
  const isActive = subscription.status === 'ativo';
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: 'long',
      year: 'numeric'
    });
  };

  const getDaysUntilExpiry = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = getDaysUntilExpiry(subscription.currentPeriodEnd);

  return (
    <Card className="glass hover-lift">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              isPremium ? 'bg-warning/20' : 'bg-success/20'
            }`}>
              {isPremium ? (
                <Crown className="w-4 h-4 text-warning" />
              ) : (
                <Check className="w-4 h-4 text-success" />
              )}
            </div>
            <span className="text-lg">Plano {subscription.planType}</span>
          </div>
          
          <Badge 
            variant={isActive ? 'default' : 'destructive'}
            className={isActive ? 'bg-success/20 text-success hover:bg-success/30' : ''}
          >
            {isActive ? 'Ativo' : 'Inativo'}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {isPremium && isActive && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                Renova em {formatDate(subscription.currentPeriodEnd)}
              </span>
            </div>
            
            {daysLeft <= 30 && (
              <div className={`p-3 rounded-lg ${
                daysLeft <= 7 
                  ? 'bg-destructive/20 border border-destructive/30' 
                  : 'bg-warning/20 border border-warning/30'
              }`}>
                <p className={`text-sm font-medium ${
                  daysLeft <= 7 ? 'text-destructive' : 'text-warning'
                }`}>
                  {daysLeft <= 0 
                    ? 'Plano expirado!'
                    : `${daysLeft} dias restantes`
                  }
                </p>
              </div>
            )}
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-card-foreground">Recursos Premium:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <Check className="w-3 h-3 text-success" />
                  <span>Análises avançadas</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3 h-3 text-success" />
                  <span>Chat ilimitado com IA</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3 h-3 text-success" />
                  <span>Relatórios personalizados</span>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
        
        {!isPremium && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Upgrade para Premium e desbloqueie recursos avançados!
            </p>
            <Button 
              className="w-full bg-gradient-accent hover:opacity-90"
              size="sm"
            >
              <Crown className="w-4 h-4 mr-2" />
              Fazer Upgrade
            </Button>
          </div>
        )}
        
        {isPremium && (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
          >
            Gerenciar Assinatura
          </Button>
        )}
      </CardContent>
    </Card>
  );
}