// var search = [];
var search;

$(document).ready( function () {
    $("#new-item").on('click', function() {
        // once the document loads, create new item with this function
        var user_input = $('#todo-item-input').val();

        callAPI(user_input);
  	});
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
		function(data) {
			// PUT IN YOUR CODE HERE TO PROCESS THE SOUNDCLOUD API'S RESPONSE OBJECT
			// HINT: CREATE A SEPARATE FUNCTION AND CALL IT HERE
			search = data;
			// for (i=0; i < 20; i++) {
				populatePage()
				// parseSoundCloudAPI(data);
			// }
		},'json'
	);
}

function parseSoundCloudAPI (data) {
	// attributes for searched song are pushed to the global 'search' variable
	search.push({
		"title": data[i].title,
		"artwork":data[i].artwork_url,
		"artist":data[i].user.username,
		"link":data[i].permalink_url
	});

	if (search[i].artwork == null) {
		search[i].artwork = "https://vignette.wikia.nocookie.net/mlpfanart/images/6/6f/Soundcloud_logo.png/revision/latest?cb=20120804030609"
	}
	populatePage();
}

function populatePage () {
	// populates the interface with appropriate divs
		for (i=0; i < 20; i++) {
		$('#search-results').prepend('<div class="row" id="search-row-'+i+'"></div>');
		$('#search-row-'+i).prepend('<div class="col s2"><a id="add-to-playlist-track" class="waves-effect waves-light btn" onclick="addToPlaylist(this);">'+'ADD TO PLAYLIST'+'</a></div>');
		$('#search-row-'+i).prepend('<div class="col s2"><a id="play-track" class="waves-effect waves-light btn" onclick="changeTrack('+search[i].permalink_url+');">PLAY</a></div>');
		$('#search-row-'+i).prepend('<div class="col s2"><p>'+search[i].user.username+'</p></div>');
		$('#search-row-'+i).prepend('<div class="col s2"><p>'+search[i].title+'</p></div>');
		$('#search-row-'+i).prepend('<div id="search-track-img" class="col s2"><img id="search-track-img" src="'+search[i].artwork_url+'"/></div>');
		
}
}

// $('#search-results').on('click','#play-track', function(){
	
// 	var song = $(this).html();
// 	alert(song);
// 	// changeTrack('https://soundcloud.com/prfftt/blink-182-adams-song-prfftt');
// });


// function play (element) {
// 	alert(element);
// 	changeTrack(element);
// }

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
      links: url
    });
    alert("changeTrack worked");
}




// // Event hander for calling the SoundCloud API using the user's search query
// function callAPI(query) {
// 	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
// 		{'q': query,
// 		'limit': '200'},
// 		function(data) {
// 			// PUT IN YOUR CODE HERE TO PROCESS THE SOUNDCLOUD API'S RESPONSE OBJECT
// 			// HINT: CREATE A SEPARATE FUNCTION AND CALL IT HERE
// 		},'json'
// 	);
// }

// // 'Play' button event handler - play the track in the Stratus player
// function changeTrack(url) {
// 	// Remove any existing instances of the Stratus player
// 	$('#stratus').remove();

// 	// Create a new Stratus player using the clicked song's permalink URL
// 	$.stratus({
//       key: "b3179c0738764e846066975c2571aebb",
//       auto_play: true,
//       align: "bottom",
//       links: url
//     });
// }


