//  Drawing Multiple Animated Circles

var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

var mouse = {
	x: undefined,
	y: undefined	
}

var maxRadius = 60;

var colorArray = [
	'#D83028',
	'#1D2A35',
	'#ABD6D9',
	'#D72B27',
	'#91A0A1'
];

var circleArray = [];

window.addEventListener('mousemove', function(event){
	mouse.x = event.x;
	mouse.y = event.y;
});

window.addEventListener('resize', function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
	init();
});

// ** Circle Object **
  function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
	this.minRadius = radius;
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  }

  Circle.prototype.draw = function(){
    c.beginPath();    //Separates circle from previous line so they don't connect to each other
    c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
	c.fillStyle = this.color;
    c.fill();
  }

  Circle.prototype.update = function(){

    //Changes Directions
    if((this.x + this.radius) > innerWidth || (this.x - this.radius) < 0)
      this.dx = -this.dx;
    if((this.y + this.radius) > innerHeight || (this.y - this.radius) < 0)
      this.dy = -this.dy;

    //Changes the X & Y coordinates
    this.x += this.dx;
    this.y += this.dy;

	//Interactivity
	//If the circle is +/-50px in distance from the mouse pointer position in both the x & y axis
	if((mouse.x - this.x) < 50 && (mouse.x - this.x) > -50 && (mouse.y - this.y) < 50 && (mouse.y - this.y) > -50){
		if(this.radius < maxRadius)		      //If circle's radius is less than 'maxRadius'
			this.radius += 1;			      //Increase circle's radius
	}else if(this.radius > this.minRadius){	  //In all other cases when radius of circle greater than 'minRadius' (except +/-50px distance from mouse pointer)
		this.radius -= 1;				      //Decrease circle's radius
	}
	
    this.draw();
  }

  // ** End of Circle Object **

  
  function init(){
	  
	  circleArray = [];		//Emptying array
	  
	  // Circles Array with 1500 different circles
	  for(var i = 0; i<1500; i++){

		//Constant Circle Radius
		var radius = Math.floor(Math.random() * 3) + 1;

		//Random Location in the X/Y Axis
		var x = Math.random() * ((innerWidth - (radius * 2)) + radius);
		var y = Math.random() * ((innerWidth - (radius * 2)) + radius);

		//Radom Velocity
		var dx = Math.random() - 0.5;     //We either get (1 - 0.5) = 0.5   ||    (0 - 0.5) = -0.5
			dx *= 5;    				  //Multiply speed by a factor of 5
		var dy = Math.random() - 0.5;
			dy *= 5;

		circleArray[i] = new Circle(x, y, dx, dy, radius);
	  }
  }

  //  Animation Recursive function
  function animate(){

    c.clearRect(0,0,innerWidth,innerHeight);      //Clear Whole Canvas

    //  Draw all 1500 Circles in the array
    for(var i = 0; i < circleArray.length; i++){
      circleArray[i].update();
    }

    requestAnimationFrame(animate);             //Recursive call to itself
  }

  init();
  animate();
