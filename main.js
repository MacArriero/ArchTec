import './style.css'
import * as THREE from 'three'
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('#000')

// Renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild(renderer.domElement);

// Camera
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 100)
camera.position.set(0.12708670244732748, 3.287690018089737,0.0001766378707664069)
scene.add(camera)

// Dynamically resizes the render
window.addEventListener('resize', () => {
    const width = window.innerWidth
    const height = window.innerHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()

    renderer.setSize(width, height)
    renderer.setPixelRatio(2)
})

// Orbit Controls - to move around during development
const controls = new OrbitControls(camera, renderer.domElement)
// controls.addEventListener("change", event => {  
//   console.log( controls.object.position); 
// });

// Lighting
const sunLight = new THREE.DirectionalLight(0xe8c37b, 0.5)
sunLight.position.set(60,0,20)
scene.add(sunLight)

const sunLight2 = new THREE.DirectionalLight(0xfff, 0.5)
sunLight2.position.set(0,20 ,-20)
scene.add(sunLight2)


const loadingManager = new THREE.LoadingManager();

var body = document.body;
loadingManager.onStart = function(url, item, total) {
  body.style.overflowY = 'hidden';
}


const progressBar = document.getElementById('progress-bar');
loadingManager.onProgress = function(url, loaded, total) {
  progressBar.value = (loaded /total) * 100;
}

const progressBarContainer = document.getElementById('progress-bar-container');
loadingManager.onLoad = function() {
  progressBarContainer.style.display = 'none';
  introAnimation();
}

// Models
const loader = new GLTFLoader(loadingManager);
loader.load('models/gltf/minimalistic_modern_bedroom/scene.gltf', function (gltf) {
    scene.add(gltf.scene)
})

loader.load('models/gltf/small_modern_kitchen/scene.gltf', function (gltf) {
    gltf.scene.position.set(0, 0, 20);
    scene.add(gltf.scene)
})

loader.load('models/gltf/white_modern_living_room/scene.gltf', function (gltf) {
  gltf.scene.position.set(0, 0, 40);
  scene.add(gltf.scene)
})



// Tween intro animation
function introAnimation() {
    controls.enabled = false 
    const sections = document.querySelectorAll('.section');
    sections[0].scrollIntoView({behavior: 'smooth'});
    new TWEEN.Tween(camera.position.set(0.12708670244732748, 3.287690018089737, 0.0001766378707664069)).to({ // from camera position
        x:3.5680979867912708,
        y:-0.013929508039182147,
        z:4.179124705662806,
    }, 7000)
    .delay(1000).easing(TWEEN.Easing.Quartic.InOut).start()
    .onComplete(function () { 
      body.style.overflowY = 'scroll';
      TWEEN.remove(this)
    })
}

gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.defaults({
  scrub: 2,
  ease: 'expo',
})


const sections = document.querySelectorAll('.section');
// Section 0 to 1
gsap.fromTo(camera.position, 
  {
  x:3.5680979867912708,
  y:-0.013929508039182147,
  z:4.179124705662806
  },
  {
  x:1.044270637166817,
  y:0.9039492160623402,
  z:23.06432716930966,
  scrollTrigger: {
    trigger: sections[1],
    start: "top 80%",
    end: "bottom 30%",
  }
})

gsap.to(".header", {top: 0, duration: 1, 
  scrollTrigger: {
  trigger: sections[1],
  start: "top 80%",
  end: "bottom 30%",
  }
});

gsap.to("#brand-name", {
  fontSize: 60,
  scrollTrigger: {
    trigger: sections[1],
    start: "top 80%",
    end: "bottom 30%",
  }
});

gsap.to("#logo", {
  height: 48,
  width: 48,
  scrollTrigger: {
    trigger: sections[1],
    start: "top 80%",
    end: "bottom 30%",
  }
});

gsap.to(".design-title", {
  color: "#2D2A27",
  zIndex: 10,
  scrollTrigger: {
    trigger: sections[1],
    start: "top top",
    end: "bottom bottom",
  }
})

// Section 1 to 2
gsap.fromTo(camera.position, 
  {
    x:1.044270637166817,
    y:0.9039492160623402,
    z:23.06432716930966
  },
  {
    x: -1.144487, 
    y: -0.263190, 
    z: 25.57455,
    scrollTrigger: {
      trigger: sections[2],
      start: "top 80%",
      end: "bottom 30%",
    }
})

gsap.to(".design-title", {
  color: "transparent",
  scrollTrigger: {
    trigger: sections[2],
    start: "top top",
    end: "bottom bottom",
  }
})

gsap.to(".lifestyle-title", {
  color: "#2D2A27",
  zIndex: 10,
  scrollTrigger: {
    trigger: sections[2],
    start: "top top",
    end: "bottom bottom",
  }
})

// Section 2 to 3
gsap.fromTo(camera.position, 
  { 
    x: -1.144487, 
    y: -0.263190, 
    z: 25.57455
  },
  {
    x:-0.7407325853596494,
    y:0.6298891862538815,
    z:42.74866059604781,
    scrollTrigger: {
      trigger: sections[3],
      start: "top 80%",
      end: "bottom 30%",
    }
})

gsap.to(".lifestyle-title", {
  color: "transparent",
  scrollTrigger: {
    trigger: sections[3],
    start: "top top",
    end: "bottom bottom",
  }
})

gsap.to(".technology-title", {
  color: "#E8E2DA",
  zIndex: 10,
  scrollTrigger: {
    trigger: sections[3],
    start: "top top",
    end: "bottom bottom",
  }
})

// Section 3 to 4
gsap.fromTo(camera.position, 
  { 
    x:-0.7407325853596494,
    y:0.6298891862538815,
    z:42.74866059604781,
  },
  {
    x:0.49977949383732434,
    y:1.3458372689312172,
    z:38.56393155516896,
    scrollTrigger: {
      trigger: sections[4],
      start: "top top",
      end: "bottom bottom",
    }
})

gsap.to(".technology-title", {
  color: "transparent",
  scrollTrigger: {
    trigger: sections[4],
    start: "top top",
    end: "bottom bottom",
  }
})

gsap.to(".section", {
  backgroundColor: "black",
  scrollTrigger: {
    trigger: sections[4],
    start: "top top",
    end: "bottom bottom",
  }
})

gsap.to(".collection-title", {
  color: "#E8E2DA",
  scrollTrigger: {
    trigger: sections[4],
    start: "top top",
    end: "bottom bottom",
  }
})


function renderLoop() {
  TWEEN.update()
  controls.update() /
  renderer.render(scene, camera) 
  requestAnimationFrame(renderLoop)
}

renderLoop() //start rendering

// Ensures section is displayed when browser is refreshed
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

const sliders = [...document.querySelectorAll(".slider_container")];

sliders.forEach((slider, i) => {
  let isDragStart = false,
      isDragging = false,
      isSlide = false,
      prevPageX,
      prevScrollLeft,
      positionDiff;

  const sliderItem = slider.querySelector(".slider_item");
  var isMultislide = (slider.dataset.multislide === 'true');

  function autoSlide() {
    if(slider.scrollLeft - (slider.scrollWidth - slider.clientWidth) > -1 || slider.scrollLeft <= 0) return;
    positionDiff = Math.abs(positionDiff);
    let slideWidth = isMultislide ? slider.clientWidth : sliderItem.clientWidth;
    let valDifference = slideWidth - positionDiff;
    if(slider.scrollLeft > prevScrollLeft) {
        return slider.scrollLeft += positionDiff > slideWidth / 5 ? valDifference : -positionDiff;
    }
    slider.scrollLeft -= positionDiff > slideWidth / 5 ? valDifference : -positionDiff;
  }

  function dragStart(e) {
    if (isSlide) return;
    isSlide = true;
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = slider.scrollLeft;
    setTimeout(function(){ isSlide = false; }, 700);
  }

  function dragging(e) {
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    slider.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    slider.scrollLeft = prevScrollLeft - positionDiff;
  }

  function dragStop() {
    isDragStart = false;
    slider.classList.remove("dragging");
    if(!isDragging) return;
    isDragging = false;
    autoSlide();
  }

  addEventListener("resize", autoSlide);
  slider.addEventListener("mousedown", dragStart);
  slider.addEventListener("touchstart", dragStart);
  slider.addEventListener("mousemove", dragging);
  slider.addEventListener("touchmove", dragging);
  slider.addEventListener("mouseup", dragStop);
  slider.addEventListener("touchend", dragStop);
  slider.addEventListener("mouseleave", dragStop);
});
