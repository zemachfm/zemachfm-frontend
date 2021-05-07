import { FC, useState } from 'react';

const ContactUs = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  return (
    <div>
      <div className="flex flex-col">
        <h1 className=" text-6xl my-10 font-bold dark:text-gray-200 mb-2 ">
          Contact us
        </h1>
        <p className="text-gray-400 text-lg mb-1"> Get intouch with us </p>
      </div>
      <form action="POST" className=" py-5 px-4 rounded-3xl">
        <div>
          HI, My name is
          <input
            className=" bg-transparent inline border-b-2 focus:outline-none outline-none focus:border-green-500  mb-4 border-gray-500 text-gray-600 py-3 px-4"
            id="name"
            name="name"
            placeholder="name"
            type="text"
          />
          . . If you want to get back to me use
          <input
            className="  bg-transparent inline border-b-2 focus:outline-none outline-none focus:border-green-500  mb-4 border-gray-500 text-gray-600 py-3 px-4"
            id="email"
            name="email"
            placeholder="email"
            type="email"
          />
        </div>
        <div>
          <span>I Would like to say</span>
          <input
            className="  bg-transparent inline border-b-2 focus:outline-none w-5/6 outline-none focus:border-green-500  mb-4 border-gray-500 text-gray-600 py-3 px-4"
            id="message"
            name="message"
            placeholder="message"
            type="text"
          />
        </div>
        <button className="my-4 px-6 block mb-4 text-gray-200 py-3 font-bold bg-green-400 rounded-lg">
          Send
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
