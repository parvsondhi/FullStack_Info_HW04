// Event hander for calling the SoundCloud API using the user's search query
var currIndex = 0;
function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '200'},
		function(data) {
            displayResult(data);
			// PUT IN YOUR CODE HERE TO PROCESS THE SOUNDCLOUD API'S RESPONSE OBJECT
			// HINT: CREATE A SEPARATE FUNCTION AND CALL IT HERE
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

// Show the first 20 results including title, artist, pictures
function displayResult(results) {
    $("#songs").html("");

    for (i = 0 ; i < 20 && i < results.length ; i++) {
        $("#songs").append(composeSongHTML(results[i], currIndex++));
    }
    bindEvents();
}

// Bind events for dynamic elements
function bindEvents() {
    $(".add-to-list").click(function (e) {
        var item = $(event.currentTarget).parent();
        item.clone(true, true).prependTo("#playlist");
        $("#playlist .upbtn").show();
        $("#playlist .downbtn").show();
        $("#playlist .remove-from-list").show();
        $("#playlist .add-to-list").hide();
        
    });
    $(".remove-from-list").click(function (e) {
        $(event.currentTarget).parent().remove();
    });

    $(".upbtn").click(function(e) {
        var item = $(event.currentTarget).parent();
        item.prev().parent().prepend(item);
    });

    $(".downbtn").click(function(e) {
        var item = $(event.currentTarget).parent();
        item.next().append(item);
    });
}

// Compose the track DOM
function composeSongHTML(result, index) {
    var template = "<div id='div-ID' class='row'>\
    <img src='imgURL'><h5>Title</h5><h6>ArtistName</h6>\
    <button class='playbtn' id='play-ID' onClick='changeTrack(\"trackURL\")'>Play</button>\
    <button class='add-to-list' id='add-ID' >Add to playlist</button>\
    <button class='remove-from-list' id='removeID' hidden>Remove from playlist</button>\
    <button class='upbtn' hidden>^</button>\
    <button class='downbtn' hidden>v</button></div>";
    
    // Handle empty artwork url.
    var imgURL = result['artwork_url'];
    if (imgURL == null)
        imgURL = "https://images.sftcdn.net/images/t_optimized,f_auto/p/e93231a2-9a65-11e6-a5ce-00163ed833e7/3269459794/soundcloud-logo.png";
    template = template.replace(/ID/g, index);
    template = template.replace("imgURL", imgURL);
    template = template.replace("trackURL", result["permalink_url"]);
    template = template.replace("Title", result['title']);
    template = template.replace("ArtistName", result['user']['username']);
    return template;
}

$("#searchbar").submit(function (e){
    e.preventDefault();
    callAPI($("#search").val());
  });

  $("#searchbtn").click(function (e){
    e.preventDefault();
    callAPI($("#search").val());
  });