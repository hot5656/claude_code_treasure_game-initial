import { useState, FormEvent } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from './ui/card';
import { signUp, signIn, AuthSession } from '../lib/api';

interface AuthScreenProps {
  onAuthenticated: (session: AuthSession) => void;
  onPlayAsGuest: () => void;
}

function AuthForm({
  mode,
  onAuthenticated,
}: {
  mode: 'signup' | 'signin';
  onAuthenticated: (session: AuthSession) => void;
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const session =
        mode === 'signup' ? await signUp(username, password) : await signIn(username, password);
      onAuthenticated(session);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`${mode}-username`}>Username</Label>
        <Input
          id={`${mode}-username`}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${mode}-password`}>Password</Label>
        <Input
          id={`${mode}-password`}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
          required
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" disabled={submitting} className="w-full bg-amber-600 hover:bg-amber-700">
        {submitting
          ? 'Please wait…'
          : mode === 'signup'
          ? 'Create account'
          : 'Sign in'}
      </Button>
    </form>
  );
}

export default function AuthScreen({ onAuthenticated, onPlayAsGuest }: AuthScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl mb-4 text-amber-900">🏴‍☠️ Treasure Hunt Game 🏴‍☠️</h1>
        <p className="text-amber-800">Sign in to save your scores, or jump right in as a guest.</p>
      </div>

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign in or create an account</CardTitle>
          <CardDescription>Your scores are saved to your account across visits.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="signin" className="flex-1">
                Sign in
              </TabsTrigger>
              <TabsTrigger value="signup" className="flex-1">
                Sign up
              </TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <AuthForm mode="signin" onAuthenticated={onAuthenticated} />
            </TabsContent>
            <TabsContent value="signup">
              <AuthForm mode="signup" onAuthenticated={onAuthenticated} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="mt-6 flex flex-col items-center gap-2">
        <p className="text-amber-700 text-sm">or</p>
        <Button variant="outline" onClick={onPlayAsGuest}>
          Play as Guest
        </Button>
        <p className="text-amber-600 text-xs">Guest scores aren't saved anywhere.</p>
      </div>
    </div>
  );
}
