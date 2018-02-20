$(document).ready(function(){

	// $.stratus({
	//   auto_play: true,
	// 	key: "b3179c0738764e846066975c2571aebb",
	// 	links: "https://soundcloud.com/tycho/awake-com-truise-remix",
	// });
});

// Event Handler for Search Button
$("#new-item").on('click', function() {
	var input = $("#searchbar").val();
	callAPI(input);
});


// Event hander for calling the SoundCloud API using the user's search query
function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '200'},
		function(data) {
			console.log(data);
			parseScResponse(data);
		},'json'
	);
}

// Parses Soundcloud results object and displays results
	function parseScResponse(object) {

		// If value.artwork_url == 'null', use default SC icon

		$.each(object, function( index, value ) {
			$('#results').append("<tr>")
			$('#results').append("<td><img src=" + value.artwork_url + "></img></td>")
			$('#results').append("<td>" + value.title + "</td>")
			$('#results').append("<td><button class='btn play' value=" + value.permalink_url + " onclick='changeTrack(this.value)'>Play</button></td>")
			$('#results').append("</tr>")//permalink_url
		});
	}

// Test to see what the button sends
function testButton(url) {
	alert(url);
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

// Add Song to top of playlist
function addToPlaylist() {

}

// Remove Song from playlist
function removeFromPlaylist() {

}

 // Move song in playlist up in the queue
 function moveUp() {

 }

 // Move song in playlist down in the queue
 function moveDown() {

 }
