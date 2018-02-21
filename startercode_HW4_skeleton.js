function addResult(art, title, username, url) {
    $('.search-results').append('<tr> <td> <img class="art" src="'+art+'"></td> <td class="title">'+title+'</td> <td class="username">'+username+'</td><td><button class="playbtn" data-url="'+url+'">Play</button></td><td><button class="playlistbtn"> + </button></td></tr>');
}

// Event hander for calling the SoundCloud API using the user's search query
function callAPI(query) {
    $.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
        {'q': query,
        'limit': '20'},
        function(data) {
            $.each(data, function(i, v) {
                var art = v.artwork_url;
                if (art == null){
                    art = 'soundcloudsmall.jpeg'};
                var title = v.title;
                var username = v.user.username;
                var url = v.permalink_url;
                addResult(art, title, username, url);
                // console.log(data);
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

$(document).ready(
    $("#search-button").on('click', function() {
        // once the document loads, search using what user inputs
        var user_input = $('#search-input').val();

        $('#search-input').val('')
        // alert(user_input);

        callAPI(user_input)
    })
);

$(document).ready(function(){

});

// PLAYLIST FUNCTIONALITY
// Add button to add to Playlist (+) from Search Results- adapted button from https://jsfiddle.net/V7wXD/8/
$(function() {
    $(document).on('click', 'button.playlistbtn', function(){
        //clone entire row, but remove "add playlist" button
        var $tr = $(this).parents('tr').clone().find('.playlistbtn').remove().end();
        $tr.appendTo($('#playlist-table > tbody')).append("<td><button class= 'delbtn'> - </button></td> <td><button class= 'up'> ^ </button></td><td><button class= 'down'> v </button></td>");
        $('.playlist-table.playlistbtn').css('display', 'none');
        // Add a delete button, only remove the single row
        $('button.delbtn').click(function(){
            $(this).parents('tr').remove();
        });
    });
});

 //Add functionality to up/down buttons - adapted from https://jsfiddle.net/vaDkF/
$(document).on('click', ".up,.down", function(){
    var row = $(this).parents("tr");
    if ($(this).is(".up")) {
        row.insertBefore(row.prev());
    } else {
        row.insertAfter(row.next());
    }
});

// PLAY STRATUS FUNCTIONALITY
$(function() {
    $(document).on('click', 'button.playbtn', function(){
        //launch stratus player and play url
        var url = $(this).attr("data-url")
        changeTrack(url)
    });
});



