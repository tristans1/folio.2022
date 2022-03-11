import * as THREE from 'three';

export default class distortion{
    constructor(texture){
        this.container = document.querySelector('main');
        this.links = document.querySelectorAll('li');
        this.scene = new THREE.Scene();
        this.perspective = 1000;
        this.sizes = new THREE.Vector2(0,0);
        this.offset = new THREE.Vector2(0,0);
        this.uniforms = {
            uTexture: {value: texture},
            uAlpha: {value: 0.0},
            uOffset: {value : new THREE.Vector2(0, 0)}
        }

    }
}
