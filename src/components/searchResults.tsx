interface Result {
  place_id: string;
  name: string;
}

const SearchResults = ({
  results,
  onClick,
}: {
  results: [Result];
  onClick: (arg: string) => void;
}) => {
  return (
    <ul>
      {results.map((item) => (
        <li key={item.place_id}>
          <button onClick={() => onClick(item.place_id)}>{item.name}</button>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
