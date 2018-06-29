import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
//import logo from './logo.svg';
import './App.css';
import Spotify from '../../util/Spotify.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {searchResults:[],
                  playlistName:'<New List>',
                  playlistTracks:[]
               };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlayListName = this.updatePlayListName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

  }

  addTrack(newTrack) {
     //<!-- use id check to see if track exists in the current playlist array.find and array.push -->
     //<!-- if new track then add to the list using setState -->
     if(!this.state.playlistTracks.filter(track => track.id === newTrack.id).length > 0) {
       this.setState({'playlist':this.state.playlistTracks.push(newTrack)});
    }
  }

  removeTrack(trackToRemove) {
    //<!-- use track id to remove track from playlist
    this.setState({'playlistTracks':this.state.playlistTracks.filter(track => track.id !== trackToRemove.id)});
  }

  updatePlayListName(newName) {
    this.setState({'playlistName': newName });
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => {return track.uri});
    //<-- then pass trackURIs and playlist name to method that saves to Spotify -->
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
        this.setState({playlistName:'New Playlist', playlistTracks:[]});
      });
  }

  search (term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
  }

  render() {
    return (
    <div>
      <h1>Jah
          <span className="red">m</span>
          <span className="green">m</span>
          <span className="yellow">m</span>
          in'
          </h1>
      <div className="App">
        <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack}
              onNameChange={this.updatePlayListName} onSave={this.savePlaylist}/>
          </div>
        </div>
    </div>
    );
  }
}

export default App;
