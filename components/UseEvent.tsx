import { useEffect, useState } from 'react';
import { supabase } from './utils/supabaseClient';

export interface Event {
  id: string;
  title: string;
  date: string;
  category: string;
  location: {
    coordinates: [number, number];
  };
  is_premium: boolean;
}

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select(`
          id,
          title,
          date,
          category,
          location,
          is_premium
        `);

      if (error) {
        console.error('Erreur de récupération des événements :', error);
      } else {
        setEvents(data as Event[]);
      }

      setLoading(false);
    };

    fetchEvents();
  }, []);

  return { events, loading };
};
