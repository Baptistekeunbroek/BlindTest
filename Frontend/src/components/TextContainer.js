import React from "react";
import "./TextContainer.css";

export function TextContainer({ users }) {
  return (
    <div className="TextContainerBig">
      {users ? (
        <div className="TextContainer">
          <h1 className="livePers">Personnes connectées:</h1>
          <div className="activeContainer">
            <h2 className="listePers">
              {users.map(({ name }) => (
                <div key={name} className="activeItem">
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
