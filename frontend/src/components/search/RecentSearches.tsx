import { useEffect, useState } from "react";
import { Clock, Trash2, X } from "lucide-react";

interface RecentSearchesProps {
  query: string;
  onSelect: (value: string) => void;
}

const STORAGE_KEY = "recent-searches";

export const RecentSearches = ({
  query,
  onSelect,
}: RecentSearchesProps) => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (!query.trim()) return;

    const timeout = setTimeout(() => {
      setRecentSearches((prev) => {
        const updated = [
          query,
          ...prev.filter((item) => item !== query),
        ].slice(0, 5);

        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

        return updated;
      });
    }, 800);

    return () => clearTimeout(timeout);
  }, [query]);

  const removeSearch = (item: string) => {
    const updated = recentSearches.filter((i) => i !== item);

    setRecentSearches(updated);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const clearAll = () => {
    localStorage.removeItem(STORAGE_KEY);
    setRecentSearches([]);
  };

  if (query.trim() || recentSearches.length === 0) return null;

  return (
    <div className="space-y-4">

      <div className="flex justify-between items-center">

        <div className="flex items-center gap-2">

          <Clock className="w-5 h-5 text-green-600" />

          <h2 className="font-semibold text-lg">
            Recent Searches
          </h2>

        </div>

        <button
          onClick={clearAll}
          className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600"
        >
          <Trash2 className="w-4 h-4" />
          Clear All
        </button>

      </div>

      <div className="flex flex-wrap gap-3">

        {recentSearches.map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 bg-muted rounded-full px-4 py-2 hover:bg-green-50 transition"
          >
            <button
              onClick={() => onSelect(item)}
              className="text-sm"
            >
              {item}
            </button>

            <button
              onClick={() => removeSearch(item)}
              className="text-muted-foreground hover:text-red-500"
            >
              <X size={15} />
            </button>
          </div>
        ))}

      </div>

    </div>
  );
};