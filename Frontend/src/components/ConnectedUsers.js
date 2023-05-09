import "./ConnectedUsers.css";
import React from "react";

export function ConnectedUsers({ users }) {
  if (!users) return <div></div>;

  return (
    <div className="TextContainerBig">
      {users ? (
        <div className="TextContainer">
          <h1 className="livePers">Personnes connectées:</h1>
          <div className="activeContainer">
            <div className="listePers">
              {users.map((user) => (
                <div key={user.id} style={{ color: user.goodAnswer ? "green" : "black" }} className="user">
                  {user.admin ? "👑" : null}
                  <div>{user.name}</div>
                  <div>{user.goodAnswer ? "👍" : null}</div>
                  <div>{user.score ? `${user.score} pts` : null}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
