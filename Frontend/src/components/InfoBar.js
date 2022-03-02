import React from "react";

import closeIcon from "../icons/closeIcon.png"
import onlineIcon from "../icons/onlineIcon.png"
import './infoBar.css'

export function InfoBar({ room }) {
    return (
    <div className="infobar">
        <div className="leftInnerContainer">
            <img className="onlineIcon" src={onlineIcon} alt="onlione" />
            <h3>{room}</h3>
        </div>
        <div className="rightInnerContainer">
            <a href="/"><img className="closeIcon" src={closeIcon} alt="close" /></a>
        </div>
    </div>
    )
}