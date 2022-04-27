let baseURLImage = 'https://oscaraccorsi.github.io/pictures/';
let logo;
let xLogo;

const osc = new Tone.Oscillator();
const pingPong = new Tone.PingPongDelay().toDestination();
const rev = new Tone.Reverb().toDestination;


let time = ['1n', '2n', '4n', '8n', '16n'];
let feed = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8];

let colore = [rndRed, rndGreen, rndBlu, rndMulti];
let choice;

let fr;
let coeff = 4;
let low, high;
let x = 60;
let y;
let dec; //decibel

let r, g, b, alpha;
let min = 150;

let waveForm = ['sine', 'sine2', 'sine3', 'triangle', 'triangle8', 'sine4', 'square'];

//----------------------------------------------------
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//--------------------------------------------preload
function preload() {
  logo = loadImage(baseURLImage + 'good one white.png');
}

//----------------------------------------------------
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(random(5, 60));
  xLogo = windowWidth-40;
  //background(150);
  rectMode(CENTER);
  choice = random(colore);
  r= round(random(0, 255));
  g= round(random(0, 255));
  b= round(random(0, 255));
  alpha= round(random(0, 255));
  noStroke();
  
  //----------------------------------------ping pong
  pingPong.Time = random(time);  
  pingPong.NormalRange = random(feed);
  
  //----------------------------------------osc & rev decay
  osc.frequency.value = fr;
  fr = random(110, 220);
  rev.decay = 2;
  osc.connect(pingPong, rev);
  osc.type = random(waveForm);
  osc.toDestination();
  osc.start();
  
  low = random(30, 110);
  dec = random(-40, -12);  
}

//----------------------------------------------------------

function draw() {
  osc.frequency.value = fr;
  fr -= coeff;
  y = map(fr, 220, 30, 0, height);
  
  choice();
  
  rect(x, y, 70, random(1, 10), 3);
  
  osc.volume.value = dec;
  
  if (fr <= low) {
    // coeff = -coeff;
    resetSketch();  
  }
}

//----------------------------------------color functions
function rndBlu() {
  fill(0, 0, b);
  b= round(random(0, 255));
  if (b < min) {
    noFill();
  }
}
function rndRed() {
