import React from 'react';
import { GraphQLRequestClient } from '@sitecore-jss/sitecore-jss';

const QUERY = `
  query GetItem($path: String!, $language: String!) {
    item(path: $path, language: $language) {
      name
      path
    }
  }
`;

export const Default = (): JSX.Element => {
  const handleFetchItem = async () => {
    const client = new GraphQLRequestClient('https://xmc-noesis136a1-demob96b-devteamd85c.sitecorecloud.io/sitecore/api/graph/edge', {
      apiKey: "{911A87DB-4939-478A-8633-34869EFB2453}"
    });

    try {
      // Faz a requisição com a query e variáveis
      const data = await client.request(QUERY, {
        path: '/sitecore/content/Home',
        language: 'en',
      });

      // Exibe a resposta no console
      console.log('Resposta da query:', data);
    } catch (error) {
      // Exibe o erro no console
      console.error('Erro ao fazer a query:', error);
    }
  };

  return (
    <div>
      <button onClick={handleFetchItem}>
        Fetch Item
      </button>
    </div>
  );
};