import React  from 'react'; 
import useAuth from './hooks/useAuth';
import { Navigate } from 'react-router-dom'; 


export default function Main() {    
    const {loading} = useAuth();    
    console.log("Loading on Main:",loading);
    if(loading){
        return<div>Loading...</div>;
    }else{
         return <Navigate to='/search' /> 
    }    
  }  