import React from 'react';
import Track from './Track';
import TrackButton from './TrackButton';

export default function Tracklist({tracks, editListTracks, context, addToPlaylist, removeFromPlaylist}) {
    let button;
    if(context === "SearchResult") {
        button = {    
            class:  "addToPlaylist",
            icon: "✚",
            onClick: addToPlaylist
        }  
    }else {
        button = {    
            class: "removeFromPlaylist",
            icon: "✖" ,
            onClick: removeFromPlaylist
        }
    }
       
    return (
        <div className="Tracklist">  
            {tracks.map(track => {
                let oldTrack = false;
                context === 'SearchResult' && (oldTrack = editListTracks.includes(track));                    
                return (
                <Track key={track.id} track={track} oldTrack={oldTrack} > 
                    <TrackButton button={button} oldTrack={oldTrack}/>
                </Track>
                )
            })}
        </div>
)}