import React from 'react';

export default function SavedPlaylist({playlist, handleEdit, handleRemove, handleSaveToSpotify}) {
    return (
        <li className='SavedPlaylist box'> 
            <a className="button SavedPlaylist__edit" href="#" onClick={handleEdit}>✎</a>
            <div className="SavedPlaylist__info">                
                <h4>{playlist.name}</h4> 
                <div>Tracks: {playlist.tracks.length}</div> 
                <a className="button topRightButton SavedPlaylist__delete" href="#" onClick={handleRemove}>✖</a>
                <a className={`SavedPlaylist__save_on_spotify ${playlist.spotify ? 'saved' : 'not_saved'}`} href="#" onClick={handleSaveToSpotify}>Save on Spotify</a>    
            </div>        
        </li>
)}