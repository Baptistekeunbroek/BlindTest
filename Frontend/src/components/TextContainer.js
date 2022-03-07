import React from 'react';
import './TextContainer.css'




export function TextContainer({ users }) {
  return (
    <div className="TextContainer">
      {
        users
          ? (
            <div>
              <h1>Personnes connectées:</h1>
              <div className="activeContainer">
                <h2>
                  {users.map(({ name }) => (
                    <div key={name} className="activeItem">
                      {name}
                    </div>
                  ))}
                </h2>
              </div>
            </div>
          )
          : null
      }
    </div>
  )
}