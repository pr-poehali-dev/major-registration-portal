import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

type UserRole = 'player' | 'admin' | null;

interface RoleSelectViewProps {
  onRoleSelect: (role: UserRole) => void;
}

const RoleSelectView = ({ onRoleSelect }: RoleSelectViewProps) => {
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
            onClick={() => onRoleSelect('player')}
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
            onClick={() => onRoleSelect('admin')}
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
};

export default RoleSelectView;
