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
      <div className="flex flex-col justify-between flex-1 md:flex-row">
        {hosts.map(host => (
          <figure
            className="rounded-xl flex dark:bg-gray-900 bg-white shadow-md flex-col w-1/2 mr-6"
            key={host.name}
          >
            <img
              alt={host.name}
              className="h-32 w-32 md:w-48 md:h-auto mx-auto rounded-full m-6"
              height="512"
              src={host.image}
              width="384"
            />
            <div className="p-8 space-y-4 text-center">
              <figcaption className="font-medium">
                <div className="text-green-400 text-2xl">{host.name}</div>
                <div className="text-gray-500 dark:text-gray-400">
                  Software Engineer, Ethiopia
                </div>
              </figcaption>
              <blockquote>
                <p className="text-lg dark:text-gray-100 font-medium">
                  {host.description}
                </p>
              </blockquote>
              <div className="flex justify-center border-t-2 border-gray-200 flex-1 pt-2">
                <InstagramIcon className="mr-6 text-yellow-500" />
                <TwitterIcon className="text-yellow-500" />
              </div>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default Hosts;
