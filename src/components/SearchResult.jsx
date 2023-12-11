import React from 'react';
import Tracklist from './Tracklist';
import Pagination from './Pagination';

export default function SearchResult({searchTerm, queryTracks, addToPlaylist, editListTracks, search, totalTracks, currentPage}) {

    const pagesTotal = Math.ceil(totalTracks / 20);
    return (
        <div className="SearchResult">
            <h2>{totalTracks} tracks for "{searchTerm}":</h2>
            <Pagination pages={pagesTotal} search={search} currentPage={currentPage}/>
            <Tracklist tracks={queryTracks} addToPlaylist={addToPlaylist} editListTracks={editListTracks} context="SearchResult" />
        </div>
)}