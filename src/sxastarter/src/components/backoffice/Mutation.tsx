import React from 'react';
import { GraphQLRequestClient } from '@sitecore-jss/sitecore-jss';
import config from 'temp/config';

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
    const client = new GraphQLRequestClient(config.graphQLEndpoint, {
      apiKey: config.sitecoreApiKey,
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
      <button onClick={handleFetchItem}>Fetch Item</button>
    </div>
  );
};
