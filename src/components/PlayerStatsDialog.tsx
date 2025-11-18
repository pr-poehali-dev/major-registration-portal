import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

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

interface PlayerStatsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  player: Player | null;
}

const PlayerStatsDialog = ({ open, onOpenChange, player }: PlayerStatsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl border-primary/30 bg-card/95 backdrop-blur">
        {player && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/20 rounded-full">
                  <Icon name="User" size={32} className="text-primary" />
                </div>
                <div>
                  <DialogTitle className="text-3xl text-primary">{player.nickname}</DialogTitle>
                  <DialogDescription className="text-base">
                    {player.firstName} {player.lastName}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
                  <p className="text-sm text-muted-foreground mb-1">Любимое оружие</p>
                  <p className="font-semibold text-lg text-primary">{player.favoriteWeapon}</p>
                </div>
                <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
                  <p className="text-sm text-muted-foreground mb-1">Любимый игрок</p>
                  <p className="font-semibold text-lg text-primary">{player.favoritePlayer}</p>
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
                    <p className="text-2xl font-bold text-primary">{player.stats.kills}</p>
                    <p className="text-sm text-muted-foreground">Киллы</p>
                  </div>
                  <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Icon name="Skull" size={24} className="text-destructive" />
                    </div>
                    <p className="text-2xl font-bold text-destructive">{player.stats.deaths}</p>
                    <p className="text-sm text-muted-foreground">Смерти</p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/30 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Icon name="Trophy" size={24} className="text-secondary" />
                    </div>
                    <p className="text-2xl font-bold text-secondary">{player.stats.wins}</p>
                    <p className="text-sm text-muted-foreground">Побед</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50 border border-border text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Icon name="X" size={24} className="text-muted-foreground" />
                    </div>
                    <p className="text-2xl font-bold">{player.stats.losses}</p>
                    <p className="text-sm text-muted-foreground">Поражений</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50 border border-border text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Icon name="Minus" size={24} className="text-muted-foreground" />
                    </div>
                    <p className="text-2xl font-bold">{player.stats.draws}</p>
                    <p className="text-sm text-muted-foreground">Ничьих</p>
                  </div>
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/30 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Icon name="Award" size={24} className="text-primary" />
                    </div>
                    <p className="text-2xl font-bold text-primary">
                      {(player.stats.kills / player.stats.deaths).toFixed(2)}
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
                  {player.stats.tournaments.map((tournament, index) => (
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
  );
};

export default PlayerStatsDialog;
