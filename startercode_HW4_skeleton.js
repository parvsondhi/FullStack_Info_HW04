// var search = [];
var search;

$(document).ready( function () {
    $("#new-item").on('click', function() {
        // once the document loads, create new item with this function
        var user_input = $('#todo-item-input').val();

        callAPI(user_input);
  	});
});

$("#search-results").on('click', '#add-to-playlist-track', function() {
	$('#playlist-results').prepend('<div class="row" id="playlist-row"></div>');
	var row = $(this).parent().parent().clone()
	row.find('a.add-to-playlist-track').replaceWith('<a id="remove-from-playlist-track" class="waves-effect waves-light btn">'+'— PLAYLIST'+'</a>');
	row.prependTo($('playlist-row'));
});

// Event hander for calling the SoundCloud API using the user's search query
function callAPI(query) {
	// function to create a loop that calls parseSoundCloudAPI

	// ————————————————————————
	// PERSONAL NOTES
	// $.get(URL,data,function(data,status,xhr),dataType)
	// URL= specifies URL you wish to request – https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb 
	// data= specifies data to send to the server along w request – {'q': query, 'limit': '200'} – basic query with 200 limit response
	// function= function(data){ ...  } – specifies a function to run if the request succeeds
	// dataType= specifies the data type expected of the server response, JSON returns a JS object
	// ————————————————————————

	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '200'},
		// this is the data returned
		function(data) {
			// PUT IN YOUR CODE HERE TO PROCESS THE SOUNDCLOUD API'S RESPONSE OBJECT
			// HINT: CREATE A SEPARATE FUNCTION AND CALL IT HERE
			console.log(data)
			search = data;
			for (i=0; i < 20; i++) {
				parseSoundCloudAPI(data[i]);
				
			}
			populatePage()
		},'json'
	);
}

function parseSoundCloudAPI (data) {
	// attributes for searched song are pushed to the global 'search' variable
	
	search.push({
		"title": data.title,
		"artwork":data.artwork_url,
		"artist":data.user.username,
		"link":data.permalink_url

	});
	if (data.artwork_url == null) {
		data.artwork_url = "https://vignette.wikia.nocookie.net/mlpfanart/images/6/6f/Soundcloud_logo.png/revision/latest?cb=20120804030609";
	}
	// populatePage();
}

function populatePage () {
	// populates the interface with appropriate divs
		for (i=0; i < 20; i++) {
			$('#search-results').prepend('<div class="row" id="search-row"></div>');
			$('#search-row').prepend('<div class="col s2"><a id="add-to-playlist-track" class="waves-effect waves-light btn">'+'+ PLAYLIST'+'</a></div>');
			$('#search-row').prepend('<div class="col s2"><a id="play-track" class="waves-effect waves-light btn" onclick="changeTrack('+i+');">' + 'PLAY' + '</a></div>');
			$('#search-row').prepend('<div class="col s2"><p>'+search[i].user.username+'</p></div>');
			$('#search-row').prepend('<div class="col s2"><p>'+search[i].title+'</p></div>');
			$('#search-row').prepend('<div id="search-track-img" class="col s2"><img id="search-track-img" src="'+search[i].artwork_url+'"/></div>');
		}
}



function addToPlaylist (element) {
	window.alert("ADD TO PLAYLIST!!!!");
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
      links: search[url].permalink_url
    });
}