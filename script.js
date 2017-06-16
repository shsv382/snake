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
	$("div.field").append('<div class="cube" id="div-' + fld.left + '-' + fld.top + '">' + fld.content + '</div>');
	$("div#div-" + fld.left + "-" + fld.top).css('width', '2.5%');
	$("div#div-" + fld.left + "-" + fld.top).css('height', '2.5%');
	//$("div#div-" + fld.left + "-" + fld.top).css('top', fld.top*size/80);	
	//$("div#div-" + fld.left + "-" + fld.top).css('left', fld.left*size/80);
	$("div#div-" + fld.left + "-" + fld.top).css('padding', '0');
	$("div#div-" + fld.left + "-" + fld.top).css('margin', '0');
}

$(document).ready(function(){
	var size = $('div.field').width();	
	var field = fullFielf(size);
	console.log(field[3][15]);
	console.log(field[3][15].top + " " + field[3][15].left);
});