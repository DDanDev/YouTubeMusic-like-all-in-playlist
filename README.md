# YouTubeMusic-like-all-in-playlist
Script to save (like) all songs in a YouTube Music playlist, adding them to your Liked Songs.


I've used TuneMyMusic (paid one month of it, cheap enough) to transfer all playslists. However, spotify's liked songs are placed in a new "Favorite Songs" playlist in Youtube. So you can use this script to save all songs from any YouTube Music playlist to your Youtube Musiç's "Liked Music"

TuneMyMusic does not transfer radios or other playslists that spotify generated. However, these are only 50 tracks long and PlaylistBuddy (free) works with those (but you have to select then transfer one at a time)

This script likes all songs in any YouTube Music playlist. Go to the playlist then run this through console (F12, copy paste [script.js](/script.js)) or as a snippet in your dev tools (F12 > sources)

YouTube is a bit stubborn and a few songs won't save even when they're clicked, their thumbs up icon lights up and the popup appears saying "saved to liked music". So reload the page and run again until nothing is saved. If the playlist is large, it can have some tracks that even after a few refreshes they still look like they're saved but they aren't, in this case you the option checkInsteadOfSave in the script and read instructions in that line.

The thumbs up will be marked red for all songs that were clicked and green for songs skipped (duplicate)
