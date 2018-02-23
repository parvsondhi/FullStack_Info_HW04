// Event hander for calling the SoundCloud API using the user's search query
function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '20'},
		function(data) {
			console.log(data);
			for (i = 0; i < data.length; i++) { 
				// console.log(data[i]);
				
				if (data[i]['artwork_url'] == null) {
    				var artwork = "soundcloud-icon-vector-logo.jpg";
    			} else {
    				var artwork = data[i]['artwork_url'];	
    			};

				var title = data[i]['title'];
				var artist = data[i]['user']['username'];
				var song = data[i]['permalink_url'];

				$('#search_table').append("<tr> <td class='artwork_col'> <img class='picture' src="+artwork+"></img> </td> <td class='title_col'>"+title+"</td> <td class='artist_col'>"+artist+"</td> <td class='play_col'> <a class='song_link' src="+song+"><button class='play_button'> Play</button></a></td> <td class='addtoplay_col'> <button class='addtoplay_button'> Add to Playlist </button> </td> </tr>");
				
			};
			
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
};


// product search results
$("#search_button").on('click', function() {
	$('#search_table tbody').remove();
	var user_input = $("#search_box").val();
	callAPI(user_input);
});


// move to playlist
$("#search_table").on('click', '.addtoplay_button', function() {
	var title = $(this).closest('tr').find('.title_col').text();
	var artist = $(this).closest('tr').find('.artist_col').text();
	var artwork = $(this).closest('tr').find('.artwork_col img').attr('src');
	var song = $(this).closest('tr').find('.play_col a').attr('src');
	var tr = $(this).closest("tr").clone();
	$('#playlist_table').append("<tr> <td class='artwork_col'> <img class='picture' src="+artwork+"></img> </td> <td class='title_col'>"+title+"</td> <td class='artist_col'>"+artist+"</td> <td class='play_col'> <a class='song_link' src="+song+"><button class='play_button'> Play</button></a></td> <td class='remove_col'> <button class='remove_button'> Remove </button> </td> <td class='up_col'> <button class='up_button'> ^ </button> </td> <td class='down_col'> <button class='down_button'> v </button> </td> </tr>");

});

// play song
$("#search_table,#playlist_table").on('click', '.play_button', function(){
    var link = $(this).closest('tr').find('.play_col a').attr('src');
    changeTrack(link);
});

// move up
$("#playlist_table").on('click', '.up_button', function(){
    var row = $(this).parents("tr:first");	
    row.insertBefore(row.prev());

});

// move down
$("#playlist_table").on('click', '.down_button', function(){
    var row = $(this).parents("tr:first");	
    row.insertAfter(row.next());

});

// remove
$("#playlist_table").on('click', '.remove_button', function(){
    var tr = $(this).closest("tr").remove().clone();

});

