let state = 0;

let btn_pause = [];
let btn_record = [];
let btn_stop = [];
let icon_person;
let stateIndicator = [];

let recordingTime = '00:00:00';
let recordingStartTime;

let peopleNumber = 0;

function preload(){
  detector = m15.objectDetector('cocossd');
  
  videoFrame = LoadImage('img/Rectangle 7.png');
  
  btn_pause[0] = loadImage('img/Group 2.png');
  btn_pause[1] = loadImage('img/Group 5.png');
  btn_record[0] = loadImage('img/Group 4.png');
  btn_record[1] = loadImage('img/Group 3.png');
  btn_record[2] = loadImage('img/Group 3.png');
  btn_record[3] = loadImage('img/Group 3.png');   
  btn_stop[0]= loadImage('img/Group 1.png');
  btn_stop[1]= loadImage('img/Group 6.png');
  
  icon_person = loadImageicon('img/icon_person.png');
  
  stateIndicator[0] = loadImage('img/Group 4.png');
  stateIndicator[1] = loadImage('img/Group 4.png');
  stateIndicator[2] = loadImage('img/Group 1.png');
  stateIndicator[3] = loadImage('img/Group 6.png');
}

function setup() {
  createCanvas(320, 360);
  webcam = createCapture(VIDEO);
  webcam.size(320, 240);
  webcam.hide();
  
  detector.detect(webcam, gotDetections);
  
  
}

function draw() {
  background(0);
  
  drawStatusBar(state);
  drawVideoPreview(0,22,320,240);
  drawCounter(state);
  drawStateIndicator(state);
  drawButtons(state);
}
//==================== 1.Draw Video Preview
function drawVideoPreview(x, y, w, h){
  image(webcam, x, y, w, h);
  image(videoFrame, x, y, w, h);
}
//==================== 2.Draw Buttons
function drawButtons(currentState){
  let pause_stop_button_number = 0;
  if(currentState == 1){
    pause_stop_button_number = 1;
  }  
  image(btn_pause[pause_stop_button_number], 81, 298, 42, 42);
  image(btn_record[currentState], 139, 298, 42, 42);
  image(btn_stop[pause_stop_button_number], 197, 298, 42, 42);
}
//==================== 3.Draw Status Bar
function drawStatusBar(currentState){
  fill(255, 51);
  noStroke();
  rect(2,2,104,20,4);
  rect(118,2,82,20,4);
  rect(212,2,106,20,4);
  
  textFont('Inter');
  textSize(14);
  
  let currentTime = ''+nf(hour(),2,0)+':'+nf(minute(),2,0)+':'+nf(second(),2,0);
  let currentDate = ''+year()+'.'+nf(month(),2,0)+'.'+nf(day(),2,0)+'.';
  
  if(currentState == 0){
    noFill();
    stroke(255,153);
    strokeWeight(2);
    ellipse(16,12,11,11);
    fill(255,153);
    noStroke();
    textAlign(LEFT);
    text(recordingTime, 29, 17);
    textAlign(CENTER);
    text(currentTime, width/2, 17);
    textAlign(LEFT);
    text(currentDate, 222, 17);
  }else if(currentState == 1){
    fill(202,38,38);
    noStroke();
    ellipse(16,12,12,12);
    fill(202,38,38);
    noStroke();
    textAlign(LEFT);
    text(recordingTime, 29, 17);
    fill(255);
    textAlign(CENTER);
    text(currentTime, width/2, 17);
    textAlign(LEFT);
    text(currentDate, 222, 17);
  }else if(currentState == 2){
    noFill();
    stroke(202,38,38);
    strokeWeight(2);
    ellipse(16,12,11,11);
    fill(202,38,38);
    noStroke();
    textAlign(LEFT);
    text(recordingTime, 29, 17);
    fill(255,153);
    textAlign(CENTER);
    text(currentTime, width/2, 17);
    textAlign(LEFT);
    text(currentDate, 222, 17);
  }else if(currentState == 3){
    noFill();
    stroke(255,153);
    strokeWeight(2);
    ellipse(16,12,11,11);
    fill(255,153);
    noStroke();
    textAlign(LEFT);
    text(recordingTime, 29, 17);
    textAlign(CENTER);
    text(currentTime, width/2, 17);
    textAlign(LEFT);
    text(currentDate, 222, 17);
  }
}
//==================== 4.Draw State Indicator
function drawStateIndicator(currentState){
  image(stateIndicator[currentState], 100,260,120,24);
}
//==================== 5.Draw Counter
function drawCounter(currentState){
  fill(255, 51);
  noStroke();
  rect(2,262,60,20,4);
  
  textFont('Inter');
  textSize(14);
  
  if(currentState == 1){
    fill(255);
    textAlign(LEFT);
    text(peopleNumber, 29, 277);
    image(icon_person, 7,264,16,16);
  }else{
    fill(255,153);
    textAlign(LEFT);
    text(peopleNumber, 29, 277);
    tint(255,153);
    image(icon_person, 7,264,16,16);
    tint(255);
  }
}



function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  
  detectedObjects = results;
  detector.detect(webcam, gotDetections);
}
