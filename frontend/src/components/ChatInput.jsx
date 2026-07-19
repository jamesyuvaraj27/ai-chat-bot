import { useState, useRef, useEffect } from 'react';
import { SendHorizontal } from 'lucide-react';

function ChatInput({ onSend, isLoading }) {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize textarea height based on content
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`;
  }, [value]);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setValue('');
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="chat-input-wrapper">
      <div className="chat-input-container">
        <textarea
          ref={textareaRef}
          className="chat-textarea"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask JADE anything…"
          rows={1}
          disabled={isLoading}
          aria-label="Message input"
          id="chat-message-input"
        />
        <button
          className="btn-send"
          onClick={handleSubmit}
          disabled={!value.trim() || isLoading}
          aria-label="Send message"
          id="chat-send-button"
        >
          {isLoading ? (
            <div className="btn-send-loader" />
          ) : (
            <SendHorizontal size={20} strokeWidth={1.75} />
          )}
        </button>
      </div>
      <p className="chat-input-hint">
        Press <kbd>Enter</kbd> to send · <kbd>Shift + Enter</kbd> for new line
      </p>
    </div>
  );
}

export default ChatInput;
