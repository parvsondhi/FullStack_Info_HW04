$(document).ready(function(){
	page_start();
});

var searchResults = [];
var playlist = [];

function page_start() {
  $('#search-button').on('click', searchResultsButtonPressed);
}

function searchResultsButtonPressed() {
  console.log ('buttonPressed');
  //first, fetch user input
  var searchString = $('#search-input').val();
  //pass user input to callAPI function
  callAPI(searchString);

}

function saveResults(data) {
  searchResults = data.slice(0,20);
}

function generateResultHTML(result) {

  var id = result.id;
  var artist_name = result.user.username;
  var song_name = result.title;
  var image_url = result.artwork_url;

  if (!image_url) {
    // TODO: add placeholder image url
    image_url = 'https://blog.hypem.com/images/artwork_unavail_bruce.png';
  }

  var template = [
    '<div id="r-', id, '"class="song-result" style="background-color: white; padding: 20px;">',
      '<div class="">',
        '<img src="', image_url,'" alt="">',
      '</div>',
      '<div class="">',
        '<p> <strong>Title: </strong>', song_name, '</p>',
        '<p> <strong>Artist: </strong>', artist_name,'</p>',
      '</div>',
      '<div class="">',
        '<button class="play-song" type="button" name="button"> Play </button>',
        '<button class="add-to-favorites" type="button" name="button"> Add to Favorites </button>',
      '</div>',
    '</div>',
  ].join('');

  return template
}

function displayResults() {

  //delete old results, if there is any
  $('#results').empty();
  //display new results
  for (i = 0; i < searchResults.length; i++) {
       var html = generateResultHTML(searchResults[i]);
       $('#results').append(html);
  }
}


function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '200'},
		function(data) {
			// PUT IN YOUR CODE HERE TO PROCESS THE SOUNDCLOUD API'S RESPONSE OBJECT
      console.log(data );
			// HINT: CREATE A SEPARATE FUNCTION AND CALL IT HERE
      // once receive the results, display the results
      saveResults(data);
      displayResults();
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
