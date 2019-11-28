"use strict";

var cena = new THREE.Scene;

var camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.1, 1000);



var teclas = [];
for(var i = 0; i<256; i++){
    teclas[i] = false;
}

// var textureLoader = new THREE.TextureLoader();
// var texturaPlano = new textureLoader.load("textura/floor_laminate_dirty_pine.png");

//Plano
var planoGeometry = new THREE.PlaneGeometry(7, 5, 100, 100);
var planoMaterial = new THREE.MeshPhongMaterial({color:0x4F6156});
var plano = new THREE.Mesh(planoGeometry, planoMaterial);
plano.receiveShadow = true;
cena.add(plano);

//Parede Cima
var paredeCimaGeometry = new THREE.BoxGeometry(7, 0.1, 0.3);
var paredeCimaMaterial = new THREE.MeshPhongMaterial( {color: 0x00ff00} );
var paredeCima = new THREE.Mesh( paredeCimaGeometry, paredeCimaMaterial );
paredeCima.position.set(0, 2.5, 0.15)
paredeCima.receiveShadow = true;
paredeCima.castShadow = true;
cena.add(paredeCima);

// //Parede Baixo
var paredeBaixoGeometry = new THREE.BoxGeometry(7, 0.1, 0.3);
var paredeBaixoMaterial = new THREE.MeshPhongMaterial( {color: 0x00ff00} );
var paredeBaixo = new THREE.Mesh( paredeBaixoGeometry, paredeBaixoMaterial );
paredeBaixo.position.set(0, -2.5, 0.15)
paredeBaixo.receiveShadow = true;
paredeBaixo.castShadow = true;
cena.add(paredeBaixo);

//Parede Direita
var paredeDireitaGeometry = new THREE.BoxGeometry(5.1, 0.1, 0.3);
var paredeDireitaMaterial = new THREE.MeshPhongMaterial( {color: 0x00ff00} );
var paredeDireita = new THREE.Mesh( paredeDireitaGeometry, paredeDireitaMaterial );
paredeDireita.position.set(3.5, 0, 0.15)
paredeDireita.rotation.z=Math.PI/2;
paredeDireita.receiveShadow = true;
paredeDireita.castShadow = true;
cena.add(paredeDireita);

//Parede Esquerda
var paredeEsquerdaGeometry = new THREE.BoxGeometry(5.1, 0.1, 0.3);
var paredeEsquerdaMaterial = new THREE.MeshPhongMaterial( {color: 0x00ff00} );
var paredeEsquerda = new THREE.Mesh( paredeEsquerdaGeometry, paredeEsquerdaMaterial );
paredeEsquerda.position.set(-3.5, 0, 0.15);
paredeEsquerda.rotation.z=Math.PI/2;
paredeEsquerda.receiveShadow = true;
paredeEsquerda.castShadow = true;
cena.add(paredeEsquerda);

//Obstáculos
var cilindroEsqObstaculo = new THREE.CylinderGeometry( 0.3, 0.3, 0.3, 32 );
var cilindroMaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
var cilindroEsq = new THREE.Mesh( cilindroEsqObstaculo, cilindroMaterial );
cena.add( cilindroEsq );
cilindroEsq.rotation.x = Math.PI/2;
cilindroEsq.receiveShadow = true;
cilindroEsq.castShadow = true;
cilindroEsq.position.set(-1.5, 0, 0.2);

var cilindroDirObstaculo = new THREE.CylinderGeometry( 0.3, 0.3, 0.3, 32 );
var cilindroDir = new THREE.Mesh(cilindroDirObstaculo, cilindroMaterial);
cena.add(cilindroDir);
cilindroDir.rotation.x = Math.PI/2;
cilindroDir.receiveShadow = true;
cilindroDir.castShadow = true;
cilindroDir.position.set(1.5, 0, 0.2);

var paredeEsquerdaObstaculo = new THREE.BoxGeometry(1, 0.1, 0.3);
var paredeEsquerdaObst = new THREE.Mesh( paredeEsquerdaObstaculo, paredeEsquerdaMaterial );
paredeEsquerdaObst.position.set(-0.5, 0, 0.15);
paredeEsquerdaObst.rotation.z=Math.PI/2;
paredeEsquerdaObst.receiveShadow = true;
paredeEsquerdaObst.castShadow = true;
cena.add(paredeEsquerdaObst);

var paredeDireitaObstaculo = new THREE.BoxGeometry(1, 0.1, 0.3);
var paredeDireitaObst = new THREE.Mesh( paredeDireitaObstaculo, paredeEsquerdaMaterial );
paredeDireitaObst.position.set(0.5, 0, 0.15);
paredeDireitaObst.rotation.z=Math.PI/2;
paredeDireitaObst.receiveShadow = true;
paredeDireitaObst.castShadow = true;
cena.add(paredeDireitaObst);

var paredeCimaObstaculo = new THREE.BoxGeometry(1.1, 0.1, 0.3);
var paredeCimaObs = new THREE.Mesh(paredeCimaObstaculo, paredeBaixoMaterial);
paredeCimaObs.position.set(0, 0.5, 0.15)
paredeCimaObs.receiveShadow = true;
paredeCimaObs.castShadow = true;
cena.add(paredeCimaObs);

var paredeBaixoEsqObstaculo = new THREE.BoxGeometry(1.1/4, 0.1, 0.3);
var paredeBaixoEsqObs = new THREE.Mesh(paredeBaixoEsqObstaculo, paredeBaixoMaterial);
paredeBaixoEsqObs.position.set(-0.37, -0.45, 0.15)
paredeBaixoEsqObs.receiveShadow = true;
paredeBaixoEsqObs.castShadow = true;
cena.add(paredeBaixoEsqObs);

var paredeBaixoDirObstaculo = new THREE.BoxGeometry(1.1/4, 0.1, 0.3);
var paredeBaixoDirObs = new THREE.Mesh(paredeBaixoEsqObstaculo, paredeBaixoMaterial);
paredeBaixoDirObs.position.set(0.37, -0.45, 0.15)
paredeBaixoDirObs.receiveShadow = true;
paredeBaixoDirObs.castShadow = true;
cena.add(paredeBaixoDirObs);

//Bola
var esferaGeometry = new THREE.SphereGeometry(0.1, 50, 50);
var esferaMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
var esfera = new THREE.Mesh(esferaGeometry, esferaMaterial);
esfera.receiveShadow = true;
esfera.castShadow = true;
esfera.position.z = 0.1;
cena.add(esfera);

//Luzes
var luzAmbiente = new THREE.AmbientLight(0xffffff, 0.4);
cena.add(luzAmbiente);

var luzPonto = new THREE.PointLight(0xffffff, 1, 1000);
luzPonto.position.set(1.5,-1,1);
luzPonto.castShadow = true;
luzPonto.shadow.camera.near = 0.1;
luzPonto.shadow.camera.far = 25;
luzPonto.shadow.mapSize.width = 2048;
luzPonto.shadow.mapSize.height = 2048;
cena.add(luzPonto);

camera.position.set(0, -6, 6);
camera.lookAt(0,0,0);

var render = new THREE.WebGLRenderer();
render.setSize(window.innerWidth, window.innerHeight);
var canvas = render.domElement;
document.body.appendChild(canvas);

render.shadowMap.enabled = true;
render.shadowMap.type = THREE.BasicShadowMap;

var controles = new THREE.OrbitControls(camera, render.domElement);
var angMax = Math.PI/15;
var vel = 0.5;
var mod = 0;
var x, y;
camera.rotation.x = 0.75;
camera.rotation.y = 0;

function desenhar(){

	processaTeclas();
	x += (vel*mod)*Math.cos(Math.PI/180 * angX)
	y += (vel*mod)*Math.sin(Math.PI/180 * angY)
	
	requestAnimationFrame(desenhar);
	render.render(cena, camera);
	
	//esfera.translateX(x)
	//esfera.translateY(y)
	
	
	console.log(esfera.x);
	
	

    // console.log(angX);
    // console.log(angY)	
}

requestAnimationFrame(desenhar);

document.onkeydown = function (evt) {
    teclas[evt.keyCode] = true;
}

document.onkeyup = function (evt) {
    teclas[evt.keyCode] = false;
}

var angX = cena.rotation.x;
var angY = cena.rotation.y;

var velX = 0, velY = 0;

function processaTeclas(){
	//Cima
    if(teclas[38]){
		cena.rotation.x -= Math.sin(Math.PI/90);    
		if (cena.rotation.x <= -angMax) {
			cena.rotation.x = -angMax;
			mod += -angX;
		}
	}
    
	//Baixo
    if(teclas[40]){
		cena.rotation.x += Math.sin(Math.PI/90);
		if (cena.rotation.x >= angMax) {
            cena.rotation.x = angMax;
			mod += angX;
		}
    }
    angX = cena.rotation.x;
    
	//Esquerda
    if(teclas[37]){
		cena.rotation.y -= Math.sin(Math.PI/90);
		if (cena.rotation.y <= -angMax) {
			cena.rotation.y = -angMax;
			mod += -angY;
		}
    }
    //Direita
    if(teclas[39]){
		cena.rotation.y += Math.sin(Math.PI/90); 
		if (cena.rotation.y >= angMax) {
			cena.rotation.y = angMax;
			mod += angY;
		}
    }
    angY = cena.rotation.y;
}