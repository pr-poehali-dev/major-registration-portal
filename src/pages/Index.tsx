import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import RoleSelectView from '@/components/RoleSelectView';
import AuthView from '@/components/AuthView';
import DashboardView from '@/components/DashboardView';
import PlayerStatsDialog from '@/components/PlayerStatsDialog';

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
  const [currentView, setCurrentView] = useState<'role-select' | 'auth' | 'dashboard'>(() => {
    const saved = localStorage.getItem('majorCurrentView');
    return (saved as 'role-select' | 'auth' | 'dashboard') || 'role-select';
  });
  const [selectedRole, setSelectedRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('majorSelectedRole');
    return (saved as UserRole) || null;
  });
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [showPlayerDialog, setShowPlayerDialog] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = localStorage.getItem('majorIsLoggedIn');
    return saved === 'true';
  });
  const [currentUser, setCurrentUser] = useState<string>(() => {
    return localStorage.getItem('majorCurrentUser') || '';
  });

  useEffect(() => {
    localStorage.setItem('majorCurrentView', currentView);
  }, [currentView]);

  useEffect(() => {
    localStorage.setItem('majorSelectedRole', selectedRole || '');
  }, [selectedRole]);

  useEffect(() => {
    localStorage.setItem('majorIsLoggedIn', String(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('majorCurrentUser', currentUser);
  }, [currentUser]);

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
    localStorage.removeItem('majorCurrentView');
    localStorage.removeItem('majorSelectedRole');
    localStorage.removeItem('majorIsLoggedIn');
    localStorage.removeItem('majorCurrentUser');
    toast({
      title: 'Выход выполнен',
      description: 'До встречи на турнире!',
    });
  };

  const handleBackToRoleSelect = () => {
    setCurrentView('role-select');
  };

  if (currentView === 'role-select') {
    return <RoleSelectView onRoleSelect={handleRoleSelect} />;
  }

  if (currentView === 'auth') {
    return (
      <AuthView 
        selectedRole={selectedRole} 
        onAuth={handleAuth} 
        onBack={handleBackToRoleSelect} 
      />
    );
  }

  return (
    <>
      <DashboardView
        selectedRole={selectedRole}
        currentUser={currentUser}
        tournaments={mockTournaments}
        players={mockPlayers}
        onLogout={handleLogout}
        onPlayerClick={handlePlayerClick}
      />
      <PlayerStatsDialog
        open={showPlayerDialog}
        onOpenChange={setShowPlayerDialog}
        player={selectedPlayer}
      />
    </>
  );
};

export default Index;