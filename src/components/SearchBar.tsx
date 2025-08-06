interface Props {
  query: string;
  setQuery: (val: string) => void;
}

export default function SearchBar({ query, setQuery }: Props) {
  return (
    <div className="search-wrapper">
      <input
        type="text"
        placeholder="Search your recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
