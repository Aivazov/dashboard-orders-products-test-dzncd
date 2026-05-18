import axios from 'axios';

export const serverError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.code === 'ERR_NETWORK') throw new Error('Server is unavailable');
    if (error.response) {
      throw new Error(`Request failed: ${error.response.status}`);
    }
  }
};
