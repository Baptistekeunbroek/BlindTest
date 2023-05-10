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
              {users.map((user) => (
                <div key={user.id} style={{ color: user.goodAnswer ? "green" : "black" }} className="user">
                  {`${user.admin ? "👑" : ""} ${user.name} ${user.goodAnswer ? "👍" : ""}  ${user.score ? `${user.score} pts` : ""}`.trim()}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
