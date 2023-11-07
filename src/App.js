import React from 'react';
import './App.css';  
import { redirectToAuthCodeFlow,getAccessToken,noToken,localToken } from './services/PKCE2';
import Login from './components/Login'; 
import Main from './components/Main';
import Root from './components/Root.js';
import {RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';
import {ConfigProvider} from './services/FetchConfig';
const publicPath = process.env.REACT_APP_PUBLIC_URL; 
const appRouter = createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route path='/' element={<Root/>}>  
            <Route index element={<Main getAccessToken={getAccessToken} noToken={noToken} localToken={localToken} /> } /> 
            <Route path='login' element={<Login redirectToAuthCodeFlow={redirectToAuthCodeFlow} /> } />  
        </Route>
        </>
    ),
    {
        basename: '/jamming', // Adicione o basename aqui
    }
); 

export default function App() {
    console.log(`Public path: ${publicPath}`);
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`);      
    return (
        <>  
        <ConfigProvider> 
          <RouterProvider router={appRouter}/>
        </ConfigProvider>     
        </>
)} 