let myProgressBar = document.getElementById('myProgressBar');
let masterPlay = document.getElementById('masterPlay');
let gif = document.getElementById('gif');
let currentSongCover = document.getElementById('coverImg');
let currentSongName = document.getElementById('currentSongName');

let currentTimeToShow = document.getElementById('currentTime');
let FullDurationToShow = document.getElementById('totalDuration');

let songBody = Array.from(document.getElementsByClassName('songBody'));
let songPlayBtn = Array.from(document.getElementsByClassName('songPlay'));
let songTime = Array.from(document.getElementsByClassName('songTime'));
let previous = document.getElementById('previous');
let next = document.getElementById('next');


let songs = [
    { songName: '', filePath: 'songs/1.mp3', coverPath: 'covers/1.jpg', songTime:''},
    { songName: '', filePath: 'songs/2.mp3', coverPath: 'covers/2.jpg', songTime:''},
    { songName: '', filePath: 'songs/3.mp3', coverPath: 'covers/3.jpg', songTime:''},
    { songName: '', filePath: 'songs/4.mp3', coverPath: 'covers/4.jpg', songTime:''},
    { songName: '', filePath: 'songs/5.mp3', coverPath: 'covers/5.jpg', songTime:''},
    { songName: '', filePath: 'songs/6.mp3', coverPath: 'covers/6.jpg', songTime:''},
    { songName: '', filePath: 'songs/7.mp3', coverPath: 'covers/7.jpg', songTime:''},
    { songName: '', filePath: 'songs/8.mp3', coverPath: 'covers/8.jpg', songTime:''},
    { songName: '', filePath: 'songs/9.mp3', coverPath: 'covers/9.jpg', songTime:''},
    { songName: '', filePath: 'songs/10.mp3', coverPath: 'covers/10.jpg', songTime:''},
    { songName: '', filePath: 'songs/10.mp3', coverPath: 'covers/10.jpg', songTime:''},
    { songName: '', filePath: 'songs/10.mp3', coverPath: 'covers/10.jpg', songTime:''},
];


let songIndex=0;
myProgressBar.value = 0 ;
currentTimeToShow.textContent = '00:00';
FullDurationToShow.textContent = '00:00';
extractName();

let audioElement = new Audio(`${songs[songIndex].filePath}`);
const audioElements = songs.map((song) => new Audio(song.filePath));
console.log(audioElements)
init();           // for the first time 
setSong();

audioElements.forEach((element,index) => {
    element.preload = 'metadata';

    // when song are loaded (asynchronous)
    element.addEventListener('loadedmetadata',()=>{
        let formattedTime = formatTime(element.duration);
        songs[index].songTime = formattedTime ;
        console.log(songs[index].songTime) ;

        init();        // once again
        setSong();       //once again (for second time only)
    })
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function init() {
    songBody.forEach((element, i) => {
        element.getElementsByClassName('songName')[0].textContent = songs[i].songName;
        element.getElementsByClassName('covers')[0].src = songs[i].coverPath;
        element.getElementsByClassName('songTime')[0].textContent =  songs[i].songTime;
    });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Set the current song
function setSong() {                // for the first and every time
    currentSongCover.style.backgroundImage = `url(${songs[songIndex].coverPath})`;
    currentSongName.textContent = songs[songIndex].songName;
    audioElement.src = songs[songIndex].filePath;

    FullDurationToShow.textContent = songs[songIndex].songTime ;
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// play/pause the set song 
function masterPlayer(){
    if(audioElement.paused){
        
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;

        makeAllDefault();
        songPlayBtn[songIndex].classList.remove('fa-circle-play');
        songPlayBtn[songIndex].classList.add('fa-circle-pause');

        makeAllDefaulBgColor();
        songBody[songIndex].style.backgroundColor = 'green';
        
    }
    
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;

        makeAllDefault();
        songPlayBtn[songIndex].classList.remove('fa-circle-pause');
        songPlayBtn[songIndex].classList.add('fa-circle-play');

        makeAllDefaulBgColor();
        songBody[songIndex].style.backgroundColor = 'grey';
    }

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function to format the time in mm:ss format
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function extractName() {
    songs.forEach((element) => {
        // Split the file path by '/' to get an array of parts
        const parts = element.filePath.split('/');

        // Get the last part of the array, which is the file name without the extension
        const fileName = parts[parts.length - 1];

        // Assign the extracted file name to the songName property
        element.songName = fileName;
    });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// progressBar control 
function ProgressBarSync(){
    myProgressBar.value = Number((audioElement.currentTime / audioElement.duration) *100 ); 
}
function audioSync(){
    audioElement.currentTime = Number((myProgressBar.value / 100)*audioElement.duration);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// next and previous 
function nextSong(){
    if(songIndex >=( songBody.length-1)){
        songIndex = 0 ;
    }
    else{
        songIndex += 1 ;
    }
    
    setSong();            // view info
    masterPlayer();      //play 
}

function previousSong(){
    if(songIndex <= 0){
        songIndex =( songBody.length-1) ;
    }
    else{
        songIndex -= 1 ;
    }
    
    setSong();            // view info
    masterPlayer();      //play 
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function playSelectedSong(btn){
    masterPlayer();
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function makeAllDefault(){
    songPlayBtn.forEach(btn => {
        btn.classList.remove('fa-circle-pause');
        btn.classList.add('fa-circle-play');
    });
}

function makeAllDefaulBgColor(){
    songBody.forEach(element => {
        element.style.backgroundColor = 'black';
    });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function autoPlayNext(){
    nextSong();
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// EVENT LISTENER 
document.addEventListener('DOMContentLoaded', function() {
    // Your code here
    
    masterPlay.addEventListener('click',()=>{
        masterPlayer();
})
audioElement.addEventListener('timeupdate',()=>{
    ProgressBarSync();
    currentTimeToShow.textContent = formatTime(audioElement.currentTime);

})
myProgressBar.addEventListener('change',()=>{
    audioSync();
})

next.addEventListener('click',()=>{
    nextSong();
})

previous.addEventListener('click',()=>{
    previousSong();
})

songPlayBtn.forEach((btn,selectedSong) => {
    btn.addEventListener('click',()=>{
        makeAllDefault();
        let previous = songIndex ;
        songIndex = selectedSong ;
        if(previous == selectedSong){
            playSelectedSong(btn);
        }
      
        else{
            setSong();
            playSelectedSong(btn);
            songIndex = selectedSong ;
        }
    });
});

audioElement.addEventListener('ended',()=>{
    masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;

        makeAllDefault();
        songPlayBtn[songIndex].classList.remove('fa-circle-pause');
        songPlayBtn[songIndex].classList.add('fa-circle-play');

        makeAllDefaulBgColor();
        autoPlayNext();
});
    });