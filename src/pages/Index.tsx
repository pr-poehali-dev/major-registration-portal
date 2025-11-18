import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

type UserRole = 'player' | 'admin' | null;
type AuthMode = 'login' | 'register';

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

const mockPlayers: Player[] = [
  {
    id: '1',
    firstName: 'Александр',
    lastName: 'Иванов',
    nickname: 's1mple',
    favoriteWeapon: 'AWP',
    favoritePlayer: 'ZywOo',
    stats: {
      kills: 1247,
      deaths: 892,
      wins: 45,
      losses: 23,
      draws: 5,
      tournaments: ['MAJOR 2024 Spring', 'MAJOR 2024 Summer', 'Regional Cup']
    }
  },
  {
    id: '2',
    firstName: 'Дмитрий',
    lastName: 'Петров',
    nickname: 'electronic',
    favoriteWeapon: 'AK-47',
    favoritePlayer: 'NiKo',
    stats: {
      kills: 1089,
      deaths: 945,
      wins: 42,
      losses: 25,
      draws: 6,
      tournaments: ['MAJOR 2024 Spring', 'MAJOR 2024 Summer']
    }
  },
  {
    id: '3',
    firstName: 'Михаил',
    lastName: 'Сидоров',
    nickname: 'flamie',
    favoriteWeapon: 'M4A4',
    favoritePlayer: 's1mple',
    stats: {
      kills: 967,
      deaths: 823,
      wins: 38,
      losses: 28,
      draws: 4,
      tournaments: ['MAJOR 2024 Summer', 'Regional Cup']
    }
  }
];

const mockTournaments: Tournament[] = [
  {
    id: '1',
    name: 'MAJOR 2024 Winter Qualifier',
    date: '2024-12-15',
    time: '14:00',
    status: 'upcoming'
  },
  {
    id: '2',
    name: 'Regional Championship',
    date: '2024-12-10',
    time: '16:00',
    status: 'live'
  },
  {
    id: '3',
    name: 'MAJOR 2024 Fall Finals',
    date: '2024-11-28',
    time: '18:00',
    status: 'completed'
  }
];

const Index = () => {
  const { toast } = useToast();
  const [currentView, setCurrentView] = useState<'role-select' | 'auth' | 'dashboard'>('role-select');
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [showPlayerDialog, setShowPlayerDialog] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<string>('');

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setCurrentView('auth');
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setCurrentView('dashboard');
    const nickname = (e.target as any).nickname?.value || 'Admin';
    setCurrentUser(nickname);
    toast({
      title: 'Вход выполнен',
      description: `Добро пожаловать в систему MAJOR!`,
    });
  };

  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player);
    setShowPlayerDialog(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('role-select');
    setSelectedRole(null);
    setCurrentUser('');
    toast({
      title: 'Выход выполнен',
      description: 'До встречи на турнире!',
    });
  };

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

  if (currentView === 'role-select') {
    return (
      <div className="min-h-screen cyber-grid relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-secondary/10 blur-[120px] rounded-full" />
        
        <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-block mb-6 glow-cyan-strong p-4 rounded-lg bg-card/50 backdrop-blur">
              <Icon name="Trophy" size={64} className="text-primary" />
            </div>
            <h1 className="text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary">
              MAJOR
            </h1>
            <p className="text-2xl text-muted-foreground mb-2">Киберспортивный турнир CS2</p>
            <p className="text-lg text-primary">Выберите свою роль для входа в систему</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
            <Card 
              className="group cursor-pointer border-2 border-primary/20 hover:border-primary transition-all duration-300 hover:glow-cyan bg-card/80 backdrop-blur animate-fade-in"
              onClick={() => handleRoleSelect('player')}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-6 bg-primary/10 rounded-full w-fit group-hover:scale-110 transition-transform">
                  <Icon name="Gamepad2" size={48} className="text-primary" />
                </div>
                <CardTitle className="text-3xl text-primary">ИГРОК</CardTitle>
                <CardDescription className="text-base mt-2">
                  Участвуйте в турнирах и отслеживайте свою статистику
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center pb-6">
                <Button className="w-full bg-primary hover:bg-primary/90 text-black font-semibold text-lg py-6 group-hover:scale-105 transition-transform">
                  Войти как игрок
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="group cursor-pointer border-2 border-secondary/20 hover:border-secondary transition-all duration-300 hover:glow-cyan bg-card/80 backdrop-blur animate-fade-in"
              onClick={() => handleRoleSelect('admin')}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-6 bg-secondary/10 rounded-full w-fit group-hover:scale-110 transition-transform">
                  <Icon name="Shield" size={48} className="text-secondary" />
                </div>
                <CardTitle className="text-3xl text-secondary">РУКОВОДИТЕЛЬ</CardTitle>
                <CardDescription className="text-base mt-2">
                  Управляйте турнирами и статистикой игроков
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center pb-6">
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-black font-semibold text-lg py-6 group-hover:scale-105 transition-transform">
                  Админ-панель
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'auth') {
    return (
      <div className="min-h-screen cyber-grid relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-secondary/10 blur-[120px] rounded-full" />
        
        <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
          <Button 
            variant="ghost" 
            className="absolute top-8 left-8 text-primary hover:text-primary/80"
            onClick={() => setCurrentView('role-select')}
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>

          <Card className="w-full max-w-md border-2 border-primary/30 glow-cyan bg-card/90 backdrop-blur animate-fade-in">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                <Icon name={selectedRole === 'player' ? 'Gamepad2' : 'Shield'} size={40} className="text-primary" />
              </div>
              <CardTitle className="text-3xl text-primary">
                {selectedRole === 'player' ? 'ВХОД ИГРОКА' : 'ВХОД АДМИНИСТРАТОРА'}
              </CardTitle>
              <CardDescription>
                {selectedRole === 'player' ? 'Войдите или зарегистрируйтесь' : 'Войдите с правами администратора'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={authMode} onValueChange={(v) => setAuthMode(v as AuthMode)} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Вход</TabsTrigger>
                  <TabsTrigger value="register">Регистрация</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleAuth} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nickname">{selectedRole === 'player' ? 'Псевдоним' : 'Логин'}</Label>
                      <Input 
                        id="nickname" 
                        name="nickname"
                        placeholder={selectedRole === 'player' ? 'Введите псевдоним' : 'Введите логин'} 
                        className="bg-background border-primary/30"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Пароль</Label>
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="Введите пароль" 
                        className="bg-background border-primary/30"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-black font-semibold">
                      Войти
                      <Icon name="LogIn" size={18} className="ml-2" />
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register">
                  <form onSubmit={handleAuth} className="space-y-4">
                    {selectedRole === 'player' ? (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">Имя</Label>
                            <Input 
                              id="firstName" 
                              placeholder="Иван" 
                              className="bg-background border-primary/30"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Фамилия</Label>
                            <Input 
                              id="lastName" 
                              placeholder="Иванов" 
                              className="bg-background border-primary/30"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nickname">Псевдоним</Label>
                          <Input 
                            id="nickname" 
                            name="nickname"
                            placeholder="ProPlayer123" 
                            className="bg-background border-primary/30"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="weapon">Любимое оружие</Label>
                          <Input 
                            id="weapon" 
                            placeholder="AWP" 
                            className="bg-background border-primary/30"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="favoritePlayer">Любимый CS игрок</Label>
                          <Input 
                            id="favoritePlayer" 
                            placeholder="s1mple" 
                            className="bg-background border-primary/30"
                            required
                          />
                        </div>
                      </>
                    ) : (
                      <div className="space-y-2">
                        <Label htmlFor="adminLogin">Логин администратора</Label>
                        <Input 
                          id="adminLogin" 
                          name="nickname"
                          placeholder="admin" 
                          className="bg-background border-primary/30"
                          required
                        />
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="regPassword">Пароль</Label>
                      <Input 
                        id="regPassword" 
                        type="password" 
                        placeholder="Придумайте пароль" 
                        className="bg-background border-primary/30"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-black font-semibold">
                      Зарегистрироваться
                      <Icon name="UserPlus" size={18} className="ml-2" />
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
            <Button variant="outline" onClick={handleLogout} className="border-primary/30 hover:bg-primary/10">
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
                {mockTournaments.map((tournament) => (
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
                {mockPlayers.map((player) => (
                  <div
                    key={player.id}
                    onClick={() => handlePlayerClick(player)}
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

      <Dialog open={showPlayerDialog} onOpenChange={setShowPlayerDialog}>
        <DialogContent className="max-w-2xl border-primary/30 bg-card/95 backdrop-blur">
          {selectedPlayer && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/20 rounded-full">
                    <Icon name="User" size={32} className="text-primary" />
                  </div>
                  <div>
                    <DialogTitle className="text-3xl text-primary">{selectedPlayer.nickname}</DialogTitle>
                    <DialogDescription className="text-base">
                      {selectedPlayer.firstName} {selectedPlayer.lastName}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
                    <p className="text-sm text-muted-foreground mb-1">Любимое оружие</p>
                    <p className="font-semibold text-lg text-primary">{selectedPlayer.favoriteWeapon}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
                    <p className="text-sm text-muted-foreground mb-1">Любимый игрок</p>
                    <p className="font-semibold text-lg text-primary">{selectedPlayer.favoritePlayer}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Icon name="BarChart3" size={24} className="text-primary" />
                    Статистика
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/30 text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Icon name="Target" size={24} className="text-primary" />
                      </div>
                      <p className="text-2xl font-bold text-primary">{selectedPlayer.stats.kills}</p>
                      <p className="text-sm text-muted-foreground">Киллы</p>
                    </div>
                    <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Icon name="Skull" size={24} className="text-destructive" />
                      </div>
                      <p className="text-2xl font-bold text-destructive">{selectedPlayer.stats.deaths}</p>
                      <p className="text-sm text-muted-foreground">Смерти</p>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/30 text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Icon name="Trophy" size={24} className="text-secondary" />
                      </div>
                      <p className="text-2xl font-bold text-secondary">{selectedPlayer.stats.wins}</p>
                      <p className="text-sm text-muted-foreground">Побед</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50 border border-border text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Icon name="X" size={24} className="text-muted-foreground" />
                      </div>
                      <p className="text-2xl font-bold">{selectedPlayer.stats.losses}</p>
                      <p className="text-sm text-muted-foreground">Поражений</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50 border border-border text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Icon name="Minus" size={24} className="text-muted-foreground" />
                      </div>
                      <p className="text-2xl font-bold">{selectedPlayer.stats.draws}</p>
                      <p className="text-sm text-muted-foreground">Ничьих</p>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/30 text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Icon name="Award" size={24} className="text-primary" />
                      </div>
                      <p className="text-2xl font-bold text-primary">
                        {(selectedPlayer.stats.kills / selectedPlayer.stats.deaths).toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">K/D Ratio</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Icon name="Medal" size={24} className="text-primary" />
                    Участие в турнирах
                  </h3>
                  <div className="space-y-2">
                    {selectedPlayer.stats.tournaments.map((tournament, index) => (
                      <div 
                        key={index}
                        className="p-3 rounded-lg bg-background/50 border border-primary/20 flex items-center gap-2"
                      >
                        <Icon name="Award" size={18} className="text-primary" />
                        <span>{tournament}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
