/*
* When document loads, attach click listener to Search button
*/
$(document).ready(
    $("#search-button").on('click', function () {
        var user_input = $('#search-input').val();
        console.log(user_input);
        callAPI(user_input);
    })
);

/*
* Event hander for calling the SoundCloud API using the user's search query
*/
function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '200'},
		function(data) {
            parseSearchResult(data);
		},'json'
	);
};

/*
* Clear the search results table and add up to 20 new entry rows
*/
function parseSearchResult(data) {
    $(".search-results-table").find(".content-row").remove();
    data = data.slice(0, 20);
    data.forEach(addSearchResult);
};

/*
* Add a single entry into the search result table
*/
function addSearchResult(item) {
    var new_entry = $("<tr class='content-row'>");
    var artwork_col = $("<td>").append($("<img>").attr("src", item.artwork_url));
    var title_col = $("<td>").html(item.title);
    var artist_col = $("<td>").html(item.user.username);
    var play_btn_col = $("<td>").append($("<button class='play-button'>").html("Play").attr("permalink_url", item.permalink_url));
    var playlist_btn_col = $("<td>").append($("<button class='add-to-playlist-button'>").html("Add to Playlist"));
    new_entry.append(artwork_col, title_col, artist_col, play_btn_col, playlist_btn_col);
    $(".search-results-table").append(new_entry);
};

/*
* Play track when play button is clicked
*/
$("table").on('click', ".play-button", function () {
    changeTrack($(this).attr("permalink_url"));
});

/*
* Add row to playlist when "Add to Playlist" button is clicked
*/
$("table").on('click', ".add-to-playlist-button", function () {
    var playlist_row = $(this).parent().parent().clone();
    playlist_row.find(".add-to-playlist-button").parent().remove();
    
    var remove_btn_col = $("<td>").append($("<button class='remove-button'>").html("Remove"));
    var up_btn_col = $("<td>").append($("<button class='up-button'>").html("Up"));
    var down_btn_col = $("<td>").append($("<button class='down-button'>").html("Down"));    
    playlist_row.append(remove_btn_col, up_btn_col, down_btn_col);
    
    $(".playlist-table").append(playlist_row);
    console.log("Added to playlist");
});

/*
* Remove track from playlist when "Remove" button is clicked
*/
$("table").on('click', ".remove-button", function () {
    var row = $(this).parent().parent();
    $(".playlist-table").find(row).remove();
});

/*
* Move row up when "Up" button is clicked
*/
$("table").on('click', ".up-button", function () {
    var row = $(this).parent().parent();
    if (row.prev().hasClass("content-row")) {
        row.insertBefore(row.prev());
    }
});

/*
* Move row down when "Down" button is clicked
*/
$("table").on('click', ".down-button", function () {
    var row = $(this).parent().parent();
    row.insertAfter(row.next());
});

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
};
