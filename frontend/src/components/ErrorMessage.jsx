import { motion } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';

function ErrorMessage({ message, onDismiss, onRetry }) {
  if (!message) return null;

  return (
    <motion.div
      className="error-banner"
      role="alert"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="error-content">
        <AlertCircle className="error-icon" size={18} />
        <span className="error-text">{message}</span>
      </div>
      <div className="error-actions">
        {onRetry && (
          <button
            className="error-btn error-btn-retry"
            onClick={onRetry}
            id="error-retry-button"
          >
            Retry
          </button>
        )}
        <button
          className="error-btn error-btn-dismiss"
          onClick={onDismiss}
          aria-label="Dismiss error"
          id="error-dismiss-button"
        >
          <X size={16} />
        </button>
      </div>
    </motion.div>
  );
}

export default ErrorMessage;
