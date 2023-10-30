import React from 'react';

export default function TrackButton({button, oldTrack}){
  return(
     <a className={`button topRightButton ${button.class}`} href="/" onClick={button.onClick}>{oldTrack ? '✔' : button.icon}</a>
  )
}