import { NextApiRequest, NextApiResponse } from 'next';

let cachedToken: string | null = null;
let tokenExpiry: number | null = null;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  try {
    // Check if the token is cached and still valid
    if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
      return res.status(200).json({ access_token: cachedToken });
    }

    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;

    if (!clientId) {
      throw new Error('ClientId not found.');
    }

    if (!clientSecret) {
      throw new Error('ClientSecret not found.');
    }

    // Fetch a new token if necessary
    const response = await fetch('https://auth.sitecorecloud.io/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        audience: 'https://api.sitecorecloud.io',
        grant_type: 'client_credentials',
        client_id: process.env.CLIENT_ID || '',
        client_secret: process.env.CLIENT_SECRET || '',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch token');
    }

    // Cache the token and its expiry time
    cachedToken = data.access_token;
    tokenExpiry = Date.now() + data.expires_in * 1000;

    return res.status(200).json({ access_token: cachedToken });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch token' });
  }
}
