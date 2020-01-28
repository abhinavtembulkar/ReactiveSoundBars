var B = []
var n = 71

var song
var img
var amp
var vol
var vol2

var bins = 256
var strength = 150

var mywidth = 600
var myheight = 600

var angle=0

// function preload(name = "hardbass2") {
//     song = loadSound(`../MUSIC/${name}.mp3`)
// }

function setup(val="hardbass2"){
    createCanvas(mywidth,myheight)
    background(0)

    for(var i=n-1;i>=0;i--)
    {
        B.push(new bars(5*i,1,10*i,0,0))
    }  
    
    song = loadSound(`../MUSIC/${val}.mp3`,typed)
    
    amp = new p5.Amplitude()
    fft = new p5.FFT(0.9,bins)
}

function typed() {
    if(song.isPlaying()) {
        song.stop()
        var val = document.getElementById('my').value;
        setup(val)
    }
    else song.play()
    
    console.log(val)
    //loadSound(val)   
    //song.stop()
    //preload(val)
}

var x=0,y=0,t=0,r=0
function draw(){
    background(0)

    vol2 = map(amp.getLevel(),0,1,0,150)
    spectrum = fft.analyze()

    stroke(255)
    circle(width/2,height/2,100+vol2)

    for(var i=0;i<71;i++)
    {
        var f = map(i,0,bins,1,23714)
        if(fft.getEnergy(f,f+1) >= strength){
            vol = map(spectrum[i],strength,255,1,100)
        }
        else vol=0
        
        B[i].move(vol,i)
    }

}