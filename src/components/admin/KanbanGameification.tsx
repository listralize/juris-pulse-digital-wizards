import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Trophy, Star, Target, TrendingUp, Gift, Flame, Award } from 'lucide-react';
import { toast } from 'sonner';

interface GameificationStats {
  totalLeads: number;
  convertedLeads: number;
  conversionRate: number;
  streak: number;
  level: number;
  points: number;
  achievements: Achievement[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  points: number;
}

interface KanbanGameificationProps {
  leads: any[];
  leadStatuses: Record<string, string>;
}

export const KanbanGameification: React.FC<KanbanGameificationProps> = ({ leads, leadStatuses }) => {
  const [stats, setStats] = useState<GameificationStats>({
    totalLeads: 0,
    convertedLeads: 0,
    conversionRate: 0,
    streak: 0,
    level: 1,
    points: 0,
    achievements: []
  });

  const [showRewards, setShowRewards] = useState(false);

  // Definir conquistas
  const allAchievements: Achievement[] = [
    {
      id: 'first-conversion',
      title: 'Primeira Conversão',
      description: 'Converta seu primeiro lead',
      icon: <Star className="h-4 w-4" />,
      unlocked: false,
      points: 50
    },
    {
      id: 'conversion-master',
      title: 'Mestre da Conversão',
      description: 'Converta 10 leads',
      icon: <Trophy className="h-4 w-4" />,
      unlocked: false,
      points: 200
    },
    {
      id: 'efficiency-expert',
      title: 'Expert em Eficiência',
      description: 'Mantenha 80% de taxa de conversão',
      icon: <Target className="h-4 w-4" />,
      unlocked: false,
      points: 300
    },
    {
      id: 'streak-warrior',
      title: 'Guerreiro da Sequência',
      description: 'Converta leads por 7 dias seguidos',
      icon: <Flame className="h-4 w-4" />,
      unlocked: false,
      points: 150
    },
    {
      id: 'lead-hunter',
      title: 'Caçador de Leads',
      description: 'Receba 50 leads',
      icon: <TrendingUp className="h-4 w-4" />,
      unlocked: false,
      points: 100
    }
  ];

  // Calcular estatísticas e conquistas
  useEffect(() => {
    const calculateStats = () => {
      const totalLeads = leads.length;
      const convertedLeads = leads.filter(lead => leadStatuses[lead.id] === 'convertido').length;
      const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;
      
      // Calcular nível baseado em pontos
      const basePoints = convertedLeads * 10 + totalLeads * 2;
      const level = Math.floor(basePoints / 100) + 1;
      
      // Simular streak (em uma implementação real, seria persistido)
      const streak = Math.floor(Math.random() * 10) + 1;
      
      // Verificar conquistas
      const updatedAchievements = allAchievements.map(achievement => {
        let unlocked = false;
        
        switch (achievement.id) {
          case 'first-conversion':
            unlocked = convertedLeads >= 1;
            break;
          case 'conversion-master':
            unlocked = convertedLeads >= 10;
            break;
          case 'efficiency-expert':
            unlocked = conversionRate >= 80 && totalLeads >= 5;
            break;
          case 'streak-warrior':
            unlocked = streak >= 7;
            break;
          case 'lead-hunter':
            unlocked = totalLeads >= 50;
            break;
        }
        
        return { ...achievement, unlocked };
      });
      
      const totalPoints = basePoints + updatedAchievements
        .filter(a => a.unlocked)
        .reduce((sum, a) => sum + a.points, 0);
      
      setStats({
        totalLeads,
        convertedLeads,
        conversionRate,
        streak,
        level,
        points: totalPoints,
        achievements: updatedAchievements
      });
    };

    calculateStats();
  }, [leads, leadStatuses]);

  const getLevelColor = (level: number) => {
    if (level >= 10) return 'bg-gradient-to-r from-purple-500 to-pink-500';
    if (level >= 5) return 'bg-gradient-to-r from-blue-500 to-purple-500';
    if (level >= 3) return 'bg-gradient-to-r from-green-500 to-blue-500';
    return 'bg-gradient-to-r from-yellow-500 to-green-500';
  };

  const getProgressToNextLevel = () => {
    const pointsForCurrentLevel = (stats.level - 1) * 100;
    const pointsForNextLevel = stats.level * 100;
    const progress = ((stats.points - pointsForCurrentLevel) / (pointsForNextLevel - pointsForCurrentLevel)) * 100;
    return Math.min(100, Math.max(0, progress));
  };

  const unlockedAchievements = stats.achievements.filter(a => a.unlocked);
  const recentlyUnlocked = unlockedAchievements.slice(-3);

  return (
    <div className="space-y-4">
      {/* Cabeçalho de Gamificação */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Dashboard de Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Nível */}
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full text-white font-bold text-lg ${getLevelColor(stats.level)}`}>
                {stats.level}
              </div>
              <p className="text-sm text-muted-foreground mt-1">Nível</p>
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getProgressToNextLevel()}%` }}
                ></div>
              </div>
            </div>

            {/* Pontos */}
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{stats.points}</div>
              <p className="text-sm text-muted-foreground">Pontos</p>
            </div>

            {/* Taxa de Conversão */}
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.conversionRate.toFixed(1)}%</div>
              <p className="text-sm text-muted-foreground">Conversão</p>
            </div>

            {/* Sequência */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="text-2xl font-bold text-orange-600">{stats.streak}</span>
              </div>
              <p className="text-sm text-muted-foreground">Sequência</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conquistas Recentes */}
      {recentlyUnlocked.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-purple-500" />
              Conquistas Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {recentlyUnlocked.map(achievement => (
                <Badge 
                  key={achievement.id} 
                  variant="secondary" 
                  className="flex items-center gap-2 p-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-200"
                >
                  {achievement.icon}
                  <div className="text-left">
                    <div className="font-medium text-xs">{achievement.title}</div>
                    <div className="text-xs text-muted-foreground">+{achievement.points} pts</div>
                  </div>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Botão de Recompensas */}
      <div className="flex justify-center">
        <Button 
          variant="outline" 
          onClick={() => setShowRewards(!showRewards)}
          className="flex items-center gap-2"
        >
          <Gift className="h-4 w-4" />
          {showRewards ? 'Ocultar' : 'Ver'} Todas as Conquistas
        </Button>
      </div>

      {/* Lista de Todas as Conquistas */}
      {showRewards && (
        <Card>
          <CardHeader>
            <CardTitle>Todas as Conquistas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.achievements.map(achievement => (
                <div 
                  key={achievement.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border ${
                    achievement.unlocked 
                      ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
                      : 'bg-muted border-muted-foreground/20'
                  }`}
                >
                  <div className={`p-2 rounded-full ${
                    achievement.unlocked ? 'bg-green-500 text-white' : 'bg-muted-foreground/20'
                  }`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{achievement.title}</div>
                    <div className="text-sm text-muted-foreground">{achievement.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary">+{achievement.points}</div>
                    <div className="text-xs text-muted-foreground">pontos</div>
                  </div>
                  {achievement.unlocked && (
                    <Badge variant="default" className="bg-green-500">
                      Desbloqueada
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};