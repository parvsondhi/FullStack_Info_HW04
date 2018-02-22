
function addSong(artwork, title, url, artist) {
	$('#search').append('<tr> <td> <img id="artwork" src="' + artwork + '"></td> <td id="title">' + title +
		'</td> <td id="artist">' + artist + '</td><td><button class="playButton" data-url="' + url +
		'">Play</button></td><td><button class="playlistButton"> Add to Playlist </button></td></tr>');
}

function resetTable(id) {
	$('#'+ id).empty();
}

// Event hander for calling the SoundCloud API using the user's search query
function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '20'},
		function(data) {

			resetTable('searchBody')
			$.each(data, function(i, v) {
				var artwork = '_css/artwork.jpg'
				if (v.artwork_url != null){
					artwork = v.artwork_url;
				} 
				var title = v.title;
				var artist = v.artist;
				var artist = v.user.username;
				var url = v.permalink_url;
				addSong(artwork, title, url, artist);
				// console.log(data);
			});
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

$('#searchButton').on('click', function() {
	var input = $('searchBox').val();

	$('searchBox').val('');
	callAPI(input)
});

$(function() {
    $(document).on('click', 'button.playlistButton', function(){
         
        var $tr = $(this).parents('tr').clone().find('.playlistButton').remove().end();
        $tr.prependTo($('#playlistBody')).append("<td><button class= 'deleteButton'> Remove From Playlist </button></td> <td><button class= 'up'> ^ </button></td><td><button class= 'down'> v </button></td>");
        $('#playlist.playlistButton').css('display', 'none');
         
        $('button.deleteButton').click(function(){
            $(this).parents('tr').remove();
        });
    });
});

 
$(document).on('click', ".up,.down", function(){
    var row = $(this).parents("tr");
    if ($(this).is(".up")) {
        row.insertBefore(row.prev());
    } else {
        row.insertAfter(row.next());
    }
});

// PLAY STRATUS FUNCTIONALITY
$(function() {
    $(document).on('click', 'button.playButton', function(){
         
        var url = $(this).attr("data-url")
        changeTrack(url)
    });
});