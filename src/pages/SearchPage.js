import React, {useState, useEffect} from 'react';  

import { Navigate } from 'react-router-dom'; 
import NavBar from '../components/NavBar';
import SavedPlaylistList from '../components/SavedPlaylistList';
import SearchBar from '../components/SearchBar';
import SearchResult  from '../components/SearchResult';
import EditPlaylist from '../components/EditPlaylist';
import { v4 as uuidv4 } from 'uuid'; 
import useLocalToken from '../components/hooks/useLocalToken';
import useLocalCode from '../components/hooks/useLocalCode';
import { useCallback } from 'react';

export default function SearchPage() {    
    
    const code = useLocalCode(); 
    const token = useLocalToken();  

    // Logged out
    const [isLoggedOut, SetIsLoggedOut] = useState(false);
    const logout = useCallback(() => {
        localStorage.setItem('localToken', "");
        localStorage.setItem('API_CODE', "");
        console.log("Logged out");
        SetIsLoggedOut(true);
    }, []);
    //console.log("isLoggedOut",isLoggedOut)

    useEffect(() => {
        console.log(`Token rendered on SearchPage: ${token}`); 
        console.log(`Code rendered on SearchPage: ${code}`);     
    }, [token, code]);

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
                logout()    
                return null; 
            } 
            } catch (error) {
            console.log(error);
            }
        } 
        if(token) {             
            getUserData();
        }
    }, [token, logout]);

    useEffect(() => {
    // Get Playlist Tracks From User on Spotify
    const getPlaylistTracks = async (playlistId) => {
        const endpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`; 
        try { const response = await fetch(endpoint, {
           method: 'GET',
           headers: { 
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`
           }
       });
       if(response.ok){
           const data = await response.json();
           console.log("My tracks:", data.items) 
           const myPlaylist = data.items.map(item => ({
               id:         item.track.id,
               uri:        item.track.uri,
               thumb:      item.track.album.images[0].url,
               title:      item.track.name,
               album:      item.track.album.name,
               artists:    item.track.artists.map(artist => artist.name) 
           }))
           return myPlaylist; 
       } 
       } catch (error) {
       console.log(error);
       }
   }
   // Get Playlists From User on Spotify
        const getUserPlaylists = async () => {
            const endpoint = "https://api.spotify.com/v1/users/" + userData.id + "/playlists";
            try { const response = await fetch(endpoint, {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if(response.ok){
                const data = await response.json();
                console.log("My playlists:", data.items) 
                const fetchAndMapPlaylists = async () => {
                    const playlistPromises = data.items.map(async (item) => {
                      const playlistTracks = await getPlaylistTracks(item.id);
                      return {
                        id: uuidv4(),
                        name: item.name,
                        tracks: playlistTracks,
                        spotifyId: item.id,
                      };
                    });
                    const myPlaylists = await Promise.all(playlistPromises);
                    console.log("myPlaylists", myPlaylists); 
                    SetPlaylists((playlists) => [...myPlaylists]);
                  };
                fetchAndMapPlaylists();                       
            } 
            } catch (error) {
            console.log(error);
            }
        }
        getUserPlaylists();
    },[userData, token])
    
    // Menu Toggler
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
    const search = async (offSet = 0) => { 
        const endpoint = `https://api.spotify.com/v1/search?q=${searchTerm}&type=track&limit=10&offset=${offSet}`;
        try { const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
              }
        });
        if(response.ok){
            const jsonResponse = await response.json(); 
            console.log("Query jsonResponse",jsonResponse)
            const totalTracks  = jsonResponse.tracks.total; 
            const queryTracks = jsonResponse.tracks.items.map(item => ({
                id:  item.id,
                uri:  item.uri,
                thumb: item.album.images[0].url,
                title: item.name,
                album: item.album.name,
                artists: item.artists.map(artist => artist.name) 
              }));             
             SetQuery({term: searchTerm, tracks: queryTracks, totalTracks:totalTracks, currentPage:offSet}); 
        } else{
            const errorData = await response.json();
            console.log("Error getting search:", errorData); 
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

    // Activate Sync Feedback
    const syncFeedback = (playlist, oldList, trueFalse) => {
        playlist.syncing = trueFalse;
        SetPlaylists([playlist, ...oldList])
        console.log('Syncing is:', trueFalse)
    }
    
    // handleSyncToSpotify
    const handleSyncToSpotify = async (e, playlistId) => {
        e.preventDefault();
        const playlist = playlists.find(p => p.id === playlistId);
        const oldList = playlists.filter(p => p.id !== playlistId); 
        syncFeedback(playlist, oldList, true);

        if(playlist.spotifyId === "") {
            savePlaylistToSpotify(playlist)  
            setTimeout(() => {
                syncFeedback(playlist, oldList, false);
            }, 3000);
        } else {
            updatePlaylistOnSpotify(playlist) 
            setTimeout(() => {
                syncFeedback(playlist, oldList, false);
            }, 3000);
        } 
    }
    // Save Playlist to Spotify
    const savePlaylistToSpotify = async (playlistToSend) => {  
        const endpoint = "https://api.spotify.com/v1/users/" + userData.id + "/playlists";     
        
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

    // Add tracks to Spotify Playlist
    const addTracksToSpotify = async (playlistToSend, thisPlaylistSpotifyId) => { 
        const endpoint = "https://api.spotify.com/v1/playlists/" + thisPlaylistSpotifyId + "/tracks";        
         try { const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }, 
            body: JSON.stringify({
                'uris': playlistToSend.tracks.map(track => track.uri)
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
    // Update Playlist tracks on Spotify
    const updateTracksOnSpotify = async (playlistToSend) => {
        const endpoint = `https://api.spotify.com/v1/playlists/${playlistToSend.spotifyId}/tracks`; 
        try { const response = await fetch(endpoint, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }, 
            body: JSON.stringify({
                'uris': playlistToSend.tracks.map(track => track.uri)
                })
        });
        if(response.ok){
            const data = await response.json();                          
            console.log(data); 
        } 
        } catch (error) {
            console.log(error);
        }
    }
    // Update Playlist details on Spotify 
    const updatePlaylistOnSpotify = async (playlistToSend) => {  
        const endpoint = `https://api.spotify.com/v1/playlists/${playlistToSend.spotifyId}`; 
        try { const response = await fetch(endpoint, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }, 
            body: JSON.stringify({
                'name': playlistToSend.name 
                })
        });
        if(response.ok){
            const data = await response.text();                          
            console.log(data);
            updateTracksOnSpotify(playlistToSend); 
        } 
        } catch (error) {
            console.log(error);
        }  
    }

    if(isLoggedOut) {
        return <Navigate to={`/login`} />
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
          handleSyncToSpotify={handleSyncToSpotify}             
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
                        search={search}
                        totalTracks={query.totalTracks}
                        currentPage={query.currentPage}
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