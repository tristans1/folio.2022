<template>
    <main ref="main">
        <ul ref="ul">
            <li ref="li">
                <div class="project-container">
                    <div class="project-letters">
                        <span>Q</span>
                        <span>U</span>
                        <span>A</span>
                        <span>K</span>
                        <span>E</span>
                        <span>&nbsp;</span>
                        <span>R</span>
                        <span>E</span>
                        <span>M</span>
                        <span>A</span>
                        <span>K</span>
                        <span>E</span>
                    </div>
                    <span class="project-context">3D/ Unity [ <span class="text-serif">2022</span> ]</span>
                </div>
                    <span ref="link" class="project-link text-serif">see project &nbsp;
                        <IconComponent icon="bi:arrow-right"/>
                    </span>
                </li>
                <li ref="li">
                    <div class="project-container">
                        <div class="project-letters">
                            <span>F</span>
                            <span>O</span>
                            <span>L</span>
                            <span>I</span>
                            <span>0</span>
                            <span>&nbsp;</span>
                            <span>.</span>
                            <span>0</span>
                            <span>1</span>
                        </div>
                        <span class="project-context">UX/ Vue [ <span class="text-serif">2021</span> ]</span>
                    </div>
                    <span ref="link" class="project-link text-serif">see project &nbsp;
                        <IconComponent icon="bi:arrow-right"/>
                    </span>
                </li>
                <li ref="li">
                    <div class="project-container">
                        <div class="project-letters">
                            <span>R</span>
                            <span>O</span>
                            <span>O</span>
                            <span>M</span>
                        </div>
                        <span class="project-context">3D/ three.js/  WebGL [ <span class="text-serif">2021</span> ]</span>
                    </div>
                    <span ref="link" class="project-link text-serif">see project &nbsp;
                        <IconComponent icon="bi:arrow-right"/>
                    </span>
                </li>
                <li ref="li">
                    <div class="project-container">
                        <div class="project-letters">
                            <span>T</span>
                            <span>I</span>
                            <span>M</span>
                            <span>&nbsp;</span>
                            <span>B</span>
                            <span>U</span>
                            <span>R</span>
                            <span>T</span>
                            <span>O</span>
                            <span>N</span>
                        </div>
                        <span class="project-context">UX/ Web Development/ Vue [ <span class="text-serif">2019</span> ]</span>
                    </div>
                    <span ref="link" class="project-link text-serif">see project &nbsp;
                        <IconComponent icon="bi:arrow-right"/>
                    </span>
                </li>
                <li ref="li">
                    <div class="project-container">
                        <div class="project-letters">
                            <span>S</span>
                            <span>N</span>
                            <span>'</span>
                            <span>R</span>
                        </div>
                        <span class="project-context">UX UI/ Web Development [ <span class="text-serif">2019</span> ]</span>
                    </div>
                    <span ref="link" class="project-link text-serif">see project &nbsp;
                        <IconComponent icon="bi:arrow-right"/>
                    </span>
                </li>
            <li ref="li">
                <div class="project-container">
                    <div class="project-letters">
                        <span>3</span>
                        <span>D</span>
                        <span>&nbsp;</span>
                        <span>A</span>
                        <span>R</span>
                        <span>T</span>
                    </div>
                    <span class="project-context">WebGL/ three.js [ <span class="text-serif">2022</span> ]</span>
                </div>
                <span ref="link" class="project-link text-serif">see project &nbsp;
                        <IconComponent icon="bi:arrow-right"/>
                    </span>
            </li>
                <li ref="li">PROJECT5</li>
                <li ref="li">PROJECT5</li>
                <li ref="li">PROJECT5</li>
            </ul>
        </main>
</template>
<script>
    import * as THREE from 'three';
    import images from '../assets/js/images';
    import vertex from '../assets/shaders/works/vertex';
    import fragment from '../assets/shaders/works/fragment';
    import threeMixin from '../mixins/threeMixin';
    import {lerp} from '../utils/lerp';

    export default {
        name: 'WorksComponent',
        data() {
            return {
                camera: null,
                container: null,
                isHover: false,
                projects: [],
                linkIsHover: false,
                lastScrollOffset: 0,
                mesh: null,
                offset: null,
                perspective: null,
                renderer: null,
                scene: null,
                sizes: null,
                scrollOffset: null,
                target : {
                    x: 0,
                    y: 0
                },
                textureOne: null,
                textureTwo: null,
                textureThree: null,
                textureFour: null,
                textureFive: null,
                uniforms: null,
                viewport: null,
            };
        },
        mixins : [threeMixin],
        mounted() {
            // initialize container, target and viewport
            this.container = this.$refs.main;
            this.viewport = this.setViewportSize(this.container);

            this.loadImages();
            this.createScene();
        },
        methods: {
            createMesh() {
                const geometry = new THREE.PlaneGeometry(1, 1, 20, 20);
                const material = new THREE.ShaderMaterial({
                    uniforms: this.uniforms,
                    vertexShader: vertex,
                    fragmentShader: fragment,
                    transparent: true,
                });

                this.mesh = new THREE.Mesh(geometry, material);
                this.sizes.set(250, 350);
                this.mesh.scale.set(this.sizes.x, this.sizes.y);
                this.mesh.position.set(this.offset.x, this.offset.y, 0);
                this.scene.add(this.mesh);
            },
            createScene() {
                this.projects = this.$el.querySelectorAll('li');
                this.scene = new THREE.Scene();
                this.perspective = 1000;
                this.sizes = new THREE.Vector2(0, 0);
                this.offset = new THREE.Vector2(0, 0);
                this.uniforms = {
                    uTexture: {value: null},
                    uAlpha: {value: 0.0},
                    uOffset: {value: new THREE.Vector2(0.0, 0.0)},
                };
                this.projects.forEach((project, index) => {
                    project.addEventListener('mouseenter', () => {
                        switch (index) {
                            case 0:
                                this.uniforms.uTexture.value = this.textureOne;
                                break;
                            case 1:
                                this.uniforms.uTexture.value = this.textureTwo;
                                break;
                            case 2:
                                this.uniforms.uTexture.value = this.textureThree;
                                break;
                            case 3:
                                this.uniforms.uTexture.value = this.textureFour;
                                break;
                            case 4:
                                this.uniforms.uTexture.value = this.textureTwo;
                                break;
                            case 5:
                                this.uniforms.uTexture.value = this.textureThree;
                                break;
                            default :
                                this.uniforms.uTexture.value = this.textureOne;
                                break;
                        }
                    });
                });
                this.onMouseHover(this.$refs.ul);
                this.onMouseHoverLink(this.$el.querySelectorAll('span.project-link'));
                this.setUpCamera();
                this.onMouseMove();
                this.onScrollMove();
                this.createMesh();
                this.render();
            },
            loadImages() {
                this.textureOne = new THREE.TextureLoader().load(images.robot);
                this.textureTwo = new THREE.TextureLoader().load(images.folio);
                this.textureThree = new THREE.TextureLoader().load(images.sculpture);
                this.textureFour = new THREE.TextureLoader().load(images.tim);
                this.textureFive = new THREE.TextureLoader().load(images.dino);
            },
            onMouseHover(el) {
                el.addEventListener('mouseenter', () => {
                    this.isHover = true;
                });
                el.addEventListener('mouseleave', () => {
                    this.isHover = false;
                });

            },
            onMouseHoverLink(el) {
                el.forEach((link) => {
                    link.addEventListener('mouseenter', () => {
                        this.linkIsHover = true;
                    });
                    link.addEventListener('mouseleave', () => {
                        this.linkIsHover = false;
                    });
                })

            },
            onWindowResize() {
                // redefine the viewport
                this.viewport = this.setViewportSize(this.container);

                this.camera.aspect = this.viewport.aspectRatio;
                this.camera.fov = (180 * (2 * Math.atan(this.viewport.height / 2 / this.perspective))) / Math.PI;
                this.renderer.setSize(this.viewport.width, this.viewport.height);
                this.camera.updateProjectionMatrix();
            },
            render() {
                this.offset.x = lerp(this.offset.x, this.target.x, 0.1);
                this.offset.y = lerp(this.offset.y, this.target.y, 0.1);

                this.uniforms.uOffset.value.set((this.target.x - this.offset.x) * 0.0005, -(this.target.y - this.offset.y) * 0.0005);
                this.mesh.position.set(this.offset.x - (this.viewport.width / 2), -this.offset.y + ((this.viewport.height) / 2));
                this.renderer.setSize(this.viewport.width, this.viewport.height);
                this.renderer.render(this.scene, this.camera);

                this.isHover ?
                    this.uniforms.uAlpha.value = lerp(this.uniforms.uAlpha.value, 1.0, 0.1) :
                    this.uniforms.uAlpha.value = lerp(this.uniforms.uAlpha.value, 0.0, 0.1);

                for (let i = 0; i < this.projects.length; i++) {
                    this.isHover ? this.projects[i].style.opacity = 0.3 : this.projects[i].style.opacity = 1;
                }
                requestAnimationFrame(this.render.bind(this));
            },
            setUpCamera() {
                window.addEventListener('resize', this.onWindowResize.bind(this));
                const fov = (180 * (2 * Math.atan(this.viewport.height / 2 / this.perspective))) / Math.PI;
                this.camera = new THREE.PerspectiveCamera(fov, this.viewport.aspectRatio, 0.1, 1000);
                this.camera.position.set(0, 0, this.perspective);
                this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true}); // avant était ecrit WebGL1Renderer
                this.renderer.setSize(this.viewport.width, this.viewport.height);
                this.renderer.setPixelRatio(window.devicePixelRatio);
                this.container.appendChild(this.renderer.domElement);
            },

        },

    };
</script>
<style scoped lang="scss">
    @import "../assets/scss/font";
    @import "../assets/scss/vars";
    main {
        width: $works-container-width;
        height: $works-container-height;
        ul {
            display: flex;
            position: absolute;
            flex-direction: column;
            justify-content: space-between;
            top: $works-list-top;
            left: $works-list-left;
            width: $works-list-width;
            height: $works-list-height;
            padding-left: $normal-spc;
            padding-right: $normal-spc;
            li {
                max-height: $works-project-height;
                position: relative;
                display: flex;
                align-items: center;
                font-family: $font-family-second;
                mix-blend-mode: $mbm-value;
                height: 100%;
                padding: $normal-spc;
                font-size: 5rem;
                transition: 1s;
                cursor: $cursor-cross;
                &:after,
                &:before {
                    content: "";
                    position: absolute;
                    height: 1px;
                    background: $white-main-color;
                    left: 0;
                    right: 0;
                    opacity: .2 !important;
                }
                &:before {
                    top: 0;
                }
                &:after {
                    bottom: 0;
                }
                .project-container {
                    display: flex;
                    flex-direction: column;
                    .project-letters > span {
                        transform-origin: left;
                        transition: .5s;
                        font-size: 5rem;
                        &:hover {
                            color: $mbm-revert-color;
                        }
                    }
                    .project-context {
                        font-size: 1rem;
                        line-height: 2.5rem;
                        padding-left: $normal-spc;
                        font-family: $font-family-main;
                        bottom: 10px;
                        //.year{
                        //    font-family: $font-family-third;
                        //    font-weight: $semibold-weight;
                        //    font-style: italic;
                        //}
                    }
                }
                .project-link {
                    font-size: 1rem;
                    line-height: 2.5rem;
                    height: fit-content;
                    text-align: center;
                    margin-left: auto;
                    opacity: 0;
                    transition: 1s;
                    display: flex;
                    align-items: center;
                    &:hover {
                        cursor: $cursor-link;
                    }
                }
                &:first-of-type {
                    &:before {
                        content: none !important;
                    }
                }
                &:last-of-type {
                    &:after {
                        content: none;
                    }
                }
                &:hover {
                    opacity: 1 !important;
                    padding-left: $semibold-spc;
                    .project-link {
                        opacity: 1 !important;
                    }
                    &:after {
                        //opacity: .!important;
                    }
                }
            }
        }
    }
</style>
