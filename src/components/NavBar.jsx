import React from 'react'; 

export default function Navbar({openMenu, playlists, userData, logout}) {

return (
  <header className="App-header">      
    <h1 onClick={logout} >Jamming</h1>
    <div className="userMenu">
      <img onClick={logout} className='userMenu__avatar' src={userData.img} alt={userData.name} /> 
      <a className="MenuTogler" href='/' onClick={openMenu}>My Playlists 
        <span className={`playlistCount ${playlists.length > 0 && 'populated'}`}> {playlists.length}</span>
      </a>
    </div>
  </header>
)}