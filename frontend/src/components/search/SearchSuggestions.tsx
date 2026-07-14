import { RecentSearches } from "./RecentSearches";
import { TrendingSearches } from "./TrendingSearches";

interface SearchSuggestionsProps {
  query: string;
  onSelect: (value: string) => void;
}

export const SearchSuggestions = ({
  query,
  onSelect,
}: SearchSuggestionsProps) => {
  return (
    <div className="space-y-8 mt-6">

      <RecentSearches
        query={query}
        onSelect={onSelect}
      />

      <TrendingSearches
        query={query}
        onSelect={onSelect}
      />

    </div>
  );
};