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
			parseScResponse(data);
		},'json'
	);
}

// Parses Soundcloud results object and displays results
	function parseScResponse(object) {

		// Clear table
		$('#results_tbl tr').remove();

		$.each(object, function( index, value ) {

			// If value.artwork_url == 'null', use default SC icon
			if (value.artwork_url == null) {
				var picture = 'soundcloud-icon-100x100.png';
				console.log('no picture');
			} else {
				var picture = value.artwork_url;
			}

			// Build table row
			$('#results_tbl').append("<tr><td><img src=" + picture + "></img></td><td>" +
			value.title + "</td><td><button class='btn play' value=" + value.permalink_url +
			" onclick='changeTrack(this.value)'>Play</td><td></button><button class='btn queue' id='queue'>Add/Remove</button></td></tr>")

		});
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
$("#results").on('click','#queue', function() {
	var clone = $(this).parents( "tr" ).clone()// $(this).html("remove");
	clone.append("<td><button class='btn up'>up</button></td>");
	clone.append("<td><button class='btn down'>down</button></td>");
	clone.prependTo("#playlist_tbl");
	// $("#playlist_tbl").prepend(song);
});

// Remove Song from playlist
$("#playlist").on('click','#queue', function() {
	$(this).parents( "tr" ).remove();
});

// Move song up or down in playlist order
$("#playlist").on('click','.up,.down', function() {
	var row = $(this).parents("tr:first");
	if ($(this).is(".up")) {
						// alert('up');
						row.insertBefore(row.prev());
        } else {
						// alert('down');
            row.insertAfter(row.next());
        }
});
