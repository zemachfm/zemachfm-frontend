import { Ihost } from './types.d';
import InstagramIcon from '../../icons/instagram.svg';
import TwitterIcon from '../../icons/twitter.svg';

const Hosts = () => {
  let name;

  const hosts: Ihost[] = [
    {
      name: 'Abdulhamid Oumer',
      description:
        'A full stack Javascript developer, an open source enthusiast and a coffee lover.',
      image: '/assets/abdulhamid.jpg',
    },
    {
      name: 'Henok Tsegaye',
      description:
        'A software engineer and a technology enthusiast. AI  & the future is the main concern.',
      image: '/assets/henok.jpg',
    },
  ];

  return (
    <section id="#hosts">
      <div className="flex flex-col">
        <h1 className=" text-6xl my-10 font-bold dark:text-gray-200 mb-2 ">
          Hosts
        </h1>
        <p className="text-gray-400 text-lg mb-7">
          This are your podcast hosts
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 justify-between flex-1 md:flex-row">
        {hosts.map(host => (
          <div className="grid grid-cols-6 rounded-xl gap-5 bg-white">
            <figure
              className="flex-col col-span-2 bg-gradient-to-t from-gray-200 to-white px-4 py-4 rounded-l-xl"
              key={host.name}
            >
              <img
                alt={host.name}
                className="h-22 w-22 md:w-48 md:h-auto mx-auto rounded-full m-6"
                height="512"
                src={host.image}
                width="384"
              />
            </figure>
            <div className="p-1 col-span-3 space-y-4 text-left py-4">
              <figcaption className="">
                <div className="text-gray-800 text-3xl font-medium">{host.name}</div>
                <div className="text-gray-400 text-sm mt-1 ml-1  dark:text-gray-400">
                  Software Engineer, Ethiopia
                </div>
              </figcaption>
              <blockquote>
                <p className=" dark:text-gray-100 text-gray-500">
                  {host.description}
                </p>
              </blockquote>
              <div className="flex justify-start border-t-1 flex-1 pt-2">
                <InstagramIcon className="mr-6 text-red-500" />
                <TwitterIcon className="text-blue-500" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hosts;
