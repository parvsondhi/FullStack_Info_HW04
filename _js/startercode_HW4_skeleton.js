
$(document).ready(
    $("#search").on('click', function() {
        // once the document loads, create new item with this function
        $("#t1").empty();
        var user_input = $('#search_input').val();
        callAPI(user_input);
    })
);


var title_to_link ={};

// Event hander for calling the SoundCloud API using the user's search query
// Iterate through first 20 packages and retrive key attribuites for website construction
// pass the permalin url to button for later use
function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '20'},
		function(data) {
            var k = data[0].permalink_url;
            console.log(k);
            for (var d in data){
                var title = data[d].title;
                var image = data[d].artwork_url;
                if (image == null){
                    image = 'http://lh3.ggpht.com/sNTWcnZb9uGNsoeBUeOT8kBhlV1MvwrGHiWq_qomgbSScupfowW1uTBWjaEu_8Fqyv5C=w120';
                }
                var artist = data[d].user;
                artist = artist.username;
                var p = data[d].permalink_url;
                $('#t1').append("<tr><td width = 60%> " + title + "</td ><td width = '10%'>"+ artist+ "</td><td width = 120px><img src = " + image + " width = 120px;></td><td width = '5%'><button class='play' id = '" + p +"'> Play</button></td><td width = '5%'><button class='add'> Add to playlist </button></td></tr>")           
            }
		},'json'
	);
}


// play song.
$("#t1").on('click','.play',function() {
    changeTrack(this.id);
})

$("#t2").on('click','.play',function() {
    changeTrack(this.id);
})


//add row from search result to playlist
$("#t1").on('click','.add',function() {
    var completedItem = $(this).parent().parent();
    var temp = completedItem.clone();
    var t = temp.children()[4];
    t.innerHTML = "<button class='remove'> Remove</button>";
    temp.append("<td width = '5%'><button class='up'> Move up </button></td><td width = '5%'><button class='down'> Move down </button></td>")
    $("#t2").prepend(temp);
})


//remove row from playlist
$("#t2").on('click','.remove',function() {
    var completedItem = $(this).parent().parent();
    completedItem.remove();
})

//find the row that the button belongs to and move it up.
$("#t2").on('click','.up',function() {
    var completedItem = $(this).parent().parent();
    completedItem.insertBefore(completedItem.prev());
})

//find the row that the button belongs to and move it down.
$("#t2").on('click','.down',function() {
    var completedItem = $(this).parent().parent();
    completedItem.insertAfter(completedItem.next());
})

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




