import React from 'react'; 

export default function Navbar({openMenu}) {

return (
  <header className="App-header"> 
  <div className="App-row">
    <a class="MenuTogler" href='#' onClick={openMenu}>Open</a>
    <h1>Jamming</h1>           
  </div>
</header>)}