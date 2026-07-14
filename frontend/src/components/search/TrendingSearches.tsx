import { Flame } from "lucide-react";

interface TrendingSearchesProps {
  query: string;
  onSelect: (value: string) => void;
}

const trending = [
  "Mango Pickle",
  "Turmeric Powder",
  "Honey",
  "Millet Mix",
  "Drumstick Powder",
];

export const TrendingSearches = ({
  query,
  onSelect,
}: TrendingSearchesProps) => {

  if (query.trim()) return null;

  return (
    <div className="space-y-4">

      <div className="flex items-center gap-2">

        <Flame className="w-5 h-5 text-orange-500" />

        <h2 className="font-semibold text-lg">
          Trending Searches
        </h2>

      </div>

      <div className="flex flex-wrap gap-3">

        {trending.map((item) => (
          <button
            key={item}
            onClick={() => onSelect(item)}
            className="px-4 py-2 rounded-full bg-orange-50 border hover:bg-orange-100 transition"
          >
            🔥 {item}
          </button>
        ))}

      </div>

    </div>
  );
};