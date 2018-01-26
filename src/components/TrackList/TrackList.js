import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
  render() {
    if (!this.props.trackList) {
      return null;
    }
    return (
      <div className="TrackList">
        {this.props.trackList.map((track,i) => {
          return (
            <Track
              key={'track_'+i}
              index={i}
              track={track}
              action={this.props.trackAction}
              actionSymbol={this.props.actionSymbol} />
          );
        })}
      </div>
    );
  }
}

export default TrackList;
