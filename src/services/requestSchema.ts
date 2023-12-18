export const defaultAPI = 'https://rickandmortyapi.graphcdn.app/';
const initialQuery = `
              {
                __schema {
                  queryType {
                    fields {
                      name
                    }
                  }
                }
              }
            `;
export const requestSchema = async () => {
  const response = await fetch(defaultAPI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: initialQuery,
    }),
  });
  const result = await response.json();
  return result;
};
