/* eslint-disable no-underscore-dangle */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable no-undef */

import "./assets/perlin";
import "three-orbitcontrols";
import "./assets/OBJLoader";

(function() {
	const canvas = document.querySelector("#redsphere");
	let width = window.innerWidth;
	let height = window.innerHeight;

	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: false,
		alpha: true,
	});
	renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
	renderer.setSize(width, height);

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(
		30,
		window.innerWidth / window.innerHeight,
		1,
		10000
	);
	const controls = new THREE.OrbitControls(camera, renderer.domElement);
	camera.position.set(0, 200, 0);
	controls.update();
	const sphere = new THREE.Group();
	scene.add(sphere);
	const colorRed = new THREE.Color(0xff0000);
	// let colorBlack = new THREE.Color(0x000000);
	const material = new THREE.LineBasicMaterial({
		color: colorRed,
	});

	// console.log(camera.position);

	const loader = new THREE.OBJLoader();
	let guitar = new THREE.Mesh();

	loader.load(
		"dist/guitar.obj",

		object => {
			scene.add(object);
			guitar = object;
			object.scale.set(1, 1, 1);
			object.position.set(-3, 180, -6);
			object.rotation.z = 0.9;
			object.rotation.y = 0.5;
			object.traverse(function(child) {
				if (child instanceof THREE.Mesh) {
					child.material.wireframe = true;
					child.material.needsUpdate = true;
				}
			});
		}
	);

	const directionalLight = new THREE.DirectionalLight(0xff0000, 0.9);
	scene.add(directionalLight);

	const linesAmount = 31;
	const radius = 200;
	const verticesAmount = 100;
	for (let j = 0; j < linesAmount; j++) {
		const index = j;
		const geometry = new THREE.Geometry();
		geometry.y = (index / linesAmount) * radius * 2;
		for (let i = 0; i <= verticesAmount; i++) {
			const vector = new THREE.Vector3();
			vector.x = Math.cos((i / verticesAmount) * Math.PI * 2);
			vector.z = Math.sin((i / verticesAmount) * Math.PI * 2);
			vector._o = vector.clone();
			geometry.vertices.push(vector);
		}
		const line = new THREE.Line(geometry, material);
		sphere.add(line);
	}

	function updateVertices(a) {
		for (let j = 0; j < sphere.children.length; j++) {
			const line = sphere.children[j];
			line.geometry.y += 0.1;
			if (line.geometry.y > radius * 2) {
				line.geometry.y = 0;
			}
			const radiusHeight = Math.sqrt(
				line.geometry.y * (2 * radius - line.geometry.y)
			);
			for (let i = 0; i <= verticesAmount; i++) {
				const vector = line.geometry.vertices[i];
				const ratio =
					noise.simplex3(
						vector.x * 0.009,
						vector.z * 0.009 + a * 0.0006,
						line.geometry.y * 0.009
					) * 10;
				vector.copy(vector._o);
				vector.multiplyScalar(radiusHeight + ratio);
				vector.y = line.geometry.y - radius;
			}
			line.geometry.verticesNeedUpdate = true;
		}
	}

	function render(a) {
		requestAnimationFrame(render);
		controls.update();
		updateVertices(a);
		renderer.render(scene, camera);
		//     renderer.render();
		// guitar.rotation.x += 0.01;
		guitar.rotation.z -= 0.001;
		// guitar.rotation.y -= 0.001;
	}

	function onResize() {
		canvas.style.width = "";
		canvas.style.height = "";
		width = window.innerWidth;
		height = window.innerHeight;
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	}

	requestAnimationFrame(render);
	let resizeTm;
	window.addEventListener("resize", function() {
		resizeTm = clearTimeout(resizeTm);
		resizeTm = setTimeout(onResize, 10);
	});

	// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// JQUERY///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	$("#title h1").hover(() => {
		material.color = colorRed;
		$(".wrapper").css("background", "#c60000");
		$("h1").fadeOut(300, () => {
			$("h1")
				.text("ヴィクシディアス")
				.css("color", "#000000")
				.css("font-family", "Hiragino Kaku Gothic StdN")
				.css("font-style", "italic")
				.css("font-size", "8vw")
				.css("font-weight", "900")
				.fadeIn();
			$("#social, #copyright, .icomoon").css("color", "black");
			$("#vslogoskull").css("filter", "brightness(0%)");
		});
	});

	$("#title h1").mouseout(() => {
		material.color = colorRed;
		$(".wrapper").css("background", "#121212");
		$("h1").fadeOut(300, () => {
			$("h1")
				.text("VIC SIDIOUS")
				.css("color", "#ff0026")
				.css("font-size", "10vw")
				.css("font-style", "normal")
				.css("font-family", "GothamXNUI")
				.css("font-weight", "400")
				.fadeIn();
			$("#social, #copyright, .icomoon").css("color", "#ff0026");
			$("#vslogoskull").css("filter", "brightness(100%)");
		});
	});

	setTimeout(() => {
		$(".loader").animate({ opacity: 0 }, 1000);
	}, 8000);
	setTimeout(() => {
		$(".loader").css("z-index", "-5");
	}, 9000);
})();
