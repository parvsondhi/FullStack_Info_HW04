$( "#search-form" ).submit(function( event ) {
	// console.log('submitted');
	// console.log($('#search-query').val());
	event.preventDefault();
	$("#results-list").empty();
	callAPI($('#search-query').val());
});

// play button functionality
$(document).unbind("click").on("click",".play-button", function() {
	// console.log($(this).attr("value"));
	changeTrack($(this).attr("value"));
});

// add to playlist button
$(document).on("click",".add-button", function() {
	// console.log("add this song to playlist!");
	// console.log($(this).attr("value"));
	// console.log($("#"+$(this).attr("value")).clone());
	$("#"+$(this).attr("value")).clone().prependTo("#playlist-list");
});

// remove from playlist button
$(document).on("click",".remove-button", function() {
	$(this).closest(".track").remove();
});

// move song up in playlist
$(document).on("click",".up-button", function() {
	$(this).closest(".track").insertBefore($(this).closest(".track").prev());
});

//move song down in playlist
$(document).on("click",".down-button", function() {
	$(this).closest(".track").insertAfter($(this).closest(".track").next());
});


var first20results;

// Event hander for calling the SoundCloud API using the user's search query
function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '200'},
		function(data) {
			// PUT IN YOUR CODE HERE TO PROCESS THE SOUNDCLOUD API'S RESPONSE OBJECT
			// console.log(data);
			// HINT: CREATE A SEPARATE FUNCTION AND CALL IT HERE
			first20results = data.slice(0, 20);
			// console.log(first20results);
			displayTracks(first20results);
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


// display the artwork, artist and title of each track with buttons
function displayTracks(data) { 
	$.each(data, function(index, value) {
		// console.log(index, value);
		if(value.artwork_url == null) {
			value.artwork_url = "default_artwork.png"
		}
		
		$("#results-list").append(
			`<div class="track" id="${value.id}">
				<div class="result-artwork">
				<img src="${value.artwork_url}">
				</div>
				<div class="result-artist">
				${value.user.username}
				</br>
				${value.title}</div>
				<div class="play-button-div">
				<button class="play-button" value="${value.permalink_url}" >Play</button>
				</div>
				<div class="add-remove-button-div">
				<button class="add-button" value="${value.id}">Add to Playlist</button>
				<button class="remove-button" value="${value.id}">Remove from Playlist</button>
				</div>
				<div class="up-and-down-button">
				<button class="up-button">^</button>
				<button class="down-button">v</button>
				</div>
			</div>`
		);
	})
}




