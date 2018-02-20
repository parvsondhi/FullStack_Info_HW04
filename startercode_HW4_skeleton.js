// Event hander for calling the SoundCloud API using the user's search query
function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '20'},
		function(data) {
			
			// PUT IN YOUR CODE HERE TO PROCESS THE SOUNDCLOUD API'S RESPONSE OBJECT
			// HINT: CREATE A SEPARATE FUNCTION AND CALL IT HERE

			for (i = 0; i < data.length; i++) { 
    			
    			// console.log( "Data Loaded: " + data[i].title + data[i].permalink_url);
    			$('#ResultsSect').find('table').append("<tr class='res'><td><img  class='pic' src="+data[i].artwork_url+"></td><td class='title'>" + data[i].title + "</td><td class='artist'>Artist</td><td><button class='play' value="+ data[i].permalink_url +">Play</button></td><td><button class='add'>Add to playlist</button></td></tr>");
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




$("#submit").on('click', function() {
    
	$('.res').remove();

    console.log('hop');
    // once the document loads, create new item with this function
    var user_input = $(this).parent().find('#search').val();
    
    console.log(user_input);
    
    callAPI(user_input);

});

$(".main_sect").on( 'click', '.add', function(event) {

	console.log($(this).parents('tr:first').find('.title').html());    

	var title = $(this).parents('tr:first').find('.title').html();
	var artwork = $(this).parents('tr:first').find('.pic').attr('src');
	var permalink = $(this).parents('tr:first').find('.play').val();

	console.log(title);
	console.log(artwork);
	console.log(permalink);

	$('#PlaylistSect').find('table').append("<tr><td><img class='pic' src="+artwork+"></td><td class='title'>" + title + "</td><td>Artist</td><td><button class='play' value="+ permalink +">Play</button></td><td><button class='up'>Up</button><button class='down'>Down</button></td></tr>");

});


$(".main_sect").on('click', ".play", function() {

	var link = $(this).val();
	
	console.log(link);

	changeTrack(link);

});

