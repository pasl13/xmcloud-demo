import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { formatUUID } from 'src/utils/formatUUID';

type AddGovernmentOfficialFormProps = {
  onAddOfficial: (name: string) => void;
};

type GenderNode = {
  node: {
    name: string;
    itemId: string;
  };
};

type GendersQueryData = {
  item: {
    children: {
      edges: GenderNode[];
    };
  };
};

interface GovernmentOfficialResponse {
  createItem: {
    item: {
      itemId: string;
      name: string;
      path: string;
    };
  };
}

const GET_GENDERS = gql`
  query GetGenders {
    item(where: { path: "/sitecore/content/Demo/Demo/Data/Collections/Genders" }) {
      children {
        edges {
          node {
            name
            itemId
          }
        }
      }
    }
  }
`;

const CREATE_SIMPLE_GOVERNMENT_OFFICIAL = gql`
  mutation CreateSimpleGovernmentOfficial(
    $fullName: String!
    $firstName: String!
    $lastName: String!
    $genderId: ID!
    $templateId: ID!
    $parent: ID!
    $language: String!
  ) {
    createItem(
      input: {
        name: $fullName
        fields: [
          { name: "First Name", value: $firstName }
          { name: "Last Name", value: $lastName }
          { name: "Sex", value: $genderId } # Pass genderId as the value for the "Sex" field
        ]
        templateId: $templateId
        parent: $parent
        language: $language
      }
    ) {
      item {
        itemId
        name
        path
      }
    }
  }
`;

const UPLOAD_MEDIA_MUTATION = gql`
  mutation UploadMedia($itemPath: String!) {
    uploadMedia(input: { itemPath: $itemPath }) {
      presignedUploadUrl
    }
  }
`;

const AddGovernmentOfficial = ({ onAddOfficial }: AddGovernmentOfficialFormProps): JSX.Element => {
  const [fullName, setFullName] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [genderId, setGenderId] = useState<string>('');
  const [bioPhoto, setBioPhoto] = useState<File | null>(null);
  const [response, setResponse] = useState<GovernmentOfficialResponse | null>(null);

  const templateId = '{3234C01C-183D-45E5-80D1-BADFB58536A0}';
  const parentId = '{1AB3F54B-AB1B-4B40-90FF-517A726F7A32}';
  const language = 'en';

  // Fetch genders from the GraphQL query
  const { data, loading: gendersLoading } = useQuery<GendersQueryData>(GET_GENDERS);

  // Apollo's useMutation hook for handling the mutation
  const [createGovernmentOfficial, { loading, error }] = useMutation(
    CREATE_SIMPLE_GOVERNMENT_OFFICIAL
  );
  const [uploadMedia] = useMutation(UPLOAD_MEDIA_MUTATION); // Mutation for uploading media

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!bioPhoto) {
      console.error('Bio photo is required.');
      return;
    }
    
    const itemPath = `Images/Government Officials/${fullName}`;

    try {
      const resultPresigned = await uploadMedia({
        variables: { itemPath },
      });
      debugger;
      const presignedUrl = resultPresigned.data.uploadMedia.presignedUploadUrl;
      const formData = new FormData();
      formData.append('file', bioPhoto);

      await fetch(presignedUrl, {
        method: 'POST',
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InpnbnhyQk9IaXJ0WXp4dnl1WVhNZyJ9.eyJodHRwczovL2F1dGguc2l0ZWNvcmVjbG91ZC5pby9jbGFpbXMvb3JnX2lkIjoib3JnX3VCTllMUGNrS293QzQ4aWgiLCJodHRwczovL2F1dGguc2l0ZWNvcmVjbG91ZC5pby9jbGFpbXMvb3JnX25hbWUiOiJub2VzaXMtMSIsImh0dHBzOi8vYXV0aC5zaXRlY29yZWNsb3VkLmlvL2NsYWltcy9vcmdfZGlzcGxheV9uYW1lIjoiTm9lc2lzIiwiaHR0cHM6Ly9hdXRoLnNpdGVjb3JlY2xvdWQuaW8vY2xhaW1zL29yZ19hY2NvdW50X2lkIjoiMDAxM20wMDAwMmt2b0x3QUFJIiwiaHR0cHM6Ly9hdXRoLnNpdGVjb3JlY2xvdWQuaW8vY2xhaW1zL29yZ190eXBlIjoicGFydG5lciIsImh0dHBzOi8vYXV0aC5zaXRlY29yZWNsb3VkLmlvL2NsYWltcy9lbWFpbCI6IndpbGxpa2VyLmMuY2FybW9Abm9lc2lzLnB0IiwiaHR0cHM6Ly9hdXRoLnNpdGVjb3JlY2xvdWQuaW8vY2xhaW1zL3JvbGVzIjpbIltHbG9iYWxdXFxFdmVyeW9uZSIsIltPcmdhbml6YXRpb25dXFxPcmdhbml6YXRpb24gQWRtaW4iXSwiaHR0cHM6Ly9hdXRoLnNpdGVjb3JlY2xvdWQuaW8vY2xhaW1zL2NsaWVudF9uYW1lIjoiWE0gQ2xvdWQgRGVwbG95IChDTEkpIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLnNpdGVjb3JlY2xvdWQuaW8vIiwic3ViIjoiYXV0aDB8NjY4ZmZmMTg2NTc1YmRlYjc2MjAyMTI0IiwiYXVkIjpbImh0dHBzOi8vYXBpLnNpdGVjb3JlY2xvdWQuaW8iLCJodHRwczovL29uZS1zYy1wcm9kdWN0aW9uLmV1LmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE3MjQxNzMwNzIsImV4cCI6MTcyNDI1OTQ3Miwic2NvcGUiOiJvcGVuaWQgZW1haWwgcHJvZmlsZSBvZmZsaW5lX2FjY2VzcyBpZGVudGl0eS51c2VyOnJlYWQgaWRlbnRpdHkudXNlcjp1cGRhdGUgaWRlbnRpdHkudXNlcl9vcmdhbml6YXRpb25zOnJlYWQgYmFja2JvbmUuZXZlbnRzOnJlYWQgY29ubmVjdC50b2tlbnM6Y3JlYXRlIGNvbm5lY3QucG9ydGFsOnJlYWQgcGxhdGZvcm0ucmVnaW9uczpsaXN0IGlkZW50aXR5LnVzZXJfcm9sZXM6cmVhZCBpZGVudGl0eS5vcmdhbml6YXRpb246cmVhZCBpZGVudGl0eS5vcmdhbml6YXRpb246dXBkYXRlIGlkZW50aXR5Lm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9uczpsaXN0IGlkZW50aXR5Lm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9uczpjcmVhdGUgaWRlbnRpdHkub3JnYW5pemF0aW9uX2ludml0YXRpb25zOnJlYWQgaWRlbnRpdHkub3JnYW5pemF0aW9uX2ludml0YXRpb25zOmRlbGV0ZSBpZGVudGl0eS5vcmdhbml6YXRpb25fbWVtYmVyczpsaXN0IGlkZW50aXR5Lm9yZ2FuaXphdGlvbl9tZW1iZXJzOnJlYWQgaWRlbnRpdHkub3JnYW5pemF0aW9uX21lbWJlcnM6ZGVsZXRlIGlkZW50aXR5Lm9yZ2FuaXphdGlvbl9tZW1iZXJzX3JvbGVzOmNyZWF0ZSBpZGVudGl0eS5vcmdhbml6YXRpb25fbWVtYmVyc19yb2xlczpkZWxldGUgaWRlbnRpdHkucm9sZXM6bGlzdCBpZGVudGl0eS5yb2xlczpyZWFkIGlkZW50aXR5Lm9yZ19jb25uZWN0aW9uczpyZWFkIGlkZW50aXR5Lm9yZ19jb25uZWN0aW9uczp3cml0ZSB4bWNsb3VkZGVwbG95LnByb2plY3RzOm1hbmFnZSB4bWNsb3VkZGVwbG95LmVudmlyb25tZW50czptYW5hZ2UgeG1jbG91ZGRlcGxveS5vcmdhbml6YXRpb25zOm1hbmFnZSB4bWNsb3VkZGVwbG95LmRlcGxveW1lbnRzOm1hbmFnZSB4bWNsb3VkZGVwbG95Lm1vbml0b3JpbmcuZGVwbG95bWVudHM6cmVhZCB4bWNsb3VkZGVwbG95LmNsaWVudHM6bWFuYWdlIHhtY2xvdWRkZXBsb3kuc291cmNlY29udHJvbDptYW5hZ2UgeG1jbG91ZGRlcGxveS5yaDptbmcgeG1jbG91ZGRlcGxveS5zaXRlOm1uZyB4bWNsb3VkLmNtOmFkbWluIHhtY2xvdWQuY206bG9naW4gY29ubmVjdC53ZWJob29rczpyZWFkIGNvbm5lY3Qud2ViaG9va3M6Y3JlYXRlIGNvbm5lY3Qud2ViaG9va3M6dXBkYXRlIGNvbm5lY3Qud2ViaG9va3M6ZGVsZXRlIHBsYXRmb3JtLnRlbmFudHM6bGlzdGFsbCBiYWNrYm9uZS5ldmVudHM6ZW5hYmxlIGJhY2tib25lLmV2ZW50czpkaXNhYmxlIGJhY2tib25lLmF1ZGl0OnJlYWQgYmFja2JvbmUuc291cmNla2V5czpjcmVhdGUgYmFja2JvbmUuc291cmNla2V5czpyZWFkIGJhY2tib25lLnNvdXJjZWtleXM6ZGVsZXRlIHVpLmV4dGVuc2lvbnM6cmVhZCBlZGdlLnRva2VuczpjcmVhdGUgZWRnZS50b2tlbnM6cmVhZCBlZGdlLnRva2VuczpkZWxldGUgZWRnZS50b2tlbnM6dXBkYXRlIGhjLm1nbW50LnR5cGVzOndyaXRlIGhjLm1nbW50LmFwaWtleXM6bWFuYWdlIGhjLm1nbW50LnR5cGVzOnJlYWQgaGMubWdtbnQubWVkaWE6bWFuYWdlIGhjLm1nbW50LnN0YXRlczpwdWJsaXNoIGhjLm1nbW50Lml0ZW1zOm1hbmFnZSBoYy5tZ21udC51c2VyczpyZWFkIGhjLm1nbW50LmNsaWVudHM6cmVhZCBoYy5tZ21udC50YXhvbm9taWVzOnJlYWQgaGMubWdtbnQudGF4b25vbWllczp3cml0ZSBoYy5tZ21udC5sb2NhbGVzOnIgaGMubWdtbnQubG9jYWxlczp3IGhjLm1nbW50LnNldHRpbmdzOnIgaGMubWdtbnQuc2V0dGluZ3M6bSBtbXMudXBsb2FkLmZpbGU6YWRkIG1tcy51cGxvYWQuZmlsZTpyZW1vdmUgYmFja2JvbmUuY29udGFjdDpwdWJsaXNoIGJhY2tib25lLmNvbnRhY3Q6c3Vic2NyaWJlIGJhY2tib25lLnNlc3Npb246cHVibGlzaCBiYWNrYm9uZS5zZXNzaW9uOnN1YnNjcmliZSBiYWNrYm9uZS5vcmRlcjpwdWJsaXNoIGJhY2tib25lLm9yZGVyOnN1YnNjcmliZSBiYWNrYm9uZS5vcmRlcmxpbmU6cHVibGlzaCBiYWNrYm9uZS5vcmRlcmxpbmU6c3Vic2NyaWJlIGJhY2tib25lLnBhZ2U6cHVibGlzaCBiYWNrYm9uZS5wYWdlOnN1YnNjcmliZSBiYWNrYm9uZS5wcm9kdWN0OnB1Ymxpc2ggYmFja2JvbmUucHJvZHVjdDpzdWJzY3JpYmUgYmFja2JvbmUuY3VzdG9tOnB1Ymxpc2ggYmFja2JvbmUuY3VzdG9tOnN1YnNjcmliZSBjbXAuc2l0ZXM6Y3JlYXRlIGNtcC5zaXRlczpyZWFkIGNtcC5jb2xsZWN0aW9uczpjcmVhdGUgY21wLmNvbGxlY3Rpb25zOnJlYWQgY21wLmNvbGxlY3Rpb25zOmRlbGV0ZSBjbXAuY29tcG9uZW50czpjcmVhdGUgY21wLmNvbXBvbmVudHM6cmVhZCBjbXAuY29tcG9uZW50czpkZWxldGUgY21wLmRhdGFzb3VyY2VzOmNyZWF0ZSBjbXAuZGF0YXNvdXJjZXM6cmVhZCBjbXAuZGF0YXNvdXJjZXM6ZGVsZXRlIGNtcC5zdHlsZXM6cmVhZCBjbXAuc3R5bGVzOnVwZGF0ZSBjbXAuc3R5bGVzOmRlbGV0ZSBjbXAucHJveHk6cmVhZCBjbXAuYmxvYnM6Y3JlYXRlIHN1cHBvcnQudGlja2V0czpjcmVhdGUgc2VhcmNoLnBvcnRhbDptYW5hZ2Ugc2VhcmNoLmRpc2NvdmVyOm1hbmFnZSBzZWFyY2guYWRtaW46bWFuYWdlIHNlYXJjaC5pbnRlcm5hbDptYW5hZ2Ugc2VhcmNoLnV0aWw6bWFuYWdlIHNlYXJjaC5hY2NvdW50Om1hbmFnZSBkaXNjb3Zlci5wb3J0YWw6bWFuYWdlIGRpc2NvdmVyLnNlYXJjaC1yZWM6bWFuYWdlIGRpc2NvdmVyLmFkbWluOm1hbmFnZSBkaXNjb3Zlci5pbnRlcm5hbDptYW5hZ2UgZGlzY292ZXIudXRpbDptYW5hZ2UgZGlzY292ZXIuZXZlbnQ6bWFuYWdlIGRpc2NvdmVyLmFjY291bnQ6bWFuYWdlIGZvcm1zLmVuZHBvaW50czpyZWFkIGZvcm1zLmVuZHBvaW50czpjcmVhdGUgZm9ybXMuZW5kcG9pbnRzOnVwZGF0ZSBmb3Jtcy5lbmRwb2ludHM6ZGVsZXRlIGZvcm1zLnN1Ym1pc3Npb25zOnJlYWQgZm9ybXMuc3VibWlzc2lvbnM6Y3JlYXRlIGZvcm1zLnN1Ym1pc3Npb25zOnVwZGF0ZSBmb3Jtcy5zdWJtaXNzaW9uczpkZWxldGUgZm9ybXMuZXhwb3J0czpjcmVhdGUgZm9ybXMuZXhwb3J0czpyZWFkIGF1ZGl0LmxvZ3M6ciBjb25uZWN0Lm9yZzpyIGNvbm5lY3Qub3JnLnRudDpyIGNvbm5lY3QucmNwOmMgY29ubmVjdC5yY3A6ciBjb25uZWN0LnJjcDp1IGNvbm5lY3QucmNwOmQgY29ubmVjdC5jb246YyBjb25uZWN0LmNvbjpyIGNvbm5lY3QuY29uOnUgY29ubmVjdC5jb246ZCBjb25uZWN0LmZsZHI6YyBjb25uZWN0LmZsZHI6ciBjb25uZWN0LmZsZHI6ZCBjb25uZWN0LmxjbC5pbXA6YyBjb25uZWN0LmxjbC5pbXA6ciBjb25uZWN0LmxjbC5leHA6YyBjb25uZWN0LmxjbC5leHA6ciBjb25uZWN0LnByb2o6ciBjb25uZWN0LnByb2o6ZCBlcC5hZG1uLm9yZ3MuaHN0bm1lOnIgZXAuYWRtbi5vcmdzLmhzdG5tZTp3IHhtYXBwcy5jb250ZW50OmdlbiBhaS5vcmcuYnJkOnIgYWkub3JnLmJyZDp3IGFpLm9yZy5lZzpyIGFpLm9yZy5lZzp3IGFpLm9yZy5jaHRzOnIgYWkub3JnLmNodHM6dyBhaS5vcmcuZG9jczpyIGFpLm9yZy5kb2NzOncgYWkuZ2VuLmNtcDpyIGFpLmdlbi5jbXA6dyBhaS5yZWMudmFyOncgYWkucmVjLnZhcjpyIGFpLnJlYy5oeXA6dyBhaS5yZWMuaHlwOnIgYWkub3JnOmFkbWluIiwiYXpwIjoiQ2hpOEV3ZkZuRWVqa3NrM1NlZDlobGFsR2lNOUIydjcifQ.IDx5dUFse3A2zVEYl698NVXNa21eoG76WtkEKYsVoyRceKGIiWTGWqRkqx726yXaGeh-7JltiegDEiyN6QAZTimgc27JDqaGxcEdirbgK3r8_SCv3py-up81YhQx6y9oRAei-BpIB46kedzWoL7pm-rhSyP-ZFh4Cuwo-vDHQcivF4yKSu6L6pJ4YoE1bXmUDzYIqLezHUeOuLo8EGW3yJph7hp9sXG4-hS43Ui2ukZNueyMHRQfcogndDCnbC7trqYAYt9IL20ZyI5fyv5uJKT8-ZOeXokA1LYq-ctZMVfQMl-W110fJnnA0hatgUPvpgyZ0_XLQu6ji-Wll8YluQ',
        },
        body: formData,
      });

      const result = await createGovernmentOfficial({
        variables: {
          fullName,
          firstName,
          lastName,
          genderId,
          templateId,
          parent: parentId,
          language,
        },
      });
      setResponse(result.data);

      // Call the callback to notify parent component
      onAddOfficial(fullName);

      // Reset fields after submit
      setFullName('');
      setFirstName('');
      setLastName('');
      setGenderId('');
    } catch (e) {
      console.error('Error:', e);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Government Official</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="sex">Sex:</label>
          <select
            className="form-control"
            id="sex"
            value={genderId} // Set to the selected gender's itemId
            onChange={(e) => setGenderId(e.target.value)} // Update genderId on change
            required
          >
            <option value="">Select Gender</option>
            {gendersLoading ? (
              <option>Loading...</option>
            ) : (
              data?.item?.children?.edges.map(({ node }: GenderNode) => (
                <option key={node.itemId} value={formatUUID(node.itemId)}>
                  {node.name}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="bioPhoto">Bio Photo:</label>
          <input
            type="file"
            className="form-control"
            id="bioPhoto"
            onChange={(e) => setBioPhoto(e.target.files?.[0] || null)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
          {loading ? 'Adding...' : 'Add Official'}
        </button>
      </form>

      {response && (
        <div className="alert alert-info" role="alert">
          <h4 className="alert-heading">Response:</h4>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error:</h4>
          <pre>{JSON.stringify(error.message, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AddGovernmentOfficial;
