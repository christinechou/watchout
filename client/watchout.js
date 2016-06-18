// start slingin' some d3 here.

/////////////////////////////// Set GameBoard 

var svgContainer = d3.select(".board")
                     .append("svg")
                     .attr("width", 1000)
                     .attr("height", 600);

/////////////////////////////// Create Enemies

var enemiesID = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

var circles = svgContainer.selectAll("circle")
                          .data(enemiesID)
                          .enter()
                          .append("svg:image");

var circleAttributes = circles
                       .attr("x", function() { return Math.random() * 950 - 40; })
                       .attr("y", function() { return Math.random() * 500 - 40; })
                       .attr('width', 35)
                       .attr('height', 59)
                       .attr("xlink:href", "../img/rsz_jellyfish-purple.png")
                       .attr('class', 'enemy')
                       .style("fill", "red");

var top = Math.random() * 200 - 40;
var left = Math.random() * 200 - 40;

// var t = d3.transition() 
//           .duration(200)
//           .ease(d3.easeLinear);

function move() {
  circles.transition()
          .duration(1000)
          // .tween('track-position', tracker)
          .attr('x', function() { return Math.floor(Math.random() * 950) + 40; })
          .attr('y', function() { return Math.floor(Math.random() * 500) + 40; })
          .tween('custom', tweenWithCollisionDetection)
          .each('end', move);
}

setInterval(function() { move(); }, 1000);


/////////////////////////////// Create mouse

var drag = d3.behavior.drag()
             .on('drag', function() { dragCircle.attr('x', d3.event.x - 45)
                                                .attr('y', d3.event.y - 45); });

var dragCircle = svgContainer.selectAll(".draggableCircle")
                          .data([{x: 500, y: 275}])
                          .enter()
                          .append("svg:image")
                          .attr('class', 'draggableCircle')
                          .attr('x', function(d) { return d.x; })
                          .attr('y', function(d) { return d.y; })
                          .attr('height', 52)
                          .attr('width', 75)
                          // .attr('r', function(d) { return d.r; })
                          .attr('xlink:href', '../img/rsz_nemo.png')
                          // .attr("transform", "translate(" + x + "," + y + ")")
                          .call(drag);


/////////////////////////////// Set current score counter

var update = function(scoreType, num) {
  var col = d3.select(scoreType)
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

setInterval (function() { update('.current', [counter++]); }, 500);

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

  var separation = distance(mouseX - 45, mouseY - 45, enemy[0][0].getBBox().x, enemy[0][0].getBBox().y);
  if (separation < 50) {
    collidedCallback();
  }
};

var collisionCount = 0;
var highScore = 0;

var onCollision = function() {
  // update high score
  if (counter > highScore) {
    highScore = counter;
    update('.highscore', [counter]);
  } 
  // update current score
  counter = 0;
  update('.current', [counter++]);
  //high score

  // update collision
  update('.collisions', [++collisionCount]);
};

