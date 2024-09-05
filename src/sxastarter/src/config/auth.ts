import fetch from 'cross-fetch';

export const getServerToken = async (): Promise<string> => {
  const tokenUrl = 'http://localhost:3000/api/auth/getToken';

  try {
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.error || 'Failed to fetch token';
      throw new Error(errorMessage);
    }

    const { access_token: accessToken } = await response.json();
    return accessToken;
  } catch (error) {
    console.error('Error fetching token:', error);
    throw new Error('Error retrieving the server token');
  }
};
