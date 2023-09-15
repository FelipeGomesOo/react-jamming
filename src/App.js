import React from 'react';
import './App.css';  
import { LogInSpotify, isLoggedIn } from './services/api';
import Login from './components/Login' 
import Main from './components/Main';

export default function App() { 
    return ( 
    <> 
      { isLoggedIn ? <Main /> : <Login LogInSpotify={LogInSpotify} />}   
    </>    
)} 