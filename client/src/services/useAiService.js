import { useCallback } from 'react';

import { useFetch } from '../hooks/useFetch';
import { CONFIG_URL } from "../constants/routes";

const useAiService = () => {
  const fetchService = useFetch();

  const selectModel = useCallback(
    (params) => {
      return fetchService.post(`${CONFIG_URL}/change_model`, {
        headers: {
          'Content-Type': 'application/json',
        },
        params,
      });
    },
    [fetchService],
  );
  const loadConfigs = useCallback(
    (params) => {
      return fetchService.get(CONFIG_URL, {
        headers: {
          'Content-Type': 'application/json',
        },
        params,
      });
    },
    [fetchService],
  );

  const loadModel = useCallback(
    (params) => {
      return fetchService.post(`${CONFIG_URL}/loadmodel`, {
        headers: {
          'Content-Type': 'application/json',
        },
        params,
      });
    },
    [fetchService],
  );

  const setConfig = useCallback(
    (params) => {
      return fetchService.post(CONFIG_URL, {
        headers: {
          'Content-Type': 'application/json',
        },
        body:params,
      });
    },
    [fetchService],
  );

  return {
    selectModel,loadModel,setConfig,loadConfigs
  };
};

export default useAiService;
