import { useEffect, useMemo, useState } from "react";

type SearchableDiary = {
  title: string;
  body: string;
  date: string;
  mood: string;
};

export function useDiarySearch<T extends SearchableDiary>(entries: T[]) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [mood, setMood] = useState("All");

  // Debounce pencarian selama 350 ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim().toLowerCase());
    }, 350);

    // Cleanup untuk mencegah timer lama berjalan
    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  // Gabungkan pencarian dan filter mood
  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      const matchesSearch =
        entry.title.toLowerCase().includes(debouncedQuery) ||
        entry.body.toLowerCase().includes(debouncedQuery) ||
        entry.date.toLowerCase().includes(debouncedQuery);

      const matchesMood = mood === "All" || entry.mood === mood;

      return matchesSearch && matchesMood;
    });
  }, [entries, debouncedQuery, mood]);

  // Reset pencarian dan filter
  const resetFilters = () => {
    setQuery("");
    setDebouncedQuery("");
    setMood("All");
  };

  return {
    query,
    setQuery,
    mood,
    setMood,
    filteredEntries,
    resetFilters,
  };
}
