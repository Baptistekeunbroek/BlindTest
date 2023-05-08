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
                  <div>{user.name}</div>
                  <div>{user.goodAnswer ? "👍" : ""}</div>
                  <div>{user.score ? `(${user.score})` : "0"}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
