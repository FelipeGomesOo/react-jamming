import React from 'react'; 

export default function Navbar({openMenu, playlists, userData}) {

return (
  <header className="App-header">      
    <h1>Jamming</h1>
    <div className="userMenu">
      <img className='userMenu__avatar' src={userData.img} alt={userData.name} /> 
      <a className="MenuTogler" href='#' onClick={openMenu}>My Playlists 
        <span className={`playlistCount ${playlists.length > 0 && 'populated'}`}> {playlists.length}</span>
      </a>
    </div>
  </header>
)}