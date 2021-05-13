import { contactUsStringType } from '../../types/index.d';

type contactUsType = {
  content: contactUsStringType;
};

type resizingTextArea = {
  className: string;
  id: string;
  name: string;
  onChange: (e) => void;
  onFocus: (e) => void;
  placeholder: string;
  value: string;
};

export default contactUsType;
export { resizingTextArea };
