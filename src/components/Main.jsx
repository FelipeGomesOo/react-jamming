import React, {useState} from 'react';

function App({openMenu, SetOpenMenu}) {     
    const {playlists, SetPlaylists} = useState([]);
    const {query, SetQuery} = useState([]);
    const {editPlaylist, SetEditPlaylist} = useState({});
     
    return (
        <main>
            <SavedPlaylistList 
                openMenu={openMenu} 
                SetOpenMenu={SetOpenMenu} 
                playlists={playlists}
                RemovePlaylist={RemovePlaylist}
                EditThisPlaylist={EditThisPlaylist}
                onEdit={onEdit}
            />
            <div className="App-row">
                <SearchBar Search={Search} />
                <SearchResult 
                    queryTracks={queryTracks}
                    editListTracks={editListTracks}
                    AddToPlaylist={AddToPlaylist}
                />
                 <EditPlaylist 
                    editListTracks={editListTracks}
                    RemoveFromPlaylist={RemoveFromPlaylist}
                    SaveInPlaylists ={SaveInPlaylists }
                />
            </div>
        </main>
    );
  }
  
  export default App;
  