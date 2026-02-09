const SearchResults = ({ results }) => {
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
