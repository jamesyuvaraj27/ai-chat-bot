import { useState, useCallback } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

function CodeBlock({ children, className }) {
  const [copied, setCopied] = useState(false);

  const language = className?.replace('language-', '') || 'text';
  const code = String(children).replace(/\n$/, '');

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [code]);

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <span className="code-block-lang">{language}</span>
        <button
          className={`code-block-copy ${copied ? 'copied' : ''}`}
          onClick={handleCopy}
          aria-label={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? (
            <>
              <Check size={13} />
              Copied!
            </>
          ) : (
            <>
              <Copy size={13} />
              Copy
            </>
          )}
        </button>
      </div>
      <div className="code-block-body">
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: 'transparent',
            fontSize: '0.85rem',
          }}
          showLineNumbers={false}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export default CodeBlock;
