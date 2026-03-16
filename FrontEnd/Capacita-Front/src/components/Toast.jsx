import { useEffect } from 'react';
import './Toast.css';

export function Toast({ message, type = 'success', onClose, autoCloseMs = 3500 }) {
  useEffect(() => {
    if (!message) return undefined;

    const timer = setTimeout(() => {
      onClose?.();
    }, autoCloseMs);

    return () => clearTimeout(timer);
  }, [message, autoCloseMs, onClose]);

  if (!message) return null;

  return (
    <div className={`cp-toast ${type === 'error' ? 'cp-toast-error' : 'cp-toast-success'}`}>
      <span>{message}</span>
      <button
        className="cp-toast-close"
        type="button"
        onClick={onClose}
        aria-label="Fechar aviso"
      >
        x
      </button>
    </div>
  );
}

export default Toast;