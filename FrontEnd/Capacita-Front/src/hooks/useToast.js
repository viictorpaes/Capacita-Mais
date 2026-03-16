import { useCallback, useState } from 'react';

const EMPTY_TOAST = { message: '', type: 'success' };

export function useToast() {
  const [toast, setToast] = useState(EMPTY_TOAST);

  const clearToast = useCallback(() => {
    setToast(EMPTY_TOAST);
  }, []);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  const showSuccess = useCallback((message) => {
    setToast({ message, type: 'success' });
  }, []);

  const showError = useCallback((message) => {
    setToast({ message, type: 'error' });
  }, []);

  return {
    toast,
    clearToast,
    showToast,
    showSuccess,
    showError,
  };
}

export default useToast;