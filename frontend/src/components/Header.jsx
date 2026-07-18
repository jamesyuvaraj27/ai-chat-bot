function Header({ onClearChat }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <div className="header-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <div>
            <h1 className="header-title">AI Echo Bot</h1>
            <p className="header-subtitle">Intelligent conversation interface</p>
          </div>
        </div>
        <div className="header-actions">
          <div className="header-status">
            <span className="status-dot" />
            <span className="status-text">Online</span>
          </div>
          {onClearChat && (
            <button
              className="btn-clear"
              onClick={onClearChat}
              title="Clear chat"
              aria-label="Clear chat history"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
