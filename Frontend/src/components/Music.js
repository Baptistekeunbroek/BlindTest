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
      <div>
        <h1>Titre : {YTurl.title}</h1>
        <ReactPlayer
          url={'https://www.youtube.com/watch?v=' + YTurl.URL}
          playing={true}
          width="100px"
          height="100px"
          volume={0.2}
          onReady={console.log('mtn')}
        />
      </div>
    )
  }

}