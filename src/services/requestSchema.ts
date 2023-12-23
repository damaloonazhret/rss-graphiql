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
export const requestSchema = async (apiEndpoint: string) => {
  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: initialQuery,
      }),
    });
    if (!response.ok) {
      const errorResult = await response.json();
      return { error: errorResult, data: null };
    }

    const result = await response.json();
    return { error: null, data: result.data };
  } catch (error) {
    return { error: 'An unknown error occurred', data: null };
  }
};
