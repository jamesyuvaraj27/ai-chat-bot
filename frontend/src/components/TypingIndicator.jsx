import { motion } from 'framer-motion';

function TypingIndicator() {
  return (
    <motion.div
      className="thinking-indicator"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="avatar avatar-ai" aria-hidden="true">
        <img src="/logo.svg" alt="" />
      </div>
      <div className="thinking-bubble">
        <span className="thinking-text">JADE is thinking</span>
        <div className="thinking-stars" aria-hidden="true">
          <span className="thinking-star" />
          <span className="thinking-star" />
          <span className="thinking-star" />
        </div>
        <div className="thinking-dots">
          <span className="thinking-dot" />
          <span className="thinking-dot" />
          <span className="thinking-dot" />
        </div>
      </div>
    </motion.div>
  );
}

export default TypingIndicator;
