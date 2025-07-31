'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from '@/hooks/use-translation';
import { Landmark, Fingerprint } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleLogin = () => {
    // In a real app, you'd have authentication logic here.
    router.push('/dashboard');
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
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pin">{t('login.pin')}</Label>
            <Input id="pin" type="password" placeholder="••••" />
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
