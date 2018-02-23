$( document ).ready(function() {


$("#submit").click( function() {
      console.log("Submit button was clicked!");
      callAPI(getInput());

    });

function getInput() {
	return $('#query').val();
}

// Event handler for calling the SoundCloud API using the user's search query
function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '200'},
		function(data) {
			console.log("Call API was called!");
			processData(data);
		},'json'
	);
}

// This function will go through the data object and take out the album cover, title, artists name and url (for playing)
function processData(data){
	//Clears the table after each submit for a new artists search.
	$('#bands').empty();

	// The for loop goes through 20 tracks in the soundcloud API & grabs the title, artist name, album cover, and the permalink in
	// order to play the song. It adds to each table using append.
	for (var i = 20; i >= 0; i--) {
		var title = data[i]['title'];
		var artist_name = data[i]['user']['username'];
		var artwork = data[i]['artwork_url'];
		if (artwork == null) {
			artwork = 'img/404-not-found-error.png'
		}
		var music_link = data[i]['permalink_url'];

		$('#bands').append("<tr><td> <img src='" + artwork +"'></td><td>" + title + "</td><td>"+ artist_name +"</td><td><button class='play-button' value='"+ music_link +"'>Play</button></td><td><button class='add-playlist'>Add To Playlist</button></td></tr>");
	}

}

// Play the song when clicking the play button
$(document).on('click', '.play-button', function() {
	var url = $(this).attr('value');
	changeTrack(url);
})

// 'Play' button event handler - play the track in the Stratus player
function changeTrack(url) {
	// Remove any existing instances of the Stratus player
	$('#stratus').remove();

	// Create a new Stratus player using the clicked song's music_link URL
	$.stratus({
      key: "b3179c0738764e846066975c2571aebb",
      auto_play: true,
      align: "bottom",
      links: url
    });
}


//This func will add a song to the playlist table, and remove the add to playlist button and add the 'UP', "DOWN", & "REMOVE" BUTTONS.
$(function() {
    $(document).on('click', '.add-playlist', function(){
    	console.log("I am in the add to playlist function!");
        var $tr = $(this).parents('tr').clone().find('.add-playlist').remove().end();
        $tr.appendTo($('#my-bands')).append("<td><button class= 'remove-from-playlist'> Remove </button></td> <td><button class= 'up-button'> Move UP </button></td><td><button class= 'down-button'> Move DOWN </button></td>");
        

        // This func will trigger the delet button and remove once song at a time.
        $('button.remove-from-playlist').click(function(){
            $(this).parents('tr').remove();
        });
    });
});

 //Moves the songs up and down in the playlist.
$(document).on('click', ".up-button , .down-button", function(){
    var row = $(this).parents("tr");
    if ($(this).is(".up")) {
        row.insertBefore(row.prev());
    } else {
        row.insertAfter(row.next());
    }
});


// Removing song from playlist
$(document).on('click', '.remove-from-playlist', function() {
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




})
