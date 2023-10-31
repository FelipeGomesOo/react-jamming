import React from 'react';
import './App.css';  
import { LogInSpotify, isLoggedIn, ApiData } from './services/api';
import Login from './components/Login' 
import Main from './components/Main';
import Root from './components/Root.js';
import {RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';
const publicPath = process.env.PUBLIC_URL || '/'; 
const appRouter = createBrowserRouter(createRoutesFromElements(
<>
  <Route path={publicPath} element={<Root/>}>  
    <Route index element={<Main ApiData={ApiData} isLoggedIn={isLoggedIn} /> } /> 
    <Route path={`${publicPath}login`} element={<Login LogInSpotify={LogInSpotify} /> } />  
  </Route>
</>
));


export default function App() {  
    console.log( `Public Path ${publicPath}`);   
    return (
        <>      
          <RouterProvider router={appRouter}  />
        </>
)} 