// Playlist Functionality
$("#songs").on('click', ".playlist", function() {
	var row = $(this).parent().parent().clone()
	row.append("<td><button class='up'>∧</button></td> <td><button class='down'>∨</button></td>");
    $("#playlist").prepend(row);
});

$("#playlist").on('click', ".playlist", function() {
	var row = $(this).parent().parent().remove()
});


$("#playlist").on('click', ".up", function() {
	var row = $(this).parent().parent()
	row.insertBefore(row.prev())
});

$("#playlist").on('click', ".down", function() {
	var row = $(this).parent().parent()
	console.log(row.next())
	row.insertAfter(row.next())
});


// Search Functionality
$(document).ready(
    $("#search").on('click', function() {
    // once the document loads, create new item with this function
    var user_input = $('#search-input').val();
    // alert(user_input);
    callAPI(user_input);
	})
);


// Event hander for calling the SoundCloud API using the user's search query
function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '200'},
		function(data) {
			// PUT IN YOUR CODE HERE TO PROCESS THE SOUNDCLOUD API'S RESPONSE OBJECT
			// HINT: CREATE A SEPARATE FUNCTION AND CALL IT HERE
			processResponse(data);
		},'json'
	);
}

function processResponse(data){
	for (var i = 20; i >= 0; i--) {
		var arturl = data[i]['artwork_url'];
		var title = data[i]['title'];
		var artist = data[i]['user']['username'];
		var permalink = data[i]['permalink_url'];
		$('#results').append("<tr><td> <img src='" +arturl +"'></td> <td>" + title + "</td><td>"+ artist +"</td><td><button class='play' value='"+ permalink +"'>Play</button></td><td><button class='playlist'>Add/Remove Playlist</button></td></tr>");
	}
}

// Play Functionality
$("div").on('click', ".play", function() {
    changeTrack($(this).val());
});

// want to know how to attach on click method handler w/o child selector
//  $(".play").click(function(){
//     console.log("i'm in here");
//     });

// $(".play").on('click', function() {
//     console.log($(this).val());
//     console.log("in hereee");
//     // changeTrack();
// });

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


