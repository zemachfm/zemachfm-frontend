import { FC } from 'react';

const ContactUs = () => {
  return (
    <div>
      <div className="flex flex-col">
        <h1 className=" text-6xl my-10 font-bold dark:text-gray-200 mb-2 ">
          Contact us
        </h1>
        <p className="text-gray-400 text-lg mb-7"> Get intouch with us </p>
      </div>
      <form action="POST">
        <div className="grid grid-cols-2 gap-6  py-4 w-5/6 my-5 pb-4 rounded-xl">
          <input
            className="bg-gray-200 rounded-lg text-gray-600 py-2 px-4"
            type="text"
            placeholder="name"
            name="name"
            id="name"
          />
          <input
            className="bg-gray-200 rounded-lg text-gray-600 py-2 px-4"
            type="text"
            name="name"
            placeholder="email (optional)"
            id="name"
          />
          <textarea
            className="bg-gray-200 rounded-lg text-gray-600 py-2 px-4"
            type="text"
            name="name"
            placeholder="message"
            id="name"
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-green-400 text-white rounded-md"
        >
          Sent
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
