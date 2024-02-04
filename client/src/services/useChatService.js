import { useCallback } from 'react';

import { useFetch } from '../hooks/useFetch';
import { CHAT_URL } from "../constants/routes";

const useChatService = () => {
  const fetchService = useFetch();

  const chat = useCallback(
    (data) => {
      return fetchService.post(CHAT_URL, {
        headers: {
          'Content-Type': 'application/json',
        },
        body:data,
      });
    },
    [fetchService],
  );

  return {
    chat,
  };
};

export default useChatService;
