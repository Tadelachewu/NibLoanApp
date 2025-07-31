'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from '@/hooks/use-translation';
import { Landmark, Fingerprint } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";

const testUsers = {
  'admin@gmail.com': { password: 'admin@123', role: 'admin' },
  'user@gmail.com': { password: 'user@123', role: 'customer' },
  'officer@gmail.com': { password: 'officer@123', role: 'loan-officer' },
}

export default function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = () => {
    const user = testUsers[email as keyof typeof testUsers];
    if (user && user.password === password) {
      localStorage.setItem('userRole', user.role);
      router.push('/dashboard');
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
      })
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Landmark className="h-8 w-8" />
          </div>
          <CardTitle className="font-headline text-3xl">X Bank</CardTitle>
          <CardDescription>{t('login.welcome')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t('login.email')}</Label>
            <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pin">Password</Label>
            <Input id="pin" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" onClick={handleLogin}>
            {t('login.loginButton')}
          </Button>
          <Button variant="secondary" className="w-full" onClick={handleLogin}>
            <Fingerprint className="mr-2 h-4 w-4" />
            {t('login.biometricsButton')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
