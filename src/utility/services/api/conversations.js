import apiClient from '../../interceptor/express-interceptor';

export async function fetchConversations() {
  try {
    const data = await apiClient.get('/conversations');
    return data;
  } catch (error) {
    throw error;
  }
}