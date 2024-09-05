import type { NextApiRequest, NextApiResponse } from 'next';
import { createApolloClient } from 'src/config/apolloClient';
import { GET_OFFICIALS } from 'src/graphql/queries/governmentManagement';

interface Official {
  id: string;
  name: string;
}

interface Sex {
  id: string;
  text: string;
}

const handleMethodNotAllowed = (res: NextApiResponse, allowedMethods: string[]) => {
  res.setHeader('Allow', allowedMethods);
  res
    .status(405)
    .json({ message: `Method ${res.req.method} not allowed. Use: ${allowedMethods.join(', ')}` });
};

const fetchOfficialsData = async () => {
  const client = await createApolloClient();
  const { data } = await client.query({ query: GET_OFFICIALS });

  const officials: Official[] =
    data?.officials?.children?.nodes?.map(
      (official: { itemId: string; field: { value: string } }) => ({
        id: official.itemId,
        name: official.field.value,
      })
    ) || [];

  const sexes: Sex[] =
    data?.sexes?.children?.nodes?.map((sex: { itemId: string; field: { value: string } }) => ({
      id: sex.itemId,
      text: sex.field.value,
    })) || [];

  return { officials, sexes };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return handleMethodNotAllowed(res, ['GET']);
  }

  try {
    const data = await fetchOfficialsData();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching officials data:', error);
    res.status(500).json({ message: 'Internal server error while fetching officials data.' });
  }
}
