import React from 'react';
import SavedPlaylist from './SavedPlaylist'

export default function SavedPlaylistList({playlists, editThisPlaylist, removeThisPlaylist, handleSyncToSpotify, openMenu, handleMenu}) {
    const emptyState = playlists.length === 0;

    const addSomePlaylists = (
        <>
            <h2>its empty for now</h2>
            <p>Add some plalists</p>
        </>
    );
    const playlistsAdded = (
        <ul>
            {
                playlists.map( (playlist, index) => 
                    <SavedPlaylist 
                        key={index}
                        playlist={playlist} 
                        handleEdit={(e) => editThisPlaylist(e, playlist.id)} 
                        handleRemove={(e) => removeThisPlaylist(e, playlist.id)}                         
                        handleSyncToSpotify={(e) => handleSyncToSpotify(e, playlist.id)}
                    />)
            }
        </ul>
    );

    return (
    <div className={`SavedPlaylistList ${openMenu ? 'open' : 'closed'}`}>    
        <a className="MenuTogler" href='/' onClick={handleMenu}> ← Back</a>
        <h2>My Playlists</h2>
        {emptyState ? addSomePlaylists : playlistsAdded}
    </div>
)}






            








