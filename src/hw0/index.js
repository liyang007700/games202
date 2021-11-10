import {Scene, PerspectiveCamera, WebGLRenderer, Color} from 'three'
import { loadOBJ } from './loadObj';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
export function initScene() {
    const scene = new Scene();
    const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const renderer = new WebGLRenderer({
        antialias:true,
        alpha:true
    });
    scene.background = new Color( 0x000000 );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    camera.position.z = 5;
    const controls = new OrbitControls( camera, renderer.domElement );
    camera.position.set( 0, 0, 10 );
    controls.update();
    loadOBJ('/assets/mary/', 'Marry').then((model) => {
        scene.add(model)
        function animate() {
            model.traverse((object) => {
                object.material.setUniformValue('uCameraPos', camera.position)
            })
            requestAnimationFrame( animate );
            renderer.render( scene, camera );
            controls.update();
        }
        animate();
    }).catch((e) => {
        console.log(e, 'e')
    })
    
}