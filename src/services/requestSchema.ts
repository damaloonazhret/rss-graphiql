export const defaultAPI = 'https://rickandmortyapi.graphcdn.app/';
export const requestSchema = async () => {
  const response = await fetch(defaultAPI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: `
              {
                __schema {
                  queryType {
                    fields {
                      name
                    }
                  }
                }
              }
            `,
    }),
  });
  const result = await response.json();
  return result;
};
