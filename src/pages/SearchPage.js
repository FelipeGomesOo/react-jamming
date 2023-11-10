import React, {useState, useEffect} from 'react';  

import NavBar from '../components/NavBar';
import SavedPlaylistList from '../components/SavedPlaylistList';
import SearchBar from '../components/SearchBar';
import SearchResult  from '../components/SearchResult';
import EditPlaylist from '../components/EditPlaylist';
import { v4 as uuidv4 } from 'uuid'; 
import useAuth from '../components/hooks/useAuth';

export default function SearchPage() {    
    
    const  {token}  = useAuth(); 

    useEffect(() => {
        console.log(`Token rendered on SearchPage: ${token}`);    
    }, [token]);  

    // User Data
 
    const [userData, SetuserData] = useState({id:"", name:"", img:""});

    
    useEffect(() => {
        const getUserData = async () => { 
            const endpoint = "https://api.spotify.com/v1/me";
            try { const response = await fetch(endpoint, {
                method: 'GET',
                headers: { 
                    'Authorization': `Bearer ${token}`
                }
            });
            if(response.ok){
                const jsonResponse = await response.json();                          
                SetuserData({
                    id: jsonResponse.id, 
                    name: jsonResponse.display_name, 
                    img: jsonResponse.images[0].url 
                });                      
            }else{
                const errorData = await response.json();
                console.log("Error getting user data:", errorData);
                console.log(token)
                return null; 
            } 
            } catch (error) {
            console.log(error);
            }
        } 
        if(token) {             
            getUserData();
        }
    }, [token]);
    
    const [openMenu, SetOpenMenu] = useState(false);
    const toggleOpenMenu = (e) => {    
      e.preventDefault();
      SetOpenMenu(!openMenu) 
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

    const search = async () => { 
        const endpoint = `https://api.spotify.com/v1/search?q=${searchTerm}&type=track`;
        try { const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
              }
        });
        if(response.ok){
            const jsonResponse = await response.json(); 
            const queryTracks = jsonResponse.tracks.items.map(item => ({
                id:  item.id,
                uri:  item.uri,
                thumb: item.album.images[0].url,
                title: item.name,
                album: item.album.name,
                artists: item.artists.map(artist => artist.name) 
              }));             
             SetQuery({term: searchTerm, tracks: queryTracks}); 
        } else{
            const errorData = await response.json();
            console.log("Error getting search:", errorData);
            console.log("Error getting search:", token);
            
            return null; 
        }
        } catch (error) {
            console.log(`Search error: ${error}`);
        }
    }  
      
    // Edit a playlist

    const emptyPlaylist = {id:"", name:"", tracks:[], spotifyId:""}
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
    const handleCancelEdit = (e) =>{
        e.preventDefault();
        resetMyPlaylist();
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
    } 
    const savePlaylist = () => {          
        SetPlaylists((playlists) => [{id:uuidv4(), name: editPlaylist.name, tracks: editPlaylist.tracks, spotifyId:editPlaylist.spotifyId}, ...playlists]);   
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

    
     
     
    // Save Playlist to Spotify
    const savePlaylistToSpotify = async (e, thisPlaylistId) => { 
        e.preventDefault();
        const endpoint = "https://api.spotify.com/v1/users/" + userData.id + "/playlists";
        const playlistToSend = playlists.find(p => p.id === thisPlaylistId);         
        
         try { const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }, 
            body: JSON.stringify({
                'name': playlistToSend.name,
                'description': 'New playlist description',
                'public': false
              })
            
        });
        if(response.ok){
            const jsonResponse = await response.json();                          
            console.log(jsonResponse.id);
            addTracksToSpotify(playlistToSend, jsonResponse.id);                       
        } 
        } catch (error) {
        console.log(error);
        }  
    }
    // Save Playlist to Spotify
    const addTracksToSpotify = async (playlistToSend, thisPlaylistSpotifyId) => { 
        const endpoint = "https://api.spotify.com/v1/playlists/" + thisPlaylistSpotifyId + "/tracks";
        const tracksToSend = playlistToSend.tracks;         
        
         try { const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }, 
            body: JSON.stringify({
                'uris': tracksToSend.map(track => track.uri)
              })
            
        });
        if(response.ok){
            const jsonResponse = await response.json();                          
            console.log(jsonResponse)                       
        } 
        } catch (error) {
        console.log(error);
        }  
    }   
    const logout = () => {
        localStorage.setItem('tokenExpiration', "");
    }
    /* if (!isAuthorized) {
        return <Navigate to={`login`} />
    }   */ 
    return (      

      <div className="App"> 
        <SavedPlaylistList 
          handleMenu={toggleOpenMenu}
          openMenu={openMenu} 
          SetOpenMenu={SetOpenMenu} 
          playlists={playlists}
          removeThisPlaylist={removeThisPlaylist}
          editThisPlaylist={editThisPlaylist}
          handleSaveToSpotify={savePlaylistToSpotify}             
        />
        <NavBar 
          openMenu={toggleOpenMenu} 
          playlists={playlists}
          userData={userData}
          logout={logout}
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
                        handleCancelEdit={handleCancelEdit}
                    />
                }                
            </div>           
        </main>
      </div>
)}  