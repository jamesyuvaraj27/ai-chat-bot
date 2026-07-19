import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { User, Copy, Check, RefreshCw, ThumbsUp, ThumbsDown } from 'lucide-react';
import { formatTimestamp } from '../utils/helpers';
import CodeBlock from './CodeBlock';

const bubbleVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  },
};

function MessageActions({ content, isUser }) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(null); // null | 'up' | 'down'

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback */
      const ta = document.createElement('textarea');
      ta.value = content;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [content]);

  return (
    <div className={`message-actions ${isUser ? 'message-actions-user' : ''}`}>
      <button
        className="action-btn"
        onClick={handleCopy}
        title={copied ? 'Copied!' : 'Copy message'}
        aria-label={copied ? 'Copied!' : 'Copy message'}
      >
        {copied ? <Check size={14} strokeWidth={2} /> : <Copy size={14} strokeWidth={1.75} />}
      </button>

      {!isUser && (
        <>
          <button
            className="action-btn"
            title="Regenerate"
            aria-label="Regenerate response"
          >
            <RefreshCw size={14} strokeWidth={1.75} />
          </button>
          <button
            className={`action-btn ${liked === 'up' ? 'action-btn-active' : ''}`}
            onClick={() => setLiked(liked === 'up' ? null : 'up')}
            title="Good response"
            aria-label="Good response"
          >
            <ThumbsUp size={14} strokeWidth={1.75} />
          </button>
          <button
            className={`action-btn ${liked === 'down' ? 'action-btn-active' : ''}`}
            onClick={() => setLiked(liked === 'down' ? null : 'down')}
            title="Bad response"
            aria-label="Bad response"
          >
            <ThumbsDown size={14} strokeWidth={1.75} />
          </button>
        </>
      )}
    </div>
  );
}

function ChatBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      className={`bubble-row ${isUser ? 'bubble-row-user' : 'bubble-row-ai'}`}
      variants={bubbleVariants}
      initial="hidden"
      animate="visible"
      layout
    >
      {/* AI Avatar — JADE Logo */}
      {!isUser && (
        <div className="avatar avatar-ai" aria-hidden="true">
          <img src="/logo.svg" alt="" />
        </div>
      )}

      <div className="bubble-wrapper">
        <div className={`bubble ${isUser ? 'bubble-user' : 'bubble-ai'}`}>
          <div className="bubble-content">
            {isUser ? (
              message.content
            ) : (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ className, children, ...props }) {
                    const isInline = !className;
                    if (isInline) {
                      return <code {...props}>{children}</code>;
                    }
                    return (
                      <CodeBlock className={className}>
                        {children}
                      </CodeBlock>
                    );
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>
            )}
          </div>
          <span className="bubble-time">{formatTimestamp(message.timestamp)}</span>
        </div>

        {/* Hover Actions */}
        <MessageActions content={message.content} isUser={isUser} />
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="avatar avatar-user" aria-hidden="true">
          <User size={17} strokeWidth={1.75} />
        </div>
      )}
    </motion.div>
  );
}

export default ChatBubble;
