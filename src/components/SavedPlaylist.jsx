import React from 'react';

export default function SavedPlaylist({playlist, handleEdit, handleRemove, handleSyncToSpotify}) {

    const syncStatus = playlist.spotifyId ? 'isSynced' : 'notSynced'; 
    const syncStatusIcon = playlist.spotifyId ? ' ✔' : ' '; 
    return (
        <li className={`SavedPlaylist box ${syncStatus}`}> 
            <a className="button SavedPlaylist__edit" href="/" onClick={handleEdit}>✎</a>
            <div className="SavedPlaylist__info">                
                <h4>{playlist.name}</h4> 
                <div>Tracks: {playlist.tracks.length}</div> 
                <a className="button topRightButton SavedPlaylist__delete" href="/" onClick={handleRemove}>✖</a>
                <a className={`SavedPlaylist__sync_to_spotify button `} href="/" onClick={handleSyncToSpotify}>
                    Sync to Spotify 
                    {playlist.syncing ? <div className="lds-dual-ring"></div> : syncStatusIcon }
                </a> 
            </div>        
        </li>
)}