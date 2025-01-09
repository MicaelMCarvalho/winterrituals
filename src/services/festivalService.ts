import { Festival } from '../types/festival';

export async function getFestivals(): Promise<Festival[]> {
  try {
    const response = await fetch('/api/festivals', {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!Array.isArray(data)) {
      console.error('Unexpected response format:', data);
      throw new Error('Invalid response format');
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch festivals:', error);
    throw error;
  }
}
