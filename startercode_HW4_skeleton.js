// changeTrack("https://soundcloud.com/hpstylez/50-cent-eminem-dr-dre-tupac");

// Event hander for calling the SoundCloud API using the user's search query
function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '200'},
		function(data) {
			// PUT IN YOUR CODE HERE TO PROCESS THE SOUNDCLOUD API'S RESPONSE OBJECT
			// HINT: CREATE A SEPARATE FUNCTION AND CALL IT HERE
			addColumns();
			parseQuery(data);
		},'json'
	);
}

// Helper function to add the columns for the search results and playlist
function addColumns() {
	$('.results-playlist').empty().append( // .empty() to renew fresh page after each search
	'<div class="column" id="resultsContainer"><h2>Search Results</h2><div id="results-list"></div></div><div class="column" id="playlistContainer"><h2>My Playlist</h2><div id="play-list"></div></div>');
};

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
};

$(document).ready(
	// Query the soundcloud API when clicking the search button
	$('#searchButton').on('click', function() {
		var input = $('#input').val();
		$('#input').val('');
		callAPI(input);
	}));

// Can use enter key to search instead of clicking
$("#input").keyup(function(event) {
  if (event.keyCode === 13) {
      $("#searchButton").click();
  }
});

// Helper function to extract relevant data from user input query used in the callAPI function
function parseQuery(data) {
	// Using this jQuery function: http://api.jquery.com/jquery.each/
	$.each(data.slice(0,20), function(index, value) {
		var icon = value.artwork_url;
		if (icon == null) {
			icon = 'assets/blacksoundcloud.png'
		}
		var title = value.title;
		var username = value.user.username;
		var url = value.permalink_url;
		compileResults(icon, title, username, url)
	})};

// Helper function to create row of search result based on parseQuery
function compileResults(icon, title, username, url) {
	var track = '<tr> <td> <img class="icon" src="'+icon+'"></td> <td class="title">'+title+'</td> <td class="username">'+username+'</td><td><button class="play-button" value="' +url+ '">PLAY</button></td> <td><input type="image" src="assets/next.png" class="playlistButton"/></td></tr>';

	$('#results-list').append(track);
};

// Play the song when clicking the play button
$(document).on('click', '.play-button', function() {
	var url = $(this).attr('value');
	console.log(url);
	changeTrack(url);
})

// Adding song to playlist
$(document).on('click', '.playlistButton', function() {
	var row = $(this).parents('tr').clone().find('td:last').remove().end();
	row.append('<td><input type="image" src="assets/trash.png" class="deleteSong"/></td></tr>');
	row.append('<td><input type="image" src="assets/up.png" class="upSong"/></td></tr>');
	row.append('<td><input type="image" src="assets/down.png" class="downSong"/></td></tr>');
	$('#play-list').prepend($(row));
});

// Removing song from playlist
$(document).on('click', '.deleteSong', function() {
	var row = $(this).parents('tr').remove();
});


// Moving song up or down in playlist
$(document).on('click', '.upSong, .downSong', function() {
	var row = $(this).parents('tr');
	if ($(this).is('.upSong')) {
		row.insertBefore(row.prev());
	} else {
		row.insertAfter(row.next());
	};
});
