function EpisodeCard({
  title,
  subtitle,
  image,
}: {
  title: String;
  subtitle: String;
  image: String;
}) {
  return (
    <div className="bg-gradient-to-b border-solid from-gray-100 via-gray-100 to-white text-gray-800 rounded-xl overflow-hidden">
      <img className=" w-full" src={image} />
      <div className="p-5">
        <p className="text-2xl text-green-500 ">
          {title} <br /> making a world a beter place{subtitle}
        </p>

        <p className="text-xs mt-3 text-gray-800 ">The quick brown fox ...</p>
        <p className="text-xs mt-4 text-gray-600 ">
          {' '}
          The quick brown fox The quick brown fox The quick brown fox The quick
          brown fox The quick brown fox The quick brown fox The quick brown fox
          The quick brown fox ...
        </p>
      </div>
    </div>
  );
}

export default EpisodeCard;
