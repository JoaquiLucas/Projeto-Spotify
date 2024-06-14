
    const songName = document.getElementById('song-name');
    const bandName = document.getElementById('band-name');
    const song = document.getElementById('audio');
    const cover = document.getElementById('cover');
    const play = document.getElementById('play');
    const next = document.getElementById('next');
    const previous = document.getElementById('previous');
    const currentProgress = document.getElementById('current-progress');
    const progressContainer = document.getElementById('progress-container');
    const shuffleButton = document.getElementById('shuffle');
    const repeatButton = document.getElementById('repeat');
    const songTime = document.getElementById('song-time');
    const totalTime = document.getElementById('total-time');
    const likeButton = document.getElementById('like');


    const metamorofoseAmbulante = {
        songName: 'Metamorfose Ambulante',
        artist: 'Raul Seixas',
        file: 'Metamorfose_Ambulante',
        liked: false,

    };
    const flashingLights = {
        songName: 'Flashing Lights',
        artist: 'Kenye West',
        file: 'Flashing_Lights',
        liked: false,
    };

    const laFrances = {
        songName: 'Je Te Laisserai des Mots',
        artist: 'Patrick Watson',
        file: 'je_te_laisserai_des_mots',
        liked: false,
    };

    const redHot = {
        songName: 'Californication',
        artist: 'Red Hot Chili Peppers',
        file: 'Red_Hot_Chili_Peppers',
        liked: false,
    };

    const violentCrimes = {
        songName: 'Violent Crimes',
        artist: 'Kenye West',
        file: 'Violent_Crimes',
        liked: false,
    };

    const seeYouAgain = {
        songName: 'See You Again',
        artist: 'Tyler The Creator',
        file: 'See_You_Again',
        liked: false,
    };

    const originalPlaylist = JSON.parse(localStorage.getItem('playlist')) ??[metamorofoseAmbulante,
    flashingLights, 
    laFrances, 
    redHot, 
    violentCrimes, 
    seeYouAgain];

    let sortedPlaylist = [...originalPlaylist];

    let index = 0;

    let isPlaying = false;
    let isShuffle = false;
    let isRepeat = false;



    
    function playSong(){
        play.querySelector('.bi').classList.remove('bi-play-circle-fill');
        play.querySelector('.bi').classList.add('bi-pause-circle-fill');
        song.play();
        isPlaying = true;
    }

    function pauseSong(){
        play.querySelector('.bi').classList.add('bi-play-circle-fill');
        play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
        song.pause();
        isPlaying = false;
    }

    function playPauseDecider(){
        if (isPlaying === true){
            pauseSong();
        }
        else{
            playSong();
        }

    }

    function initializeSong(){
        cover.src = `images/${sortedPlaylist[index].file}.jpg`;;
        song.src = `songs/${sortedPlaylist[index].file}.mp3`;
        songName.innerText = sortedPlaylist[index].songName;
        bandName.innerText = sortedPlaylist[index].artist;
        likeButtonRender();
    }

    function previousSong(){
        if(index === 0){
            index = sortedPlaylist.length -1;
        }
        else{
            index -= 1;
        }
    
        initializeSong();
        playSong();
    }
    function nextSong(){
        if(index === sortedPlaylist.length -1){
            index = 0;
        }
        else{
            index += 1;
        }
    
        initializeSong();
        playSong();
    }


    function updateProgress(){
        const barWidth = (song.currentTime/song.duration)*100;
        currentProgress.style.setProperty('--progress', `${barWidth}%`);
        songTime.innerText = toMMSS(song.currentTime);
    }

    function jumpTo(event){
      const width = progressContainer.clientWidth;
      const clickPosition = event.offsetX;
      const jumpToTime = (clickPosition/width)* song.duration;
      song.currentTime = jumpToTime;
    }

    function shuffleArray(preShuffleArray) {
        const size = preShuffleArray.length;
        let currentIndex = size - 1;
        while (currentIndex >= 0) {
            let randomIndex = Math.floor(Math.random() * size);
            let aux = preShuffleArray[currentIndex];
            preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
            preShuffleArray[randomIndex] = aux;
            currentIndex -= 1;
        }
    }


    

    function shuffleButtonClick() {
        if (isShuffle === false) {
            isShuffle = true;
            shuffleArray(sortedPlaylist);
            shuffleButton.classList.add('button-active');
        }
        else{
            isShuffle = false;
            sortedPlaylist = [...originalPlaylist];
            shuffleButton.classList.remove('button-active');
        }
    }

    function repeatButtonClickead(){
        if (isRepeat === false) {
            isRepeat = true;
            repeatButton.classList.add('button-active');
        }
        else {
            isRepeat = false;
            repeatButton.classList.remove('button-active')
    }
    }

    function nextOrRepeat(){
        if (isRepeat === false){
            nextSong();
        }
    
    else {
        playSong();
    }
}

function toMMSS(originalNumber) {
    let min = Math.floor(originalNumber / 60);
    let secs = Math.floor(originalNumber % 60);
    return `${min.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}



function updateTotalTime() {
    
    totalTime.innerText = toMMSS(song.duration);
}

function likeButtonRender(){
if (sortedPlaylist[index].liked === true){
    likeButton.querySelector('.bi').classList.remove('bi-heart');
    likeButton.querySelector('.bi').classList.add('bi-heart-fill');
    likeButton.classList.add('button-active')
}else{
    likeButton.querySelector('.bi').classList.add('bi-heart');
    likeButton.querySelector('.bi').classList.remove('bi-heart-fill');
    likeButton.classList.remove('button-active')
}
}

function likeButtonClicked(){
    if(sortedPlaylist[index].liked === false){
        sortedPlaylist[index].liked = true;
    }
    else{
        sortedPlaylist[index].liked = false;
    }
    likeButtonRender();
    localStorage.setItem('playlist', JSON.stringify(originalPlaylist)) ;
}






initializeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong );
next.addEventListener('click', nextSong);
song.addEventListener(`timeupdate`, updateProgress);
song.addEventListener('ended', nextOrRepeat);
song.addEventListener('loadedmetadata', updateTotalTime);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonClick);
repeatButton.addEventListener('click', repeatButtonClickead);
likeButton.addEventListener('click', likeButtonClicked)