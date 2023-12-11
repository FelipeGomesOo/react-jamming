import React from 'react'; 
import {Dropdown, DropdownItem} from './Dropdown'

export default function Navbar({openMenu, playlists, userData, logout, getUserPlaylists}) {

return (
  <header className="App-header">      
    <h1>Jamming</h1>
    <nav className="userMenu">
      <ul>
        <li>
          <a className="MenuTogler" href='/' onClick={openMenu}>My Playlists 
            <span className={`playlistCount ${playlists.length > 0 && 'populated'}`}> {playlists.length}</span> 
          </a>
        </li>
        <li className='separator'>&nbsp;</li>
        <li><img className='userMenu__avatar' src={userData.img} alt={userData.name} /></li>
        <li>
          <Dropdown title={userData.name}>
            <DropdownItem onClick={logout}>Logout</DropdownItem> 
          </Dropdown>
        </li>
      </ul>
    </nav>
  </header>
)}