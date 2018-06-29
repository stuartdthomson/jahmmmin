renderAction() {
  return (
    <figure>
    <img src={src} />
    { caption ? <figcaption>{caption}>/figcaption> : null }
    </figure>
  );
}


{this.props.isRemoval?
    <a className="Track-action" onClick={this.removeTrack} >-</a>
    :<a className="Track-action" onClick={this.addTrack}>+</a>}


    this.state = {searchResults:[{id:'spotify:track:0C80GCp0mMuBzLf3EAXqxv',name:'Shoot To Thrill',artist:'AC/DC',album:'Back In Black'},
                                {id:'spotify:track:3sqNXrDvCy4nid6XbaA2Cg',name:'Kid Charlemagne',artist:'Steely Dan',album:'The Royal Scam'}],

                  playlist:{playlistName:'SDT Playlist', playlistTracks:[
                    {id:'spotify:track:3B1lK5gNppO22gQLozrxeA',name:'I Don\'t Wanna Know',artist:'Fleetwood Mac',album:'Rumours(Super Deluxe)'},
                    {id:'spotify:track:6fHS0zmDdDKktklfaqojaF',name:'Unchained',artist:'Van Halen',album:'Fair Warning'},
                    {id:'spotify:track:7lAVmqRbm79nGN4auDjJ9b',name:'Come On, Let\s Go',artist:'Los Lobos',album:'Just Another Band From East L.A.:A Collection'},
                    {id:'spotify:track:4OzETzsymqRwmFZm9WWdLM',name:'Ride The Wild Turkey',artist:'Jerry Douglas',album:'Slide Rule'}]


                 }
               };



               savePlaylist(name, trackUris) {
                 if (!name || !trackUris.length) {
                   return;
                 }

                 const accessToken = Spotify.getAccessToken();
                 const headers = { Authorization: `Bearer ${accessToken}` };
                 let userId;

                 return fetch('https://api.spotify.com/v1/me', {headers: headers}
                 ).then(response => response.json()
                 ).then(jsonResponse => {
                   userId = jsonResponse.id;
                   return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                     headers: headers,
                     method: 'POST',
                     body: JSON.stringify({name: name})
                   }).then(response => response.json()
                   ).then(jsonResponse => {
                     const playlistId = jsonResponse.id;
                     return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                       headers: headers,
                       method: 'POST',
                       body: JSON.stringify({uris: trackUris})
                     });
                   });
                 });
               }
