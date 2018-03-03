// Event hander for calling the SoundCloud API using the user's search query

$('.search').click(function callAPI(query) {
	$('#results').html("")
	let user_input = $('#search-input').val();
    $('#search-input').val("");
    $('#searching').html("You last searched for: " + user_input)
  	$.getJSON('https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb&limit=20&q='+user_input +"", function(data) {

  	$('#results').append("<div class = song>" + "<button class = queueup>&nbsp;Add&nbsp;</button>" + "<div class=descriptor>" +
  		data[1].user.username + ' - ' + data[1].title + "</div><img class = 'artwork' src=" + data[1].artwork_url + ">" + "<p class=a>" + data[7].permalink_url + "<button id = play>Play</button>"+"</p>"  + "</div>");
  	$('#results').append("<div class = song>" + "<button class = queueup>&nbsp;Add&nbsp;</button>" + "<div class=descriptor>" +
  		data[2].user.username + ' - ' + data[2].title + "</div><img class = 'artwork' src=" + data[2].artwork_url + ">" + "<p class=a>" + data[7].permalink_url + "<button id = play>Play</button>"+"</p>"  + "</div>");
  	$('#results').append("<div class = song>" + "<button class = queueup>&nbsp;Add&nbsp;</button>" + "<div class=descriptor>" +
  		data[3].user.username + ' - ' + data[3].title + "</div><img class = 'artwork' src=" + data[3].artwork_url + ">" + "<p class=a>" + data[7].permalink_url + "<button id = play>Play</button>"+"</p>"  + "</div>");
  	$('#results').append("<div class = song>" + "<button class = queueup>&nbsp;Add&nbsp;</button>" + "<div class=descriptor>" +
  		data[4].user.username + ' - ' + data[4].title + "</div><img class = 'artwork' src=" + data[4].artwork_url + ">" + "<p class=a>" + data[7].permalink_url + "<button id = play>Play</button>"+"</p>"  + "</div>");
  	$('#results').append("<div class = song>" + "<button class = queueup>&nbsp;Add&nbsp;</button>" + "<div class=descriptor>" +
  		data[5].user.username + ' - ' + data[5].title + "</div><img class = 'artwork' src=" + data[5].artwork_url + ">" + "<p class=a>" + data[7].permalink_url + "<button id = play>Play</button>"+"</p>"  + "</div>");
  	$('#results').append("<div class = song>" + "<button class = queueup>&nbsp;Add&nbsp;</button>" + "<div class=descriptor>" +
  		data[6].user.username + ' - ' + data[6].title + "</div><img class = 'artwork' src=" + data[6].artwork_url + ">" + "<p class=a>" + data[7].permalink_url + "<button id = play>Play</button>"+"</p>"  + "</div>");
  	$('#results').append("<div class = song>" + "<button class = queueup>&nbsp;Add&nbsp;</button>" + "<div class=descriptor>" +
  		data[7].user.username + ' - ' + data[7].title + "</div><img class = 'artwork' src=" + data[7].artwork_url + ">" + "<p class=a>" + data[7].permalink_url + "<button id = play>Play</button>"+"</p>"  + "</div>");
  	$('#results').append("<div class = song>" + "<button class = queueup>&nbsp;Add&nbsp;</button>" + "<div class=descriptor>" +
  		data[8].user.username + ' - ' + data[8].title + "</div><img class = 'artwork' src=" + data[8].artwork_url + ">" + "<p class=a>" + data[7].permalink_url + "<button id = play>Play</button>"+"</p>"  + "</div>");
  	$('#results').append("<div class = song>" + "<button class = queueup>&nbsp;Add&nbsp;</button>" + "<div class=descriptor>" +
  		data[9].user.username + ' - ' + data[9].title + "</div><img class = 'artwork' src=" + data[9].artwork_url + ">" + "<p class=a>" + data[7].permalink_url + "<button id = play>Play</button>"+"</p>"  + "</div>");
  	$('#results').append("<div class = song>" + "<button class = queueup>&nbsp;Add&nbsp;</button>" + "<div class=descriptor>" +
  		data[10].user.username + ' - ' + data[10].title + "</div><img class = 'artwork' src=" + data[10].artwork_url + ">" + "<p class=a>" + data[7].permalink_url + "<button id = play>Play</button>"+"</p>"  + "</div>");
  	$('#results').append("<div class = song>" + "<button class = queueup>&nbsp;Add&nbsp;</button>" + "<div class=descriptor>" +
  		data[11].user.username + ' - ' + data[11].title + "</div><img class = 'artwork' src=" + data[11].artwork_url + ">" + "<p class=a>" + data[7].permalink_url + "<button id = play>Play</button>"+"</p>"  + "</div>");
  	$('#results').append("<div class = song>" + "<button class = queueup>&nbsp;Add&nbsp;</button>" + "<div class=descriptor>" +
  		data[12].user.username + ' - ' + data[12].title + "</div><img class = 'artwork' src=" + data[12].artwork_url + ">" + "<p class=a>" + data[7].permalink_url + "<button id = play>Play</button>"+"</p>"  + "</div>");
  	$('#results').append("<div class = song>" + "<button class = queueup>&nbsp;Add&nbsp;</button>" + "<div class=descriptor>" +
  		data[13].user.username + ' - ' + data[13].title + "</div><img class = 'artwork' src=" + data[13].artwork_url + ">" + "<p class=a>" + data[7].permalink_url + "<button id = play>Play</button>"+"</p>"  + "</div>");
  	$('#results').append("<div class = song>" + "<button class = queueup>&nbsp;Add&nbsp;</button>" + "<div class=descriptor>" +
  		data[14].user.username + ' - ' + data[14].title + "</div><img class = 'artwork' src=" + data[14].artwork_url + ">" + "<p class=a>" + data[7].permalink_url + "<button id = play>Play</button>"+"</p>"  + "</div>");
  	$('#results').append("<div class = song>" + "<button class = queueup>&nbsp;Add&nbsp;</button>" + "<div class=descriptor>" +
  		data[15].user.username + ' - ' + data[15].title + "</div><img class = 'artwork' src=" + data[15].artwork_url + ">" + "<p class=a>" + data[7].permalink_url + "<button id = play>Play</button>"+"</p>"  + "</div>");
  	$('#results').append("<div class = song>" + "<button class = queueup>&nbsp;Add&nbsp;</button>" + "<div class=descriptor>" +
  		data[16].user.username + ' - ' + data[16].title + "</div><img class = 'artwork' src=" + data[16].artwork_url + ">" + "<p class=a>" + data[7].permalink_url + "<button id = play>Play</button>"+"</p>"  + "</div>");
  	$('#results').append("<div class = song>" + "<button class = queueup>&nbsp;Add&nbsp;</button>" + "<div class=descriptor>" +
  		data[17].user.username + ' - ' + data[17].title + "</div><img class = 'artwork' src=" + data[17].artwork_url + ">" + "<p class=a>" + data[7].permalink_url + "<button id = play>Play</button>"+"</p>"  + "</div>");
  	$('#results').append("<div class = song>" + "<button class = queueup>&nbsp;Add&nbsp;</button>" + "<div class=descriptor>" +
  		data[18].user.username + ' - ' + data[18].title + "</div><img class = 'artwork' src=" + data[18].artwork_url + ">" + "<p class=a>" + data[7].permalink_url + "<button id = play>Play</button>"+"</p>"  + "</div>");
  	$('#results').append("<div class = song>" + "<button class = queueup>&nbsp;Add&nbsp;</button>" + "<div class=descriptor>" +
  		data[19].user.username + ' - ' + data[19].title + "</div><img class = 'artwork' src=" + data[19].artwork_url + ">" + "<p class=a>" + data[7].permalink_url + "<button id = play>Play</button>"+"</p>"  + "</div>");

});
})


$("#results").on('click', ".queueup", function() {
      	$.clone(this);
        var SongResult = $(this).parent()
        $(this).after('<button id = moveup>&#8679</button><button id = movedown>&#8681;</button>')
        $(this).parent().find('p.a').after('<button id = delete>&#10008;</button>')
        SongResult.clone().prependTo("#playlist");
        $(this).html("Added").removeClass( "queueup" ).addClass( "added" )

});


$("#playlist").on('click', "#moveup", function() {
        var elm = $(this).parent();
    	elm.insertBefore(elm.prev());
});


$("#playlist").on('click', "#delete", function() {
        $(this).parent().remove()
});


$("#playlist").on('click', "#movedown", function() {
        var elm = $(this).parent();
    	elm.insertAfter(elm.next());
});


$("#results").on('click', "#play", function changeTrack(url) {
	//Remove any existing instances of the Stratus player
	var newURL = $(this).parent().closest('p.a').text().replace('Play','');
	console.log($(this).parent().closest('p.a').text().replace('Play',''));
	$('#stratus').remove();
	// ($(".song").siblings().closest('p').text())

	//Create a new Stratus player using the clicked song's permalink URL
	$.stratus({
     key: "b3179c0738764e846066975c2571aebb",
     auto_play: true,
     align: "bottom",
     links: newURL ,
    });
});

$("#playlist").on('click', "#play", function changeTrack(url) {
	//Remove any existing instances of the Stratus player
	var newURL = $(this).parent().closest('p.a').text().replace('Play','');
	console.log($(this).parent().closest('p.a').text().replace('Play',''));
	$('#stratus').remove();
	// ($(".song").siblings().closest('p').text())

	//Create a new Stratus player using the clicked song's permalink URL
	$.stratus({
     key: "b3179c0738764e846066975c2571aebb",
     auto_play: true,
     align: "bottom",
     links: newURL ,
    });
});
