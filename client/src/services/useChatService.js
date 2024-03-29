import { useCallback } from 'react';

import { useFetch } from '../hooks/useFetch';
import {  CHAT_URL } from "../constants/routes";

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
  const loadChat = useCallback(
    (data) => {
      return fetchService.post(`${CHAT_URL}/loadchat`, {
        headers: {
          'Content-Type': 'application/json',
        },
        body:data,
      });
    },
    [fetchService],
  );
  const abortChat = useCallback(
    () => {
      return fetchService.post(`${CHAT_URL}/abort`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
    [fetchService],
  );

  return {
    chat,abortChat,loadChat
  };
};

export default useChatService;
