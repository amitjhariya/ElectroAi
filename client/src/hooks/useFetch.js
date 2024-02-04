import { useCallback } from 'react';

export const useFetch = () => {
  const handleFetch = useCallback(async (url, request) => {  
    const mergedRequest = {
      method: request.method,
      headers: {
        ...(request?.headers || {}),

      },
      ...(request || {}),
    };

    if ((request?.method === 'POST' || request?.method === 'PATCH') && request?.body instanceof FormData) {
      mergedRequest.body = request.body;
    } else if (request?.body) {
      mergedRequest.body = JSON.stringify(request.body);
    }

    if (request?.method === 'GET' && request?.params) {
      const queryParams = new URLSearchParams(request.params).toString();
      url = `${url}?${queryParams}`;
    }

    const response = await fetch(url, mergedRequest);

    if (!response.ok) {
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/problem+json')) {
        return await response.json();
      } else {
        return response;
      }
    }

    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json') || contentType?.includes('text/plain')) {
      return response.json();
    } else if (contentType?.includes('attachment')) {
      return response.blob();
    } else {
      return response;
    }
  }, []);

  const makeRequest = useCallback(async (method, url, request) => {
    return handleFetch(url, { ...request, method });
  }, [handleFetch]);

  return {
    get: useCallback((url, request) => makeRequest('GET', url, request), [makeRequest]),
    post: useCallback((url, request) => makeRequest('POST', url, request), [makeRequest]),
    put: useCallback((url, request) => makeRequest('PUT', url, request), [makeRequest]),
    patch: useCallback((url, request) => makeRequest('PATCH', url, request), [makeRequest]),
    delete: useCallback((url, request) => makeRequest('DELETE', url, request), [makeRequest]),
  };
};
