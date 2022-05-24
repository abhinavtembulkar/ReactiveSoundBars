const search = document.getElementById('search')
const play = document.getElementById('play')
const inp = document.getElementById("get-files");
const test = document.getElementById("test")
const songs = document.getElementById("songs")
const snacker = document.getElementById("snackbar");

var B = []
var n = 71

var song
var img
var amp
var vol
var vol2

var bins = 256
var strength = 150

const isMobile = navigator?.userAgentData?.mobile;
const mywidth = isMobile ? screen.availWidth / 2 : screen.availWidth
const myheight = isMobile ? 5 * screen.availHeight / 8 : screen.availHeight
test.innerText = `${isMobile}`

var angle = 0

play.onclick = (event) => {
    togglePlay()
}

inp.onchange = (event) => {
    console.log(event)
    song.stop()
    song = loadSound(event.target.files[0], typed)
    const dropdown = document.createElement("option")
    const songname = event.target.files[0].name
    dropdown.text = songname.substr(0, 8)
    songs.add(dropdown)
}

songs.oninput = (event) => {
    console.log(event.target.value)
    song.stop()
    song = loadSound(`./MUSIC/${event.target.value}.mp3`, typed)
}

function setup(val = "hardbass2") {

    createCanvas(mywidth, myheight)

    background(0)

    alerter_show()

    for (var i = n - 1; i >= 0; i--) {
        B.push(new bars(5 * i, 1, 10 * i, 0, 0))
    }

    song = loadSound(`./MUSIC/${val}.mp3`, typed)

    amp = new p5.Amplitude()
    fft = new p5.FFT(0.9, bins)
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

var x = 0, y = 0, t = 0, r = 0
function draw() {
    background(0)

    vol2 = map(amp.getLevel(), 0, 1, 0, 150)
    spectrum = fft.analyze()

    stroke(255)
    circle(width / 2, height / 2, 100 + vol2)

    for (var i = 0; i < 71; i++) {
        var f = map(i, 0, bins, 1, 23714)
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
    setTimeout(() => { snacker.className = "" }, 1000)
}