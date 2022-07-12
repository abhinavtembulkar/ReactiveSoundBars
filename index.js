const search = document.getElementById('search')
const play = document.getElementById('play')
const inp = document.getElementById("get-files");
const songs = document.getElementById("songs")
const snacker = document.getElementById("snackbar");

let B = []
let n = 71

let song
let img
let amp
let vol
let vol2

let bins = 256
let strength = 150

const isMobile = navigator?.userAgentData?.mobile;
const mywidth = isMobile ? screen.availWidth : screen.availWidth / 2
const myheight = isMobile ? screen.availHeight : 5 * screen.availHeight / 8

let angle = 0

play.onclick = (event) => {
    togglePlay()
}

inp.onchange = (event) => {
    console.log(event)
    song.stop()
    alerter_show()
    song = loadSound(event.target.files[0], typed, failed, loading)
    const dropdown = document.createElement("option")
    const songname = event.target.files[0].name
    dropdown.text = songname.substr(0, 8)
    songs.add(dropdown)
}

songs.oninput = (event) => {
    alerter_show()
    console.log(event.target.value)
    song.stop()
    song = loadSound(`./MUSIC/${event.target.value}.mp3`, typed, failed, loading)
}

function setup(val = "hardbass2") {

    createCanvas(mywidth, myheight)
    background(0)
    alerter_show()

    for (let i = n - 1; i >= 0; i--) {
        B.push(new bars(5 * i, 1, 10 * i, 0, 0))
    }

    song = loadSound(`./MUSIC/${val}.mp3`, success, failed, loading)

    amp = new p5.Amplitude()
    fft = new p5.FFT(0.9, bins)
}

const success = () => {
    console.log('SUCCESS');
    snacker.innerHTML = "Tap here to play";
    snacker.onclick = () => {
        song.play();
        alerter_hide();
    }
}

const failed = () => {
    snacker.innerHTML = "Failed to load song, reload page";
    console.log('FAILED');
}

const loading = (progress) => {
    snacker.innerHTML = `Loading... ${(progress * 100).toFixed(0)} %`;
}

function typed() {
    if (song.isPlaying()) {
        song.stop()
        const val = search.value;
        setup(val)
    }
    else {
        song.play()
        alerter_hide()
    }
}

function togglePlay() {
    if (song.isPlaying()) {
        song.pause()
        play.innerText = 'Play'
    }
    else {
        song.play()
        play.innerText = 'Pause'
    }
}

let x = 0, y = 0, t = 0, r = 0
function draw() {
    background(0)

    vol2 = map(amp.getLevel(), 0, 1, 0, 150)
    spectrum = fft.analyze()

    stroke(255)
    circle(width / 2, height / 2, 100 + vol2)

    for (let i = 0; i < 71; i++) {
        let f = map(i, 0, bins, 1, 23714)
        if (fft.getEnergy(f, f + 1) >= strength) {
            vol = map(spectrum[i], strength, 255, 1, 100)
        }
        else vol = 0

        B[i].move(vol, i)
    }
}

function alerter_show() {
    snacker.className = "show"
}

function alerter_hide() {
    snacker.className = ""
}