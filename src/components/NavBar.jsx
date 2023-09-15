import React from 'react'; 

export default function Navbar({openMenu, playlists}) {

return (
  <header className="App-header">      
    <h1>Jamming</h1>
    <a className="MenuTogler" href='#' onClick={openMenu}>My Playlists 
      <span className={`playlistCount ${playlists.length > 0 && 'populated'}`}> {playlists.length}</span>
    </a>
  </header>
)}