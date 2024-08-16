import React, { useState } from 'react';
import { GraphQLClient } from 'graphql-request';

// Definindo a query GraphQL como string
const GET_ITEM_QUERY = `
  query GetItem($path: String!, $language: String!) {
    item(path: $path, language: $language) {
      id
      name
      fields {
        name
        value
      }
    }
  }
`;

export const Default = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);

  const handleFetchItem = async () => {
    setLoading(true);
    setError(null);

    // Instancia o GraphQLClient com o endpoint e os cabeçalhos
    const client = new GraphQLClient('https://xmc-noesis136a1-demob96b-devteamd85c.sitecorecloud.io/sitecore/api/graph/edge', {
      headers: {
        sc_apikey: '{911A87DB-4939-478A-8633-34869EFB2453}', // Substitua pela sua chave de API
      },
    });

    try {
      const variables = {
        path: '/sitecore/content/Home',
        language: 'en',
      };
      
      // Fazendo a requisição ao GraphQL
      const response = await client.request(GET_ITEM_QUERY, variables);
      setData(response);
      console.log('Resposta da query:', response);
    } catch (err: any) {
      setError(err.message);
      console.error('Erro ao fazer a query:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleFetchItem} disabled={loading}>
        {loading ? 'Fetching Item...' : 'Fetch Item'}
      </button>

      {data && (
        <div>
          <p><strong>Name:</strong> {data.item.name}</p>
          <p><strong>Path:</strong> {data.item.path}</p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>Erro ao fazer a query: {error}</p>}
    </div>
  );
};
