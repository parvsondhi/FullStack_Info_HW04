// Event hander for calling the SoundCloud API using the user's search query
function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '200'},
		function(data) {
            var str = JSON.stringify(data, null, 2);
            // console.log(str);
            // PUT IN YOUR CODE HERE TO PROCESS THE SOUNDCLOUD API'S RESPONSE OBJECT
			// HINT: CREATE A SEPARATE FUNCTION AND CALL IT HERE
            $("#results").empty();
            $.each(data, function(i, item) {
                result(item);
                });
            /*$.each(data, function() {
                console.log(data);
                result(data);
                });	*/	
            },
        'json'
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


// create a search result row;
function result(item) {
    var art_img = '';
    if (!!item.artwork_url) {
        art_img = '<img src="' + item.artwork_url + '" alt="soundcloud image">';
    }
    $("#results").append(
        "<tr>" +
            "<td class='art'>" +
                art_img +
            "</td>" +
            "<td class='title'>" +
                item.title +
            "</td>" +
            "<td class='artist'>" +
                item.user.username +
            "</td>" +
            "<td class='play'>" +
                '<input type="button" value="Play" class="play">' + 

            "</td>" +
            "<td class='add-remove'>" +
                '<input type="button" value="Add to playlist" class="add">' +
            "</td>" +
        "</tr>"
    );    
}

function move(row) {
    console.log("moving row");
    //row.remove();
}

/*$(document).ready(*/
    $("#searchsubmit").on(
        'click',
        function() {
            callAPI($("#searchbox").val());
            console.log("after api");
            $(".add").on(
                'click',
                function() {
                    console.log("button clicked");
                    move($(this).parent().parent());
                    }
                );
            }
        );

/*
$(".add-remove").on('click', "button", move($(this).parent().parent()) 
    // copy from search results container to playlist container;
    console.log("move clicked");

    var button = $(this);

    // .html("Remove from playlist");

    var row = button.parent().parent();
    row.remove();
    button.html("Remove from playlist");
    $("#playlist").append(row);

    //$("#playlist_table").append(row);
    }
);*/
/*
$(".playlist_row").on('click', "button.move", function() {
    // remove button;
    
    $(this).html("Mark As Doing");
    var uncompletedItem = $(this).parent()

    $("#list_todo").prepend(uncompletedItem);
    }
);*/




