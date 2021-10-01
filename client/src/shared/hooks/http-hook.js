import { useCallback, useRef, useEffect } from 'react';
export const useHttpclient = () => {
  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method: method,
          headers: headers,
          body: body,
          signal: httpAbortCtrl.signal,
        });
        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          item => item !== httpAbortCtrl
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        return responseData;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    []
  );

  useEffect(() => {
    const currentActiveHttpRequest = activeHttpRequests.current;
    return () => {
      currentActiveHttpRequest.forEach(item => item.abort());
    };
  }, []);

  return { sendRequest };
};
