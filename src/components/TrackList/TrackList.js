import React from 'react';
import Track from '../Track/Track.js';
import './TrackList.css';


class TrackList extends React.Component {
  constructor(props){
    super(props);
  }
  /*<!-- You will add a map method that renders a set of Track components  -->
  <!-- receive props.tracks from parents (SearchResults and PlayList) -->
  <!-- should also get isRemoval from both parents for playlist=true and searchResults=false -->
  <!-- getting onAdd and onRemove event handlers from searchResults and playlist, respectively -->*/

  render() {
    return (
      <div className="TrackList">
        {this.props.tracks.map(track => {
            return (<Track track={track} key={track.id} isRemoval={this.props.isRemoval}
                onAdd={this.props.onAdd} onRemove={this.props.onRemove}/>)
            }
          )
        }
      </div>
    );
  }
}
export default TrackList;
