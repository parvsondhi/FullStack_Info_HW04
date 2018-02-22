
var search_list = []
var playlist_data = []

// Map name of list to actual list
function get_list(name){
    return name == 'search_list' ? search_list : playlist_data;
}

// Get HTML rendering of a song
function renderSong(songdata, idx, songlist) {
    artwork = songdata.artwork_url ? songdata.artwork_url : 'placeholder.png'
    var html = "<tr songlist='"+songlist+"' songidx='" + idx + "'>" + 
                    "<td><img src='" + artwork + "'></td>" +
                    "<td><p>" + songdata.title + "</p></td>" +
                    "<td><p>" + songdata.user.username + "</p></td>" +
                    "<td><button>Play</button></td>";
    if (songlist == 'search_list') {
        html +=     "<td><button>Add to Playlist</button></td>";
    } else {
        html +=     "<td><button>Remove from Playlist</button></td>" +
                    "<td><button>^</button></td>" +
                    "<td><button>v</button></td>";
    }
    html +=    "</tr>";
    return html;
}

// render a given list 
function renderList(name) {
    var html = "";
    var songlist = get_list(name)
    for (var i = 0; i < songlist.length; i++) {
        html += renderSong(songlist[i], i, name);
    }
    $("#" + name).html(html);
}

// Event hander for calling the SoundCloud API using the user's search query
function callAPI(query) {
    $.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
        {'q': query,
        'limit': '200'},
        function(data) {
            search_list = data.slice(0, 20);
            renderList("search_list")
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

$(document).ready(function(){
    // event handler for search button
    $("#search_button").on('click', function(){
        var user_input = $('#search_input').val();
        callAPI(user_input);
    });

    // event handler for all other buttons
    $("table").on('click', "button", function() {
        var text = $(this).text();

        // get index of the selected song
        var idx = parseInt($(this).parent().parent().attr('songidx'));

        // get list this song belongs to
        var songlist = get_list($(this).parent().parent().attr('songlist'));
        if (text == 'Play') {
            changeTrack(songlist[idx].permalink_url);

        } else if (text == "Add to Playlist") {
    
            // add song to beginning of playlist
            playlist_data.unshift(songlist[idx]);
            renderList('playlist')

        } else if (text == "Remove from Playlist") {
            songlist.splice(idx, 1);
            renderList('playlist')

        } else if (text == "^" || text == "v") {
            // calculate change to the index
            var dx = text == "^" ? -1 : 1;
            var newidx = dx + idx;

            // bound index between 0 and length-1
            newidx = Math.max(0, Math.min(newidx, songlist.length-1));

            // swap the items at the new and old indices
            var tmp = songlist[newidx];
            songlist[newidx] = songlist[idx];
            songlist[idx] = tmp;

            renderList('playlist');
        }
    });
})


