import { useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import ChatBubble from './ChatBubble';
import TypingIndicator from './TypingIndicator';
import WelcomeScreen from './WelcomeScreen';

function ChatWindow({ messages, isLoading, onSuggestionClick }) {
  const bottomRef = useRef(null);

  // Auto-scroll on new messages or when loading changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const isEmpty = messages.length === 0 && !isLoading;

  return (
    <main className="chat-window" id="chat-window">
      {isEmpty ? (
        <WelcomeScreen onSuggestionClick={onSuggestionClick} />
      ) : (
        <div className="messages-list">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <ChatBubble key={msg.id} message={msg} />
            ))}
          </AnimatePresence>
          {isLoading && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>
      )}
    </main>
  );
}

export default ChatWindow;
