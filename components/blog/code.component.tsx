/* eslint-disable no-shadow */
import React from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';

interface CodeProps {
  children: string;
  className: string;
}

const CodeHighlighter: React.FC = ({ children, className }: CodeProps) => {
  const language = className.replace(/language-/, '') as Language;

  return (
    <Highlight
      {...defaultProps}
      code={children}
      language={language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${className} rounded-lg`}
          style={{ ...style, padding: '20px', overflow: 'auto' }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeHighlighter;
