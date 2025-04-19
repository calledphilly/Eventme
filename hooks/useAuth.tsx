import { useEffect, useState } from 'react';
import { supabase } from '../components/utils/supabaseClient';
import { Session } from '@supabase/supabase-js';

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);

      if (data.session) {
        const { data: userData, error } = await supabase
          .from('users')
          .select('name, email')
          .eq('id', data.session.user.id)
          .single();

        if (error) {
          console.error("Erreur de récupération des données utilisateur:", error.message);
        } else {
          setUser(userData);
        }
      }
    };

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
        if (newSession) {
          const fetchUserData = async () => {
            const { data: userData, error } = await supabase
              .from('users')
              .select('name, email')
              .eq('id', newSession.user.id)
              .single();

              setUser(userData);
          };

          fetchUserData();
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
  };

  return { session, user, loading, logout };
};

