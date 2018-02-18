// Event hander for calling the SoundCloud API using the user's search query
function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '200'},
		function(data) {
			// PUT IN YOUR CODE HERE TO PROCESS THE SOUNDCLOUD API'S RESPONSE OBJECT
			// HINT: CREATE A SEPARATE FUNCTION AND CALL IT HERE
		},'json'
	);
}

// Parses Soundcloud results object and displays results
	function parseScResponse(object) {

		//for i in object:
			//insert <tr> in #results table

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

 // Move song in playlist up in the queue
 function moveUp() {
	 
 }

 // Move song in playlist down in the queue
 function moveDown() {

 }
 // Add Song to top of playlist
 function addToPlaylist() {

 }
 // Remove Song from playlist
 function removeFromPlaylist() {

 }
