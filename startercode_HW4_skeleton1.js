

// Event hander for calling the SoundCloud API using the user's search query
$("#search").on('click', function callAPI(query) {
	var user_search_term = $("#search-term").val();	
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb" + "&q=" + user_search_term,
		// {'q': query,
		// 'limit': '200'},
		function(data) {
			// PUT IN YOUR CODE HERE TO PROCESS THE SOUNDCLOUD API'S RESPONSE OBJECT
			// HINT: CREATE A SEPARATE FUNCTION AND CALL IT HERE
// for (i=0; i<21; i++){
// $("#results-list").append("<div class = song-list>" + "<img class= artwork-url src="+data[i].artwork_url+">" + "<div class=title>" + data[i].title + "</div>" + data[i].user.username + "<button class=play-button> Play </button>" + "<button > Add </button>" + "<div class=permalink>" + data[i].permalink_url + "</div>" + "</div>");	
$("#results-list").append("<div class = song-list>" + "<img class= artwork-url src="+data[0].artwork_url+">" + "<div class=title>" + data[0].title + "</div>" + data[0].user.username + " <button class=play-button> Play </button>" + "<button class = add-to-playlist> Add </button>" + "<div class=permalink>" + data[0].permalink_url + "</div>" + "</div>");	
// $("#results-list").append("<div class = song-list>" + "<img class= artwork-url src="+data[1].artwork_url+">" + "<div class=title>" + data[1].title + "</div>" + data[1].user.username + "<button class=play-button> Play </button>" + "<button class = add-to-playlist> Add </button>" + "<div class=permalink>" + data[1].permalink_url + "</div>" + "</div>");
// $("#results-list").append("<div class = song-list>" + "<img class= artwork-url src="+data[].artwork_url+">" + "<div class=title>" + data[2].title + "</div>" + data[2].user.username + "<button class=play-button> Play </button>" + "<button > Add </button>" + "<div class=permalink>" + data[2].permalink_url + "</div>" + "</div>");				
		// }
	},'json'
	);
});

// 'Play' button event handler - play the track in the Stratus player
$("#results-list").on('click', ".play-button", function changeTrack(url) {
	var song_url = $(".permalink").text();
	// Remove any existing instances of the Stratus player
	$('#stratus').remove();

	// Create a new Stratus player using the clicked song's permalink URL
	$.stratus({
      key: "b3179c0738764e846066975c2571aebb",
      auto_play: true,
      align: "bottom",
      links: song_url
    });
});

$("#results-list").on('click', ".add-to-playlist", function() {
        var completedItem = $(this).parent();
        console.log($(this).parent());
        $("#playlist").append(completedItem);
        console.log($("#playlist").prepend(completedItem));

});

// $("#list_todo").on('click', "button", function() {
//         // move from list_todo container to list_completed container
//         $(this).find("i").html("replay");


//         var completedItem = $(this).parent();
//         $("#list_doing").prepend(completedItem);
// });