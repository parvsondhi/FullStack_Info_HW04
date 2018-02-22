// Event hander for calling the SoundCloud API using the user's search query
function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '200'},
		function(data) {
			// PUT IN YOUR CODE HERE TO PROCESS THE SOUNDCLOUD API'S RESPONSE OBJECT
			// HINT: CREATE A SEPARATE FUNCTION AND CALL IT HERE
			queryData(data);
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

// Function for getting search results
function queryData(data) {
	for (i = 0; i < data.length; i++) {
		var artwork = data[i].artwork_url;
		if (artwork === null) {
			artwork = 'soundcloud.jpg'
		}
		var title = data[i].title;
		var user = data[i].user.username;
		var url = data[i].permalink_url;
		$('#result').append('<tr><td><img class="artwork" src="' + artwork + '"</td><td>' + title + '</td><td>' + user + '</td><td><button class="play-btn" data-url="' + url + '">Play</button></td><td><button class="addtoplaylist">Add to Playlist</button></td></tr>')
	}
}

// Create the table after clicking the search button
$('#submit').on('click', function(){
	var userInput = $('#search').val();
	$('#search').val('')
	callAPI(userInput);
	$('#result').empty();
	$('#result').append('<thead><tr><th>Artwork</th><th>Title</th><th>Artist</th><th></th><th></th></tr></thead>');
	$('#playlist').empty();
	$('#playlist').append('<thead><tr><th>Artwork</th><th>Title</th><th>Artist</th><th></th><th></th><th></th><th></th></tr></thead>');
});


$(document).ready(function(){
	// Play the clicked song
	$(document).on('click', 'button.play-btn', function(){
		var url = $(this).attr('data-url');
		changeTrack(url);
	})

	// Add the clicked song to playlist
	$(document).on('click', 'button.addtoplaylist', function(){
		var addrow = $(this).parent().parent().clone().find('.addtoplaylist').remove().end();
		addrow.prependTo($('#playlist')).append('<td><button class="remove-btn">Remove from Playlist</button></td><td><button class="up">^</button></td><td><button class="down">v</button></td>');
	})

	// Move the clicked song up or down
	$(document).on('click', '.up,.down', function(){
		var row = $(this).parent().parent();
		if ($(this).is('.up')){
			row.insertBefore(row.prev());
		} else {
			row.insertAfter(row.next());
		}
	})

	// Remove the clicked song
	$(document).on('click', 'button.remove-btn', function(){
		$(this).parent().parent().remove();
	})
});