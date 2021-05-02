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
      <form action="POST">
        <div className="grid grid-cols-1  pt-8 gap-6 w-3/6 mr-auto mb-5 pb-4 rounded-xl">
          <div>
            <input
              className="bg-gray-200 border-2 focus:outline-none outline-none focus:border-green-500  w-full mb-4 border-gray-300 rounded text-gray-600 py-3 px-4"
              id="name"
              name="name"
              placeholder="name"
              type="text"
            />
            <input
              className="bg-gray-200 border-2 focus:outline-none outline-none focus:border-green-500  w-full mb-4 border-gray-300 rounded text-gray-600 py-3 px-4"
              id="name"
              name="name"
              placeholder="name"
              type="text"
            />

            <textarea
              className="bg-gray-200 border-2 focus:outline-none outline-none focus:border-green-500  w-full mb-4 border-gray-300 rounded text-gray-600 py-3 px-4"
              id="name"
              name="name"
              placeholder="name"
              type="text"
            ></textarea>
            <button
              className="px-6 py-2 text-xl font-bold text-left bg-green-400 text-white rounded-md"
              type="submit"
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
