import React from 'react';
import Tracklist from './Tracklist';

export default function EditPlaylist({editListTracks, removeFromPlaylist, upsertPlaylist, playlistName, handlePlaylistName, handleCancelEdit }) {
    
    return ( 
    <div className="EditPlaylist box">
      <a className="button topRightButton EditPlaylist__cancelEdit" href="/" onClick={handleCancelEdit}>✖</a>
      <h2 className='EditPlaylist__title'>Edit your playlist</h2>
      <form className='form_bar' onSubmit={upsertPlaylist}>
        <input className='form_bar__input' type="text" placeholder='Name your playlist' value={playlistName} onChange={handlePlaylistName} />
        {playlistName && <button className="savePlaylist form_bar__button" type="submit">Save</button> }                  
      </form>
      <Tracklist tracks={editListTracks} context="EditList" removeFromPlaylist={removeFromPlaylist} />      
    </div>     
)}