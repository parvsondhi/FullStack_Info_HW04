var results = [];
var playlist = [];

$(document).ready(function(){
	setup();
});

function setup() {
    $('#input-search').keypress(function (e) {
		
        let ENTER_KEY = 13;
        var key = e.which;
        if(key == ENTER_KEY) {
            performQuery();
        }
	}); 

	$('#result-list').on('click', '.query-result img', previewSongPressed); 
	$('#playlist').on('click', '.query-result img', previewSongPressed); 
	$('#result-list').on('click', '.query-result', didSelectSongFromResults); 
	$('#playlist').on('click', '.query-result', didSelectSongFromPlaylist); 
	$('#playlist').on('click', '.up', movePlaylistItemUp); 
	$('#playlist').on('click', '.down', movePlaylistItemDown); 
	$('#playlist-button').on('click', startPlaylist); 
}


function performQuery() {

	let query = getQueryFromInput();
	if (query) {
		fetchSongResults(query);
	} else {
		processResults([])
	}

	setActiveQuery(query);
	clearInput();
}

function getQueryFromInput() {
	return $('#input-search').val();
}

function clearInput() {
	$('#input-search').val('');
}

function setActiveQuery(query) {
	$('#active-query em').text(query);
	if (query) {
		$('#active-query').removeClass('invisible');
	} else {
		$('#active-query').addClass('invisible');
	}
}

function processResults(data) {
	let maxNumberOfSongsToShow =  20;

	results = data.slice(0, maxNumberOfSongsToShow);
	renderResults(results);
}

function renderResults(results) {
	let template = []
	for (let result of results) {
		template.push(createHTMLFromResult(result))
	}
	$('#result-list').empty()
	$('#result-list').prepend(template.join(''));
}

function createHTMLFromResult(song) {
	let placeholder_url = './src/_assets/no_image_placeholder.png'

	let id = song.id;
	let title = song.title;
	let artwork_url = song.artwork_url ? song.artwork_url : placeholder_url;
	let artist_url = song.user ? song.user.permalink_url : '#';
	let artist_name = song.user ? song.user.username : 'Anonymous';

	let template = [
		'<div class="query-result" id="', id ,'">',
			'<div class="avatar-container">',
				'<img class="avatar" ', 'src="', artwork_url , '">',
			'</div>',
			'<div class="content-container">',
				'<h6>',
					title,
				'</h6>',
				'<div>',
					'Artist: ', '<a target="_blank" href="', artist_url, '">', artist_name, "</a>",
				'</div>',
			'</div>',
		'</div>',
	]

	return template.join('');
}

function previewSongPressed(event) {
	event.stopPropagation();
	
	let element_id = this.parentElement.parentElement.id;
	let id = element_id.split('-')[element_id.split('-').length - 1];
	let selectedSong = results.find( (result) => result.id == id);

	if ($('#'+String(id)+' .avatar-container').hasClass('playing')) {
		stopTrack();
	} else {
		playSong(selectedSong);
	}
}

function playSong(song) {
	changeTrack(song.permalink_url);
	$('#'+String(song.id)+' .avatar-container').addClass('playing');
	$('#p-'+String(song.id)+' .avatar-container').addClass('playing');
}


function didSelectSongFromResults(event) {
	var originalElement = event.srcElement || event.originalTarget;

	if (originalElement.tagName == 'A') {
		// don't do anything if a link was clicked
		return
	}

	let id = this.id;
	let selectedSong = results.find( (result) => result.id == id);

	let songIsAlreadyInPlaylist = !!playlist.find( (playlistSong) => playlistSong.id == id);
	if (songIsAlreadyInPlaylist) {
		return
	}

	if (selectedSong) {
		playlist.unshift(selectedSong);
		let playlistHTML = createHTMLForPlaylistSong(selectedSong);
		$('#playlist').prepend(playlistHTML);
	}	
}

function didSelectSongFromPlaylist(event) {
	let id = this.id.split('-')[this.id.split('-').length - 1];
	let index = playlist.findIndex( (result) => result.id == id);
	playlist.splice(index,1)[0];
	$('#p-'+String(id)).remove();
}

function createHTMLForPlaylistSong(song) {
	let placeholder_url = './src/_assets/no_image_placeholder.png'

	let id = song.id;
	let title = song.title;
	let artwork_url = song.artwork_url ? song.artwork_url : placeholder_url;
	let artist_url = song.user ? song.user.permalink_url : '#';
	let artist_name = song.user ? song.user.username : 'Anonymous';

	let template = [
		'<div class="query-result" id="p-', id ,'">',
			'<div class="avatar-container">',
				'<img class="avatar" ', 'src="', artwork_url , '">',
			'</div>',
			'<div class="content-container">',
				'<h6>',
					title,
				'</h6>',
				'<div>',
					'Artist: ', '<a target="_blank" href="', artist_url, '">', artist_name, "</a>",
				'</div>',
			'</div>',
			'<div class="order-container">',
				'<div class="up">',
				'</div>',
				'<div class="down">',
				'</div>',
			'</div>',
		'</div>',
	]

	return template.join('');
}

function movePlaylistItemUp(event) {
	event.stopPropagation();

	let element_id = this.parentElement.parentElement.id;
	let id = element_id.split('-')[element_id.split('-').length - 1];

	// first make sure that our internal representation of the playlist is consistent
	let oldIndex = playlist.findIndex( (result) => result.id == id);
	if (oldIndex == -1 || oldIndex == 0) {
		// not found or at first place in array
		return 
	} 
	
	let newIndex = oldIndex - 1
	playlist.splice(newIndex, 0, playlist.splice(oldIndex, 1)[0]);
	
	// then move the element in the DOM on step up
	let currentElement = $('#'+String(element_id));
	currentElement.prev().before(currentElement);
}

function movePlaylistItemDown(event) {
	event.stopPropagation();

	let element_id = this.parentElement.parentElement.id;
	let id = element_id.split('-')[element_id.split('-').length - 1];

	// first make sure that our internal representation of the playlist is consistent
	let oldIndex = playlist.findIndex( (result) => result.id == id);
	if (oldIndex == -1 || oldIndex == playlist.length - 1) {
		// not found or at last place in array
		return 
	} 
	
	let newIndex = oldIndex + 1
	playlist.splice(newIndex, 0, playlist.splice(oldIndex, 1)[0]);
	
	// then move the element in the DOM on step up
	let currentElement = $('#'+String(element_id));
	currentElement.next().after(currentElement);
}

function startPlaylist(event) {

	if ($('#playlist-button').hasClass('playing')) {
		stopTrack();
		return;
	}

	let urls = playlist.map((song) => song.permalink_url);
	console.log(urls.join());
	changeTrack(urls.join());
	$('#playlist-button').addClass('playing');
}

// Event hander for calling the SoundCloud API using the user's search query
function fetchSongResults(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '200'},
		processResults
		,'json'
	);
}

function stopTrack() {
	// Remove any existing instances of the Stratus player
	$('#stratus').remove();
	$('.playing').removeClass('playing');
}

// 'Play' button event handler - play the track in the Stratus player
function changeTrack(url) {
	stopTrack()

	// Create a new Stratus player using the clicked song's permalink URL
	$.stratus({
      key: "b3179c0738764e846066975c2571aebb",
      auto_play: true,
      align: "bottom",
      links: url
    });
}




