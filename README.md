# FullStack_Info_HW04
Full Stack Web Development HW03 - Advanced Javascript

The goal of this assignment is to continue to build your JavaScript & jQuery skills. For this assignment we are going to recreate some of the functionality of music streaming site SoundCloud. Your task is to build a web page that supports the following interactions. Be sure to read through all of the required interactions before beginning. Use the startercode_HW4_skeleton.js file for the two functions listed in the instructions. This file can be found in the ‘javascript’ folder of the GitHub repo. You will also be using the Stratus library, which is a jQuery powered SoundCloud player  - include the library using the CDN "https://stratus.soundcloud.com/stratus.js (Links to an external site.)Links to an external site.". Make sure to also include jQuery 1.7.

The two functions in startercode_HW4_skeleton.js includes all the syntax and query parameters that you require. If interested, you may find concise documentation here:

Stratus: https://stratus.soundcloud.com/ (Links to an external site.)Links to an external site.
Soundcloud: https://developers.soundcloud.com/docs/api/reference#tracks (Links to an external site.)Links to an external site.
Styling is not the primary focus for this assignment, so don’t worry about making your page beautiful (of course, you can if you want). You’re more than welcome to use any CSS framework.

 

Requirements (the things for which you’ll be graded)

QUERYING SOUNDCLOUD’S API (9 total points)
(2 point) User can input text to search SoundCloud’s API
(1 point) Use the provided callAPI() function.
Hint: You’ll need to pass in the user’s search query as the argument for the callAPI() function.
(6 points) The first 20 results from the response object are rendered on the page. Each song result displays the following information for that song:
Song title
Artist
Picture
 

PLAYING SONGS VIA THE STRATUS PLUGIN (5 total points)
(3 points) User can click a ‘play’ button attached to each song result to play that song via the Stratus player plugin.
(2 points) Use the provided changeTrack() function and pass in the song’s permalink URL as the argument for changeTrack().
Hint: Find the ‘permalink_url’ field for each song in the SoundCloud API response object and pass this URL as the argument for the changeTrack() function.
Cut and paste the following link to the Stratus player JS file in your HTML file: <script type='text/javascript' src="stratus-player.js"></script>
 

CREATING A PLAYLIST (12 total points)
User can create a playlist of songs by picking individual songs from the search results.
(2 points) User can click an ‘add to playlist’ button attached to each song result to add a song to the playlist.
(2 point) Songs are added to the top of the playlist.
(2 point) Songs are not ‘removed’ from the search results when they’re added to the playlist. Hint: use the jQuery .clone() method to prevent them from being removed from the search results.
(2 point) User can remove songs from the playlist. Hint: use the jQuery .remove() method.
(2 points) User can move songs up or down in the playlist one spot at a time. Hint: use the jQuery .prev(), .next(), .insertBefore(), and .insertAfter() methods.
(2 point) User can play songs that are in the playlist. This play functionality is the same as the play functionality in the search results.
 

CODING STYLE (4 total points)
(1 point) Your site has a title and intuitive labeling or instructions on how to use it.
(1 point) Your JS and CSS code is separate from your HTML (i.e., there should be no inline CSS styling or JavaScript within your HTML file).
(1 point) All of your JavaScript is commented appropriately.
(1 point) Your code is clean and concise (minimal repetition and unused code).
 

Bonus (You can get up to 4 extra points for doing both of these)
(2 points) ‘RELATED’ SONGS
When a user plays a song, a set of ‘related’ songs are loaded into a new section of the page.
These ‘related’ songs are found via taking the first ‘tag’ from the tag_list field found in each song in the SoundCloud API response object and then querying the SoundCloud API using this ‘tag’ as the ‘q’ attribute of the data object of the $.get() method.
These ‘related’ songs can be played or added to the playlist just like how the regular search results.
The ‘related’ songs section is loaded independently from the main search results.
(2 points) ‘INFINITE’ SCROLL
Use a jQuery library of your choosing to load the next 20 results from the SoundCloud API response object each time the user scrolls to the bottom of the main results. There will only be 200 total results, so don’t be alarmed if the ‘infinite’ scroll stops after 10 additional result loads.
