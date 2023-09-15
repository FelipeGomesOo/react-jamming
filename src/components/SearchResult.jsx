import React from 'react';
import Tracklist from './Tracklist';

export default function SearchResult({searchTerm, queryTracks, addToPlaylist, editListTracks}) {
    
    const tracksFound = queryTracks.length;

    return (
        <div className="SearchResult">
            <h2>{tracksFound} tracks for "{searchTerm}":</h2>
            <Tracklist tracks={queryTracks} addToPlaylist={addToPlaylist} editListTracks={editListTracks} context="SearchResult" />
        </div>
)}