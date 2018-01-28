import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      musicPlayer: null,
      previewIcon: 'play_circle_outline'
    }
    this.handleClick = this.handleClick.bind(this);
    this.handlePlayPreview = this.handlePlayPreview.bind(this);
    this.handleStopPreview = this.handleStopPreview.bind(this);
  }
  handleClick(event) {
    this.props.action(this.props.index);
  }
  handlePlayPreview(event) {
    const musicPlayer = new Audio(this.props.track.previewUrl);
    this.setState({
      musicPlayer: musicPlayer,
      previewIcon: 'play_circle_filled'
    });
    musicPlayer.play();
  }
  handleStopPreview(event) {
    this.state.musicPlayer.pause();
    this.setState({
      previewIcon: 'play_circle_outline'
    });
  }
  render() {
    if (this.props.track.previewUrl) {
      return (
        <div className="Track">
          <div className="Track-information">
            <h3>
              {this.props.track.name+' '}
              <i className="material-icons"
                onMouseOver={this.handlePlayPreview}
                onMouseOut={this.handleStopPreview}>
                {this.state.previewIcon}
              </i>
            </h3>
            <p>{this.props.track.artist} | {this.props.track.album}</p>
          </div>
          <a onClick={this.handleClick} className="Track-action">{this.props.actionSymbol}</a>
        </div>
      );
    } else {
      return (
        <div className="Track">
          <div className="Track-information">
            <h3>
              {this.props.track.name}
            </h3>
            <p>{this.props.track.artist} | {this.props.track.album}</p>
          </div>
          <a onClick={this.handleClick} className="Track-action">{this.props.actionSymbol}</a>
        </div>
      );
    }
  }
}

export default Track;
