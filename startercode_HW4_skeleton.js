// User input in search bar is captured to be used for query
$("#search_button").on('click', function() {
	var user_input = $('#input').val();
	console.log(user_input);
	callAPI(user_input);
})

// Event hander for calling the SoundCloud API using the user's search query
function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{	'q': query,
		'limit': '200'},
		function(data) {
			console.log(data);
			displayresults(data); // Calls function to display search results
		},'json'
	);
}

// Function to display search results
function displayresults(results) {
	var tmp = '';
	var items = [];
	for (var i = 0; i < 20; i++) {
		var img = results[i].artwork_url; 
		if (img == null) // Exception handling for artworks with null value
			{
				img = "https://i1.sndcdn.com/avatars-000131869186-my9qya-t500x500.jpg";
				img.height = '100px';
				img.width = '100px';
			}
		var track = results[i].permalink_url;
		//console.log(track);
		$("#table-search").find('tbody').append( "<tr><td><img src= " + img + "></td>" + "<td>"+ results[i].title + "</td>"+ "<td>"+ results[i].user.username + "</td>" + "<td><button class='play' id='play_id' value=" + track+ "> PLAY </button></td>" + "<td><button class ='addlist'> ADD </button></tr></td>");

	};

	//Play track from search results
	$(".play").on('click', function() {
		var value=$(this).attr("value");
		console.log(value);
		changeTrack(value);
	});


	// Add to playlist
	$('.addlist').on('click', function() {
		//alert("click");
		var row = $(this).closest('tr').clone().append("<td><button class='removelist'>REMOVE</button></td>" + "<td><button class ='move_up'> UP </button>" +"<td><button class ='move_down'> DOWN </button>");
		items.push(row);
		row.prependTo($("#playlist_table"));
		$('#playlist_table td:nth-child(5)').hide();

		// Remove from playlist
		$('.removelist').on('click', function() {
			$(this).closest('tr').remove();
		});

		// Move track above previous track in playlist
		$('.move_up').on('click', function() {
			//alert("click");
			var $current = $(this).closest('tr');
			var $previous = $current.prev('tr');
			$current.insertBefore($previous);
		});

		// Move track below next track in playlist
		$('.move_down').on('click', function() {
			//alert("click");
			var $current = $(this).closest('tr');
			var $previous = $current.next('tr');
			$current.insertAfter($previous);
		});

		// Play track from playlist
		$(".play").on('click', function() {
			var value=$(this).attr("value");
			console.log(value);
			changeTrack(value);
		});
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


