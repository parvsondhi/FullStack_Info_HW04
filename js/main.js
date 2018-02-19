// Event hander for calling the SoundCloud API using the user's search query
function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '200'},
		function(data) {
			parseQuery(data);
            // console.log(data);
		},'json'
	);
}

// 'Play' button event handler - play the track in the Stratus player
function changeTrack(url) {
	// Remove any existing instances of the Stratus player
	$('#stratus').remove();
	// Create a new Stratus player using the clicked song's permalink URL
	$('body').stratus({
      key: "b3179c0738764e846066975c2571aebb",
      auto_play: true,
      align: "bottom",
      links: url
    });
}

// upon first click of submit the search result and playlist columns are created
$(document).ready(
    $("#submitter").one('click', function() {
    	addColumns();
    }),
    // with every click of the submission button, the Soundcloud API is queried
    $("#submitter").on('click', function() {
    	$('#searchResults').empty();
    	var user_input = $('#searchbar').val();
    	callAPI(user_input);
    }));

// adding the CSS for columns into HTML
function addColumns() {
	$('#results').append('<div class="column" id="searchResultsContainer"><h1><b>Search Results</b></h1><div id = "searchResults"></div></div><div class="column" id="playlistContainer"><h1><b>Playlist</b></h1><div id = "playlist"></div></div>');
}

// parsing the results from the soundcloud API and injecting first 20 to HTML
function parseQuery(data) {
	var user_input = $('#searchbar').val();
	for (i = 0; i < 20; i++) {
		var cover = data[i].artwork_url;
		var userName = data[i].user.username;
		var playURL = data[i].permalink_url;
		var title = data[i].title;
        // var relatedTag = data[i].tag_list;
        // console.log(relatedTag.split("/"));
		var stringToAppend = '<div class = "card"><img class = "cover" src = "' + cover + '" alt= "Song Cover" onerror="imgError(this);"><div class = "information"><div class = "playURL">' + playURL + '</div><div class = "user">' + userName + '</div><div class = "title">' + title + '</div><button type="submit" class = "playSong"><div class = "buttonContainer"><img src = "img/whitePlay.png" alt="PlaySymbol">PLAY SONG</div></button><button type = "submit" class="addToPlaylist"><div class = "buttonContainer"><img src="img/whiteCross.png" alt="addIcon">ADD TO PLAYLIST</div></button></div></div>';
        $('#searchResults').append(stringToAppend);
        $('#searchbar').val('');
	}
}


// replace image if cover art not found
function imgError(image) {
    image.onerror = "";
    image.src = "img/noImgFound.png";
    return true;
}

// empty input field upon click
$(document).on('click', 'input', function() {
    $('#searchbar').val('');
});

// adds a song to the playlist
$(document).on('click', '.addToPlaylist', function() {
    var songToMove = $(this).parent().parent();
    // console.log(songToMove);

    var playURL = $(this).parent().children()[0].innerHTML;
    var user = $(this).parent().children()[1].innerHTML;
    var title = $(this).parent().children()[2].innerHTML;

    var newCard = '<div class = "card"><div class = "upAndDownContainer"><button class = "up"><img src="img/arrowUp.png" alt="UpArrow"></button><button class = "down"><img src="img/arrowDown.png" alt="DownArrow"></button></div><div class = "information"><div class = "playURL">' + playURL + '</div><div class = "user">' + user + '</div><div class = "title">' + title + '</div></div><div class = "buttons"><button type="submit" class = "playSong"><div class = "buttonContainer"><img src = "img/whitePlay.png" alt="PlaySymbol">PLAY SONG</div></button><button type = "submit" class="remove"><div class = "buttonContainer"><img src="img/minus.png" alt="minusIcon">REMOVE</div></button></div></div>';

    $("#playlist").append(newCard);
});


// // add related songs columns
// $(document).one('click', '.playSong', function() {
//     console.log('hello');
//     $("#playlistContainer").before('<div class="column" id="relatedSongsContainer"><h1><b>Related Songs</b></h1><div id = "relatedSongs"></div></div>');
// });



// plays a song
$(document).on('click', '.playSong', function() {
    if ($(this).parent().parent().parent()[0].id == "searchResults") {
        var playURL = $(this).parent().children()[0].innerHTML;
    }
    else {
        var playURL = $(this).parent().parent().children().children()[2].innerHTML;
    }
    changeTrack(playURL);

    });

// shifts song one position up in the playlist
$(document).on('click', '.up', function() {
    var thisCard = $(this).parent().parent();
    var previousSibling = $(this).parent().parent().prev();
    if (previousSibling.hasClass("card")) {
        console.log('true');
        previousSibling.before(thisCard);
    }
});

// shifts song one position down in the playlist
$(document).on('click', '.down', function() {
    var thisCard = $(this).parent().parent();
    var nextSibling = $(this).parent().parent().next();
    if (nextSibling.hasClass("card")) {
        nextSibling.after(thisCard);
    }
});

// removes a song from the playlist
$(document).on('click', '.remove', function() {
    var thisCard = $(this).parent().parent();
    thisCard.remove();
});
