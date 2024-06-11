const prev10Btn = document.getElementById("prev10sec");
const prevBtn = document.getElementById("prev__btn");
const playBtn = document.getElementById("play__btn");
const nextBtn = document.getElementById("next__btn");
const forward10Btn = document.getElementById("forward10Sec");
const volumeBtn = document.querySelector(".voulume");

const songEl = document.getElementById("song");

const imageEl = document.getElementById("song__image");
const titleEl = document.getElementById("title");
const artistEl = document.getElementById("artist");

const progressContainerEl = document.getElementById("progress-container");
const progressEl = document.getElementById("progress");

const progressAudioBarEl = document.getElementById("progress-bar-audio");
const progressAudioEl = document.getElementById("progress-audio");

const currentTimeEl = document.getElementById("current__time");
const durationEl = document.getElementById("duration");

const playlist = document.getElementById("playlist");

// Veri
const songs = [
    {
        name: "glimpse-of-us",
        artist: "Joji",
        title: "Glimpse of Us",
        duration: "3:53",
    },
    {
        name: "fourth-of-july",
        artist: "Sufjan Stevens",
        title: "Fourth of July",
        duration: "4:38",
    },
    {
        name: "indigo-night",
        artist: "Tamino",
        title: "Indigo Night",
        duration: "4:14",
    },
    {
        name: "remembrance",
        artist: "Balmorhea",
        title: "Remembrance",
        duration: "5:59",
    },
    {
        name: "summertime-sadness",
        artist: "Lana del Rey",
        title: "Summertime Sadness",
        duration: "3:25",
    },
    {
        name: "i-know-i-am-not-the-only-one",
        artist: "Sam Smith",
        title: "I Know I'm Not The Only One",
        duration: "3:57",
    },
];

let isPlaying = false;
let songIndex = 0;
const prevSong = () => {
    songIndex = songIndex > 0 ? songIndex - 1 : songs.length - 1;
    displaySong()
}
const nextSong = () => {
    songIndex = songIndex === songs.length - 1 ? 0 : songIndex + 1
    displaySong()
}
const playSong = () => {
    isPlaying = true;
    songEl.play()
    playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
}
const pauseSong = () => {
    isPlaying = false;
    songEl.pause()
    playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
}
prevBtn.addEventListener("click", prevSong)
nextBtn.addEventListener("click", nextSong)
playBtn.addEventListener("click", () => {
    isPlaying ? pauseSong() : playSong()
})

const displaySong = () => {
    const song = songs[songIndex];
    songEl.src = `audio/${song.name}.mp3`;
    imageEl.src = `images/${song.name}.jpeg`;
    titleEl.textContent = song.title;
    artistEl.textContent = song.artist;
    playSong()
}

songEl.addEventListener("timeupdate", (e) => {
    const { duration, currentTime } = e.target;

    const progressPercent = (currentTime / duration) * 100;
    progressEl.style.width = `${progressPercent}%`;
    let timeMinute = Math.floor(duration / 60)
    let timeSecond = Math.floor(duration % 60)
    durationEl.innerHTML = `${timeMinute}:${String(timeSecond).padStart(2, '0')}`;
    if (!timeSecond || !timeMinute) return;

    let currentMinute = Math.floor(currentTime / 60)
    let currentSecond = Math.floor(currentTime % 60)

    currentTimeEl.innerHTML = `${currentMinute}:${String(currentSecond).padStart(2, '0')}`;
    durationEl.textContent = `${timeMinute}:${timeSecond}`
    progressEl.style.width = `${(currentTime / duration) * 100}%`;
})

songEl.addEventListener("ended", () => {
    nextSong()
    displaySongList()
})
progressContainerEl.addEventListener("click", function (e) {
    const width = this.clientWidth;
    const clicked = e.offsetX;
    const { duration } = songEl;
    songEl.currentTime = (clicked / width) * duration;
});

prev10Btn.addEventListener("click", function (e) {
    songEl.currentTime -= 10

})

forward10Btn.addEventListener("click", function (e) {
    songEl.currentTime += 10
})

const displaySongList = () => {
    playlist.innerHTML = "";
    songs.forEach((song, index) => {
        const songItems = document.createElement("li");
        const itemsSpanName = document.createElement("span");
        const itemsSpanDuration = document.createElement("span");

        songItems.className =
            "hover:font-bold cursor-pointer flex justify-between text-xs mb-2 text-gray-600";
        itemsSpanName.innerText = song.title;
        itemsSpanDuration.innerText = song.duration;

        if (songIndex === index) {
            songItems.classList.add("font-bold", "text-red-600");
        } else {
            songItems.classList.remove("font-bold", "text-red-600");
        }

        songItems.insertAdjacentElement("afterbegin", itemsSpanName);
        songItems.insertAdjacentElement("beforeend", itemsSpanDuration);

        songItems.addEventListener("click", () => {
            songIndex = index;
            displaySong();
            displaySongList();
        });

        playlist.append(songItems);
    });
};

const toggleMute = () => {
    volumeBtn.innerHTML = ""
    if (songEl.muted) {
        songEl.muted = false;
        volumeBtn.innerHTML = `<i class="fa-solid fa-volume-up"></i>`;
    } else {
        songEl.muted = true;
        volumeBtn.innerHTML = `<i class="fa-solid fa-volume-mute"></i>`;
    }
};

volumeBtn.addEventListener("click", toggleMute);
displaySongList();
