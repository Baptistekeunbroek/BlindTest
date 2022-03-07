import React from "react";
import ReactPlayer from 'react-player/youtube'
import './Music.css'

export function Music({ YTurl, socket }) {

function pret(){
  console.log('pret')
  socket.emit('pretLancer');
}

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
          width="200px"
          height="200px"
          volume={0.2}
          onReady={pret}
        />
      </div>
    )
  }
}