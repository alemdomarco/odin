var sideMenuWidth = 300;

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
 
var drawRange = function(measu, max, min) {
  if($('.range-container').length > 0) {
      $('.range-container .max').html(max +' C/s');
      $('.range-container .min').html(min +' C/s');
  } else {
      var rangeContainer = $('<div class="range-container"><div class="ruler-lines"><div class="ruler"></div></div><span class="max">'+ max.toFixed(3) +' '+ measu +'</span><span class="min">'+ min.toFixed(3) +' '+ measu +'</span></div>');
      rangeContainer.appendTo('body');
  }
}

var openSideMenu = function() {
    $('#side-menu').css("width", sideMenuWidth);
    $('#viewport').css("padding-right", sideMenuWidth);
    $('#side-menu').show();
}

var hideSideMenu = function() {
    $('#side-menu').css("width", 0);
    $('#viewport').css("padding-right", 0);
    $('#side-menu').hide();
}

var addSideMenu = function(data) {
    $('#side-menu .container').empty();
    
    if(data.length > 0){
        $.each(data, function(index, item) {
        
            var newItem = $(
                '<div class="menu-item">'+
                	'<div class="field">'+
                		'<div class="field-label">Target</div>'+
                		'<div class="field-value"><b>'+ item.target +'</b></div>'+
                	'</div>'+
                	
                	'<div class="field">'+
                		'<div class="field-label">URI</div>'+
                		'<div class="field-value">'+ item.uri +'</div>'+
                	'</div>'+
                	
                	'<div class="field">'+
                		'<div class="field-label">Method</div>'+
                		'<div class="field-value">'+ item.method +'</div>'+
                	'</div>'+
                	
                	'<div class="field">'+
                		'<div class="field-label">Status</div>'+
                		'<div class="field-value">'+ item.status +'</div>'+
                	'</div>'+
                	
                	'<div class="field">'+
                		'<div class="field-label">Requests</div>'+
                		'<div class="field-value">'+ item.requestcount +'</div>'+
                	'</div>'+
                	
                	'<div class="field">'+
                		'<div class="field-label">Latency</div>'+
                		'<div class="field-value">'+ item.latency +'</div>'+
                	'</div>'+
                '</div>'
            );
            $('#side-menu .container').append(newItem);
        });
    } else {
        $('#side-menu .container').append('<span style="font-size: 14px; color: #666;">No interactions to display.</span>');
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






/*
        var sigmaGraph = sigma.parsers.json('data.json', {
            renderer: {
                container: document.getElementById('container'),
                type: 'canvas'
            },
            settings: {
                edgeLabelSize: 'proportional',
                minEdgeSize: 1,
                maxEdgeSize: 11,
                minNodeSize: 14,
                minNodeSize: 14,
                defaultLabelColor: '#fff',
                borderSize: 3,
                defaultNodeBorderColor: '#fff'
            }
        }, function(s) {
            
            $('#filter').autocomplete({
                source: s.graph.nodes(),
                select: function( event, ui ) {
                    var nodeId = ui.item.id,
                        toKeep = s.graph.neighbors(nodeId);
                    toKeep[nodeId] = ui.item;
            
                    s.graph.nodes().forEach(function(n) {
                        if (toKeep[n.id])
                            n.color = n.originalColor;
                        else
                            n.color = '#3a3e52';
                    });
            
                    s.graph.edges().forEach(function(e) {
                        if (toKeep[e.source] && toKeep[e.target])
                            e.color = e.originalColor;
                        else
                            e.color = '#252a40';
                    });
                    
                    var position = s.graph.goToNodes(toKeep, s.camera);
                    s.camera.goTo({
                        x: position.centerX,
                        y: position.centerY
                    });
                    
                    // Since the data has been modified, we need to
                    // call the refresh method to make the colors
                    // update effective.
                    s.refresh();
                }
            });
            
            var startForceRunning = false;
            $('#orderNodes').button();
            $('#orderNodes').on('click', function(event, ui) {
                if(!startForceRunning) {
                    $('#orderNodes').button('option', 'label', 'Order Nodes');
                    startForceRunning = true;
                    s.startForceAtlas2();
                } else {
                    $('#orderNodes').button('option', 'label', 'stop Ordering');
                    startForceRunning = false;
                    s.stopForceAtlas2();
                }
            });
        
            var rangeVal = getRange(s);
            drawRange(rangeVal.max, rangeVal.min);
        
            // We first need to save the original colors of our
            // nodes and edges, like this:
            s.graph.nodes().forEach(function(n) {
                n.originalColor = n.color;
            });
        
            s.graph.edges().forEach(function(e) {
                e.originalColor = e.color;
            });
        
            // When a node is clicked, we check for each node
            // if it is a neighbor of the clicked one. If not,
            // we set its color as grey, and else, it takes its
            // original color.
            // We do the same for the edges, and we only keep
            // edges that have both extremities colored.
            s.bind('clickNode', function(e) {
                var nodeId = e.data.node.id,
                    toKeep = s.graph.neighbors(nodeId);
                toKeep[nodeId] = e.data.node;
        
                s.graph.nodes().forEach(function(n) {
                    if (toKeep[n.id])
                        n.color = n.originalColor;
                    else
                        n.color = '#3a3e52';
                });
        
                s.graph.edges().forEach(function(e) {
                    if (toKeep[e.source] && toKeep[e.target])
                        e.color = e.originalColor;
                    else
                        e.color = '#252a40';
                });
                
                var position = s.graph.goToNodes(toKeep, s.camera);
                s.camera.goTo({
                    x: position.centerX,
                    y: position.centerY
                });
                
                // Since the data has been modified, we need to
                // call the refresh method to make the colors
                // update effective.
                s.refresh();
            });
        
            // When the stage is clicked, we just color each
            // node and edge with its original color.
            s.bind('clickStage', function(e) {
                s.graph.nodes().forEach(function(n) {
                    n.color = n.originalColor;
                });
        
                s.graph.edges().forEach(function(e) {
                    e.color = e.originalColor;
                });
        
                // Same as in the previous event:
                s.refresh();
            });
        });
        */