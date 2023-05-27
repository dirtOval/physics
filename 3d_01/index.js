import * as THREE from 'three';
import('@dimforge/rapier3d').then(RAPIER => {

  // //3D stuff
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, window.innerWidth /
    window.innerHeight, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const cubeGeo = new THREE.BoxGeometry(1.0, 1.0, 1.0);
  const cubeMat = new THREE.MeshBasicMaterial({ color: 0x0062ff });
  const cube = new THREE.Mesh(cubeGeo, cubeMat);

  const groundGeo = new THREE.BoxGeometry(10.0, 1.0, 10.0);
  const groundMat = new THREE.MeshBasicMaterial({ color: 0x32a852 });
  const ground = new THREE.Mesh(groundGeo, groundMat);

  scene.add(cube);
  scene.add(ground);

  camera.position.set(0, 3, -5);
  // camera.rotation.set(0, 0, 0);


  // //physics stuff
  let world = new RAPIER.World({ x: 0.0, y: -9.81, z: 0.0 });

  let groundCollider = world.createCollider(RAPIER.ColliderDesc.cuboid(10.0, 1.0, 10.0));

  let rigidBody = world.createRigidBody(RAPIER.RigidBodyDesc.dynamic()
    .setTranslation(0.0, 5.0, 0)
  );

  let collider = world.createCollider(
    RAPIER.ColliderDesc.cuboid(1.0, 1.0, 1.0),
    rigidBody
  );


  //animation loop
  function animate() {
    requestAnimationFrame(animate);
    world.step();
    let cubePosition = rigidBody.translation();
    // console.log(cubePosition);

    cube.position.set(cubePosition.x, cubePosition.y, cubePosition.z);
    camera.lookAt(cubePosition.x, cubePosition.y, cubePosition.z);
    console.log(cube.position);
    renderer.render(scene, camera);

  }
  animate();

});