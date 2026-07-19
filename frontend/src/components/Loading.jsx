function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-logo">
        <img src="/logo.svg" alt="JADE logo" />
      </div>
      <div className="loading-spinner" />
      <p className="loading-text">Initializing JADE…</p>
    </div>
  );
}

export default Loading;
