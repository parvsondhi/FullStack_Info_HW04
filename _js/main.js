// Event hander for calling the SoundCloud API using the user's search query
function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '200'},
		function(data) {
			// PUT IN YOUR CODE HERE TO PROCESS THE SOUNDCLOUD API'S RESPONSE OBJECT
      //console.log(data);
      var max_length = 20;

      // the length of array is either 20 or the max length of the data array.
      if (data.length<max_length){
        max_length = data.length;
      }

      for(var i=max_length; i>0; i--){
        var artwork_url = data[i].artwork_url;
        if(artwork_url == null){
          artwork_url = "https://www.hscripts.com/freeimages/logos/academic-institution-logos/california-university/california-university-256.gif"
        }
        $('#list_result').prepend('<tr> <td><img src=\''+ artwork_url +'\'></td> <td>'+ data[i].title +'</td> <td>'+ data[i].user.username +'</td> <td><button class=\'play_button\' data-url=\''+ data[i].permalink_url +'\'>Play</button></td> <td><button class=\'add_button\'>Add to Playlist</button></td> </tr>');

        // end of table
        if(i==1){
          $('#list_result').prepend("<tr> <th>Artwork</th> <th>Title</th> <th>Artist</th> <th></th> <th></th> </tr>");
        }

      } // end of for

      // remove button function in the result-list
      $(".add_button").on('click', function() {
          var completedItem = $(this).parent().parent();
          var addrow = completedItem.clone().find('.add_button').remove().end();
          addrow.prependTo($('#list_playlist')).append('<td><button class="remove_button">Remove from Playlist</button></td><td><button class="up_button">^</button></td><td><button class="down_button">v</button></td>');

          // remove button function in the playlist
          $(".remove_button").on('click', function() {
            $(this).parent().parent().remove();
          });

          // play button function in the playlist
          $(".play_button").on('click', function() {
            var url = $(this).attr('data-url');
            changeTrack(url);
          });

          // up button function in the playlist
          $(".up_button").on('click', function() {
            var currentItem = $(this).parent().parent();
            var prevItem = currentItem.prev();
            currentItem.insertBefore(prevItem);
          });

          // down button function in the playlist
          $(".down_button").on('click', function() {
            var currentItem = $(this).parent().parent();
            var nextItem = currentItem.next();
            currentItem.insertAfter(nextItem);
          });

      });

      // play button function in the result-list
      $(".play_button").on('click', function() {
          var url = $(this).attr('data-url');
          changeTrack(url);
      });

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

// html catch event when user is typing into a text input
$(document).ready(
    $("#new-item").on('click', function() {
      // once the document loads, create new item with this function
      var user_input = $('#search-item-input').val();
      console.log(user_input);
      callAPI(user_input);
    })
);
