import { useCallback } from 'react';

import { useFetch } from '..//hooks/useFetch';
import { DOCUMENTS_URL } from "../constants/routes";

const useDocsService = () => {
  const fetchService = useFetch();

  const getDocuments = useCallback(
    (params) => {
      return fetchService.get(DOCUMENTS_URL, {
        headers: {
          'Content-Type': 'application/json',
        },
        params,
      });
    },
    [fetchService],
  );

  const uploadDocuments = useCallback(
    (context, params) => {
      return fetchService.post(`${DOCUMENTS_URL}/${context}`, {
        body: params, 
      });
    },
    [fetchService],
  );

  const loadDocuments = useCallback(
    ( params) => {
      return fetchService.post(`${DOCUMENTS_URL}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: params, 
      });
    },
    [fetchService],
  );

  const deleteDocuments = useCallback(
    (context) => {
      return fetchService.delete(`${DOCUMENTS_URL}/${context}`);
    },
    [fetchService],
  );

  return {
    getDocuments,
    uploadDocuments,
    loadDocuments,
    deleteDocuments
  };
};

export default useDocsService;
