import React from "react";
import { useEffect, useState } from "react";
import { supabase } from "../components/utils/supabaseClient";

type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  category: string;
  is_premium: boolean;
  created_at: string;
};

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

      if (error) {
        console.error("Erreur lors du chargement des événements :", error.message);
      } else {
        setEvents(data as Event[]);
      }

      setLoading(false);
    };

    fetchEvents();
  }, []);

  return { events, loading };
};
