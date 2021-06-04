import axios from 'axios';
import { FC, useState, FormEvent } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import ForwardIcon from '../../icons/arrow-ios-forward-outline.svg';
import routes from '../../lib/constants/hashRoutes';
import { CONTACT_US } from '../../lib/store/url';
import { validateEmail, stripTags } from '../../lib/utils/validation';
import contactUsType from './index.d';
import ResizingTextarea from './resizingTextarea';

interface typeVal {
  error: boolean;
  value: string;
  touched: boolean;
  name: string;
}

const ContactUs: FC<contactUsType> = ({ content, handleRouteChange }) => {
  const [name, setName] = useState<typeVal>({
    value: '',
    error: true,
    touched: false,
    name: 'name',
  });
  const [email, setEmail] = useState<typeVal>({
    value: '',
    error: true,
    touched: false,
    name: 'email',
  });
  const [message, setMessage] = useState<typeVal>({
    value: '',
    error: true,
    touched: false,
    name: 'message',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const onFocus = (type: string): void => {
    switch (type) {
      case 'name':
        setName({
          ...name,
          touched: true,
        });
        break;
      case 'email':
        setEmail({
          ...email,
          touched: true,
        });
        break;
      case 'message':
        setMessage({
          ...message,
          touched: true,
        });
        break;
      default:
    }
  };

  const onChange = (
    event: FormEvent<HTMLInputElement>,
    type: typeVal,
  ): void => {
    switch (type.name) {
      case 'email':
        setEmail({
          ...email,
          value: stripTags(event.currentTarget.value),
          error: validateEmail(event.currentTarget.value),
          touched: true,
        });
        break;
      case 'name':
        setName({
          ...name,
          value: stripTags(event.currentTarget.value),
          error: event.currentTarget.value.length < 1,
          touched: true,
        });
        break;
      case 'message':
        setMessage({
          ...message,
          value: stripTags(event.currentTarget.value),
          error: event.currentTarget.value.length < 1,
          touched: true,
        });
        break;
      default:
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (!name.error && !email.error && !message.error) {
      setLoading(true);
      try {
        await axios.post(CONTACT_US, {
          name: name.value,
          email: email.value,
          message: message.value,
        });

        setLoading(true);
        setSubmitted(true);
      } catch (err) {
        setLoading(false);
        setSubmitted(false);
      }
    }
  };

  const handleVisibility = (visible: boolean) => {
    if (visible) {
      handleRouteChange(routes.contact);
    }
  };

  return (
    <VisibilitySensor onChange={handleVisibility}>
      <div>
        <div className="flex flex-col">
          <h1
            className=" text-3xl lg:text-4xl 2xl:text-5xl  my-10 font-bold dark:text-gray-200 mb-3 "
            id="contact"
          >
            {content.title}
          </h1>
          <p className="text-gray-600 text-lg mb-1 dark:text-gray-200">
            {content.subtitle}
          </p>
        </div>
        {submitted ? (
          <p className="text-3xl my-10 dark:text-white">{content.sent}</p>
        ) : (
          <form
            action="POST"
            className="pt-2 pb-5 rounded-xl relative w-full mt-2 "
            onSubmit={onSubmit}
          >
            {loading ? (
              <div className="absolute bg-gray-50 dark:bg-gray-800 dark:bg-opacity-60 z-10 flex flex-row justify-items-center bg-opacity-50 w-full h-full items-center">
                <p className="text-2xl w-full text-center dark:text-gray-200">
                  {content.sending}
                </p>
              </div>
            ) : null}
            <h3 className="text-2xl mb-14 capitalize dark:text-gray-50 my-10 ">
              {content.additional}
            </h3>

            <div>
              <span className="block lg:inline dark:text-gray-100 ">
                {content.nameIntro}
                <input
                  className={`mx-2 w-full lg:w-auto bg-transparent inline border-b-2 focus:outline-none outline-none focus:border-green-500  mb-4 dark:text-gray-100 ${
                    name.error && name.touched
                      ? 'border-red-400'
                      : 'border-gray-500'
                  } text-gray-900 py-3 px-4`}
                  id="name"
                  name="name"
                  onChange={e => onChange(e, name)}
                  onFocus={() => onFocus(name.name)}
                  placeholder={content.name}
                  type="text"
                  value={name.value}
                />
              </span>
              <span className="block lg:inline dark:text-gray-100 ">
                {content.emailIntro}
                <input
                  className={` mx-2 w-full lg:w-auto bg-transparent inline border-b-2 focus:outline-none outline-none focus:border-green-500  mb-4  ${
                    email.error && email.touched
                      ? 'border-red-400'
                      : 'border-gray-500'
                  } dark:text-gray-100 text-gray-900 py-3 px-4`}
                  id="email"
                  name="email"
                  onChange={e => onChange(e, email)}
                  onFocus={() => onFocus(email.name)}
                  placeholder={content.email}
                  type="email"
                  value={email.value}
                />
              </span>
            </div>
            <div className="mt-3 dark:text-gray-100">
              <span className="block"> {content.messageIntro} </span>
              <ResizingTextarea
                className={`w-full lg:w-5/6  bg-transparent inline border-b-2  overflow-y-hidden focus:outline-none dark:text-gray-100 outline-none focus:border-green-500  mb-4 ${
                  message.error && message.touched
                    ? 'border-red-400'
                    : 'border-gray-500'
                }  text-gray-900 py-3 px-4`}
                id="message"
                name="message"
                onChange={e => onChange(e, message)}
                onFocus={() => onFocus(message.name)}
                placeholder={content.message}
                value={message.value}
              />
            </div>
            <button
              className="my-4 px-6 uppercase flex flex-row mb-4 outline-none focus:outine-none items-center text-white py-3 font-bold bg-green-500 dark:bg-green-600 dark:text-gray-100 hover:bg-green-500 hover:shadow-lg rounded-lg"
              type="submit"
            >
              <span> {content.sentButton} </span>
              <ForwardIcon className="fill-current w-5 h-5 ml-2 text-white" />
            </button>
          </form>
        )}
      </div>
    </VisibilitySensor>
  );
};

export default ContactUs;
