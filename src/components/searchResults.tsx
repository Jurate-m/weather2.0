interface Result {
  place_id: string;
  name: string;
}

const SearchResults = ({ results }: { results: [Result] }) => {
  return (
    <ul>
      {results.map((item) => (
        <li key={item.place_id}>
          <button>{item.name}</button>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
