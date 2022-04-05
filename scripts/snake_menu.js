
let border=true;

const config = {
	step: 0,
	maxStep: 3,//Regler vitesse
	sizeCell: 5,
	sizeBerry: 5 / 4
}

const snake = {
	x: 160,
	y: 160,
	dx: config.sizeCell,
	dy: 0,
	tails: [],
	maxTails: 3
}

class berry{
	x;
	y;
	constructor(x,y){
		this.x=x;
		this.y=y;
	}

}


let canvas = document.querySelector("#game-canvas");
let context = canvas.getContext("2d");
let listBerries=[];
let listUpdate=[];


function gameLoop() {

	requestAnimationFrame( gameLoop );
	if ( ++config.step < config.maxStep) {
		return;
	}
	config.step = 0;

	context.clearRect(0, 0, canvas.width, canvas.height);

	if (border==true){
		createBorder();
	}
	
	if(listBerries.length==0){
			listBerries = initialize_listBerries();
	}

	for(i=0;i<listBerries.length;i++){
		drawBerry(listBerries[i].x,listBerries[i].y);
	}
	
	drawSnake();
	snakePath();
	update_Listberries(snake.tails[0].x,snake.tails[0].y,listBerries);
	
	for(i=0;i<listUpdate.length;i++){
		drawSquare(listUpdate[i].x,listUpdate[i].y);
	}

	
}

requestAnimationFrame( gameLoop );

function drawSnake() {
	snake.x += snake.dx;
	snake.y += snake.dy;

	collisionBorder();


	snake.tails.unshift( { x: snake.x, y: snake.y } );

	if ( snake.tails.length > snake.maxTails ) {
		snake.tails.pop();
	}

	snake.tails.forEach( function(el, index){
		if (index == 0) {
			context.fillStyle = "#FA0556";
		} else {
			context.fillStyle = "white";
		}
		context.fillRect( el.x, el.y, config.sizeCell, config.sizeCell );
		

	} );
}

function collisionBorder() {
	if (snake.x < 0) {
		snake.x = canvas.width - config.sizeCell;
	} else if ( snake.x >= canvas.width ) {
		snake.x = 0;
	}

	if (snake.y < 0) {
		snake.y = canvas.height - config.sizeCell;
	} else if ( snake.y >= canvas.height ) {
		snake.y = 0;
	}
}

function drawBerry(x,y) {
	context.beginPath();
	context.fillStyle = "#A00034";
	context.arc( x*config.sizeCell + (config.sizeCell / 2 ), y*config.sizeCell + (config.sizeCell / 2 ), config.sizeBerry, 0, 10*Math.PI );
	context.fill();
}
function drawSquare(x,y) {
	context.fillStyle = "white";
	context.fillRect( x*config.sizeCell, y*config.sizeCell,config.sizeCell,config.sizeCell);
	context.fill();
}

function snakeMove(move) {
	if ( move == "up" ) {
		snake.dy = -config.sizeCell;
		snake.dx = 0;
	} else if ( move == "left" ) {
		snake.dx = -config.sizeCell;
		snake.dy = 0;
	} else if ( move == "down" ) {
		snake.dy = config.sizeCell;
		snake.dx = 0;
	} else if ( move == "right" ) {
		snake.dx = config.sizeCell;
		snake.dy = 0;
	}
}

function snakePath(){

	if(snake.tails[0].y <= 20*config.sizeCell){
		if(snake.tails[0].x==50*config.sizeCell){
			snakeMove("down");
			var setTimeoutLeft = setTimeout('snakeMove("left");',50);
		}else if(snake.tails[0].x==5*config.sizeCell){
			snakeMove("down");
			var setTimeoutRight = setTimeout('snakeMove("right");',50);
		}
	}else{
		if(snake.tails[0].x==50*config.sizeCell){
			snakeMove("down");
			var setTimeoutLeft = setTimeout('snakeMove("left");',50);
		}else if(snake.tails[0].x==5*config.sizeCell){
			snakeMove("up");
			var setTimeoutRight = setTimeout('snakeMove("right");',50);
		}
	}
}


function createBorder(){
	var marginError=1;
	var gameStart=0;
	var gameWidth=59;
	var gameHeight=25;

	for(i=gameStart; i<=gameWidth;i++){
		context.fillStyle = "white";
		for(j=gameStart;j<=gameHeight;j++){
			context.fillRect( config.sizeCell*gameWidth,config.sizeCell*j, config.sizeCell-marginError,config.sizeCell-marginError);
			context.fillRect( config.sizeCell*gameStart,config.sizeCell*j, config.sizeCell-marginError,config.sizeCell-marginError);
		}
		context.fillRect( config.sizeCell*i,config.sizeCell*gameStart, config.sizeCell-marginError,config.sizeCell-marginError);
		context.fillRect( config.sizeCell*i,config.sizeCell*gameHeight, config.sizeCell-marginError,config.sizeCell-marginError);

	}
}
function initialize_listBerries(){
	var listBerries = [];
	//S
	for(i=0;i<7;i++){
		listBerries.push(new berry(i+6,18));
		listBerries.push(new berry(i+6,12));
		listBerries.push(new berry(i+6,7));
	}
	for(i=0;i<5;i++){
		listBerries.push(new berry(6,i+7));
		listBerries.push(new berry(12,i+12));
	}
	listBerries.push(new berry(12,17));
	
	//N
	for(i=0;i<12;i++){
		listBerries.push(new berry(14,i+7));
		listBerries.push(new berry(23,i+7));
	}	
	for(i=14;i<24;i++){
		listBerries.push(new berry(i,i-7));
	}	

	//A
	for(i=0;i<12;i++){
		listBerries.push(new berry(25,i+7));
		listBerries.push(new berry(32,i+7));
	}	
	for(i=0;i<8;i++){
		listBerries.push(new berry(25+i,7));
		listBerries.push(new berry(25+i,12));
	}

	//K
	for(i=0;i<12;i++){
		listBerries.push(new berry(34,i+7));
	}	
	for(i=34;i<41;i++){
		listBerries.push(new berry(i,i-22));
		listBerries.push(new berry(i,-i+48));
	}	

	//E
	for(i=0;i<7;i++){
		listBerries.push(new berry(i+42,18));
		listBerries.push(new berry(i+42,12));
		listBerries.push(new berry(i+42,7));
	}
	for(i=0;i<12;i++){
		listBerries.push(new berry(42,i+7));
	}	
	return listBerries;
}

function update_Listberries(x,y){
	for(i=0;i<listBerries.length;i++){
		if(listBerries[i].x*config.sizeCell==x && listBerries[i].y*config.sizeCell==y){
			listUpdate.push(new berry(listBerries[i].x,listBerries[i].y));	
			listBerries.splice(i,1);
		}
	}
}

function onClickStart(){
	for(i=1;i<4;i++){
		document.getElementById(`level${i}`).textContent = "level "+i;
	}
}

	
