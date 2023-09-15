import React, {useState} from 'react';
import apiTrackList from '../assets/MockTrackList';
import NavBar from './NavBar';
import SavedPlaylistList from './SavedPlaylistList';
import SearchBar from './SearchBar';
import SearchResult  from './SearchResult';
import EditPlaylist from './EditPlaylist';
import { v4 as uuidv4 } from 'uuid'; 


export default function Main() {        
    
    const [openMenu, SetOpenMenu] = useState(false);
    const toggleOpenMenu = (e) => {    
      e.preventDefault();
      SetOpenMenu(!openMenu)
      console.log(openMenu);
    }

    // Search term

    const [searchTerm, SetSearchTerm] = useState("");

    const handleTerm = (e) => SetSearchTerm(e.target.value);
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        searchTerm.length !== 0 && (search());
    }


    // Query

    const emptyQuery = {term: "", tracks: []}
    const [query, SetQuery] = useState(emptyQuery);
    const search = () => {      
        let term = searchTerm.toLowerCase();
        let filter = apiTrackList.filter((t) => 
          t.title.toLowerCase().includes(term) || 
          t.album.toLowerCase().includes(term)  || 
          t.artists.join().toLowerCase().includes(term)  
        );     
        SetQuery({term: searchTerm, tracks: filter}); 
      }  

      
    // Edit a playlist

    const emptyPlaylist = {id:"", name:"", tracks:[], spotify:false}
    const [editPlaylist, SetEditPlaylist] = useState(emptyPlaylist);

    const addToPlaylist = (e) => {
        e.preventDefault();
        const trackId = e.target.closest('.Track').id;
        const oldTrack = editPlaylist.tracks.find((t) => t.id === trackId);
        const newTrack = query.tracks.find((t) => t.id === trackId);  
        !oldTrack && SetEditPlaylist( {
            ...editPlaylist,
            tracks: [newTrack, ...editPlaylist.tracks]
          });             
      }
    const removeFromPlaylist = (e) => {
        e.preventDefault();
        const trackId = e.target.closest('.Track').id;
        const oldTracks = editPlaylist.tracks.filter((t) => t.id !== trackId);     
        SetEditPlaylist({ ...editPlaylist, tracks: oldTracks});          
    }
    const resetMyPlaylist = () => {
        SetEditPlaylist(emptyPlaylist);
    }
    const handlePlaylistName = (e) => {
        SetEditPlaylist({...editPlaylist, name: e.target.value})
    }
    

    // Saved Playlists
 
    const [playlists, SetPlaylists] = useState([]);     
    
    const upsertPlaylist = (e) => {
        e.preventDefault(); 
        const savedPlaylist = playlists.find((list) => list.id === editPlaylist.id);
        const oldList = playlists.filter((p) => p.id !== editPlaylist.id);    
        if(savedPlaylist) {         
            SetPlaylists([editPlaylist,  ...oldList]);
            resetMyPlaylist();  
        } else{
            savePlaylist();
        }  
        console.log(playlists)
    } 
    const savePlaylist = () => {          
        SetPlaylists((playlists) => [{id:uuidv4(), name: editPlaylist.name, tracks: editPlaylist.tracks, spotify:false}, ...playlists]);   
        resetMyPlaylist();
    }    
    const editThisPlaylist = (e, playlistId) => {
        e.preventDefault();
        const savedPlaylist = playlists.find((list) => list.id === playlistId);
        SetEditPlaylist(savedPlaylist);
        toggleOpenMenu(e)
    }
    const removeThisPlaylist = (e, playlistId) => {
        e.preventDefault();
        const cleanedPlaylists = playlists.filter((list) => list.id !== playlistId);
        SetPlaylists(cleanedPlaylists);
        resetMyPlaylist(); 
    }
    
    return (
      <div className="App">
        <SavedPlaylistList 
          handleMenu={toggleOpenMenu}
          openMenu={openMenu} 
          SetOpenMenu={SetOpenMenu} 
          playlists={playlists}
          removeThisPlaylist={removeThisPlaylist}
          editThisPlaylist={editThisPlaylist}             
        />
        <NavBar 
          openMenu={toggleOpenMenu} 
          playlists={playlists}
        /> 
        <main>                
            <div className="App-row">
                <SearchBar                      
                    term={searchTerm}
                    handleTerm={handleTerm}
                    handleSearchSubmit={handleSearchSubmit}
                />
            </div>
            <div className="App-row">
                {query.tracks.length !== 0 &&                
                    <SearchResult 
                        searchTerm={query.term}
                        queryTracks={query.tracks} 
                        addToPlaylist={addToPlaylist}
                        editListTracks={editPlaylist.tracks}
                    />
                }
                {editPlaylist.tracks.length !== 0 &&
                    <EditPlaylist 
                        editListTracks={editPlaylist.tracks}
                        removeFromPlaylist={removeFromPlaylist}
                        upsertPlaylist={upsertPlaylist}
                        playlistName={editPlaylist.name}
                        handlePlaylistName={handlePlaylistName}
                        handleCancelEdit={resetMyPlaylist}
                    />
                }                
            </div>           
        </main>
      </div>
)} 
  