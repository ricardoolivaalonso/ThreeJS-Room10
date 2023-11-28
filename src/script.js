// He visto los tutoriales de Bruno Simon y estoy usando su repositorio: https://github.com/brunosimon/my-room-in-3d 
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()
const textureLoader = new THREE.TextureLoader()
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)


// Materials
const bakedTexture = textureLoader.load('/baked-01.jpg')
bakedTexture.flipY = false
bakedTexture.encoding = THREE.sRGBEncoding

const bakedMaterial = new THREE.MeshBasicMaterial({ 
    map: bakedTexture,
})


const bakedTexture2 = textureLoader.load('/baked-02.jpg')
bakedTexture2.flipY = false
bakedTexture2.encoding = THREE.sRGBEncoding

const bakedMaterial2 = new THREE.MeshBasicMaterial({ 
    map: bakedTexture2,
})
    

//Loader
gltfLoader.load(
    '/model-01.glb',
    (gltf) => {
        gltf.scene.traverse( child => child.material = bakedMaterial )
        scene.add(gltf.scene)
    }
)

gltfLoader.load(
    '/model-02.glb',
    (gltf) => {
        gltf.scene.traverse( child => child.material = bakedMaterial2 )
        loader.style.display = 'none'
        scene.add(gltf.scene)
    }
)

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Base camera
const camera = new THREE.PerspectiveCamera(10, sizes.width / sizes.height, 0.1, 500)

camera.position.x = 28
camera.position.y = 6
camera.position.z = 25
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enableZoom = true
controls.enablePan = true
controls.minDistance = 30
controls.maxDistance = 80
controls.minPolarAngle = Math.PI / 5
controls.maxPolarAngle = Math.PI / 2


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputEncoding = THREE.sRGBEncoding


var minPan = new THREE.Vector3( -2, -.5, -2 )
var maxPan = new THREE.Vector3( 2, .5, 2 )
//Animation
const tick = () =>
{
    controls.update()
    controls.target.clamp( minPan, maxPan )
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()