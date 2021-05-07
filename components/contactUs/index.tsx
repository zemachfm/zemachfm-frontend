import { FC, useState } from 'react';
import ForwardIcon from '../../icons/arrow-ios-forward-outline.svg';

const ContactUs = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const onSubmit = e => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="flex flex-col">
        <h1 className=" text-6xl my-10 font-bold dark:text-gray-200 mb-3 ">
          Contact us
        </h1>
        <p className="text-gray-400 text-lg mb-1 ">
          {' '}
          Get intouch with us. We are always looking for palces to get better{' '}
        </p>
      </div>
      <form
        action="POST"
        className=" py-5 px-0 rounded-xl  "
        onSubmit={onSubmit}
      >
        <h3 className="text-2xl text-green-500 font-bold mb-0">
          {' '}
          Don't hesitate.{' '}
        </h3>
        <p className="text-gray-600 mb-6">
          {' '}
          tell us how you fell. we value what you think
        </p>
        <div>
          HI, My name is
          <input
            className=" bg-transparent inline border-b-2 focus:outline-none outline-none focus:border-green-500  mb-4 border-gray-500 text-gray-600 py-3 px-4"
            id="name"
            name="name"
            onChange={e => setName(e.target.value)}
            placeholder="name"
            type="text"
            value={name}
          />
          . . If you want to get back to me use
          <input
            className="  bg-transparent inline border-b-2 focus:outline-none outline-none focus:border-green-500  mb-4 border-gray-500 text-gray-600 py-3 px-4"
            id="email"
            name="email"
            onChange={e => setEmail(e.target.value)}
            placeholder="email"
            type="email"
            value={email}
          />
        </div>
        <div>
          <span>I Would like to say</span>
          <input
            className="  bg-transparent inline border-b-2 focus:outline-none w-5/6 outline-none focus:border-green-500  mb-4 border-gray-500 text-gray-600 py-3 px-4"
            id="message"
            name="message"
            onChange={e => setMessage(e.target.value)}
            placeholder="message"
            type="text"
            value={message}
          />
        </div>
        <button
          className="my-4 px-6 flex flex-row mb-4 items-center text-gray-200 py-3 font-bold bg-green-400 rounded-lg"
          type="submit"
        >
          <span>Send</span>
          <ForwardIcon className="fill-current w-5 h-5 ml-5 text-white" />
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
