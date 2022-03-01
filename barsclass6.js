class bars{
    constructor(start,speed,R,G,B)
    {
        this.angle = start
        this.speed = speed
        this.R=R
        this.G=G
        this.B=B
    }

    move(vol,i){
    applyMatrix(1,0,0,1,width/2,height/2)

    noFill()
    stroke(220)
    strokeWeight(2)
    //circle(0,0,200)
    angleMode(DEGREES)
    
    rotate(this.angle+=this.speed)
    translate(100,0)
    //rect(-25,0,random(50),5)
       
    var rev = map(i,0,71,200,255)

    if(vol > 80) stroke(0,0,rev)
    else if(vol > 40) stroke(0,rev,0)
    else stroke(this.R,this.G,this.B)
    rect(-0,10,vol,5)

    resetMatrix()
    }
}