class Button {
    constructor(){
        this.fillValue = 255;
        this.circleX = width/2
        this.circleY = height/2;
        this.circleRad = 100;
    };

   drawCircle() {
        if(mouseX > (circleX - circleRad/2) 
            && mouseX < (circleX + circleRad/2) 
            && mouseY > (circleY - circleRad/2) 
            && mouseY < (circleY + circleRad/2) 
        ) {
            fillValue = 150; 
        } else {
            fillValue = 255; 
        }
    fill(fillValue);
    stroke(0);
    strokeWeight(6);
    ellipse(width/2,height/2,100);
    textSize(80);
    fill(200,0,0);
    stroke(200,0,0);
    text("Player",width/2-40,height/2+30);
    }
}