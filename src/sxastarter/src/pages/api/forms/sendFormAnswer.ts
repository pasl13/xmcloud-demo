import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from '../../../lib/sitecore-functions/getToken';

export default async function sendFormAnswer(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { page, formatedDate, randomNumber, satisfaction, safeTextInput } = req.body;
      const secondaryAnswer = safeTextInput || '';
      // Get the token
      const token = await getToken();
      if (!token) {
        throw new Error('Token is missing');
      }

      // Define the createSitecoreItem function
      const createSitecoreItem = async (
        actualPage: string,
        dateTime: string,
        answerId: number,
        satisfaction: string,
        secondaryAnswer?: string
      ) => {
        const query = `
        mutation {
          createItem(
            input: {
              name: "${dateTime}${answerId}",
              templateId: "{3D5EBC96-E281-4560-AE5E-34A518D63A1F}",
              parent: "{04C4919A-A51B-4ACF-A2A0-CD680CDF4A55}",
              language: "en",
              fields: [
                { name: "Page", value: "${actualPage}" },
                { name: "MainAnswer", value: "${satisfaction}" },
                { name: "SecondaryAnswer", value: "${secondaryAnswer}" },
                { name: "Date", value: "${dateTime}" }
              ]
            }
          ) {
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

        const response = await fetch(process.env.AUTHORING_GRAPH_QL_ENDPOINT || '', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ query }),
        });

        const result = await response.json();

        if (!response.ok || result.errors) {
          console.error('GraphQL API Error:', result);
          throw new Error('Failed to create item');
        }
        console.error('GraphQL API NOError:', result);
        return result;
      };

      // Call the createSitecoreItem function with the formatedDate and randomNumber
      await createSitecoreItem(page, formatedDate, randomNumber, satisfaction, secondaryAnswer);

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
