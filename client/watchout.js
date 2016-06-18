// start slingin' some d3 here.

/////////////////////////////// Set GameBoard 

var svgContainer = d3.select(".board")
                     .append("svg")
                     .attr("width", 800)
                     .attr("height", 650);

/////////////////////////////// Create Enemies

var enemiesID = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

var circles = svgContainer.selectAll("circle")
                          .data(enemiesID)
                          .enter()
                          .append("circle");

var circleAttributes = circles
                       .attr("cx", function() { return Math.random() * 800 - 40; })
                       .attr("cy", function() { return Math.random() * 700 - 40; })
                       .attr("r", 15)
                       .style("fill", "red");

var top = Math.random() * 200 - 40;
var left = Math.random() * 200 - 40;

function move() {
  circles.transition()
          .duration(1000)
          .tween('track-position', tracker)
          .attr('cx', function() { return Math.floor(Math.random() * 700) + 40; })
          .attr('cy', function() { return Math.floor(Math.random() * 600) + 40; });
}

setInterval(function() { move(); }, 1000);


/////////////////////////////// Create mouse

var drag = d3.behavior.drag()
             .on('dragstart', function() { dragCircle.style('fill', 'yellow'); })
             .on('drag', function() { dragCircle.attr('cx', d3.event.x)
                                                .attr('cy', d3.event.y); })

             .on('dragend', function() { dragCircle.style('fill', 'black'); });

var dragCircle = svgContainer.selectAll(".draggableCircle")
                          .data([{x: 350, y: 350, r: 15}])
                          .enter()
                          .append("svg:circle")
                          .attr('class', 'draggableCircle')
                          .attr('cx', function(d) { return d.x; })
                          .attr('cy', function(d) { return d.y; })
                          .attr('r', function(d) { return d.r; })
                          // .attr("transform", "translate(" + x + "," + y + ")")
                          .call(drag)
                          .style("fill", "black");


/////////////////////////////// Set current score counter

var update = function(num) {
  var col = d3.select('.current')
    .selectAll('span')
    .data(num, function(d) {return d; })
    .text(function(d) {return d });
  col
    .enter()
    .append('span')
    .text(function(d) {return d});
  col
    .exit()
    .remove();
};

var counter = 0;

setInterval (function() { update([counter++]); });

////////////////////////////// Collision Detection

function collide() {
    node = this.node();
    nodeBox = node.getBBox();
    nodeLeft = nodeBox.x;
    nodeRight = nodeBox.x + nodeBox.width;
    nodeTop = nodeBox.y;
    nodeBottom = nodeBox.y + nodeBox.height;

    d3.selectAll("circle")
        .attr("fill", function() {
            if (this !== node) {
                otherBox = this.getBBox();
                otherLeft = otherBox.x;
                otherRight = otherBox.x + otherBox.width;
                otherTop = otherBox.y;
                otherBottom = otherBox.y + otherBox.height;

                collideHoriz = nodeLeft &lt; otherRight &amp;&amp; nodeRight &gt; otherLeft;
                collideVert = nodeTop &lt; otherBottom &amp;&amp; nodeBottom &gt; otherTop;

                if ( collideHoriz &amp;&amp; collideVert) {
                    return "tomato";
                } else {
                    return "none"
                }

            } else {
                return "none";
            }
        });
}






