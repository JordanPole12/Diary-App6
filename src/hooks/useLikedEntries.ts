import { useMemo } from "react";

type LikedDiary = {
  id: string;
};

export function useLikedEntries<T extends LikedDiary>(
  entries: T[],
  likedIds: Set<string>,
) {
  const likedEntries = useMemo(() => {
    return entries.filter((entry) => likedIds.has(entry.id));
  }, [entries, likedIds]);

  return likedEntries;
}
