import React from "react";

import closeIcon from "../icons/closeIcon.png"
import onlineIcon from "../icons/onlineIcon.png"

export function InfoBar({ room }) {
    return (
    <div className="infobar">
        <div className="containerGauche">
            <img className="OnlineIcon" src={onlineIcon} alt="onlione" />
            <h3>{room}</h3>
        </div>
        <div className="containerDroit">
            <a href="/"><img src={closeIcon} alt="close" /></a>
        </div>
    </div>
    )
}