/*
Colocar mais informações sobre o projeto aqui depois 
*/

Ammo().then((Ammo)=>{

// Inicializando variaveis
var camera, scene, renderer;
var clock = new THREE.Clock()
var time
 // Physics variables
 var gravityConstant = -200;
 var collisionConfiguration;
 var dispatcher;
 var broadphase;
 var solver;
 var physicsWorld;
 var rigidBodies = [];
 var margin = 0.05;
 var transformAux1 = new Ammo.btTransform();
 var floorRotateX = 0
 var floorRotateY = 0
var floor
 // controls WASD
var teclas = []
for (var i = 0; i < 256; i++) {
	teclas[i] = false
}
document.onkeydown = function (evt) {
    teclas[evt.keyCode] = true;
}

document.onkeyup = function (evt) {
    teclas[evt.keyCode] = false;
}

// Função que chama os metodos para iniciar
init()
animate()

function init() {
	initGraphics()
	initPhysics()
	createObjects()
	initInput()
}

// Função para iniciar o Three.js
function initGraphics() {
	/*
		Inicia a cena, renderer, camera e luzes
	*/
	// Inicia a cena 
	scene = new THREE.Scene()
	
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000)
	camera.position.x = 700
	camera.position.y = 400
	camera.lookAt(0,0,0)

	// Define o tipo de render e adiciona o antialias
	renderer = new THREE.WebGLRenderer({antialias: true})
		// Tamanho do 114 é igual à largura e altura da tela
		renderer.setSize(window.innerWidth, window.innerHeight)
		// Configurações de sobra
		renderer.shadowMap.enabled = true
		renderer.shadowMapSoft = true
		renderer.shadowMap.type = THREE.PCFSoftShadowMap
		renderer.shadowCameraNear = 0.5
		renderer.shadowCameraFar = camera.far
		renderer.shadowCameraFov = 500
		renderer.shadowMapBias = 0.0039
		renderer.shadowMapDarkness = 0.25
		renderer.shadowMapWidth = 4096
		renderer.shadowMapHeight = 4096
	
		// Coloca o render no elemento HTML canvas
	var canvas = renderer.domElement
	document.body.appendChild(canvas)
	
	// Define perspectiva e posição da camera

	// Luz ponto
	var luzPonto = new THREE.SpotLight(0xffffff0, 1, 0, 2)
		// Habilitando sombra
		luzPonto.castShadow = true
		luzPonto.shadowDarkness = 0.8
		// Tamanho da sombra
		luzPonto.shadow.mapSize.width = 4096
		luzPonto.shadow.mapSize.height = 4096
		luzPonto.shadow.camera.near = .5 
		luzPonto.shadow.camera.far = camera.far 
		// Posição da luz
		luzPonto.position.set(0,100,0)
		scene.add(luzPonto)  

	// Luz ambiente
	var ambientLight = new THREE.AmbientLight(0x404040)
	scene.add(ambientLight)

	// Quando a janela redimensionar, altera o tamanho do viewport
	window.addEventListener( 'resize', onWindowResize, false );	
}

// Configurações de fisica do Ammo.js
function initPhysics()  {
	collisionConfiguration = new Ammo.btSoftBodyRigidBodyCollisionConfiguration();
	dispatcher = new Ammo.btCollisionDispatcher( collisionConfiguration );
	broadphase = new Ammo.btDbvtBroadphase();
	solver = new Ammo.btSequentialImpulseConstraintSolver();
	softBodySolver = new Ammo.btDefaultSoftBodySolver();
	physicsWorld = new Ammo.btSoftRigidDynamicsWorld( dispatcher, broadphase, solver, collisionConfiguration, softBodySolver);
	physicsWorld.setGravity( new Ammo.btVector3( 0, gravityConstant, 0 ) );
	physicsWorld.getWorldInfo().set_m_gravity( new Ammo.btVector3( 0, gravityConstant, 0 ) );
}

// Atualiza a posição dos objetos conforme parametros de fisica
function updatePhysics( deltaTime ) {
	
	
	// Step world
	physicsWorld.stepSimulation( deltaTime, 10 );

	// Update rigid bodies
	for ( var i = 0, il = rigidBodies.length; i < il; i++ ) {
		var objThree = rigidBodies[ i ];
		var objPhys = objThree.userData.physicsBody;
		var ms = objPhys.getMotionState();
		if ( ms ) {

			ms.getWorldTransform( transformAux1 );
			var p = transformAux1.getOrigin();
			var q = transformAux1.getRotation();
			objThree.position.set( p.x(), p.y(), p.z() );
			objThree.quaternion.set( q.x(), q.y(), q.z(), q.w() );

		  }
	}

}
var ground
var ball
// Cria o plano, paredes e obstáculos
function createObjects()  {
	
	var pos = new THREE.Vector3();
	var quat = new THREE.Quaternion();

	// Piso
	pos.set( 0, 0, 0 );
	// Rotação da mesa ( XYZW )
	quat.set( 0 * Math.PI / 180, floorRotateY * (Math.PI / 180), 0, 1 );
	ground = createParalellepiped( 1000, 1, 1000, 0, pos, quat, new THREE.MeshPhongMaterial( { color: 0xFFFFFF } ) );
	ground.castShadow = true;
	ground.receiveShadow = true;

	// var pivotA = new Ammo.btVector3( 0, 0.5, 0 );
	// var pivotB = new Ammo.btVector3( 0, -0.2, 0.5 );
	// var axis = new Ammo.btVector3( 0, 1, 0 );
	// hinge = new Ammo.btHingeConstraint( ground.userData.physicsBody, arm.userData.physicsBody, pivotA, pivotB, axis, axis, true );
	// physicsWorld.addConstraint( hinge, true );
	
	// Bola
	var pos = new THREE.Vector3();
	var quat = new THREE.Quaternion();

	var ballMass = 2;
	var ballRadius = 50;
	ball = new THREE.Mesh( new THREE.SphereGeometry( ballRadius, 20, 20 ), new THREE.MeshPhongMaterial( { color: 0x1467ff } ) );
	ball.castShadow = true;
	ball.receiveShadow = true;
	var ballShape = new Ammo.btSphereShape( ballRadius );
	ballShape.setMargin( margin );
	pos.set( 100, 300, 0 );
	quat.set( 0, 0, 0, 1 );
	createRigidBody( ball, ballShape, ballMass, pos, quat );
	ball.userData.physicsBody.setFriction( 0 );


}

// Viewport redimenciona junto com a janela
function onWindowResize()  {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

// Loop
function animate()  {
	/*
		Chama a função para atualizar a fisica, processamento de teclas e orbit. 
	*/
	var deltaTime = clock.getDelta()
	updatePhysics(deltaTime)
	// updateControls() | Orbit controls
	// createObjects()
	initInput()
	renderer.render(scene, camera)
	time += deltaTime
	requestAnimationFrame(animate)	
}

// Função que recebe informações sobre o objeto e transforma num objeto Ammo
function createParalellepiped( sx, sy, sz, mass, pos, quat, material ) {

	var threeObject = new THREE.Mesh( new THREE.BoxGeometry( sx, sy, sz, 1, 1, 1 ), material );
	var shape = new Ammo.btBoxShape( new Ammo.btVector3( sx * 0.5, sy * 0.5, sz * 0.5 ) );
	shape.setMargin( margin );

	createRigidBody( threeObject, shape, mass, pos, quat );

	return threeObject;

}

// Transforma o objeto Ammo em Three
function createRigidBody( threeObject, physicsShape, mass, pos, quat ) {

	threeObject.position.copy( pos );
	threeObject.quaternion.copy( quat );

	var transform = new Ammo.btTransform();
	transform.setIdentity();
	transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
	transform.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
	var motionState = new Ammo.btDefaultMotionState( transform );

	var localInertia = new Ammo.btVector3( 0, 0, 0 );
	physicsShape.calculateLocalInertia( mass, localInertia );

	var rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, physicsShape, localInertia );
	var body = new Ammo.btRigidBody( rbInfo );

	threeObject.userData.physicsBody = body;

	scene.add( threeObject );

	if ( mass > 0 ) {
		rigidBodies.push( threeObject );

		// Disable deactivation
		body.setActivationState( 4 );
	}

	physicsWorld.addRigidBody( body );

}

// Controla as ações do usuário
function initInput() {
	if(teclas[38]){
		// console.log(ground.quaternion)
		// console.log(ball.)
		ball.translateX(100)
	}
}

})