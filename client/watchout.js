// start slingin' some d3 here.



var svgContainer = d3.select(".board").append("svg")
                                    .attr("width", 800)
                                    .attr("height", 650);

var enemiesID = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

var circles = svgContainer.selectAll("circle")
                          .data(enemiesID)
                          .enter()
                          .append("circle");

//Draw the Circle
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
          .attr('cx', function() { return Math.floor(Math.random() * 700) + 40; })
          .attr('cy', function() { return Math.floor(Math.random() * 600) + 40; });
}

setInterval(function() { move(); }, 1000);



var drag = d3.behavior.drag()
             .on('dragstart', function() { dragCircle.style('fill', 'yellow'); })
             .on('drag', function() { dragCircle.attr('cx', d3.event.x)
                                            .attr('cy', d3.event.y); })
             .on('dragend', function() {dragCircle.style('fill', 'black'); });

var dragCircle = svgContainer.selectAll("mouse")
                          .data(["05, 30, 15, 10, 25, 30"])
                          .enter()
                          .append("polygon")
                          .attr("points", function(d) { return d; })
                          .attr("stroke", "blue")
                          .attr("stroke-width", "2")
                          .call(drag)
                          .style("fill", "red");


// create a circle and append it to an SVG
// append SVG to gameboard
// create multiple SVGs to gameboard 
// animate SVGs randomly throughout the gameboard


// function to determine position for where SVG goes 
  // 1. calculate new position where it goes

  // 2. animate the transition 
// settimer to run 



// create our mouse player circle
// append that SVG to gameboard
// make it react to mouse dragging
// keep track of collision paths 
  // reset current score 

// callback function to run at setInterval 
  // update high score dynamically
  // update current score dynamically





