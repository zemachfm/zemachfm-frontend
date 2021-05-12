import axios from 'axios';
import { FC, useState } from 'react';
import ForwardIcon from '../../icons/arrow-ios-forward-outline.svg';
import { CONTACT_US } from '../../lib/store/url';
import contactUsType from './index.d';

const ContactUs: FC<contactUsType> = ({ content }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(CONTACT_US, {
        name,
        email,
        message,
      });

      setLoading(true);
      setSubmitted(true);
    } catch (err) {
      setLoading(false);
      setSubmitted(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col">
        <h1 className=" text-6xl my-10 font-bold dark:text-gray-200 mb-3 ">
          {content.title}
        </h1>
        <p className="text-gray-400 text-lg mb-1 ">{content.subtitle}</p>
      </div>
      {submitted ? (
        <p className="text-3xl my-10">{content.sent}</p>
      ) : (
        <form
          action="POST"
          className="pt-2 pb-5 px-0 rounded-xl relative w-full "
          onSubmit={onSubmit}
        >
          {loading ? (
            <div className="absolute bg-gray-50 z-10 flex flex-row justify-items-center bg-opacity-50 w-full h-full items-center">
              <p className="text-2xl w-full text-center"> {content.sending} </p>
            </div>
          ) : null}
          <h3 className="text-2xl mb-4">{content.additional}</h3>

          <div>
            {content.nameIntro}
            <input
              className=" mx-2 bg-transparent inline border-b-2 focus:outline-none outline-none focus:border-green-500  mb-4 border-gray-500 text-gray-600 py-3 px-4"
              id="name"
              name="name"
              onChange={e => setName(e.target.value)}
              placeholder={content.name}
              type="text"
              value={name}
            />
            {content.emailIntro}
            <input
              className=" mx-2 bg-transparent inline border-b-2 focus:outline-none outline-none focus:border-green-500  mb-4 border-gray-500 text-gray-600 py-3 px-4"
              id="email"
              name="email"
              onChange={e => setEmail(e.target.value)}
              placeholder={content.email}
              type="email"
              value={email}
            />
          </div>
          <div className="mt-3">
            <span> {content.messageIntro} </span>
            <input
              className="  bg-transparent inline border-b-2 ml-4 focus:outline-none w-5/6 outline-none focus:border-green-500  mb-4 border-gray-500 text-gray-600 py-3 px-4"
              id="message"
              name="message"
              onChange={e => setMessage(e.target.value)}
              placeholder={content.message}
              type="text"
              value={message}
            />
          </div>
          <button
            className="my-4 px-6 flex flex-row mb-4 outline-none focus:outine-none items-center text-gray-200 py-3 font-bold bg-green-400 hover:bg-green-500 hover:shadow-lg rounded-lg"
            type="submit"
          >
            <span> {content.sentButton} </span>
            <ForwardIcon className="fill-current w-5 h-5 ml-2 text-white" />
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactUs;
