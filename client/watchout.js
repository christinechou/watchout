// start slingin' some d3 here.
// var gameOptions = 
//   height: 700
//   width: 700
//   nEnemies: 30
//   padding: 20



// var enemy = function() {
//   this.age = 5;

// }


var svgContainer = d3.select(".board").append("svg")
                                    .attr("width", 700)
                                    .attr("height", 600);

var enemiesID = [1, 2, 3, 4, 5, 6, 7, 8, 9];

var circles = svgContainer.selectAll("circle")
                          .data(enemiesID)
                          .enter()
                          .append("circle");

//Draw the Circle
var circleAttributes = circles
                       .attr("cx", function() {
                        return Math.random() * 700 - 40;
                       })
                       .attr("cy", function() {
                        return Math.random() * 600 - 40;
                       })
                       .attr("r", 15)
                       .style("fill", "red");

var top = Math.random() * 200 - 40;
var left = Math.random() * 200 - 40;

function move() {
   circles.transition()
          .duration(1000)
          .attr('cx', function() { return Math.random() * 700 - 40; })
          .attr('cy', function() { return Math.random() * 600 - 40; });
}

setInterval(function() { move(); }, 1000);


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





