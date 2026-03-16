import { useEffect, useRef, useState } from 'react';
import './Toast.css';

export function Toast({ message, type = 'success', onClose, autoCloseMs = 3500 }) {
  const [isLeaving, setIsLeaving] = useState(false);
  const closeTimerRef = useRef(null);

  const handleClose = () => {
    if (!message || isLeaving) return;

    setIsLeaving(true);
    closeTimerRef.current = setTimeout(() => {
      onClose?.();
      setIsLeaving(false);
    }, 180);
  };

  useEffect(() => {
    if (!message) return undefined;

    const timer = setTimeout(() => {
      handleClose();
    }, autoCloseMs);

    return () => clearTimeout(timer);
  }, [message, autoCloseMs]);

  useEffect(() => {
    if (!message) {
      setIsLeaving(false);
    }
  }, [message]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  if (!message) return null;

  return (
    <div className={`cp-toast ${type === 'error' ? 'cp-toast-error' : 'cp-toast-success'} ${isLeaving ? 'cp-toast-leaving' : 'cp-toast-entering'}`}>
      <span>{message}</span>
      <button
        className="cp-toast-close"
        type="button"
        onClick={handleClose}
        aria-label="Fechar aviso"
      >
        x
      </button>
    </div>
  );
}

export default Toast;