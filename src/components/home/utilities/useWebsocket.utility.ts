import { useEffect, useState } from 'react';
import { jsonObjectToStringUtility } from './jsonObjectToString.utility';

export const useWebsocketUtilityHook = () => {
  /**
   * states
   */
  const [webSocket, setWebsocket] = useState<WebSocket>();
  const [socketData, setSocketData] = useState<Record<string, any>>();

  /**
   * effects
   */
  useEffect(() => {
    webSocket?.addEventListener('message', message => setSocketData(message));
  }, [webSocket]);

  return {
    openSocket: (endpoint: string) => setWebsocket(new WebSocket(endpoint)),
    sendData: (data: Record<string, any>) =>
      webSocket?.send(jsonObjectToStringUtility(data)),
    closeSocket: () => webSocket?.close(),
    socketData,
    webSocket,
  };
};
