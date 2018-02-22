// Event hander for calling the SoundCloud API using the user's search query
function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '200'},
		function(data) {
			// PUT IN YOUR CODE HERE TO PROCESS THE SOUNDCLOUD API'S RESPONSE OBJECT
			// HINT: CREATE A SEPARATE FUNCTION AND CALL IT HERE
			songData(data);
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


$(document).ready(
	$("#search_button").on('click',function(){
		var user_input = $("#search_song").val();
		callAPI(user_input);
	})
);

// QUERYING SOUNDCLOUD’S API
function songData(data){
	var user_input = $("#search_song").val();

	for(i =0;i<=20;i++){
		var artwork = data[i].artwork_url;
		var title = data[i].title;
		var artist = data[i].user.username;
		var url = data[i].permalink_url;
		var newImg = document.createElement("img");
		imgSrc = artwork;
		if(artwork == null){
			imgSrc = "asset/Soundcloud-icon.jpg"
		};
		newImg.setAttribute("src", imgSrc);

		var songList = '<div id = "search_result_container"><div class = "song_info" id = "artwork_info"><img src = "' + imgSrc + '"></div><div class = "song_info" id = "title">'+title+'</div><div class = "song_info" id = "artist">'+artist+'</div><div class = "song_info" id = "play"><div id= "url">'+url+'</div><button id = "play_button">play</button></div><div class = "song_info" id = "add_to"><button id = "add_to_button">Add to Play List</button></div></div>';
		$("#search_result").append(songList);
	}
}

// PLAYING SONGS VIA THE STRATUS PLUGIN
$(document).ready(
$(document).on('click',"#play_button", function(){
	var play_url = $(this).parent().children()[0].innerHTML;
	changeTrack(play_url);

})
);

// CREATING A PLAYLIST
$(document).ready(
$(document).on('click',"#add_to_button", function(){
	var add_item = $(this).parent().parent().clone();
	add_item.find("#add_to").remove();
	add_item.append('<div class = "song_info" id = "remove_section"><button id = "remove_button">Remove</button></div><div class = "song_info" id= "up_section"><button id="up_button">^</button></div><div class= "song_info id= "down_section"><button id = down_button>v</button></div>');
	$("#play_list").prepend(add_item);
})
);

// User can remove songs from the playlist
$(document).ready(
$(document).on('click',"#remove_button", function(){
	var remove_item = $(this).parents("#search_result_container");
	remove_item.remove();
})
);

// User can move songs up or down in the playlist one spot at a time
$(document).on('click',"#up_button", function(){
	$(this).parents("#search_result_container").insertBefore($(this).parents("#search_result_container").prev());
})

$(document).on('click',"#down_button", function(){
	$(this).parents("#search_result_container").insertAfter($(this).parents("#search_result_container").next());
})


