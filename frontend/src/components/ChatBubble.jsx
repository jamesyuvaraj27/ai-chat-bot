import { formatTimestamp } from '../utils/helpers';

function ChatBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`bubble-row ${isUser ? 'bubble-row-user' : 'bubble-row-ai'}`}>
      {/* Avatar */}
      {!isUser && (
        <div className="avatar avatar-ai" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
          </svg>
        </div>
      )}

      <div className={`bubble ${isUser ? 'bubble-user' : 'bubble-ai'}`}>
        <p className="bubble-content">{message.content}</p>
        <span className="bubble-time">{formatTimestamp(message.timestamp)}</span>
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="avatar avatar-user" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
      )}
    </div>
  );
}

export default ChatBubble;
