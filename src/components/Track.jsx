import React from 'react';

export default function Track({track, oldTrack, children}) {    
    return (    
        <div className={`Track box ${oldTrack && 'added'}`} id={track.id} >
           <div className='Track__thumbnail'><img alt={track.title} src={track.thumb} /></div>
           <div className='Track__info'>          
             <h4 className='Track__title'>{track.title}</h4>
             <p className='Track__artists'>{track.artists.join(", ")}</p>
             <p className='Track__album'>{track.album}</p> 
             {children}             
           </div>
       </div>    
)}