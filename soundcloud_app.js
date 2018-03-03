$(document).ready(function(){
	page_start();
});

var searchResults = [];
var playlist = [];

// tell the website what to do in response to user's initial actions
function page_start() {
  $('#search-button').on('click', searchResultsButtonPressed);
  $('#results').on('click', '.play-song', playSongButtonPressed);
  $('#playlist').on('click', '.play-song', playSongButtonPressed);
  $('#results').on('click', '.add-to-favorites', addToPlaylist);
  $('#playlist').on('click', '.delete-song', deleteSongButtonPressed);

}

// function to pass user input to Soundcloud API
function searchResultsButtonPressed() {
  console.log ('buttonPressed');
  //first, fetch user input
  var searchString = $('#search-input').val();
  //pass user input to callAPI function
  callAPI(searchString);
}

// generate results in the format of sliced array
function saveResults(data) {
  searchResults = data.slice(0,20);
}

// format result into HTML code to be interpreted and displayed
function generateResultHTML(result) {
  var id = result.id;
  var artist_name = result.user.username;
  var song_name = result.title;
  var image_url = result.artwork_url;

  if (!image_url) {
    // TODO: add placeholder image url
    image_url = 'https://i.imgur.com/s2YUrLo.png';
  }

  var template = [
    '<div id="r-', id, '"class="song-result" style="background-color: white; padding: 20px;">',
      '<div class="">',
        '<img src="', image_url,'" alt="">',
      '</div>',
      '<div class="">',
        '<p> <strong>Title: </strong>', song_name, '</p>',
        '<p> <strong>Artist: </strong>', artist_name,'</p>',
      '</div>',
      '<div class="">',
        '<button class="play-song" type="button" name="button"> Play </button>',
        '<button class="add-to-favorites" type="button" name="button"> Add to Favorites </button>',
      '</div>',
    '</div>',
  ].join('');

  return template
}

// take the HTML code previously generated for search results, and display the search results
function displayResults() {
  //delete old results, if there is any
  $('#results').empty();
  //display new results
  for (i = 0; i < searchResults.length; i++) {
       var html = generateResultHTML(searchResults[i]);
       $('#results').append(html);
// allow users to add songs to playlist
// not placed in page_start function as search result was not loaded then
  }
}

// play selected music
function playSongButtonPressed() {
  var parent = $(this).parent().parent();
  var songId = parent.attr('id').split('-')[1];
  var song = searchResults.find(function(element) {
    return element.id == songId;
  })

  changeTrack(song.permalink_url);
}

// generate HTML code for playlist
function addToPlaylist() {
  // get the song
  var parent = $(this).parent().parent();
  var songId = parent.attr('id').split('-')[1];
  var song = searchResults.find(function(element) {
    return element.id == songId;
  })

  // allow users to oerform actions to songs on the playlist
  // how to pass the song ID to addToPlaylist???
  // check whether song is already in Favorites
  for (i = 0; i < playlist.length; i++) {
    if (song.id == playlist[i].id) {
      return
    }
  }

  playlist.unshift(song);

  var html =  generateFavoritesHTML(song);
  $('#playlist').prepend(html);

}

function generateFavoritesHTML(result) {
  var id = result.id;
  var artist_name = result.user.username;
  var song_name = result.title;
  var image_url = result.artwork_url;

  if (!image_url) {
    // TODO: add placeholder image url
    image_url = 'https://i.imgur.com/s2YUrLo.png';
  }

// add play, delete, move up, move down buttons
  var template = [
    // f- for favorites, as opposed to r- for results
    // generate the HTML template for a favorite
    '<div id="f-', id, '"class="song-playlist" style="background-color: white; padding: 20px;">',
      '<div class="">',
        '<img src="', image_url,'" alt="">',
      '</div>',
      '<div class="">',
        '<p> <strong>Title: </strong>', song_name, '</p>',
        '<p> <strong>Artist: </strong>', artist_name,'</p>',
      '</div>',
      '<div class="">',
        '<button class="play-song" type="button" name="button"> Play </button>',
        '<button class="delete-song" type="button" name="button"> Delete </button>',
        '<button class="move-up" type="button" name="button"> Move Up </button>',
        '<button class="move-down" type="button" name="button"> Move Down </button>',
      '</div>',
    '</div>',
  ].join('');

  return template
}

function deleteSongButtonPressed() {
    var parent = $(this).parent().parent();
    var songId = parent.attr('id').split('-')[1];
    var songIndex = playlist.findIndex(function(element) {
      return element.id == songId;
    });

    // remove song from playlist array
    playlist.splice(songIndex, 1);
    //current
    parent.remove()



  // $(this).parent().remove()
  //
  // for (i = 0; i < playlist.length; i++) {
  //   if (song.id == playlist[i].id) {
  //     return
  //   }
  // }

}

function moveUp() {
  var temp = $(this).parent();
  elm.insertBefore(temp.prev());
}

function moveDown() {
  var temp = $(this).parent();
  elm.insertAfter(temp.prev());
}



function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '200'},
		function(data) {
			// PUT IN YOUR CODE HERE TO PROCESS THE SOUNDCLOUD API'S RESPONSE OBJECT
      console.log(data );
			// HINT: CREATE A SEPARATE FUNCTION AND CALL IT HERE
      // once receive the results, display the results
      saveResults(data);
      displayResults();
		},'json'
	);
}

// 'Play' button event handler - play the track in the Stratus player
function changeTrack(url) {
	// Remove any existing instances of the Stratus player
	$('#stratus').remove();

	// Create a new Stratus player using the clicked song's permalink URL
	$.stratus({
      key: "b3179c0738764e846066975c2571aebb",
      auto_play: true,
      align: "bottom",
      links: url
    });
}
