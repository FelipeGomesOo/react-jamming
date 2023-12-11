import React from 'react';

export default function Pagination({pages, search, currentPage}){
    let pagesList = [];
    for (let i = 0; i < pages; i++) {
        pagesList.push(i);
    }
    const isCurrentPage = (pageOffset) => {
        if (pageOffset === currentPage) {
            return true
        }else{
            return false
        } 
    }
     const paginationItems = pagesList.map((page, index) => <li onClick={() => search(index * 10)} className={`button ${isCurrentPage(index * 10) ? 'current' : '' }`} key={index}>{index+1}</li>) 
  return(
    <ul className='Pagination'>
        {paginationItems}    
    </ul>
  )
}