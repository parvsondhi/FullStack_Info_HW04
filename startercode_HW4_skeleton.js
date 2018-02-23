// Event hander for calling the SoundCloud API using the user's search query
function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '100'},
		function(data) {
			$( "#search-results" ).empty();

			$.each(data, function(i, v) {
				art = v.artwork_url
				title = v.title
				username = v.user.username
				url = v.permalink_url
				addResult(art, title, username, url)
				if(i>=19){ return false; }
			})

		},'json'
	);
}

function addResult(art, title, username, url) {
	$('#search-results').append('<tr data-url='+url+'> <td class=art><img src='+art+'></td> <td class=title>'+title+'</td> <td class=username>'+username+'</td> <td><button class=play>PLAY SONG</button></td> <td class=additem><button class=add>ADD TO PLAYLIST</button></td></tr>')
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
        // once the document loads, create new item with this function
        var user_input = $('#search-input').val();

        $('#search-input').val('')
        // alert(user_input);

        callAPI(user_input)
    })
);

$(function() {
	// play button
    $(document).on('click', 'button.play', function(){
        var url = $(this).parent().parent().data('url');
        changeTrack(url)
    });

    // add to playlist button
    $(document).on('click', 'button.add', function(){
        var $row = $(this).parent().parent().clone();
        $row.find('td.additem').replaceWith("<td><button class=remove> REMOVE </button></td> <td><button class=up> UP </button></td> <td><button class=down> DOWN </button></td>");
        $row.prependTo($('#playlist'));
    });

    // remove button
    $(document).on('click', 'button.remove', function(){
        $(this).parent().parent().remove();
    });

    // up and down 
    $(document).on('click', "button.up", function(){
    	var row = $(this).parents("tr:first");
    	row.insertBefore(row.prev());
    });

    $(document).on('click', "button.down", function(){
    	var row = $(this).parents("tr:first");
    	row.insertAfter(row.next());
    });
});

// $("#col").on('click', "button.playbutton", function() {
// 	// move back from list_doing container to list_todo container
// 	var url = $(this).data("url");
// 	console.log(url)
// });
