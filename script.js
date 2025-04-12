// I've used TuneMyMusic (paid one month of it, cheap enough) to transfer all playslists. However, spotify's liked songs are placed in a new "Favorite Songs" playlist in Youtube. So you can use this script to save all songs from any YouTube Music playlist to your Youtube Musiç's "Liked Music"
// TuneMyMusic does not transfer radios or other playslists that spotify generated. However, these are only 50 tracks and PlaylistBuddy works with those (but you have to select then transfer one at a time)
// This script likes all songs in any YouTube Music playlist. Go to the playlist then run this through console (F12) or as a snippet in your dev tools (F12 > sources)
// YouTube is a bit stubborn and a few songs won't save even when they're clicked, their thumbs up icon lights up and the popup appears saying "saved to liked music". So reload the page and run again until nothing is saved.
// The thumbs up will be marked red for all songs that were clicked and green for songs skipped (duplicate)

// Options
const skipSave = false // Set ture to just scrolls to the end to load all songs, and not save anything. For debug mostly...
const checkInsteadOfSave = false // Set true to click the song's checkbox instead of its like button. This is for the very very stubborn tracks that might happen in the middle ~ end of a large playlist even with long delays between likes, which after many refreshes still aren't saved. Select them all, then save them to a separate playlist, then go to that one and save all in the new playlist (run script with this set to false).
const delayBetweenSaves = 2000 // 500 works great. 100 works but might have issues. 300 is good enough but the page crashes after a few hundred likes. 2000 is great to see it working while it happens...

// Script

const saved = new Set(); // To avoid liking then unliking songs that appear more than once in your playlist (duplicates)

const doNextE = (list, i) => {
    const elm = list[i]
    elm.scrollIntoView({block: 'center'})
    elm.style.backgroundColor = 'red'

    const trackHref = elm.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(".title > a").href
    if (!saved.has(trackHref)) {
        saved.add(trackHref)
        if (!checkInsteadOfSave) elm.click();
        else elm.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector("yt-icon.style-scope.yt-checkbox-renderer").click()
    } else {
        elm.style.backgroundColor = 'green'
    }
    
    console.log('liked', i + 1, '/', list.length);
    if ((i + 1) < list.length) {
        setTimeout(()=>{doNextE(list, i+1)}, delayBetweenSaves);
    } else {
        console.log('finished')
    }
};

const loadAll = () => {
    const spinner = document.querySelectorAll(
        "ytmusic-playlist-shelf-renderer ytmusic-continuation-item-renderer"
    );

    if (spinner.length) {
        spinner[0].scrollIntoView();
        console.log('scrolled');
        setTimeout(()=>{
            loadAll();
        }, 1000);
    } else {
        console.log('finished scrolling, getting all unliked songs');

        if (skipSave) return;
        setTimeout(() => {
            const els = Array.from(
                document.querySelectorAll(
                    "ytmusic-playlist-shelf-renderer #button-shape-like > button[aria-pressed=false][aria-label='Like']"
                )
                .values()
            );
            if (els.length) doNextE(els, 0);    
            else console.log('Nothing to save!')
        }, 10000);
    }
};

loadAll();
