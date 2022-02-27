import React from "react";
import ReactPlayer from 'react-player/youtube'


export function Music({ YTurl }) {

  if (YTurl === '') {
    return (
      <div>

      </div>
    )
  }
  else {
    console.log(YTurl)
    return (
      <ReactPlayer
        url={YTurl}
        playing={true}
        width="0px"
        height="0px"
        volume={0.2}
        onReady={console.log('mtn')}
      />
    )
  }

}