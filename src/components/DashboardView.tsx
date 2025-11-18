import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type UserRole = 'player' | 'admin' | null;

interface Player {
  id: string;
  firstName: string;
  lastName: string;
  nickname: string;
  favoriteWeapon: string;
  favoritePlayer: string;
  stats: {
    kills: number;
    deaths: number;
    wins: number;
    losses: number;
    draws: number;
    tournaments: string[];
  };
}

interface Tournament {
  id: string;
  name: string;
  date: string;
  time: string;
  status: 'upcoming' | 'live' | 'completed';
}

interface DashboardViewProps {
  selectedRole: UserRole;
  currentUser: string;
  tournaments: Tournament[];
  players: Player[];
  onLogout: () => void;
  onPlayerClick: (player: Player) => void;
}

const DashboardView = ({ 
  selectedRole, 
  currentUser, 
  tournaments, 
  players, 
  onLogout, 
  onPlayerClick 
}: DashboardViewProps) => {
  const getStatusColor = (status: Tournament['status']) => {
    switch (status) {
      case 'live':
        return 'bg-secondary text-black';
      case 'upcoming':
        return 'bg-primary text-black';
      case 'completed':
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status: Tournament['status']) => {
    switch (status) {
      case 'live':
        return 'В ЭФИРЕ';
      case 'upcoming':
        return 'СКОРО';
      case 'completed':
        return 'ЗАВЕРШЁН';
    }
  };

  return (
    <div className="min-h-screen cyber-grid relative">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[100px] rounded-full" />
      
      <header className="relative z-10 border-b border-primary/30 bg-card/50 backdrop-blur-lg sticky top-0">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary/20 rounded-lg glow-cyan">
              <Icon name="Trophy" size={32} className="text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">MAJOR</h1>
              <p className="text-sm text-muted-foreground">CS2 Tournament System</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">{selectedRole === 'player' ? 'Игрок' : 'Администратор'}</p>
              <p className="font-semibold text-primary">{currentUser}</p>
            </div>
            <Button variant="outline" onClick={onLogout} className="border-primary/30 hover:bg-primary/10">
              <Icon name="LogOut" size={18} className="mr-2" />
              Выход
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-primary/30 bg-card/80 backdrop-blur animate-fade-in">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded">
                    <Icon name="Calendar" size={24} className="text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Расписание турниров</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {tournaments.map((tournament) => (
                  <div 
                    key={tournament.id}
                    className="p-4 rounded-lg border border-primary/20 bg-background/50 hover:border-primary/40 transition-all hover:glow-cyan"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">{tournament.name}</h3>
                      <Badge className={getStatusColor(tournament.status)}>
                        {getStatusText(tournament.status)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Icon name="Calendar" size={16} />
                        {new Date(tournament.date).toLocaleDateString('ru-RU')}
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Clock" size={16} />
                        {tournament.time}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {selectedRole === 'admin' && (
              <Card className="border-secondary/30 bg-card/80 backdrop-blur animate-fade-in">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-secondary/20 rounded">
                      <Icon name="Settings" size={24} className="text-secondary" />
                    </div>
                    <CardTitle className="text-2xl">Управление</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start bg-primary/10 hover:bg-primary/20 text-foreground border border-primary/30">
                    <Icon name="Plus" size={18} className="mr-2" />
                    Добавить турнир
                  </Button>
                  <Button className="w-full justify-start bg-secondary/10 hover:bg-secondary/20 text-foreground border border-secondary/30">
                    <Icon name="Edit" size={18} className="mr-2" />
                    Редактировать статистику
                  </Button>
                  <Button className="w-full justify-start bg-muted hover:bg-muted/80 text-foreground border border-border">
                    <Icon name="Users" size={18} className="mr-2" />
                    Управление игроками
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card className="border-primary/30 bg-card/80 backdrop-blur animate-fade-in">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded">
                    <Icon name="Users" size={24} className="text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Игроки</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {players.map((player) => (
                  <div
                    key={player.id}
                    onClick={() => onPlayerClick(player)}
                    className="p-3 rounded-lg border border-primary/20 bg-background/50 cursor-pointer hover:border-primary/40 transition-all hover:glow-cyan group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-primary group-hover:text-secondary transition-colors">
                          {player.nickname}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {player.firstName} {player.lastName}
                        </p>
                      </div>
                      <Icon name="ChevronRight" size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Icon name="Target" size={14} />
                        {player.stats.kills}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Trophy" size={14} />
                        {player.stats.wins}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardView;
