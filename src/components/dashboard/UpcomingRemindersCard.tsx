'use client';

import { motion } from 'framer-motion';
import { Bell, Clock, CreditCard, TrendingUp, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Reminder {
  id: string;
  title: string;
  dueDate: string;
  type: 'payment' | 'investment' | 'review';
}

interface UpcomingRemindersCardProps {
  reminders: Reminder[];
}

const typeIcons = {
  payment: CreditCard,
  investment: TrendingUp,
  review: FileText,
};

const typeColors = {
  payment: 'bg-destructive/20 text-destructive',
  investment: 'bg-success/20 text-success',
  review: 'bg-warning/20 text-warning',
};

export function UpcomingRemindersCard({ reminders }: UpcomingRemindersCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoje';
    if (diffDays === 1) return 'Amanhã';
    if (diffDays < 7) return `Em ${diffDays} dias`;
    
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: 'short' 
    });
  };

  return (
    <Card className="glass hover-lift">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <div className="w-8 h-8 bg-warning/20 rounded-lg flex items-center justify-center">
            <Bell className="w-4 h-4 text-warning" />
          </div>
          <span>Próximos Lembretes</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {reminders.length === 0 ? (
          <div className="text-center py-6">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-2 opacity-50" />
            <p className="text-sm text-muted-foreground">
              Nenhum lembrete próximo
            </p>
          </div>
        ) : (
          <>
            {reminders.slice(0, 3).map((reminder, index) => {
              const Icon = typeIcons[reminder.type];
              return (
                <motion.div
                  key={reminder.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${typeColors[reminder.type]}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-card-foreground truncate">
                      {reminder.title}
                    </p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {formatDate(reminder.dueDate)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            
            {reminders.length > 3 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full mt-3 text-primary hover:text-primary-hover"
              >
                Ver todos ({reminders.length} lembretes)
              </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}