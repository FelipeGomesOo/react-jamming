import React from 'react';
import './App.css';  
import { LogInSpotify, isLoggedIn, ApiData } from './services/api';
import Login from './components/Login' 
import Main from './components/Main';
import Root from './components/Root.js';
import {RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom'; 
const appRouter = createBrowserRouter(createRoutesFromElements(
<>
  <Route path="/" element={<Root/>}>  
    <Route index element={<Main ApiData={ApiData} isLoggedIn={isLoggedIn} /> } /> 
    <Route path="login" element={<Login LogInSpotify={LogInSpotify} /> } />  
  </Route>
</>
));

export default function App() {     
    return (
        <>      
          <RouterProvider router={appRouter}  />
        </>
)} 