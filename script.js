Physijs.scripts.worker = './libraries/physi_worker.js';
// Physijs.scripts.ammo = './libraries/ammo.js';

let cena = new Physijs.Scene();
cena.setGravity(new THREE.Vector3(0,-50,0))
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 700
camera.position.y = 400
camera.lookAt(0,0,0)

let render = new THREE.WebGLRenderer({antialias: true});
render.setSize(window.innerWidth, window.innerHeight);
// Configurações de sobra
render.shadowMap.enabled = true;
render.shadowMapSoft = true;
render.shadowMap.type = THREE.PCFSoftShadowMap;
render.shadowCameraNear = 0.5;
render.shadowCameraFar = camera.far;
render.shadowCameraFov = 500;
render.shadowMapBias = 0.0039;
render.shadowMapDarkness = 0.25;
render.shadowMapWidth = 4096;
render.shadowMapHeight = 4096;

let canvas = render.domElement
document.body.appendChild(canvas);

// Desenha o chão com textura
// let geometriaSolo = new THREE.PlaneGeometry(1000, 1000, 100, 100);
// geometriaSolo.rotateX(270 * Math.PI / 180)
// let texture = new THREE.TextureLoader().load( './images/textures/moon.png' );
// let grassBump = new THREE.TextureLoader().load( './images/textures/moon.png' );
// texture.wrapS = THREE.RepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;
// // texture.repeat.set( 40, 40 );
// let material = new THREE.MeshStandardMaterial( {
//     map: texture, 
//     bumpMap: grassBump, 
//     bumScale: 30,
//     lightMap: grassBump, 
//     lightMapIntensity: 0.5, 
//     roughness: .7, 
//     metalness: 0, 
//     metalnessMap: grassBump
// } );
// let solo = new Physijs.PlaneMesh(geometriaSolo, material);
// solo.castShadow = true;
// solo.receiveShadow = true;
// solo.setLinearFactor(new THREE.Vector3(0, 0, 0));
// solo.setAngularFactor(new THREE.Vector3(0, 0, 0));
// solo.setAngularVelocity
// solo.setLinearVelocity
// cena.add(solo);


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


// Desenha a esfera central
let geometriaEsfera = new THREE.SphereGeometry(10,20,20)
geometriaEsfera.translate(0,20,0)
let materialEsfera = new THREE.MeshStandardMaterial({
    color: 0x1467ff,
    metalness: 0,
    roughness: 0.3
})
let esfera = new Physijs.SphereMesh(geometriaEsfera,materialEsfera)
esfera.castShadow = true;
esfera.receiveShadow = true;
esfera.addEventListener( 'collision', function( other_object, relative_velocity, relative_rotation, contact_normal ) {
    // `this` has collided with `other_object` with an impact speed of `relative_velocity` and a rotational force of `relative_rotation` and at normal `contact_normal`
    console.log(this)
    this.up = new THREE.Vector3(0,0,0)
    this.setlinearVelocity = new THREE.Vector3(0,0,0)
    this.setAngularVelocity = new THREE.Vector3(0,0,0)
    console.log(this._physijs)
    console.log(other_object)

    esfera.__dirtyPosition = true
});

cena.add(esfera)

// Luz ponto
// Habilitando sombra
// Tamanho da sombra
// Posição da luz
let luzPonto = new THREE.SpotLight(0xffffff0, 1, 0, 2)
luzPonto.castShadow = true;
luzPonto.shadowDarkness = 0.3
luzPonto.shadow.mapSize.width = 4096;
luzPonto.shadow.mapSize.height = 4096;
luzPonto.position.set(0,100,100)
cena.add(luzPonto)  

// Luz ambiente
let ambientLight = new THREE.AmbientLight(0x404040);
cena.add(ambientLight)

// controls.getObject().position.y = 100
function init() {
    processaTeclas();
    render.render(cena, camera);
    cena.simulate()
    requestAnimationFrame(init);
}
requestAnimationFrame(init);


// controls WASD
let teclas = []
let podePular = true, pulando = false, altura = 0
for (let i = 0; i < 256; i++) {
    teclas[i] = false
}

var angMax = Math.PI/15;

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
