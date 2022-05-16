import "./TextContainer.css";
import React from "react";

export function TextContainer({ users, bonrep }) {
  console.log(bonrep);
  console.log(users);
  if (bonrep.length === 0) {
    console.log("Pas De bonne rep");
    for (let j = 0; j < users.length; j++) {
      users[j].coulor = "black";
    }
  }

  for (let i = 0; i < bonrep.length; i++) {
    for (let j = 0; j < users.length; j++) {
      console.log("true");
      if (bonrep[i] === users[j].name) {
        console.log("trueTrue");

        users[j].coulor = "green";
      }
    }
  }

  return (
    <div className="TextContainerBig">
      {users ? (
        <div className="TextContainer">
          <h1 className="livePers">Personnes connectées:</h1>
          <div className="activeContainer">
            <h2 className="listePers">
              {console.log("test")}
              {users.map(({ name, coulor }) => (
                <div key={name} style={{ color: coulor }} color={coulor}>
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
