import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

type UserRole = 'player' | 'admin' | null;
type AuthMode = 'login' | 'register';

interface AuthViewProps {
  selectedRole: UserRole;
  onAuth: (e: React.FormEvent) => void;
  onBack: () => void;
}

const AuthView = ({ selectedRole, onAuth, onBack }: AuthViewProps) => {
  const [authMode, setAuthMode] = useState<AuthMode>('login');

  return (
    <div className="min-h-screen cyber-grid relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-secondary/10 blur-[120px] rounded-full" />
      
      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        <Button 
          variant="ghost" 
          className="absolute top-8 left-8 text-primary hover:text-primary/80"
          onClick={onBack}
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
                <form onSubmit={onAuth} className="space-y-4">
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
                <form onSubmit={onAuth} className="space-y-4">
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
};

export default AuthView;
