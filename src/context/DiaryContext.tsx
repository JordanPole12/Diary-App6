import {
    createContext,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from "react";

export type Mood = "Happy" | "Calm" | "Sad" | "Excited" | "Grateful";

export type DiaryEntry = {
  id: string;
  title: string;
  date: string;
  body: string;
  mood: Mood;
};

type DiaryContextType = {
  entries: DiaryEntry[];
  likedIds: Set<string>;
  compactMode: boolean;
  setCompactMode: (value: boolean) => void;
  addEntry: (entry: Omit<DiaryEntry, "id">) => void;
  toggleLike: (id: string) => void;
  getById: (id: string) => DiaryEntry | undefined;
};

const DiaryContext = createContext<DiaryContextType | undefined>(undefined);

type DiaryProviderProps = {
  children: ReactNode;
};

export function DiaryProvider({ children }: DiaryProviderProps) {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [compactMode, setCompactMode] = useState(false);

  const addEntry = (entry: Omit<DiaryEntry, "id">) => {
    const newEntry: DiaryEntry = {
      ...entry,
      id: Date.now().toString(),
    };

    setEntries((currentEntries) => [newEntry, ...currentEntries]);
  };

  const toggleLike = (id: string) => {
    setLikedIds((currentIds) => {
      const updatedIds = new Set(currentIds);

      if (updatedIds.has(id)) {
        updatedIds.delete(id);
      } else {
        updatedIds.add(id);
      }

      return updatedIds;
    });
  };

  const getById = (id: string) => {
    return entries.find((entry) => entry.id === id);
  };

  const value = useMemo(
    () => ({
      entries,
      likedIds,
      compactMode,
      setCompactMode,
      addEntry,
      toggleLike,
      getById,
    }),
    [entries, likedIds, compactMode],
  );

  return (
    <DiaryContext.Provider value={value}>{children}</DiaryContext.Provider>
  );
}

export function useDiary() {
  const context = useContext(DiaryContext);

  if (!context) {
    throw new Error("useDiary must be used inside a DiaryProvider");
  }

  return context;
}
