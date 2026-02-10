interface Results {
  [key: string]: string;
}

const Results = ({ results }: { results: [Results] }) => {
  const output = JSON.stringify(results);

  return <pre>{output}</pre>;
};

export default Results;
