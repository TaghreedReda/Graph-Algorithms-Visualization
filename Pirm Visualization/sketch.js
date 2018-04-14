
var vertices=[ ],dd=0;
function setup() {
  createCanvas(2000,1000);
}

function mousePressed() {
  var v=createVector(mouseX,mouseY);
  vertices.push(v);
}

function draw() {
  d=0;
  background(245,245,245);
  fill (0,115,229);
  textSize(20);
  text('Cost = '+dd,1800,960);
  dd = 0;
  var reached=[];
  var unreached=[];

  for (var i=0 ; i<vertices.length;i++){
    unreached.push(vertices[i]);
  }

  reached.push(unreached[0]);
       unreached.splice(0,1);

   while (unreached.length>0){
    var rec=100000;
    var rIndex,uIndex;
  for (var i=0;i<reached.length;i++){
        for (var j=0 ;j<unreached.length;j++){
          var ri=reached[i];
          var ui=unreached[j];
          var d=dist(ri.x,ri.y,ui.x,ui.y);

          if (d<rec){
            rec=d;
            rIndex=i;
            uIndex=j;
          }
        }
  }
 
  fill(125,220,31);
  line(reached[rIndex].x,reached[rIndex].y,unreached[uIndex].x,unreached[uIndex].y);
  dd+=d;
  reached.push(unreached[uIndex]);
  unreached.splice(uIndex,1);

}     

  for (var i=0 ; i<vertices.length;i++){
   
    fill(125,220,31);
   // stroke (255);
    ellipse(vertices[i].x,vertices[i].y,30,30);

    fill (68);
    textSize(14);
    text(i,vertices[i].x-6,vertices[i].y-5,15,15);
  
    
  }

 

}