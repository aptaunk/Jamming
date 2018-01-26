import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'New Playlist'
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCreatePlaylist = this.handleCreatePlaylist.bind(this);
  }
  handleNameChange(event) {
    this.setState({
      name: event.target.value
    });
  }
  handleCreatePlaylist(event) {
    this.props.createPlaylist(this.state.name);
  }
  render() {
    return (
      <div className="Playlist">
        <input
          onChange={this.handleNameChange}
          defaultValue='New Playlist' />
        <TrackList
          trackList={this.props.playlist}
          trackAction={this.props.removeFromPlaylist}
          actionSymbol='-' />
        <a className="Playlist-save"
          onClick={this.handleCreatePlaylist}>
          SAVE TO SPOTIFY
        </a>
      </div>
    );
  }
}

export default Playlist;
