$('#search').on('click', function callAPI() {
var query = $('#search-input').val();
		$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
			{'q': query,
			'limit': '20'},
			function query_results (data) {
				// PUT IN YOUR CODE HERE TO PROCESS THE SOUNDCLOUD API'S RESPONSE OBJECT
				// HINT: CREATE A SEPARATE FUNCTION AND CALL IT HERE
                $('#search-results').append('                            <tr><th>Cover</th><th>Title</th><th>User</th><th></th></tr>');
                for (var i=0; i < $(data).length; i++){
                    console.log(data[i]);
                    var picture = (data[i]).artwork_url;
                    if (picture == null) {
                        picture = "https://cdn2.iconfinder.com/data/icons/minimalism/128/soundcloud.png"
                    };
                    
                    var curSong = (data[i]).permalink_url;

                    $('.play').hover(function () {
                        // wrap a DOM element 'this' in a jQuery object
                        var $this = $(this);
                        var song = $this.attr("value"); //store link to that song
                        $('.play').click({url:song}, changeTrack);
                    });

                    
                    $('#search-results').append(
                    '<tr> <td> <img src=' + picture + ' width=32 height=32></td><td>'+ (data[i]).title+'</td><td>'+ (data[i]).user.username+ '</td> <td> <button class="play" value="' + curSong + '">&#10689;</button> </td> </tr>' 
                    ) //<td><button class="add-list" value="' +xxx +'">&#8853;</button></td>
                }
                                
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


