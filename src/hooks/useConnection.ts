import { useState, useCallback } from 'react';

type ConnectionStatus = 'disconnected' | 'restart' | 'loggedIn';

const useConnection = () => {
  const [status, setStatus] = useState<ConnectionStatus>('restart');

  const disconnect = useCallback(() => {
    setStatus('disconnected');
  }, []);

  const restart = useCallback(() => {
    setStatus('restart');
  }, []);

  const login = useCallback(() => {
    setStatus('loggedIn');
  }, []);

  return {
    status,
    disconnect,
    restart,
    login,
  };
};

export default useConnection;
