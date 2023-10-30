import React from 'react';

export default function SearchBar({handleTerm, term, handleSearchSubmit}) {    

    return (
        <form className='form_bar' onSubmit={handleSearchSubmit}>
            <input className='form_bar__input' type="text" value={term} onChange={handleTerm} placeholder='Search by title, artist and album' />
            <input className='form_bar__button' type="submit" value="Search" />
        </form> 

)}