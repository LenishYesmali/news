import axios from 'axios';

export const fetchNews = async (apiUrl) => {
  try {
    const response = await axios.get(apiUrl);
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};
