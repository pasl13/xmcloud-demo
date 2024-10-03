let cachedToken: string;
let tokenExpiry: number | null = null;

export const getToken = async (): Promise<string> => {
  try {
    // Check if the token is cached and still valid
    if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
      return cachedToken; // Return the cached token
    }

    // Ensure required environment variables are present
    const clientId = process.env.FORMS_ID;
    const clientSecret = process.env.FORMS_SECRET;

    if (!clientId) {
      throw new Error('ClientId not found.');
    }

    if (!clientSecret) {
      throw new Error('ClientSecret not found.');
    }

    // Fetch a new token from the authentication server
    const response = await fetch('https://auth.sitecorecloud.io/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        audience: 'https://api.sitecorecloud.io',
        grant_type: 'client_credentials',
        client_id: clientId, // Use the correct env variables
        client_secret: clientSecret, // Use the correct env variables
      }),
    });

    // Parse the JSON response
    const data = await response.json();

    // Check for a successful response
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch token');
    }

    // Cache the token and its expiry time
    cachedToken = data.access_token;
    tokenExpiry = Date.now() + data.expires_in * 1000; // Cache the expiry time

    // Return the token
    return cachedToken;
  } catch (error) {
    throw new Error('Failed to fetch token');
  }
};
