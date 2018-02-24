$('#search').on('click', function callAPI() {
var query = $('#search-input').val();
		$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
			{'q': query,
			'limit': '20'},
			function query_results (data) {
				// PUT IN YOUR CODE HERE TO PROCESS THE SOUNDCLOUD API'S RESPONSE OBJECT
				// HINT: CREATE A SEPARATE FUNCTION AND CALL IT HERE
                for (var i=0; i < $(data).length; i++){
                    //extract an album cover link and store in a variable
                    var picture = (data[i]).artwork_url;
                    if (picture == null) {
                        picture = "https://cdn2.iconfinder.com/data/icons/minimalism/128/soundcloud.png"
                    };
                    //extract link to each song
                    var curSong = (data[i]).permalink_url;
                    //pull out user's search results
                    $('#search-results').append(
                    '<tr class="search-song"> <td> <img src=' + picture + ' width=32 height=32></td><td>'+ (data[i]).title+'</td><td>'+ (data[i]).user.username+ '</td> <td> <button class="play" value="' + curSong + '">&#10689;</button> </td> <td><button class="add-to-list">&#8853;</button></td> </tr>' 
                    ) 
                }
                    //click on a song to activate player
                    $('.play').hover(function() {
                        // wrap a DOM element 'this' in a jQuery object
                        var $this = $(this);
                        var song = $this.attr("value"); //store link to that song
                        $('.play').click({url:song}, changeTrack);
                        });

                    //deep copy the selected song to a playlist and change some buttons
                    $('.add-to-list').click(function(){
                        $('#to-prepend').after($(this).parents('.search-song').clone(true)).ready(function(){ 
                            $('#playlist').find('.add-to-list').parent().replaceWith('<td><button class="remove-from-list">&#8861;</button></td> <td><button class="up">&#9651;</button></td> <td><button class="down">&#9661;</button></td>');
                        });
                        //activate the-remove-song function
                        $('.remove-from-list').click(function() {
                              $(this).parents('tr.search-song').get(0).remove();
                        });
                        //activate one-song-up func
                        $('.up').click(function() {
                            var row = $(this).parent('td').parent('.search-song')
                            $(row.prev('.search-song')).get(0).before(row.get(0)).end()
                        }); 
                        //activate one-song-down func
                        $('.down').click(function() {
                            var row = $(this).parent('td').parent('.search-song');
                            $(row.next()).get(0).after(row.get(0)).end()
                        });
                    });
			 },'json'
        );
});

            
            // 'Play' button event handler - play the track in the Stratus player
            function changeTrack(event) {
                // Remove any existing instances of the Stratus player
                $('#stratus').remove();

                // Create a new Stratus player using the clicked song's permalink URL
                $.stratus({
                  key: "b3179c0738764e846066975c2571aebb",
                  auto_play: true,
                  align: "bottom",
                  links: event.data.url
                });
            }


