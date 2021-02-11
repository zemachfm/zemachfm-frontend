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
    <div className="bg-gradient-to-b border-solid from-yellow-300 to-indigo-200 text-gray-800 rounded-xl overflow-hidden">
      <div className="p-5">
        <img className=" w-full rounded-xl shadow-xl " src={image} />
        <p
          className="text-2xl my-4 font-medium overflow-ellipsis "
          dangerouslySetInnerHTML={{ __html: title }}
        ></p>
        <p
          className="text-sm mt-4 text-gray-900 "
          dangerouslySetInnerHTML={{ __html: subtitle }}
        ></p>
      </div>
    </div>
  );
}

export default EpisodeCard;
