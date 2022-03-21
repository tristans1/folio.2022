<template>
    <div ref="main"></div>
</template>
<script>
    import * as THREE from 'three';
    import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
    import {FlakesTexture} from 'three/examples/jsm/textures/FlakesTexture';
    import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

    export default {
        name: 'SphereComponent',
        data() {
            return {
                camera: null,
                container: null,
                controls: null,
                pointLight: null,
                renderer: null,
                scene: null,
                sphere: null,
                viewport: null
            };
        },
        mounted() {
            this.setViewport();
            this.runScene();

        },
        methods: {
            onWindowResize() {
               this.setViewport();

                this.camera.aspect = this.viewport.aspectRatio;
                this.renderer.setSize(this.viewport.width, this.viewport.height);
                this.camera.updateProjectionMatrix();
            },


            runScene() {
                window.addEventListener('resize', this.onWindowResize.bind(this));
                this.scene = new THREE.Scene();

                this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
                this.renderer.setSize(this.viewport.width, this.viewport.height);
                this.renderer.setPixelRatio(window.devicePixelRatio);

                this.camera = new THREE.PerspectiveCamera(50, this.viewport.width / this.viewport.height, 1, 1000);
                this.camera.position.set(0, 0, 600);

                this.createControls();

                this.createLight();

                this.createSphere();

                this.container.appendChild(this.renderer.domElement);
                this.renderer.outputEncoding = THREE.sRGBEncoding;
                this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
                this.renderer.toneMappingExposure = 1.25;


                this.render();
            },

            setViewport() {
                this.container = this.$refs.main;

                const width = this.container.clientWidth;
                const height = this.container.clientHeight;
                const aspectRatio = width / height;

                this.viewport = {
                    width,
                    height,
                    aspectRatio,
                };
            },

            createControls() {
                this.controls = new OrbitControls(this.camera, this.renderer.domElement);
                this.controls.autoRotate = true;
                this.controls.autoRotateSpeed = 1;
                this.controls.enableDamping = true;

            },

            createLight(){

                const blueLight = new THREE.SpotLight(0x0000ff, .2)
                this.pointLight = new THREE.SpotLight(0xffff00, 1);
                this.pointLight.position.set(200, 200, 200);
                blueLight.position.set(-200, 500, -100);

                this.scene.add(this.pointLight);
                this.scene.add(blueLight);

            },

            createSphere(){

                const envmapLoader = new THREE.PMREMGenerator(this.renderer);
                new RGBELoader().setPath('./textures/').load('galaxy.hdr', (hdr) => {

                    const envmap = envmapLoader.fromCubemap(hdr);
                    const texture = new THREE.CanvasTexture(new FlakesTexture());
                    texture.wrapS = THREE.RepeatWrapping;
                    texture.wrapT = THREE.RepeatWrapping;
                    texture.repeat.x = 15; // 10
                    texture.repeat.y = 8; // 6

                    const sphereMaterial = {
                        clearcoat: 1,
                        clearcoatRoughness: 0.1,
                        // reflectivity: 0.5,
                        metalness: 0.73,
                        roughness: 0.1,
                        color: 0x9C0817,
                        normalMap: texture,
                        normalScale: new THREE.Vector2(0.15, 0.15),
                        envMap: envmap.texture
                    }

                    const sphereGeometry = new THREE.SphereGeometry(100, 64, 64);
                    const sphereMat = new THREE.MeshPhysicalMaterial(sphereMaterial);

                    // const shader = new THREE.ShaderMaterial({
                    //     vertexShader: `vec3 rgb = vNormal * 0.5 + 0.5;
                    //        vec4 diffuseColor = vec4(rgb, 1.); `
                    // })
                    this.sphere = new THREE.Mesh(sphereGeometry, sphereMat);

                    this.scene.add(this.sphere);
                })
            },

            render() {
                this.controls.update();
                this.renderer.render(this.scene, this.camera);

                requestAnimationFrame(this.render);
            },
        },

    };
</script>
<style scoped lang="scss">
    div{
        height: calc(100vh - 5rem);
        width: calc(100vw - 5rem);
        //width: 100%;
        //height: 100vh;
        margin-left: 2.5rem;
    }
</style>
