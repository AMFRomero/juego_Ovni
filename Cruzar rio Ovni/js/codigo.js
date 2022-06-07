
//Para hacer efectos sonoros o música de fondo
function sona(path){
	$("body").append("<embed src='"+path+"' autostart='true' hidden='true' loop='false'>");	
}

//Genera número aleatorio entre inferior y superior
function aleatorio(inferior,superior){ 
	var resAleatorio = Math.floor((Math.random() * (superior - inferior + 1)) + inferior);
	return resAleatorio;
}

function cargaImagenes(){
	pj.imgD01 = new Image();
	pj.imgD01.src = "img/pj01.png";
	pj.imgI01 = new Image();
	pj.imgI01.src = "img/pj01i.png";
	
	pj.imgD02 = new Image();
	pj.imgD02.src = "img/pj02.png";
	pj.imgI02 = new Image();
	pj.imgI02.src = "img/pj02i.png";

	roca.img = new Image();
	roca.img.src = "img/roca01.png";	

	roca2.img = new Image();
	roca2.img.src = "img/roca02.png";
    
    roca3.img = new Image();
	roca3.img.src = "img/roca01.png";	
    
   ovni.img = new Image();
    ovni.img.src= "img/alien.png";
	
	fondo.img= new Image();
	fondo.img.src = "img/fondo.png";	
	
	fondo.img2= new Image();
	fondo.img2.src = "img/gameover.png";	
		
	plataformaEst1.img= new Image();
	plataformaEst1.img.src = "img/plataforma.png";	
	
	
}

function borrar(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/**************************************************************/
/********** Modelo o lógica  **********************************/

function logicaRoca2(){
	roca2.x+=roca2.vx;	
	roca2.y+=roca2.vy;	
	
	
	if((roca2.estado==1) && (roca2.x>=canvas.width/2)){
		roca2.estado=2;
		roca2.vx=0;
		roca2.vy=roca2.vIni;
	}	
	if((roca2.estado==2) && (roca2.y>=canvas.height-roca2.anchoImg)){
		roca2.estado=3;
		roca2.vy=-roca2.vIni;
	}	
	if((roca2.estado==3) && (roca2.y<=canvas.height/2)){
		roca2.estado=4;
		roca2.vy=0;
		roca2.vx=-roca2.vIni;
	}
	if((roca2.estado==4) && (roca2.x<=0)){
		roca2.estado=1;
		roca2.vx=roca2.vIni;
	}
}

function logicaRoca(){
	if(roca.visible){
		roca.y+=roca.v;
		if(roca.y>canvas.height){
			roca.visible=false;
		}	
	}else{
		var aleatorio01=aleatorio(0,1000);
		if(aleatorio01<=10){
			roca.visible=true;
			roca.y=-50;
			roca.x=aleatorio(0,canvas.width-50);
		}		
	}
}function logicaDeOvni(){

   ovni.x+=ovni.v;
if(ovni.estado==1&& ovni.x==600 ){
        ovni.v=0;
        ovni.estado=2;
        ovni.v=-ovni.VIni;
        
    }if(ovni.estado==2 && ovni.x<=0){
        ovni.v=5;
        ovni.estado=1;
    }
   
}function logicaRoca3(){
    
   
     if(roca3.visible){
        roca3.y+=roca3.v;
        if(roca3.y>canvas.height){
            
            roca3.visible=false;
        }
    }else{
            var aleatorio02=aleatorio(0,1000);
            if(aleatorio02<=10){
            roca3.visible=true;
            roca3.y=ovni.y;
            roca3.x=ovni.x;
            }
        }
    
}

  


function colision(){
	
	if(pj.y==(canvas.height*13/16)&& (muerto==false)){
		gameOver=true;
		//Mira si estoy en plataforma Izq y no caigo
		if(pj.x+pj.anchoImg*0.4<=plataformaEst1.anchoImg){
			gameOver=false;
			if(!pj.tengoQIrDerecha){
				pj.tengoQIrDerecha=true;
				pj.cruces++;	
			}
		}	
		//Mira si estoy en plataforma Der y no caigo
		if(pj.x+pj.anchoImg*0.6>=plataformaEst2.x){
			gameOver=false;
			if(pj.tengoQIrDerecha){
				pj.tengoQIrDerecha=false;
				pj.cruces++;	
			}
			
		}		
		//Mira si estoy en barca y no caigo
		if((pj.x+pj.anchoImg*0.6>=balsa.x)&& 
			(pj.x+pj.anchoImg*0.4<=balsa.x+plataformaEst1.anchoImg)){
			gameOver=false;
		}			
	}
	
	
	if((pj.x+pj.anchoImg<roca.x)||(pj.x>roca.x+roca.anchoImg)||
		(pj.y+pj.altoImg<roca.y)|| (pj.y>roca.y+roca.altoImg)){
			var a;		
	}else{
		gameOver=true;
		muerto=true;
	}		
	
	if((pj.x+pj.anchoImg<roca2.x)||(pj.x>roca2.x+roca2.anchoImg)||
		(pj.y+pj.altoImg<roca2.y)|| (pj.y>roca2.y+roca2.altoImg)){
			var a;		
	}else{
		gameOver=true;
		muerto=true;
	}		
	
	
}



function logicaPj(){	
	if(pj.vx<0) pj.miraDerecha=false;
	if(pj.vx>0) pj.miraDerecha=true;
	
	pj.x+=pj.vx;
	
	if(pj.x<0) pj.x=0;
	if(pj.x>canvas.width-pj.anchoImg) pj.x=canvas.width-pj.anchoImg;
	colision();	
	if(gameOver){
		pj.y+=pj.vy;
		pj.vy+=pj.g;	
	}
	
	if(pj.saltando){
		pj.y+=pj.vy;
		pj.vy+=pj.g;
		if(pj.vy>-pj.vyIni){
			pj.saltando=false;
			pj.y=(canvas.height*13/16);	
		}
	}	

}

function logicaFondo(){
	fondo.x=(fondo.anchoFondo*2/3*pj.x/canvas.width);	
}

function logicaBalsa(){
	if(balsa.x<=balsa.xMin){
		balsa.x=balsa.xMin;
		balsa.vx=balsa.ax;
	}
	if(balsa.x>=balsa.xMax){
		balsa.x=balsa.xMax;
		balsa.vx=-balsa.ax;
	}
	
	balsa.x+=balsa.vx;	
}

function update(){
	//logicaRoca();
	logicaRoca2();
    logicaRoca3();
	logicaPj();
	logicaFondo();
	logicaBalsa();
    logicaDeOvni();
}

/******************************************************************/

/**************************************************/
/**      dibujar ***********************************/
function dibujarRoca(){
	//Dibuja Roca
	if(roca.visible){
		ctx.drawImage(roca.img,0,0,roca.anchoImg,roca.altoImg,roca.x,roca.y,roca.anchoImg,roca.altoImg);
	}	
}

function dibujarRoca2(){
	//Dibuja Roca2
	ctx.drawImage(roca2.img,0,0,roca2.anchoImg,roca2.altoImg,roca2.x,roca2.y,roca2.anchoImg,roca2.altoImg);

}function dibujarRoca3(){
   if(roca3.visible){
    ctx.drawImage(roca3.img,0,0,roca3.anchoImg,roca3.altoImg,roca3.x,roca3.y,roca3.anchoImg,roca3.altoImg);
    }
}function dibujarOvni(){
    
   ctx.drawImage(ovni.img,0,0,ovni.anchoImg,ovni.altoImg,ovni.x,ovni.y,200,100);

}



function dibujarPj(){
	if(pj.vx==0) pj.frame=0;
	if(pj.miraDerecha){
	//Dibuja Pj
	
		if(pj.frame>5) ctx.drawImage(pj.imgD01,0,0,pj.anchoImg,pj.altoImg,pj.x,pj.y,pj.anchoImg,pj.altoImg);
		if(pj.frame<=5) ctx.drawImage(pj.imgD02,0,0,pj.anchoImg,pj.altoImg,pj.x,pj.y,pj.anchoImg,pj.altoImg);
	}else{
		if(pj.frame>5) ctx.drawImage(pj.imgI01,0,0,pj.anchoImg,pj.altoImg,pj.x,pj.y,pj.anchoImg,pj.altoImg);
		if(pj.frame<=5) ctx.drawImage(pj.imgI02,0,0,pj.anchoImg,pj.altoImg,pj.x,pj.y,pj.anchoImg,pj.altoImg);
	}
	pj.frame+=1;
	if(pj.frame>=10) pj.frame=0;
	
}

function dibujarFondo(){
	ctx.drawImage(fondo.img,fondo.x,0,750,750,0,0,canvas.width,canvas.height);
	if(gameOver) ctx.drawImage(fondo.img2,0,0,750,750,0,0,canvas.width,400);
	ctx.font = "40px Georgia";	
	ctx.fillText("Has cruzado: "+pj.cruces, canvas.width*0.5, canvas.height*0.05);
	ctx.fillStyle='#FFFF90';
		
}

function dibujarPlataformas(){
	ctx.drawImage(plataformaEst1.img,0,0,plataformaEst1.anchoImg,plataformaEst1.altoImg,plataformaEst1.x,plataformaEst1.y,plataformaEst1.anchoImg,plataformaEst1.altoImg);
	ctx.drawImage(plataformaEst1.img,0,0,plataformaEst1.anchoImg,plataformaEst1.altoImg,plataformaEst2.x,plataformaEst2.y,plataformaEst1.anchoImg,plataformaEst1.altoImg);
}	

function dibujarBalsa(){
	ctx.drawImage(plataformaEst1.img,0,0,plataformaEst1.anchoImg,plataformaEst1.altoImg,balsa.x,balsa.y,plataformaEst1.anchoImg,plataformaEst1.altoImg);
	
}	
	
function dibujar(){
	dibujarFondo();
	dibujarPj();
	dibujarPlataformas();
	dibujarBalsa();
	dibujarRoca();
	dibujarRoca2();
   dibujarRoca3();
    dibujarOvni();
}
/*******************************************************/

function torn(){
	borrar();
	update();
	dibujar();
}

function iniciar(){
	pj.x=0;
	pj.y=(canvas.height*13/16);
	pj.vy=0;
	pj.vx=0;
	
	pj.tengoQIrDerecha=true;
	pj.cruces=0;
	
	pj.saltando=false;
	roca.visible=false;
	roca2.x=0;
	roca2.y=canvas.height/2;
	roca2.vx=roca2.vIni; 
	roca2.vy=0;
	roca2.estado=1
	
	
	plataformaEst1.y=pj.y+pj.altoImg;
	plataformaEst2.y=pj.y+pj.altoImg;
	plataformaEst2.x=canvas.width-plataformaEst1.anchoImg;
	
	balsa.y=pj.y+pj.altoImg;
	balsa.x=plataformaEst1.anchoImg;
	balsa.vx=balsa.ax;
	balsa.xMin=plataformaEst1.anchoImg;
	balsa.xMax=canvas.width-plataformaEst1.anchoImg*2;
	
	gameOver=false;
	muerto=false;
	
	
	
	
}

function principal(){
	canvas = document.getElementById('canvasJuego');
	ctx = canvas.getContext('2d');
	iniciar();
	cargaImagenes();
	
	window.addEventListener('keydown', function key(event) { //detectar la tecla pulsada
        switch (event.key) {
			case "ArrowRight":
				if((!pj.saltando) && (pj.vx<pj.ax*pj.vMax) && !gameOver){
					pj.vx+=pj.ax;
				// Equivale a: pj.vx=pj.vx+pj.ax;
				}
            break;  
			case "ArrowLeft":
				if((!pj.saltando) && (pj.vx>-pj.ax*pj.vMax)&& !gameOver){
					pj.vx-=pj.ax;
				}
            break;
			case "ArrowUp":
				if(!pj.saltando && !gameOver){
					pj.saltando=true;
					pj.vy=pj.vyIni;
					sona("media/salta.mp3");		
				}
			break;
			case "ArrowDown":
				if(gameOver){
					iniciar();	
				}
			break;
			
			
            
        }
    }, false);
	setInterval(torn, 1000/FPS);
}


var canvas;
var ctx;
var fondo={img:null, img2:null, x:0, anchoFondo:2250};
var gameOver=false;
var muerto=false;



var pj={imgD01:null, imgI01:null, imgD02:null, imgI02:null, frame:0, anchoImg:50, altoImg:100,
	x:0,y:0,vx:0,vy:0, ax:5, vyIni:-40, g:2, 
	saltando:false, vMax:1, miraDerecha:true,
	tengoQIrDerecha:true, cruces:0
};

var plataformaEst1={img: null, x:0, y:0, anchoImg:75, altoImg:20};
var plataformaEst2={ x:0, y:0};

var balsa={ x:0, y:0, vx:0, xMin:0, xMax:0, ax:5};



var roca={img:null,x:0,y:0, visible:false, anchoImg:50, altoImg:50, v:10};
var roca2={img:null,x:0,y:0, anchoImg:50, altoImg:50, vx:10, vy:0, vIni:10, estado:1};
var roca3={img:null, x:0, y:0, anchoImg:50, altoImg:50, v:5,visible:false};
var ovni={img:null, x:0,y:0,anchoImg:512,altoImg:345,v:5,vx:0,estado:1,VIni:5};

var FPS=50;
window.addEventListener("load", principal, false);