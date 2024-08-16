import React, { useState } from 'react';
import { GraphQLClient } from 'graphql-request';

// Definindo a mutation GraphQL
const CREATE_ITEM_MUTATION = `
  mutation CreateItem($input: CreateItemInput!) {
    createItem(input: $input) {
      item {
        itemId
        name
        path
        fields(ownFields: true, excludeStandardFields: true) {
          nodes {
            name
            value
          }
        }
      }
    }
  }
`;

export const Default = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);

  const handleCreateItem = async () => {
    setLoading(true);
    setError(null);

    // Configura o cliente GraphQL
    const client = new GraphQLClient('https://xmc-noesis136a1-demob96b-devteamd85c.sitecorecloud.io/sitecore/api/authoring/graphql/v1', {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InpnbnhyQk9IaXJ0WXp4dnl1WVhNZyJ9.eyJodHRwczovL2F1dGguc2l0ZWNvcmVjbG91ZC5pby9jbGFpbXMvb3JnX2lkIjoib3JnX3VCTllMUGNrS293QzQ4aWgiLCJodHRwczovL2F1dGguc2l0ZWNvcmVjbG91ZC5pby9jbGFpbXMvb3JnX25hbWUiOiJub2VzaXMtMSIsImh0dHBzOi8vYXV0aC5zaXRlY29yZWNsb3VkLmlvL2NsYWltcy9vcmdfZGlzcGxheV9uYW1lIjoiTm9lc2lzIiwiaHR0cHM6Ly9hdXRoLnNpdGVjb3JlY2xvdWQuaW8vY2xhaW1zL29yZ19hY2NvdW50X2lkIjoiMDAxM20wMDAwMmt2b0x3QUFJIiwiaHR0cHM6Ly9hdXRoLnNpdGVjb3JlY2xvdWQuaW8vY2xhaW1zL29yZ190eXBlIjoicGFydG5lciIsImh0dHBzOi8vYXV0aC5zaXRlY29yZWNsb3VkLmlvL2NsYWltcy9lbWFpbCI6IndpbGxpa2VyLmMuY2FybW9Abm9lc2lzLnB0IiwiaHR0cHM6Ly9hdXRoLnNpdGVjb3JlY2xvdWQuaW8vY2xhaW1zL3JvbGVzIjpbIltHbG9iYWxdXFxFdmVyeW9uZSIsIltPcmdhbml6YXRpb25dXFxPcmdhbml6YXRpb24gQWRtaW4iXSwiaHR0cHM6Ly9hdXRoLnNpdGVjb3JlY2xvdWQuaW8vY2xhaW1zL2NsaWVudF9uYW1lIjoiWE0gQ2xvdWQgRGVwbG95IChDTEkpIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLnNpdGVjb3JlY2xvdWQuaW8vIiwic3ViIjoiYXV0aDB8NjY4ZmZmMTg2NTc1YmRlYjc2MjAyMTI0IiwiYXVkIjpbImh0dHBzOi8vYXBpLnNpdGVjb3JlY2xvdWQuaW8iLCJodHRwczovL29uZS1zYy1wcm9kdWN0aW9uLmV1LmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE3MjM3OTg2ODgsImV4cCI6MTcyMzg4NTA4OCwic2NvcGUiOiJvcGVuaWQgZW1haWwgcHJvZmlsZSBvZmZsaW5lX2FjY2VzcyBpZGVudGl0eS51c2VyOnJlYWQgaWRlbnRpdHkudXNlcjp1cGRhdGUgaWRlbnRpdHkudXNlcl9vcmdhbml6YXRpb25zOnJlYWQgYmFja2JvbmUuZXZlbnRzOnJlYWQgY29ubmVjdC50b2tlbnM6Y3JlYXRlIGNvbm5lY3QucG9ydGFsOnJlYWQgcGxhdGZvcm0ucmVnaW9uczpsaXN0IGlkZW50aXR5LnVzZXJfcm9sZXM6cmVhZCBpZGVudGl0eS5vcmdhbml6YXRpb246cmVhZCBpZGVudGl0eS5vcmdhbml6YXRpb246dXBkYXRlIGlkZW50aXR5Lm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9uczpsaXN0IGlkZW50aXR5Lm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9uczpjcmVhdGUgaWRlbnRpdHkub3JnYW5pemF0aW9uX2ludml0YXRpb25zOnJlYWQgaWRlbnRpdHkub3JnYW5pemF0aW9uX2ludml0YXRpb25zOmRlbGV0ZSBpZGVudGl0eS5vcmdhbml6YXRpb25fbWVtYmVyczpsaXN0IGlkZW50aXR5Lm9yZ2FuaXphdGlvbl9tZW1iZXJzOnJlYWQgaWRlbnRpdHkub3JnYW5pemF0aW9uX21lbWJlcnM6ZGVsZXRlIGlkZW50aXR5Lm9yZ2FuaXphdGlvbl9tZW1iZXJzX3JvbGVzOmNyZWF0ZSBpZGVudGl0eS5vcmdhbml6YXRpb25fbWVtYmVyc19yb2xlczpkZWxldGUgaWRlbnRpdHkucm9sZXM6bGlzdCBpZGVudGl0eS5yb2xlczpyZWFkIGlkZW50aXR5Lm9yZ19jb25uZWN0aW9uczpyZWFkIGlkZW50aXR5Lm9yZ19jb25uZWN0aW9uczp3cml0ZSB4bWNsb3VkZGVwbG95LnByb2plY3RzOm1hbmFnZSB4bWNsb3VkZGVwbG95LmVudmlyb25tZW50czptYW5hZ2UgeG1jbG91ZGRlcGxveS5vcmdhbml6YXRpb25zOm1hbmFnZSB4bWNsb3VkZGVwbG95LmRlcGxveW1lbnRzOm1hbmFnZSB4bWNsb3VkZGVwbG95Lm1vbml0b3JpbmcuZGVwbG95bWVudHM6cmVhZCB4bWNsb3VkZGVwbG95LmNsaWVudHM6bWFuYWdlIHhtY2xvdWRkZXBsb3kuc291cmNlY29udHJvbDptYW5hZ2UgeG1jbG91ZGRlcGxveS5yaDptbmcgeG1jbG91ZGRlcGxveS5zaXRlOm1uZyB4bWNsb3VkLmNtOmFkbWluIHhtY2xvdWQuY206bG9naW4gY29ubmVjdC53ZWJob29rczpyZWFkIGNvbm5lY3Qud2ViaG9va3M6Y3JlYXRlIGNvbm5lY3Qud2ViaG9va3M6dXBkYXRlIGNvbm5lY3Qud2ViaG9va3M6ZGVsZXRlIHBsYXRmb3JtLnRlbmFudHM6bGlzdGFsbCBiYWNrYm9uZS5ldmVudHM6ZW5hYmxlIGJhY2tib25lLmV2ZW50czpkaXNhYmxlIGJhY2tib25lLmF1ZGl0OnJlYWQgYmFja2JvbmUuc291cmNla2V5czpjcmVhdGUgYmFja2JvbmUuc291cmNla2V5czpyZWFkIGJhY2tib25lLnNvdXJjZWtleXM6ZGVsZXRlIHVpLmV4dGVuc2lvbnM6cmVhZCBlZGdlLnRva2VuczpjcmVhdGUgZWRnZS50b2tlbnM6cmVhZCBlZGdlLnRva2VuczpkZWxldGUgZWRnZS50b2tlbnM6dXBkYXRlIGhjLm1nbW50LnR5cGVzOndyaXRlIGhjLm1nbW50LmFwaWtleXM6bWFuYWdlIGhjLm1nbW50LnR5cGVzOnJlYWQgaGMubWdtbnQubWVkaWE6bWFuYWdlIGhjLm1nbW50LnN0YXRlczpwdWJsaXNoIGhjLm1nbW50Lml0ZW1zOm1hbmFnZSBoYy5tZ21udC51c2VyczpyZWFkIGhjLm1nbW50LmNsaWVudHM6cmVhZCBoYy5tZ21udC50YXhvbm9taWVzOnJlYWQgaGMubWdtbnQudGF4b25vbWllczp3cml0ZSBoYy5tZ21udC5sb2NhbGVzOnIgaGMubWdtbnQubG9jYWxlczp3IGhjLm1nbW50LnNldHRpbmdzOnIgaGMubWdtbnQuc2V0dGluZ3M6bSBtbXMudXBsb2FkLmZpbGU6YWRkIG1tcy51cGxvYWQuZmlsZTpyZW1vdmUgYmFja2JvbmUuY29udGFjdDpwdWJsaXNoIGJhY2tib25lLmNvbnRhY3Q6c3Vic2NyaWJlIGJhY2tib25lLnNlc3Npb246cHVibGlzaCBiYWNrYm9uZS5zZXNzaW9uOnN1YnNjcmliZSBiYWNrYm9uZS5vcmRlcjpwdWJsaXNoIGJhY2tib25lLm9yZGVyOnN1YnNjcmliZSBiYWNrYm9uZS5vcmRlcmxpbmU6cHVibGlzaCBiYWNrYm9uZS5vcmRlcmxpbmU6c3Vic2NyaWJlIGJhY2tib25lLnBhZ2U6cHVibGlzaCBiYWNrYm9uZS5wYWdlOnN1YnNjcmliZSBiYWNrYm9uZS5wcm9kdWN0OnB1Ymxpc2ggYmFja2JvbmUucHJvZHVjdDpzdWJzY3JpYmUgYmFja2JvbmUuY3VzdG9tOnB1Ymxpc2ggYmFja2JvbmUuY3VzdG9tOnN1YnNjcmliZSBjbXAuc2l0ZXM6Y3JlYXRlIGNtcC5zaXRlczpyZWFkIGNtcC5jb2xsZWN0aW9uczpjcmVhdGUgY21wLmNvbGxlY3Rpb25zOnJlYWQgY21wLmNvbGxlY3Rpb25zOmRlbGV0ZSBjbXAuY29tcG9uZW50czpjcmVhdGUgY21wLmNvbXBvbmVudHM6cmVhZCBjbXAuY29tcG9uZW50czpkZWxldGUgY21wLmRhdGFzb3VyY2VzOmNyZWF0ZSBjbXAuZGF0YXNvdXJjZXM6cmVhZCBjbXAuZGF0YXNvdXJjZXM6ZGVsZXRlIGNtcC5zdHlsZXM6cmVhZCBjbXAuc3R5bGVzOnVwZGF0ZSBjbXAuc3R5bGVzOmRlbGV0ZSBjbXAucHJveHk6cmVhZCBjbXAuYmxvYnM6Y3JlYXRlIHN1cHBvcnQudGlja2V0czpjcmVhdGUgc2VhcmNoLnBvcnRhbDptYW5hZ2Ugc2VhcmNoLmRpc2NvdmVyOm1hbmFnZSBzZWFyY2guYWRtaW46bWFuYWdlIHNlYXJjaC5pbnRlcm5hbDptYW5hZ2Ugc2VhcmNoLnV0aWw6bWFuYWdlIHNlYXJjaC5hY2NvdW50Om1hbmFnZSBkaXNjb3Zlci5wb3J0YWw6bWFuYWdlIGRpc2NvdmVyLnNlYXJjaC1yZWM6bWFuYWdlIGRpc2NvdmVyLmFkbWluOm1hbmFnZSBkaXNjb3Zlci5pbnRlcm5hbDptYW5hZ2UgZGlzY292ZXIudXRpbDptYW5hZ2UgZGlzY292ZXIuZXZlbnQ6bWFuYWdlIGRpc2NvdmVyLmFjY291bnQ6bWFuYWdlIGZvcm1zLmVuZHBvaW50czpyZWFkIGZvcm1zLmVuZHBvaW50czpjcmVhdGUgZm9ybXMuZW5kcG9pbnRzOnVwZGF0ZSBmb3Jtcy5lbmRwb2ludHM6ZGVsZXRlIGZvcm1zLnN1Ym1pc3Npb25zOnJlYWQgZm9ybXMuc3VibWlzc2lvbnM6Y3JlYXRlIGZvcm1zLnN1Ym1pc3Npb25zOnVwZGF0ZSBmb3Jtcy5zdWJtaXNzaW9uczpkZWxldGUgZm9ybXMuZXhwb3J0czpjcmVhdGUgZm9ybXMuZXhwb3J0czpyZWFkIGF1ZGl0LmxvZ3M6ciBjb25uZWN0Lm9yZzpyIGNvbm5lY3Qub3JnLnRudDpyIGNvbm5lY3QucmNwOmMgY29ubmVjdC5yY3A6ciBjb25uZWN0LnJjcDp1IGNvbm5lY3QucmNwOmQgY29ubmVjdC5jb246YyBjb25uZWN0LmNvbjpyIGNvbm5lY3QuY29uOnUgY29ubmVjdC5jb246ZCBjb25uZWN0LmZsZHI6YyBjb25uZWN0LmZsZHI6ciBjb25uZWN0LmZsZHI6ZCBjb25uZWN0LmxjbC5pbXA6YyBjb25uZWN0LmxjbC5pbXA6ciBjb25uZWN0LmxjbC5leHA6YyBjb25uZWN0LmxjbC5leHA6ciBjb25uZWN0LnByb2o6ciBjb25uZWN0LnByb2o6ZCBlcC5hZG1uLm9yZ3MuaHN0bm1lOnIgZXAuYWRtbi5vcmdzLmhzdG5tZTp3IHhtYXBwcy5jb250ZW50OmdlbiBhaS5vcmcuYnJkOnIgYWkub3JnLmJyZDp3IGFpLm9yZy5lZzpyIGFpLm9yZy5lZzp3IGFpLm9yZy5jaHRzOnIgYWkub3JnLmNodHM6dyBhaS5vcmcuZG9jczpyIGFpLm9yZy5kb2NzOncgYWkuZ2VuLmNtcDpyIGFpLmdlbi5jbXA6dyBhaS5yZWMudmFyOncgYWkucmVjLnZhcjpyIGFpLnJlYy5oeXA6dyBhaS5yZWMuaHlwOnIgYWkub3JnOmFkbWluIiwiYXpwIjoiQ2hpOEV3ZkZuRWVqa3NrM1NlZDlobGFsR2lNOUIydjcifQ.lkEi3jsB05WaUs_6-VSNdhBCS_eBG9sSdaTnsJL1-kF-_nsNxFDw7Lnk1Vfllib9sVf4NrGQhBSU874vFMjIdtosisJzLNS4Evhij_esYAzv7T0SfVoeD4aapPVWv3mybYk3tQd0d4YtOc3AY47SJGp1OcsIWRdrnzerdmBqgbpj1fWAkTBDh7aUunjTlHpXyWzEBgfVa8E7E5HChxwmXIm7zY5y_Bpxb8utlCiVvUSmUCJ4sAG9k99stHHShl3ug6j5JipS325TGYe9eOgAJLr-JJFTxbE2LGNRSwP8jEfO2CNBKiF9hfiFmOB6LRQObu2kNo8IKgfXfsDSkJFYDg', 
      },
    });

    // Definindo o input da mutation
    const variables = {
      input: {
        name: "Sitecore Authoring and Management API",
        templateId: "{76036F5E-CBCE-46D1-AF0A-4143F9B557AA}",
        parent: "{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}",
        language: "en",
        fields: [
          { name: "title", value: "Welcome to Sitecore" },
          { name: "text", value: "Welcome to Sitecore" },
        ],
      },
    };

    try {
      // Fazendo a requisição com a mutation e variáveis
      const response = await client.request(CREATE_ITEM_MUTATION, variables);
      setData(response);
      console.log('Resposta da mutation:', response);
    } catch (err: any) {
      setError(err.message);
      console.error('Erro ao executar a mutation:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleCreateItem} disabled={loading}>
        {loading ? 'Creating Item...' : 'Create Item'}
      </button>

      {data && (
        <div>
          <p><strong>ID:</strong> {data.createItem.item.itemId}</p>
          <p><strong>Name:</strong> {data.createItem.item.name}</p>
          <p><strong>Path:</strong> {data.createItem.item.path}</p>
          <h3>Fields:</h3>
          <ul>
            {data.createItem.item.fields.nodes.map((field: any) => (
              <li key={field.name}>
                <strong>{field.name}:</strong> {field.value}
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>Erro ao executar a mutation: {error}</p>}
    </div>
  );
};
