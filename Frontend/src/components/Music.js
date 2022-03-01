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
        url={'https://www.youtube.com/watch?v=_S7WEVLbQ-Y&t=617s'}
        playing={true}
        width="0px"
        height="0px"
        volume={0.2}
        onReady={console.log('mtn')}
      />
    )
  }

}