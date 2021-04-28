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
    <section id="hosts">
      <div className="flex flex-col">
        <h1 className=" text-6xl my-10 font-bold dark:text-gray-200 mb-2 ">
          Hosts
        </h1>
        <p className="text-gray-400 text-lg mb-7">
          This are your podcast hosts
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 justify-between flex-1 lg:grid-cols-2">
        {hosts.map(host => (
          <div className="grid lg:grid-cols-6 grid-cols-4 rounded-xl gap-5 bg-white dark:bg-gray-900">
            <figure
              className="flex-col lg:col-span-2 col-span-4 bg-gradient-to-t from-gray-200 to-white px-4 py-4 rounded-l-xl dark:from-gray-900 dark:to-gray-800 w-full"
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
            <div className="lg:p-1 p-4 lg:col-span-3 col-span-4 space-y-4 text-left lg:py-4">
              <figcaption className="">
                <div className="text-gray-800 text-3xl font-medium dark:text-white">
                  {host.name}
                </div>
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
