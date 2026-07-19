import { motion } from 'framer-motion';
import { Trash2, Settings, CircleUser, Search } from 'lucide-react';

function Header({ onClearChat }) {
  return (
    <motion.header
      className="header"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="header-inner">
        {/* Left — Brand */}
        <div className="header-brand">
          <div className="header-logo">
            <img src="/logo.svg" alt="JADE logo" />
          </div>
          <div>
            <h1 className="header-title">JADE</h1>
            <p className="header-subtitle">Neural Intelligence Platform</p>
          </div>
        </div>

        {/* Right — Actions */}
        <div className="header-actions">
          <button
            className="header-icon-btn"
            title="Search"
            aria-label="Search"
            id="search-button"
          >
            <Search size={16} strokeWidth={1.75} />
          </button>

          <div className="header-status">
            <span className="status-dot" />
            <span className="status-text">Online</span>
          </div>

          {onClearChat && (
            <button
              className="header-icon-btn btn-clear"
              onClick={onClearChat}
              title="Clear chat"
              aria-label="Clear chat history"
              id="clear-chat-button"
            >
              <Trash2 size={16} strokeWidth={1.75} />
            </button>
          )}

          <div className="header-divider" aria-hidden="true" />

          <button
            className="header-icon-btn"
            title="Settings"
            aria-label="Settings"
            id="settings-button"
          >
            <Settings size={16} strokeWidth={1.75} />
          </button>

          <button
            className="header-icon-btn"
            title="Profile"
            aria-label="Profile"
            id="profile-button"
          >
            <CircleUser size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;
