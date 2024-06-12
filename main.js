const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
var e = new Ecosystem();

var allGraphs = [
  [], //Plant Species 1
  [], //Plant Species 2
  [], //Heterotroph 1
  [], //Heterotroph 2
  [], //Carnivore 1
]
function setup() {
  animate();
}
var frameNum = 0;
function animate() {
  c.clearRect(0,0,1000,1000);

  e.update(frameNum++);

  drawGraphs();

  if(frameNum == 20) {
    e.populations[3]=3;
  }
}
var running = true;
window.setInterval(()=>{if(running){animate();}}, 100);
window.addEventListener("click", ()=>{running = !running})

function variance() {
  return 1.35 + Math.random()-1;
}
function randomness() {
  return 1.0 + (Math.random()-0.5)/100;
}
function flax( num) {
  return Math.floor(Math.max(1, num));
}
function Ecosystem() {
  this.populations = [600, 400, 30, 20, 6];//2 is the keystone
  this.update = () => {


    this.populations[0] = 1.3  * this.populations[0] + 0.05* (1000-this.populations[0]-this.populations[1]);
    this.populations[0] = this.populations[0] / (1+this.populations[2]/100);
    this.populations[1] = 1.5 * this.populations[1]  + 0.05* (1000-this.populations[0]-this.populations[1]);
    this.populations[1] = this.populations[1] / (1+(this.populations[2]/100 + this.populations[3]/100));
  

    this.populations[2] = this.populations[2] * (this.populations[0]/3000+this.populations[1]/4000 + 1); //increases by 1.3
    this.populations[3] = this.populations[3] * (this.populations[1]/2000 + 1); //increases by 1.2
    this.populations[2] = this.populations[2] / (1+this.populations[4]/20);
    this.populations[3] = this.populations[3] / 1.2;

  
    this.populations[4] = this.populations[4] *(1+this.populations[2]/300); //increase by 1.1
    this.populations[4] /= 1.1;


    for(var i = 0; i<5; i++) {
      allGraphs[i].push(this.populations[i]);
    }
  }
}


var colors = ["black", "blue", "red", "orange", "green", "gray"]
function drawGraphs() {
  mostPoints = 5;
  for(var graph = 0; graph<allGraphs.length; graph++){
    if(allGraphs[graph].length>mostPoints) {mostPoints=allGraphs[graph].length;}
  }
  for(var graph = 0; graph<allGraphs.length; graph++) {
    drawGraph(allGraphs[graph], mostPoints, colors[graph], graph);
  }
}
function drawGraph(points, mostPoints,color, graph) {
  var interval = Math.floor(600/mostPoints);
  for(var index = 0; index<points.length; index++) {
    c.fillStyle=color;
    c.beginPath()
    c.arc(index*interval, (1000-amp(graph)*points[index]), 2, 0, 2*Math.PI);
    c.fill();
    if(index!=0) {
      c.beginPath();
      c.moveTo(index*interval-interval, (1000-amp(graph)*points[index-1]));
      c.lineTo(index*interval, (1000-amp(graph)*points[index]));
      c.stroke();
    }
  }
}
function amp(num) {
  //return 1;
  switch(num){
    case 0:
    case 1: return 1;
    case 2:
    case 3: return 10;
    case 4: return 20;
    default: return 1; 
  }
}
setup();


