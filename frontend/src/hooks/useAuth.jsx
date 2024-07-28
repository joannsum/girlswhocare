// src/hooks/useAuth.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; 

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInitialSession = async () => {
      console.log('Supabase client:', supabase);
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session:', error);
      }
      setUser(session?.user ?? null);
      setLoading(false);
    };
  
    getInitialSession();
  }, []);
  

  useEffect(() => {
    // Get the initial session
    const getInitialSession = async () => {
      console.log('GETTING SOMETHING REE')
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getInitialSession();

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Cleanup the subscription
    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
};