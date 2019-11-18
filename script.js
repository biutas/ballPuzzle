"use strict";

var velocidade = 0.02, virarCamera = Math.PI*0.02;

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
cena.add(paredeCima);

// //Parede Baixo
var paredeBaixoGeometry = new THREE.BoxGeometry(7, 0.1, 0.3);
var paredeBaixoMaterial = new THREE.MeshPhongMaterial( {color: 0x00ff00} );
var paredeBaixo = new THREE.Mesh( paredeBaixoGeometry, paredeBaixoMaterial );
paredeBaixo.position.set(0, -2.5, 0.15)
cena.add(paredeBaixo);

//Parede Direita
var paredeDireitaGeometry = new THREE.BoxGeometry(5.1, 0.1, 0.3);
var paredeDireitaMaterial = new THREE.MeshPhongMaterial( {color: 0x00ff00} );
var paredeDireita = new THREE.Mesh( paredeDireitaGeometry, paredeDireitaMaterial );
paredeDireita.position.set(3.5, 0, 0.15)
paredeDireita.rotation.z=Math.PI/2;
cena.add(paredeDireita);

//Parede Esquerda
var paredeEsquerdaGeometry = new THREE.BoxGeometry(5.1, 0.1, 0.3);
var paredeEsquerdaMaterial = new THREE.MeshPhongMaterial( {color: 0x00ff00} );
var paredeEsquerda = new THREE.Mesh( paredeEsquerdaGeometry, paredeEsquerdaMaterial );
paredeEsquerda.position.set(-3.5, 0, 0.15);
paredeEsquerda.rotation.z=Math.PI/2;
cena.add(paredeEsquerda);

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
luzPonto.position.set(1,-1,1);
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

camera.rotation.x = 0.75;
camera.rotation.y = 0;

function desenhar(){
	processaTeclas();
	requestAnimationFrame(desenhar);
	esfera.rotation.x += 0.01;
	esfera.rotation.y += -0.01;
	esfera.rotation.z += 0.01;
	render.render(cena, camera);
	
}

requestAnimationFrame(desenhar);

document.onkeydown = function (evt) {
    teclas[evt.keyCode] = true;
}

document.onkeyup = function (evt) {
    teclas[evt.keyCode] = false;
}

function processaTeclas(){
	//W
    if(teclas[87]){
		cena.rotation.x -= Math.sin(Math.PI/90);    
		if (cena.rotation.x <= -angMax) {
			cena.rotation.x = -angMax;
		}
	}

	//S
    if(teclas[83]){
		cena.rotation.x += Math.sin(Math.PI/90);
		if (cena.rotation.x >= angMax) {
			cena.rotation.x = angMax;
		}
    }
    
	//A
    if(teclas[65]){
		cena.rotation.y -= Math.sin(Math.PI/90);
		if (cena.rotation.y <= -angMax) {
			cena.rotation.y = -angMax;
		}
    }
    //Di
    if(teclas[68]){
		cena.rotation.y += Math.sin(Math.PI/90); 
		if (cena.rotation.y >= angMax) {
			cena.rotation.y = angMax;
		}
    }
}