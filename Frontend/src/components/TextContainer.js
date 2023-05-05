import "./TextContainer.css";
import React from "react";

export function TextContainer({ users, bonrep }) {
  if (!users) return <div></div>;

  users?.map((element) => {
    if (bonrep.includes(element.name)) element.color = "green";
    else element.color = "black";
    return element;
  });

  return (
    <div className="TextContainerBig">
      {users ? (
        <div className="TextContainer">
          <h1 className="livePers">Personnes connectées:</h1>
          <div className="activeContainer">
            <h2 className="listePers">
              {users.map(({ name, color }, i) => (
                <div key={i} style={{ color: color }} color={color}>
                  {name}
                </div>
              ))}
            </h2>
          </div>
        </div>
      ) : null}
    </div>
  );
}
