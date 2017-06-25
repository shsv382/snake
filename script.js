function fullFielf(size){
	var fld = [];
	for (var i=0; i<30; i++) {
		fld[i] = [];
		for (var j = 0; j<40; j++) {
			fld[i][j] = {
				content: " ",	//Math.floor(Math.random()*9),
				top: i,
				left: j
			};
			addDiv(fld[i][j], size);
		}
	}
	return fld;
}

function addDiv(fld, size){
	$("div.field").append('<div class="cube" id="div-' + fld.left + '-' + fld.top + '"></div>');
	/*$("div#div-" + fld.left + "-" + fld.top).css('width', '2.5%');
	$("div#div-" + fld.left + "-" + fld.top).css('height', '2.5%');
	//$("div#div-" + fld.left + "-" + fld.top).css('top', fld.top*size/80);	
	//$("div#div-" + fld.left + "-" + fld.top).css('left', fld.left*size/80);
	$("div#div-" + fld.left + "-" + fld.top).css('padding', '0');
	$("div#div-" + fld.left + "-" + fld.top).css('margin', '0');*/
}


function Snake() {
	this.body = [[20,20]];
	this.speed = 3;
	this.direction = "right";
  	this.timerId = null;
	this.food = [];

	var checkDirection = function() {
		switch(this.direction) {
	  	    case 'right':
	    		this.body[0][0]++;
	    		break;
	    	case 'left':
	    		this.body[0][0]--;
	    		break;
	    	case 'bottom':
	    		this.body[0][1]++;
	    		break;
	    	case 'top':
	    		this.body[0][1]--;
	    		break;
		}
	}.bind(this);

	var renewal = function() {
		if (this.body[0][0] == 40) this.body[0][0] = 0;
		if (this.body[0][1] == 40) this.body[0][1] = 0;
		if (this.body[0][0] == -1) this.body[0][0] = 39;
		if (this.body[0][1] == -1) this.body[0][1] = 39;
	}.bind(this);

	var stepResults = function() {
		console.log(this.body.toString());
		console.log("Food: " + this.food);
		console.log("Speed: " + this.speed);
	}.bind(this)

	var run = function() {	
		checkDirection();
		renewal();
		stepResults();				
    	$("#div-" + this.body[0][0] + "-" + this.body[0][1]).addClass("snaked");
  	}.bind(this);

  
  	this.go = function() {
    	run();
    	this.timerId = setInterval(this.go, 1000/this.speed);
  	};
  
  	this.stop = function() {
    	clearTimeout(this.timerId);
  	};

  	this.makeFood = function() {
  		this.food = [];
  		for (var i = 0; i < 2; i++) {
  			this.food.push(Math.floor(Math.random() * 40));
  		}
  		for (i = 0; i < this.body.length; i++) {
		    if (this.body[i] == this.food) this.makeFood.call(this);
		}
  		$("#div-" + this.food[0] + "-" + this.food[1]).addClass("food");
  	};
}


$(document).ready(function(){
	var size = $('div.field').width();	
	var field = fullFielf(size);
	var snake = new Snake();
	$("#new_game").on('click', function() {
		snake.go();
		snake.makeFood();
		snake.makeFood();
		snake.makeFood();
	});
	$("#pause_game").on('click', function() {
		snake.stop();
	});

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