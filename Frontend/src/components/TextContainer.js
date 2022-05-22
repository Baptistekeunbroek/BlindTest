import './TextContainer.css';
import React from 'react';

export function TextContainer({ users, bonrep }) {
  if (bonrep.length === 0) {
    for (let j = 0; j < users.length; j++) {
      users[j].coulor = 'black';
    }
  }

  for (let i = 0; i < bonrep.length; i++) {
    for (let j = 0; j < users.length; j++) {
      if (bonrep[i] === users[j].name) {
        users[j].coulor = 'green';
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
              {users.map(({ name, coulor }, i) => (
                <div key={i} style={{ color: coulor }} color={coulor}>
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
