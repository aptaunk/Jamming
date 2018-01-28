const clientId = '{Your Client Id}';
const redirectUrl = 'http://localhost:3000/';

export const Spotify = {

  getAccessToken() {
    const url =
      'https://accounts.spotify.com/authorize?'+
      'client_id='+clientId+'&'+
      'response_type=token&'+
      'redirect_uri='+redirectUrl+'&'+
      'scope=playlist-modify-public';
    window.location.replace(url, {'mode': 'no-cors'});
  },

  getUserId(accessToken) {
    const url =
      'https://cors-anywhere.herokuapp.com/'+
      'https://api.spotify.com/v1/me';
    return fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then(
      response => response.json()
    ).then(
      jsonResponse => {
        if (jsonResponse.error) {
          throw new Error(jsonResponse.error.message);
        }
        if (!jsonResponse.id) {
          throw new Error('Could not log into spotify');
        }
        return jsonResponse.id;
      }
    ).catch( error => {
        alert(error.message);
        window.location.replace(redirectUrl);
    });
  },

  search(query, accessToken) {
    const url =
      'https://cors-anywhere.herokuapp.com/'+
      'https://api.spotify.com/v1/search?'+
      'q='+query+'&'+
      'type=track';
    return fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then(
      response => response.json()
    ).then(
      jsonResponse => {
        if (jsonResponse.error) {
          throw new Error(jsonResponse.error.message);
        }
        if (!jsonResponse.tracks) {
          throw new Error('Could not search spotify');
        }
        if (jsonResponse.tracks.total === 0) {
          return null;
        }
        return jsonResponse.tracks.items.map( track => {
          return {
            uri: track.uri,
            previewUrl: track.preview_url,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name
          };
        });
      }
    ).catch( error => {
        alert(error.message);
        window.location.replace(redirectUrl);
    });
  },

  createPlaylist(name, userId, accessToken) {
    const url =
      'https://cors-anywhere.herokuapp.com/'+
      'https://api.spotify.com/v1'+
      '/users/'+userId+
      '/playlists';
    return fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({name: name})
    }).then(
      response => response.json()
    ).then(
      jsonResponse => {
        if (jsonResponse.error) {
          throw new Error(jsonResponse.error.message);
        }
        if (!jsonResponse.id) {
          throw new Error('Could not create spotify playlist');
        }
        return jsonResponse.id;
      }
    ).catch( error => {
        alert(error.message);
        window.location.replace(redirectUrl);
    });
  },

  addTracksToPlaylist(tracks, userId, playlistId, accessToken) {
    const url =
      'https://cors-anywhere.herokuapp.com/'+
      'https://api.spotify.com/v1'+
      '/users/'+userId+
      '/playlists/'+playlistId+
      '/tracks';
    return fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({uris: tracks.map(track => track.uri)})
    }).then(
      response => response.json()
    ).then(
      jsonResponse => {
        if (jsonResponse.error) {
          throw new Error(jsonResponse.error.message);
        }
        alert('New Playlist Created');
      }
    ).catch( error => {
        alert(error.message);
        window.location.replace(redirectUrl);
    });
  }

};
