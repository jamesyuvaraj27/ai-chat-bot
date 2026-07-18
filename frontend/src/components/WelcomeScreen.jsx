const suggestions = [
  '👋 Say hello',
  '💡 Ask me anything',
  '🚀 Tell me a fun fact',
  '🎨 What can you do?',
];

function WelcomeScreen({ onSuggestionClick }) {
  return (
    <div className="welcome">
      <div className="welcome-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a9 9 0 0 1 9 9c0 3.88-3.13 7.19-7.5 8.72a1 1 0 0 1-1.29-.57A1 1 0 0 1 12.78 18h.22a7 7 0 1 0-7-7 1 1 0 0 1-2 0A9 9 0 0 1 12 2z" />
          <circle cx="12" cy="11" r="1" fill="currentColor" />
          <circle cx="8" cy="11" r="1" fill="currentColor" />
          <circle cx="16" cy="11" r="1" fill="currentColor" />
        </svg>
      </div>
      <h2 className="welcome-title">Welcome to AI Echo Bot</h2>
      <p className="welcome-description">
        Start a conversation by typing a message below. Your messages will be echoed back — a real AI provider can be plugged in anytime.
      </p>
      <div className="suggestions">
        {suggestions.map((text) => (
          <button
            key={text}
            className="suggestion-chip"
            onClick={() => onSuggestionClick(text.replace(/^[^\s]+\s/, ''))}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default WelcomeScreen;
