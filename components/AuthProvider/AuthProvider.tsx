'use client';

import { checkSession, getMe } from '@/lib/api/clientApi';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import Loading from '@/app/loading';

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const setUser = useAuthStore(state => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    state => state.clearIsAuthenticated
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const isAuthenticated = await checkSession();
        if (isAuthenticated) {
          const user = await getMe();
          if (user) {
            setUser(user);
          } else {
            clearIsAuthenticated();
          }
        }
      } catch {
        clearIsAuthenticated();
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  if (loading) {
    return <Loading />;
  }

  return children;
}
