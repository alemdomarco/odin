var getRange = function(sigmaVar) {
  var maxS = 0,
      minS = Number.MAX_VALUE;
   
  sigmaVar.graph.edges().forEach(function(e) {
      if(e.size > maxS) {
          maxS = e.size;
      }
      
      if(e.size < minS) {
          minS = e.size;
      }
  });
  
  return {"max": maxS, "min": minS};
}
 
var drawRange = function(max, min) {
  if($('.range-container').length > 0) {
      $('.range-container .max').html(max +' C/s');
      $('.range-container .min').html(min +' C/s');
  } else {
      var rangeContainer = $('<div class="range-container"><div class="ruler-lines"><div class="ruler"></div></div><span class="max">'+ max +' C/s</span><span class="min">'+ min +' C/s</span></div>');
      rangeContainer.appendTo('body');
  }
}
 
 
 
 
/**
* This example shows the available edge label renderers for the canvas
* renderer.
*/
/*
var i,
s,
N = 100,
E = 200,
g = {
nodes: [],
edges: []
};
// Generate a random graph:
for (i = 0; i < N; i++)
g.nodes.push({
id: 'n' + i,
label: 'Node ' + i,
x: Math.random(),
y: Math.random(),
size: Math.random(),
color: '#9fe584'//'#'+Math.floor(Math.random()*16777215).toString(16)
});
for (i = 0; i < E; i++) {
var rand = Math.random();
var eR = Math.floor(255*rand);
var eB = Math.floor(255-(255*rand));
var eSize = Math.floor(rand*10)+1;

g.edges.push({
id: 'e' + i,
label: 'Edge ' + i,
source: 'n' + (Math.random() * N | 0),
target: 'n' + (Math.random() * N | 0),
size: Math.floor(Math.random()*10)+1,
color: 'rgb('+ eR +','+ 0 +','+ eB +')',
type: 'curvedArrow'//['line', 'curve', 'arrow', 'curvedArrow'][Math.random() * 4 | 0]
});
}

// Instantiate sigma:
s = new sigma({
graph: g,
renderer: {
container: document.getElementById('container'),
type: 'canvas'
},
settings: {
edgeLabelSize: 'proportional',
minEdgeSize: 1,
maxEdgeSize: 1,
minNodeSize: 1,
minNodeSize: 2
}
});

s.startForceAtlas2();

//console.log(JSON.stringify(g));
*/