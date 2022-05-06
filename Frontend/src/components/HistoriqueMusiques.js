import React from "react";

import "./HistoriqueMusiques.css";

export function Historique({ liste }) {
  if (liste.length === 0) {
    return <div></div>;
  } else
    return (
      <div className="historique">
        {liste.map((element) => (
          <div className="Musique" key={element}>
            <img alt="miniature" className="Minia" src={element.photo} />
            <p className="NomMusique">{element.nom} </p>
          </div>
        ))}
      </div>
    );
}
