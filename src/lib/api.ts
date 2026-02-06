const fetchAPI = async (endpoint: string) => {
  const response = await fetch(`${process.env.RAPID_API_URL}${endpoint}`, {
    headers: {
      "x-rapidapi-key": `${process.env.RAPID_API_KEY}`,
      "x-rapidapi-host": `${process.env.RAPID_API_HOST}`,
    },
  });

  if (!response.ok)
    throw new Error(
      `There was a problem with API request: ${response.status} /n ${response.statusText}`,
    );

  return response.json();
};

export { fetchAPI };
