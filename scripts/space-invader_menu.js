
var music = document.getElementById("music");
var lasersound = document.getElementById("lasersound");
var explosionsound = document.getElementById("explosionsound");
//positionnement des sprites

let config = {
	step : 0,
	maxStep: 5,

	alienWidth : 15,
	alienHeight : 17,

	vaisseauWidth : 25,
	vaisseauHeight : 22,

	missileWidth : 7,
	missileHeight : 15,
}

class object{
	x;
	y;
	movement = 0;
	vitesse = 0 ;
	constructor(x,y,vitesse,movement){
		this.x=x; // x coordinate
		this.y=y; // y coordinate
		this.vitesse=vitesse;  // vistesse of object
		this.movement=movement; // initialize the number of incrementation <100
	}

}

let canvas = document.querySelector("#game-canvas");
let context = canvas.getContext("2d");

let listAlien = [];
let listVaisseau = [];
let listMissile = [];

//Creation of 2 aliens
createObject(listAlien,70,10,2,60);
createObject(listAlien,220,10,5,60) ;

//Creation of 3 spaceship
createObject(listVaisseau,50,120,2,30);
createObject(listVaisseau,220,120,5,60) ;

//Creation of missile
createObject(listMissile,500,120,10,5) ;
createObject(listMissile,220,120,10,5) ;

//Prepare images ( preload the image)
let imgAlien = new Image();
imgAlien.src = "screen/invader.png";

let imgVaisseau = new Image();
imgVaisseau.src = "screen/vaisseau.png";

let imgMissile = new Image();
imgMissile.src = "screen/laser.png";

//alien type
let alienType = 1;

function gameLoop() {

	requestAnimationFrame( gameLoop );
	
 	if ( ++config.step < config.maxStep) {
		return;
	}
	config.step = 0;
	context.clearRect(0, 0, canvas.width, canvas.height);

	//title
	context.font = "40px Common Pixel";
	context.fillStyle = "white";
	context.fillText("Space", 65, 60);
	context.fillText("invader", 50, 90);

	//Start
	context.font = "40px Common Pixel";
	context.fillStyle = "white";
	context.fillText("Space", 65, 60);
	context.fillText("invader", 50, 90);

	//alien movement
	for(i=0;i<listAlien.length;i++){
		context.drawImage(imgAlien,listAlien[i].x,listAlien[i].y,config.alienWidth,config.alienHeight);
		ObjectPath(listAlien[i]);
	}

	//Vaisseau movement
	for(i=0;i<listVaisseau.length;i++){
		context.drawImage(imgVaisseau,listVaisseau[i].x,listVaisseau[i].y,config.vaisseauWidth,config.vaisseauHeight);
		ObjectPath(listVaisseau[i]);
		context.drawImage(imgMissile,listMissile[i].x,listMissile[i].y,config.missileWidth,config.missileHeight);
		shoot_missile(listMissile[i],listVaisseau[i]);
	}

	


}

requestAnimationFrame( gameLoop );
 

function createObject (list = [],x,y,v,m) {
	list.push(new object(x,y,v,m));	
}

function ObjectMoveLeft(object){
	object.x-=object.vitesse;
}

function ObjectMoveRight(object){
	object.x+=object.vitesse;
}

function ObjectPath(object){
	
	if(object.movement <= 50){
		ObjectMoveRight(object);
	}else if(object.movement >= 100){
		ObjectMoveLeft(object);
		object.movement=0;
	}else{
		ObjectMoveLeft(object);
	}
	object.movement+=object.vitesse;
}

function shoot_missile(missile,vaisseau){
	if(missile.y> -15){
		missile.y-=missile.vitesse;
	}else{
		missile.y=vaisseau.y;
		missile.x=vaisseau.x + config.vaisseauWidth/2;
	}
	cpt_shoot_missile=0
}

function onclickMenu() {
	location.replace(window.location.href = '../ESME_SnakeGame/accueil.html');
}