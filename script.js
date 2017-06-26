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
	this.body = [[20,20],[19,20],[18,20]];
	this.speed = 3;
	this.direction = "right";
  	this.timerId = null;
	this.food = undefined;

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
		for (var i = this.body.length - 1; i > 0; i--) {
  			this.body[i] = this.body[i-1];		
  		}	
	}.bind(this);

	var renewal = function() {
		if (this.body[0][0] == 40) this.body[0][0] = 0;
		if (this.body[0][1] == 30) this.body[0][1] = 0;
		if (this.body[0][0] == -1) this.body[0][0] = 39;
		if (this.body[0][1] == -1) this.body[0][1] = 29;
	}.bind(this);

	var stepResults = function() {
		console.log(this.body.length);
		console.log("Speed: " + this.speed);
	}.bind(this)

	var run = function() {		
		checkDirection();
		renewal();
		stepResults();		
		makeFood();	
		eat();
		this.body.forEach(function(item, i, arr) {			
    		$("#div-" + item[0] + "-" + item[1]).addClass("snaked");
  		});
  		var arr = this.body;
  		
  		this.speed = 2 + Math.floor(this.body.length / 3);
	}.bind(this);

  
  	this.go = function() {
    	run();
    	this.timerId = setInterval(this.go, 1000/this.speed);
  	};
  
  	this.stop = function() {
    	clearTimeout(this.timerId);
  	};

  	var makeFood = function() {
  		if (!this.food) {
	  		this.food = new Array(2);
	  		this.food[0] = (Math.floor(Math.random() * 40));
	  		this.food[1] = (Math.floor(Math.random() * 30));
	  		$("#div-" + this.food[0] + "-" + this.food[1]).addClass("food");
	  	}
	  	return false;
  	}.bind(this);

  	var eat = function() {
  		if (this.food[0] == this.body[0][0] &&
  			this.food[1] == this.body[0][1]) {
  			this.body.unshift(this.food);
  			$("#div-" + this.food[0] + "-" + this.food[1]).removeClass("food");
  			this.food = null;
  		}
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