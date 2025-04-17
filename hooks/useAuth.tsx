import { useEffect, useState } from 'react';
import { supabase } from '../components/utils/supabaseClient'; // Adapte le chemin si nécessaire
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
        // Récupère les données utilisateur depuis la table 'users'
        const { data: userData, error } = await supabase
          .from('users')
          .select('name, email')
          .eq('id', data.session.user.id)
          .single();

        if (error) {
          console.error("Erreur de récupération des données utilisateur:", error.message);
        } else {
          setUser(userData); // On sauvegarde les données utilisateur
        }
      }
    };

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
        if (newSession) {
          // Met à jour les données utilisateur lors de la modification de session
          const fetchUserData = async () => {
            const { data: userData, error } = await supabase
              .from('users')
              .select('name, email')
              .eq('id', newSession.user.id)
              .single();

            if (error) {
              console.error("Erreur de récupération des données utilisateur:", error.message);
            } else {
              setUser(userData);
            }
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

  // Fonction de déconnexion
  const logout = async () => {
    await supabase.auth.signOut(); // Déconnexion via Supabase
    setSession(null); // Réinitialiser la session
    setUser(null); // Réinitialiser les données utilisateur
  };

  return { session, user, loading, logout }; // Retourne 'user' pour avoir accès aux données utilisateur
};