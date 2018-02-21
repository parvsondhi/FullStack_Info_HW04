// Event hander for calling the SoundCloud API using the user's search query
function callAPI(query, j = 0) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '200'},
		function(data, j) {
			
			// PUT IN YOUR CODE HERE TO PROCESS THE SOUNDCLOUD API'S RESPONSE OBJECT
			// HINT: CREATE A SEPARATE FUNCTION AND CALL IT HERE
			var results = data;
			for (i = 0; i < results.length && i <= 19; i++) { 
    			
    			// console.log( "Data Loaded: " + data[i].title + data[i].permalink_url);
    			$('#ResultsSect').find('table').append("<tr class='res'><td><img  class='pic' onerror=\"this.style.visibility='hidden'\"; src="+data[i].artwork_url+"></td><td class='title'><p>" + data[i].title + "</p></td><td class='artist'><p>"+ data[i].user.username +"</p></td><td><button class='play' value="+ data[i].permalink_url +">Play</button></td><td><button class='add'>Add to playlist</button></td></tr>");
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
      // My custom stratus.css hosted on dropbox
      // theme: "https://dl.dropbox.com/s/zke35uub03m6btd/stratus.css?dl=1",
      theme: "https://stratus.soundcloud.com/themes/dark.css",
      color: "red",
      links: url
    });
}

// Event handler for pressing "Enter" on search box
$("#search").on('keyup', function (e) {
    if (e.keyCode == 13) {
        
        $('.res').remove();

    	// once the document loads, create new item with this function
    	var user_input = $(this).val();
    
   		callAPI(user_input);

   		$(this).val('');
    }
});

// Event handler for clicking button of search box
$("#submit").on('click', function() {
    
	$('.res').remove();

    // once the document loads, create new item with this function
    var user_input = $(this).parent().find('#search').val();
    
    callAPI(user_input);

});

// Event handler for adding a song to my playlist
$(".main_sect").on( 'click', '.add', function(event) {

	console.log($(this).parents('tr:first').find('.title').html());    

	var title = $(this).parents('tr:first').find('.title').html();
	var artwork = $(this).parents('tr:first').find('.pic').attr('src');
	var permalink = $(this).parents('tr:first').find('.play').val();

	console.log(title);
	console.log(artwork);
	console.log(permalink);

	$('#PlaylistSect').find('table').append("<tr><td><img class='pic' onerror=\"this.style.visibility='hidden'\"; src="+artwork+"></td><td class='title'><p>" + title + "</p></td><td>Artist</td><td><button class='play' value="+ permalink +">Play</button></td><td><button class='up'>Up</button><button class='down'>Down</button></td></tr>");

});

// Event handler for playing a song with Stratus
$(".main_sect").on('click', ".play", function() {

	var link = $(this).val();
	
	console.log(link);

	changeTrack(link);

});

// Event handler for moving a song up in playlist
$(".main_sect").on('click', ".up", function() {

	var to_move = $(this).parents('tr:first').html();

	$(this).parents('tr:first').prev().before('<tr>'+to_move+'</tr>');

	$(this).parents('tr:first').remove();

});

// Event handler for moving a song down in playlist
$(".main_sect").on('click', ".down", function() {

	var to_move = $(this).parents('tr:first').html();

	$(this).parents('tr:first').next().after('<tr>'+to_move+'</tr>');

	$(this).parents('tr:first').remove();

});

// // Check if scrolled to bottom
$(window).scroll(function(){
	toScroll = $(document).height() - $(window).height() - 1;
	if ( $(this).scrollTop() > toScroll ) {
		// Do something
		alert($('#ResultsSect').find('tr').size()-1);
		



	}
});
