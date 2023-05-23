

export function Historique({ liste }) {
  if (!liste?.length) return null;

  return (
    <div className="bg-[#242531] rounded-lg overflow-hidden mb-12">
      <h1 className="text-white font-semibold mt-5 mb-5 text-center">Historique des musiques</h1>
      {liste
        ?.slice(0)
        .reverse()
        .map((element, i) => (
          <div className="flex flex-row ml-5 mb-5 mr-5  rounded-xl" key={i}>
            <img alt="miniature" className="w-auto h-32 mb-2 rounded-xl" src={element.photo} />
            <p className="ml-5 flex flex-auto justify-center items-center text-white font-semibold">{element.nom} </p>
          </div>
        ))}
    </div>
  );
}
