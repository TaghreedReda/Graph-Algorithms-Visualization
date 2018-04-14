function removeFromArray(arr,el){
  for (var i=arr.length-1;i>=0;i--){
    if (arr[i]==el){
      arr.splice(i,1);
    }
  }
}

function heuristic(a,b){
  var di=dist(a.i,a.j,b.i,b.j);
  // var di=abs(a.i-b.i+a.j-b.j);
  return di;
}
var nosol=false;
var cols=20, rows=20;
var grid=new Array(cols),openSet=[],closedSet=[],
start,end,w,h;
var path =[];

function Spot(i,j){

           this.i=i;
         this.j=j;
       this.f=0;
    this.g=0;
  this.h=0;
  this.neighbors=[];
this.previous=undefined;
this.wall=false;

if (random(1)<0.3){
  this.wall=true;
}

  this.addNeighbors=function(grid){
    var i= this.i;
    var j= this.j;
    if (i< rows-1){
    this.neighbors.push(grid[i+1][j]);
    }
    if (i>0){
    this.neighbors.push(grid[i-1][j]);
    }
    if(j<cols-1){
    this.neighbors.push(grid[i][j+1]);
    }
    if (j>0){
    this.neighbors.push(grid[i][j-1]);
    }
    if (i>0 && j>0){
      this.neighbors.push(grid[i-1][j-1]);
    }
    if (i< rows-1 && j>0){
      this.neighbors.push(grid[i+1][j-1]);
    }
    if (i>0 && j<rows-1){
      this.neighbors.push(grid[i-1][j+1]);
    }
    if (i<rows-1  && j<cols-1){
      this.neighbors.push(grid[i+1][j+1]);
    }

  }

  this.show=function(col){
  fill(col);
 // strokeWeight(0.5);
   //stroke(col);
  if (this.wall){
    fill(0);
    //strokeWeight(0.5);
   //stroke(0);
  }
 
  rect(this.i * w,this.j * h,w-1,h-1);
}
}
function setup() {
  createCanvas(600,600);
 console.log('Dijkstra');
 
 w=width/cols; h=height/rows;

 for(var i =0 ;i < cols ;i++){
   grid[i]=new Array(rows);
 }
 for(var i =0 ;i < cols ;i++){
 for (var j=0 ;j<rows ;j++){
   grid[i][j]= new Spot(i,j);
   
 }
}

for(var i =0 ;i < cols ;i++){
  for (var j=0 ;j<rows ;j++){
    grid[i][j].addNeighbors(grid);
  }
 }

 start=grid[0][0];
 end=grid[cols-1][rows-1];

start.wall=false;
end.wall=false;

 openSet.push(start);

 console.log(grid);
}

function draw() {
 
  if (openSet.length>0){
    var winner=0;
    for(var i=0;i<openSet.length;i++){
      if (openSet[i].f<openSet[winner]){
         winner=i;
      }
    }
  
  var current=openSet[winner];
  if (current===end){
     noLoop();
  
     console.log("DONNNE, DUDE!");
  }

  closedSet.push(current);
  removeFromArray(openSet,current);
   
  var neighbors=current.neighbors;
  for (var i=0;i<neighbors.length;i++){
   
    var neighbor=neighbors[i];
   
    if (!closedSet.includes(neighbor)&& !neighbor.wall){
       var tmpg=current.g +1;
   
       var newpath=false;
       if (openSet.includes(neighbor)){
   
        if (tmpg<neighbor.g){
   
          neighbor.g=tmpg;
          newpath=true;
       }
      }
      else {
        neighbor.g=tmpg;
        newpath=true;
        openSet.push(neighbor);
      }
      if (newpath){
      neighbor.h=heuristic(neighbor,end);
      neighbor.f=neighbor.g+neighbor.h;
      neighbor.previous=current;
      }
    }
  }

  }
  else
  {
    nosol=true;
   console.log("NO SOLUTION !");
   noLoop;
  }
  background(255);

  for (var i=0;i<cols;i++){
    for (var j=0 ;j<rows;j++){
      grid[i][j].show(color(255));
    }
  }
  for (var i=0 ; i<closedSet.length;i++){
    closedSet[i].show(color(237,228,255));
  }

  for (var j=0 ;j < openSet.length ; j++){
   openSet[j].show(color(253,211,0));
  }
 
  if (!nosol){
  path =[];
  var tmp=current;
  path.push(tmp);
  while(tmp.previous){
    path.push(tmp.previous);
    tmp=tmp.previous;
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////

  for (var i=0; i<path.length;i++){
  path[i].show(color(201,5,46));
}

/*0
noFill();
 stroke(255);
 strokeWeight(3);
 //beginShape();
 for (var i=0; i<path.length;i++){
  vertex(path[i].i*w,path[i].j*h);
}
//endshape();
*/


}