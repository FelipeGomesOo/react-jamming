import React, { useState } from 'react'; 
import NavBar from './components/NavBar'

 
import './App.css';

function App() {

  const [openMenu, SetOpenMenu] = useState(false);
  const toggleOpenMenu = (e) => {    
    e.preventDefault();
    SetOpenMenu(!openMenu)
    console.log(openMenu);
  } 

  return (
    <div className="App">
      <NavBar openMenu={toggleOpenMenu} />
    </div>
  );
}

export default App;
