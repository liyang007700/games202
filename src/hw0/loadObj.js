
import {LoadingManager, TextureLoader} from 'three'
import {PhongMaterial} from '../hw0/PhongMaterial'
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
export function loadOBJ(path, name) {
    return new Promise((resolve, reject) => {
        const manager = new LoadingManager();
        manager.onProgress = function (item, loaded, total) {
            console.log(item, loaded, total);
        };

        function onProgress(xhr) {
            if (xhr.lengthComputable) {
                const percentComplete = xhr.loaded / xhr.total * 100;
                console.log('model ' + Math.round(percentComplete, 2) + '% downloaded');
            }
        }
        function onError(e) { 
            reject(e)   
        }

        new MTLLoader(manager)
            .setPath(path)
            .load(name + '.mtl', function (materials) {
                materials.preload();
                new OBJLoader(manager)
                    .setMaterials(materials)
                    .setPath(path)
                    .load(name + '.obj', function (object) {
                        object.traverse(function (child) {
                            const texture = new TextureLoader().load( path + 'Marry.png' );
                            child.material = new PhongMaterial({ map: texture })
                        })
                        resolve(object)
                    }, onProgress, onError);
            });
    })
	
}
