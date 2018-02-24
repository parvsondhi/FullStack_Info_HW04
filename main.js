$(document).ready(
    $("#search-song-button").on('click', function() {
    	// When button is pressed, assign this value to user_input
        var user_input = $('#text-entry').val();
        callAPI(user_input);
    })
);

function variablestorage(data){
  // Since we only need 20 results, loop through the json for 20 entries
  for (i = 0; i < 20; i++) { 
    //assign each value to a variable 
    var title = data[i].title;
    var artist = data[i].user.username;
    var image = data[i].artwork_url;
    var permalink = data[i].permalink_url;

    // Create a div using the variables saved fromour json file
    $('#search-results').prepend("<div id ='song-selection'>" 
      + "<div id ='title'>" + title + "</div>" 
      + "<div id ='artist'><p>By: &nbsp;</p>" + artist + "</div>"
      
      + "<div id ='image'>" 
        + "<img src='" + image + "'/>" +
      "</div>"

      + "<button id='addtoplaylist'>Add to Playlist</button>" 
      + "<button id='playbutton' value=" + permalink + "> Play Song </button>" 
      
      + "</div>");  
    
    // When the user clicks the button, run changeTrack function with the value for the URL
    // This will play the correct song for each song-selection
    $("#playbutton").on('click', function() {
      // Takes the value of each playbutton id
      changeTrack($(this).val());
    });


    // When user clicks "add to playlist" button, the div will be cloned and removed
    $("#addtoplaylist").on('click', function() {
        var copy = $(this).parent().clone(true).appendTo("#playlist");

        // After cloning, remove the "add to playlist" button
        copy.find("#addtoplaylist").remove();
        // After cloning, add 3 new buttons
        copy.append("<button id='moveup'>Move Up</button>" 
          + "<button id='movedown'>Move Down</button>"
          + "<button id='remove'>Remove</button>");

        // When the user clicks on remove, song-selection will be deleted
        $("#remove").on('click', function() {
          $(this).parent().remove();   
        });

        // When the user clicks on moveup, insert the previous song selection
        // after the current location
        copy.find("#moveup").on('click', function(){
          var movecopy = $(this).parent();
          movecopy.prev().insertAfter(movecopy);
          console.log(movecopy.prev());

        });

        // When the user clicks on movedown, insert the next song selection
        // before the current location
        copy.find("#movedown").on('click', function(){
          var movecopy = $(this).parent();
          movecopy.next().insertBefore(movecopy);
        });
    });   
  };
}

// Event hander for calling the SoundCloud API using the user's search query
function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '200'},
		function(data) {
			console.log(data);
			// PUT IN YOUR CODE HERE TO PROCESS THE SOUNDCLOUD API'S RESPONSE OBJECT
			// HINT: CREATE A SEPARATE FUNCTION AND CALL IT HERE
      variablestorage(data);

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






