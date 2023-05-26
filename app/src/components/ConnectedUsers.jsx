import { FiMusic } from "react-icons/fi";
import { RiAlbumLine } from "react-icons/ri";

export function ConnectedUsers({ users }) {
  if (!users) return null;

  return (
    <div className="w-56 justify-center items-center text-center">
      <div className="bg-[#242531] rounded-lg mt-2 justify-start items-center ">
        <h1 className="mr-2 ml-2 mt-2 text-white font-semibold">Personnes connectées:</h1>
        <div className="justify-center items-center text-center">
          {users.map((user) => {
            const { goodAnswer } = user;
            const allGood = goodAnswer.title ? goodAnswer.title === true : goodAnswer.artist === true && goodAnswer.song === true;
            return (
              <div key={user.id} style={{ color: allGood ? "green" : "white" }} className="justify-center  items-center">
                {`${user.admin ? "👑" : ""} ${user.name} ${goodAnswer?.artist ? <FiMusic /> : ""}${goodAnswer?.song ? <RiAlbumLine /> : ""}  ${
                  user.score ? `${user.score} pts` : ""
                }`.trim()}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
