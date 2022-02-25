import React from "react";
import ReactPlayer from 'react-player/youtube'


export function Music({ YTurl}) {
    return (
        <ReactPlayer
        url={YTurl}
        playing='true'
        width="0px"
        volume='0.2'
      />
    )
}