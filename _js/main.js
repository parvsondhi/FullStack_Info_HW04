$(document).ready(
    $("#search").on('click', function() { // search for query when the user clicks search
    	var query = $('#input-search').val(); // get the value of the search field
    	callAPI(query); // call api on the value that the user inputted
    })
);

// create HTML for song results
function renderSearchResults(result) {

	var title = result.title;
	var artwork = result.artwork_url;
	if (artwork == null) { // is there no artwork? then use placeholder
		artwork = '_assets/placeholder.png';
	}
	var artist = result.user.username;
	if (artist == null) { // is there no artist? then use NA
		artist = 'N/A';
	}
	var permalink = result.permalink_url;

	var html = [
		'<div id="query-result">',
			'<div id="artwork"><img class="artwork" src="' + artwork + '">', '</div>',
			'<div id="info"><strong>' + title + '</strong> <br> by ' + artist + '</div>',
			'<div id="buttons"><button id="play">Play</button>',
			'<button id="addtoplaylist">Add to Playlist</button></div>',
		'</div>',
	]

	$('#results').prepend(html.join('')); // add all the html to the results div

	$("#play").on('click', function() { // search for query when the user clicks search
		changeTrack(permalink); // change track based on song selected
	});

	$("#addtoplaylist").on('click', function() { // add selected song to playlist on click
		var clone = $(this).parent().parent().clone(true, true); // deep clone the selected song
		clone.find("#addtoplaylist").remove(); 
		clone.find('#buttons').append("<button id='removefromplaylist'>Remove from Playlist</button></div>");
		clone.find('#buttons').append("<button id='moveup'>Move Up</button></div>");
		clone.find('#buttons').append("<button id='movedown'>Move Down</button></div>");
		clone.show().appendTo("#playlist");// append cloned item to playlist div

		clone.find("#removefromplaylist").on("click", function() { // remove from playlist
            $(this).parent().parent().remove();
            event.preventDefault();
        });

        clone.find("#moveup").on("click", function() { // move up on playlist
        	var e =  $(this).parent().parent();
            e.prev().insertAfter(e);
        });

        clone.find("#movedown").on("click", function() { // move down on playlist
        	var e =  $(this).parent().parent();
            e.next().insertBefore(e);
        });      
	});
}

// Event hander for calling the SoundCloud API using the user's search query
function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '20'},
		function(data) {
			// PUT IN YOUR CODE HERE TO PROCESS THE SOUNDCLOUD API'S RESPONSE OBJECT
			// HINT: CREATE A SEPARATE FUNCTION AND CALL IT HERE
			var html = []
			for (var results of data) {
				html.push(renderSearchResults(results))
			}
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