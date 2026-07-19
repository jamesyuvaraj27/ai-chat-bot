import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import ErrorMessage from './components/ErrorMessage';
import { useChat } from './hooks/useChat';

function App() {
  const { messages, isLoading, error, sendMessage, clearError, clearChat } = useChat();

  return (
    <>
      {/* Background Video — Fullscreen */}
      <video
        className="space-bg-video"
        src="/videos/space-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <div className="space-bg-overlay" aria-hidden="true" />
      <div className="space-bg-gradient" aria-hidden="true" />

      {/* Layer 6: Glass Application */}
      <div className="app">
        <Header onClearChat={messages.length > 0 ? clearChat : null} />

        <AnimatePresence>
          {error && (
            <ErrorMessage
              message={error}
              onDismiss={clearError}
            />
          )}
        </AnimatePresence>

        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          onSuggestionClick={sendMessage}
        />

        <ChatInput
          onSend={sendMessage}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}

export default App;
