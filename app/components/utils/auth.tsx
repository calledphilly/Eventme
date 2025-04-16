import { supabase } from './supabaseClient'

// Fonction pour l'inscription
export const signUp = async (email, password, name) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { error };
  }

  const user = data.user;

  // Ajouter id, name, et email dans la table "users"
  const { error: insertError } = await supabase
    .from('users')
    .insert([
      { id: user.id, name, email }
    ]);

  if (insertError) {
    return { error: insertError };
  }

  return { data };
};


// Fonction pour la connexion
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
}
