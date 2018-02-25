

// Event hander for calling the SoundCloud API using the user's search query
function callAPI(query) {
  	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
    {'q': query,
    'limit': '200'},
        function(data) {
          getResults(data);
        }
        );
}

// Function to PROCESS THE SOUNDCLOUD API'S RESPONSE OBJECT based on the user's search
function getResults(data) {
	for (i = 1; i < 20; i++) {
		$('#search-results').append("<div id='song'>"
			  + "<button class='add-button'>Add</button><br> "
			  + "<div id='song-title'>"
			  + data[i].title
			  + "</div><br>"
			  + "<div id='artwork-parent'><img id='artwork' src="
			  + data[i].artwork_url 
			  + "></div>"
			  + "<div id='plink'>" 
			  + data[i].permalink_url 
			  + "<button class='play-button'>Play</button>"
			  + "</div>" 
			  + "</div>");
	}
}

// Function to clear Results
function clearResults() {
	$('#search-results').html("");
}

// When the search button is clicked, clear the existing results and display new results
$(document).on('click', '#search-button', function() {
	clearResults();
	callAPI($('#search-input').val());
});

// When the add button is clicked, add this song to the top of the playlist
$(document).on('click', ".add-button", function() {
	$.clone(this);
	$(this).after("<button class='move-up-button'>Move Up</button><button class='move-down-button'>Move Down</button>");
	$(this).html("Remove").removeClass("add-button").addClass("remove-button");
	var song_to_add = $(this).parent();
	song_to_add.clone().prependTo("#playlist");

	//change back to the original song format for the search result column
	$(this).html("Add").removeClass("remove-button").addClass("add-button");
	$("#search-results .move-up-button" ).remove();
	$("#search-results .move-down-button" ).remove();
});

// When the "play" button is clicked, play the song
$(document).on('click', ".play-button", function() {
	var newurl = $(this).parent().closest('#plink').text().slice(0,-4);
	changeTrack(newurl);
});

// When the "move up" button is clicked, move it up in the playlist
$(document).on('click', ".move-up-button", function() {
	$(this).parent().insertBefore($(this).parent().prev());
});

// When the "move down" button is clicked, move it down in the playlist
$(document).on('click', ".move-down-button", function() {
	$(this).parent().insertAfter($(this).parent().next());
});

// When the "remove" button is clicked, remove the song
$(document).on('click', ".remove-button", function() {
	$(this).parent().remove()
});

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

