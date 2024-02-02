import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import {FRAMES} from './constants.ts'
import { setCameraPosition } from './setCameraPosition.ts';

export const initThree = () => {
	const width = window.innerWidth;
	const height = window.innerHeight;
	
	const canvas = document.querySelector('canvas#modelCanvas') as Element
	
	// CAMERA
	const camera = new THREE.PerspectiveCamera( 75, width / height );
	const startPosition = FRAMES[0].position
	camera.position.set(startPosition.x, startPosition.y, startPosition.z);

	
	const scene = new THREE.Scene();

	// LIGHT
	const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61)
	hemisphereLight.position.set(0, 50, 0)
	scene.add(hemisphereLight)

	const directionalLight = new THREE.DirectionalLight(0xffffff, 0.54)
	directionalLight.position.set(-8, 12, 8)
	directionalLight.castShadow = true
	directionalLight.shadow.mapSize = new THREE.Vector2(1024, 1024)
	scene.add(directionalLight)

	//RENDER
	const renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );
	renderer.setSize( width, height );

	const rerenderFn = (scene: THREE.Scene) => {
		return (camera: THREE.PerspectiveCamera) => {
			renderer.render( scene, camera )
		}
	}

	const updateCamera = () => {
		renderer.render( scene, camera )
	}

	// setCameraPosition(camera, rerenderFn(scene))

	// setCameraPosition(camera)

	const loader = new GLTFLoader()
	loader.load(
		'/src/assets/models/cafe/cafe_model.gltf',
		(gltf) => {
			scene.add(gltf.scene)
			renderer.render(scene, camera)
		}
	)

	// animation

	window.onscroll = () => {
		// setCameraPosition(camera, rerenderFn(scene))

		// setCameraPosition(camera)
		// rerenderFn(scene)(camera)
	}

	// ACTIONS
	window.onresize = () => {
		const newWidth = window.innerWidth
		const newHeight = window.innerHeight

		camera.aspect = newWidth / newHeight
		camera.updateProjectionMatrix()

		renderer.setSize(newWidth, newHeight)
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
		renderer.render(scene, camera)
	}

	return {camera, updateCamera}
}
