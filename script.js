function fullFielf(size){
	var field = document.getElementsByClassName("field")[0];
	for (var i = 0; i < 1200; i++) {
		var cube = document.createElement('div');
		cube.classList.add("cube");
		cube.index = i;
		field.appendChild(cube);
	}
}


function Snake() {
	this.body = [599,598,597];
	this.speed = 3;
	this.direction = "right";
  	this.timerId = null;
	this.food = undefined;

	var checkDirection = function() {
		
		var next;
		var cubes = document.getElementsByClassName("cube");

		switch(this.direction) {
	  	    case 'right':
	    		next = this.body[0] + 1;
	    		break;
	    	case 'left':
	    		next = this.body[0] - 1;
	    		break;
	    	case 'bottom':
	    		next = this.body[0] + 40;
	    		break;
	    	case 'top':
	    		next = this.body[0] - 40;
	    		break;
		}

		if ((next) % 40 == 0 && this.direction == "right") {
			next -= 40;
		}
		if ((next + 1) % 40 == 0 && this.direction == "left") {
			next += 40;
		}
		if (next < 0) next += 1200;
		if (next > 1200) next -= 1200;

		if (this.body.indexOf(next) != -1) {
			var field = document.getElementsByClassName("field")[0];
			field.innerHTML = "Game Over!";
			field.classList.add("gameover");
		}

		this.body.unshift(next);
		cubes[this.body[0]].classList.add("snaked");
		if (this.body[0] != this.food) {
			cubes[this.body.pop()].classList.remove("snaked");
		}
		else {
			cubes[this.food].classList.remove("food");;
		}
  		
  		
  	}.bind(this);

	var run = function() {	
  		checkDirection();
		makeFood();	
  		var j = this.body.length - 1;
  		this.speed = 2 + Math.floor(j / 3);
  		this.timerId = setTimeout(this.go, 400/this.speed);
	}.bind(this);

  
  	this.go = function() {
    	run();
    	//this.timerId = setTimeout(this.go, 100/this.speed);
  	};
  
  	this.stop = function() {
    	clearTimeout(this.timerId);
  	};

  	var makeFood = function() {
  		if (!this.food || this.body.indexOf(this.food) != -1) {
  			this.food = (Math.floor(Math.random() * 1200));
  		}
		var cubes = document.getElementsByClassName("cube");
		cubes[this.food].classList.add("food");
	  	return false;
  	}.bind(this);

}


$(document).ready(function(){
	var size = $('div.field').width();	
	var field = fullFielf(size);
	var snake = new Snake();
	$("#new_game").on('click', function() {
		snake.go();
	});
	$("#pause_game").on('click', function() {
		snake.stop();
	});

	document.onkeydown = function(e) {
		switch (e.keyCode) {
			case 37:
				snake.direction = "left";
				break;
			case 38:
				snake.direction = "top";
				break;
			case 39:
				snake.direction = "right";
				break;
			case 40:
				snake.direction = "bottom";
				break;
		}
	}

	$("#up").on('click', function() {
		snake.direction = "top";
	});
	$("#down").on('click', function() {
		snake.direction = "bottom";
	});
	$("#left").on('click', function() {
		snake.direction = "left";
	});
	$("#right").on('click', function() {
		snake.direction = "right";
	});


});