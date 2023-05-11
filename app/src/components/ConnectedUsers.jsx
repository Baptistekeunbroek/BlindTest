import "./ConnectedUsers.css";

export function ConnectedUsers({ users }) {
  if (!users) return null;

  return (
    <div className="TextContainerBig">
      {users ? (
        <div className="TextContainer">
          <h1 className="livePers">Personnes connectées:</h1>
          <div className="activeContainer">
            <div className="listePers">
              {users.map((user) => {
                const { goodAnswer } = user;
                const allGood = goodAnswer.type === "title" ? goodAnswer.title?.found : goodAnswer.artist?.found && goodAnswer.songTitle?.found;

                return (
                  <div key={user.id} style={{ color: allGood ? "green" : "black" }} className="user">
                    {`${user.admin ? "👑" : ""} ${user.name} ${user.goodAnswer?.artist?.found ? "🎙" : ""}${user.goodAnswer?.songTitle?.found ? "💿" : ""}  ${
                      user.score ? `${user.score} pts` : ""
                    }`.trim()}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
