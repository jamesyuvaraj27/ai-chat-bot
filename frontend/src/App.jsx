import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import ErrorMessage from './components/ErrorMessage';
import { useChat } from './hooks/useChat';

function App() {
  const { messages, isLoading, error, sendMessage, clearError, clearChat } = useChat();

  return (
    <div className="app">
      <Header onClearChat={messages.length > 0 ? clearChat : null} />

      <ErrorMessage
        message={error}
        onDismiss={clearError}
      />

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
  );
}

export default App;
