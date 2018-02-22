// A list of tracks for the playlist
var playlist;

// Event hander for calling the SoundCloud API using the user's search query
function callAPI(query) {
	console.log('Calling API with query: ' + query);
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		  {'q': query,
		   'limit': '20'},
		  function(data) {
		// PUT IN YOUR CODE HERE TO PROCESS THE SOUNDCLOUD API'S RESPONSE OBJECT
		// HINT: CREATE A SEPARATE FUNCTION AND CALL IT HERE
		resetTable('search-table');
		for (var i = 0; i < 20; i++) {
			$('#search-table > tbody').append(genTrackRow(data[i]));
		}
		if (data.length == 0) {
			$('#search-table-header').text('No Results found for: "' + query + '"');
		} else {
			$('#search-table-header').text('Search Results for: "' + query + '"');
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

// Resets a table's tbody
function resetTable(id) {
	$('#' + id + '> tbody').empty();
}

function addToPlaylist(track_obj) {
	if (track_obj == undefined) {
		return;
	}
	var artwork_url = track_obj['artwork_url'];
	
	// Default artwork photo
	if (artwork_url == null) {
		artwork_url = "https://i1.sndcdn.com/avatars-000131869186-my9qya-large.jpg"
	}
	var newDom = $('<tr>')
		.append($('<td>').append($('<img>').attr('src', artwork_url)))
		.append($('<td>').append($('<a>').attr({'href': track_obj['permalink_url'], 'target' :'_blank'}).text(track_obj['title'])))
		.append($('<td>').append($('<a>').attr({'href': track_obj['user']['permalink_url'], 'target': '_blank'}).text(track_obj['user']['username'])))
		.append($('<td>').append($('<button>').addClass('btn btn-default btn-play').attr('type', 'submit')
			.append($('<i>').addClass('fa fa-play')).click(function() {
				changeTrack(track_obj['permalink_url']);
			})))
		.append($('<td>').append($('<button>').addClass('btn btn-default btn-add').attr('type', 'submit')
			.append($('<i>').addClass('fa fa-trash-alt')).click(function() {
				this.closest('tr').remove();
			})))
		.append($('<td>').append($('<button>').addClass('btn btn-default btn-add').attr('type', 'submit')
			.append($('<i>').addClass('fa fa-chevron-up')).click(function() {
				var $cur_row = $(this).closest('tr');
				$cur_row.insertBefore($cur_row.prev('tr'));
			})))
		.append($('<td>').append($('<button>').addClass('btn btn-default btn-add').attr('type', 'submit')
			.append($('<i>').addClass('fa fa-chevron-down')).click(function() {
				var $cur_row = $(this).closest('tr');
				$cur_row.insertAfter($cur_row.next('tr'));
			})));
	
	$('#playlist-table > tbody').append(newDom);
}

// Generates a new row for the search table
function genTrackRow(track_obj) {
	if (track_obj == undefined) {
		return;
	}
	var artwork_url = track_obj['artwork_url'];
	
	// Default artwork photo
	if (artwork_url == null) {
		artwork_url = "https://i1.sndcdn.com/avatars-000131869186-my9qya-large.jpg"
	}
	
	// New table row
	var newDom = $('<tr>')
		.append($('<td>').append($('<img>').attr('src', artwork_url)))
		.append($('<td>').append($('<a>').attr({'href': track_obj['permalink_url'], 'target' :'_blank'}).text(track_obj['title'])))
		.append($('<td>').append($('<a>').attr({'href': track_obj['user']['permalink_url'], 'target': '_blank'}).text(track_obj['user']['username'])))
		.append($('<td>').append($('<button>').addClass('btn btn-default btn-play').attr('type', 'submit')
			.append($('<i>').addClass('fa fa-play')).click(function() {
				changeTrack(track_obj['permalink_url']);
			})))
		.append($('<td>').append($('<button>').addClass('btn btn-default btn-add').attr('type', 'submit')
			.append($('<i>').addClass('fa fa-plus')).click(function() {
				addToPlaylist(track_obj);
		})));
	return newDom;
}

$("#search-form").ready(function() {
	$("#search-form").submit(function(e) {
		e.preventDefault();
	});
});

$(document).ready(function() {
	$('#search-btn').click(function() {
		callAPI($('#search-text').val());
	});
});


