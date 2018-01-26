import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import { Spotify } from '../../utils/Spotify'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      searchResults: [],
      playlist: []
    };
    this.searchSpotify = this.searchSpotify.bind(this);
    this.addToPlaylist = this.addToPlaylist.bind(this);
    this.removeFromPlaylist = this.removeFromPlaylist.bind(this);
    this.getSpotifyUserId = this.getSpotifyUserId.bind(this);
    this.addTracksToSpotifyPlaylist = this.addTracksToSpotifyPlaylist.bind(this);
  }
  searchSpotify(query) {
    if (!this.props.accessToken) {
      Spotify.getAccessToken();
    } else {
      Spotify.search(
        query,
        this.props.accessToken
      ).then(
        tracks => this.setState({
          searchResults: tracks
        })
      );
    }
  }
  getSpotifyUserId() {
    if (!this.props.accessToken) {
      Spotify.getAccessToken();
    } else {
      return Spotify.getUserId(this.props.accessToken)
      .then( newUserId => {
        this.setState({userId: newUserId});
        return newUserId;
      });
    }
  }
  createSpotifyPlaylist(name) {
    if (!this.state.userId) {
      return this.getSpotifyUserId().then(newUserId => {
        return Spotify.createPlaylist(
          name,
          newUserId,
          this.props.accessToken
        );
      });
    } else {
      return Spotify.createPlaylist(
        name,
        this.state.userId,
        this.props.accessToken
      );
    }
  }
  addTracksToSpotifyPlaylist(name) {
    this.createSpotifyPlaylist(name)
    .then(newPlaylist => {
      Spotify.addTracksToPlaylist(
        this.state.playlist,
        this.state.userId,
        newPlaylist,
        this.props.accessToken
      )
    });
  }
  addToPlaylist(i) {
    this.setState({
      playlist: this.state.playlist.concat(
        Object.assign({},this.state.searchResults[i])
      )
    });
  }
  removeFromPlaylist(i) {
    this.state.playlist.splice(i,1);
    this.setState({
      playlist: this.state.playlist.slice()
    });
  }
  render() {
    return (
      <div className="App">
        <SearchBar searchSpotify={this.searchSpotify}/>
        <div className="App-playlist">
          <SearchResults
            searchResults={this.state.searchResults}
            addToPlaylist={this.addToPlaylist} />
          <Playlist
            playlist={this.state.playlist}
            removeFromPlaylist={this.removeFromPlaylist}
            createPlaylist={this.addTracksToSpotifyPlaylist} />
        </div>
      </div>
    );
  }
}

export default App;
