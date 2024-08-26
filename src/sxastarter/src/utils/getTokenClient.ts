export const getTokenFromApi = async (): Promise<string | null> => {
  try {
    const response = await fetch('http://localhost:3000/api/getToken', {
      method: 'POST', // Certifique-se de que está usando o método POST
    });

    if (!response.ok) {
      throw new Error('Failed to fetch token');
    }

    const data = await response.json();
    return data.access_token || null; // Retorne o token ou null caso não exista
  } catch (error) {
    console.error('Error fetching token:', error);
    return null;
  }
};
