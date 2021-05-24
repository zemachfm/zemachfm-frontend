import { FC, useRef, useEffect } from 'react';
import { resizingTextArea } from './index.d';

const ResizingTextarea: FC<resizingTextArea> = ({
  value,
  className,
  placeholder,
  onChange,
  onFocus,
  name,
  id,
}) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current.addEventListener('input', () => {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    });
  });

  return (
    <textarea
      className={className}
      id={id}
      name={name}
      onChange={onChange}
      onFocus={onFocus}
      placeholder={placeholder}
      ref={textareaRef}
      rows={1}
      style={{ resize: 'none', height: 50 }}
      value={value}
    ></textarea>
  );
};

export default ResizingTextarea;
