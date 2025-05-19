import apiClient from '../../interceptor/express-interceptor';

export async function sendMessage(content, senderId, conversationId) {
  try {
    const data = await apiClient.post('/messages', {
      content,
      senderId,
      conversationId,
    });
    return data;
  } catch (error) {
    throw error;
  }
}