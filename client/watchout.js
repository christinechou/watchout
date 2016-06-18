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
                       .attr('class', 'enemy')
                       .style("fill", "red");

var top = Math.random() * 200 - 40;
var left = Math.random() * 200 - 40;

function move() {
  circles.transition()
          .duration(1000)
          // .tween('track-position', tracker)
          .attr('cx', function() { return Math.floor(Math.random() * 700) + 40; })
          .attr('cy', function() { return Math.floor(Math.random() * 600) + 40; })
          .tween('custom', tweenWithCollisionDetection)
          .each('end', move);
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
    .data(num, function(d) { return d; })
    .text(function(d) { return d; });
  col
    .enter()
    .append('span')
    .text(function(d) { return d; });
  col
    .exit()
    .remove();
};

var counter = 0;

setInterval (function() { update([counter++]); }, 500);

////////////////////////////// Collision Detection

// function to calculate pythagorean theorem
var distance = function(mouseX, mouseY, enemyX, enemyY)  {
  return Math.sqrt(Math.pow((enemyY - mouseY), 2) + Math.pow((enemyX - mouseX), 2));
};

var tweenWithCollisionDetection = function(endData) {
  var enemy = d3.select(this);
  return collision(enemy, onCollision);
};

var collision = function(enemy, collidedCallback) {
  var player = d3.select('svg').select('.draggableCircle');
  var playerCoord = player[0][0].getBBox();
  var mouseX = playerCoord.x;
  var mouseY = playerCoord.y;
  // console.log(enemy[0]);

    var separation = distance(mouseX, mouseY, enemy[0][0].getBBox().x, enemy[0][0].getBBox().y);
    if (separation < 35) {
      collidedCallback();
    }
};

var onCollision = function() {
  //complete: update scores
  counter = 0;
  update([counter++]);

};



// function to detect collision
  // grab mouse current locations with d3
  // iterate through enemy circles
    // grab each of the enemy coordinates 

    // apply coordinate to distance 
    // if distance is < 15

      // add to collisions count
      // if this current score is > high score
        // set high score to current score
    // reset current score to 0 

// function collide() {
//     node = this.node();
//     nodeBox = node.getBBox();
//     nodeLeft = nodeBox.x;
//     nodeRight = nodeBox.x + nodeBox.width;
//     nodeTop = nodeBox.y;
//     nodeBottom = nodeBox.y + nodeBox.height;

//     d3.selectAll("circle")
//         .attr("fill", function() {
//             if (this !== node) {
//                 otherBox = this.getBBox();
//                 otherLeft = otherBox.x;
//                 otherRight = otherBox.x + otherBox.width;
//                 otherTop = otherBox.y;
//                 otherBottom = otherBox.y + otherBox.height;

//                 collideHoriz = nodeLeft ; otherRight && nodeRight; otherLeft;
//                 collideVert = nodeTop ; otherBottom && nodeBottom; otherTop;

//                 if ( collideHoriz && collideVert) {
//                     return "tomato";
//                 } else {
//                     return "none"
//                 }

//             } else {
//                 return "none";
//             }
//         });
// }





