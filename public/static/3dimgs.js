class Gl {
  constructor() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );

    this.camera.position.z = 1.3;
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.clock = new THREE.Clock();

    this.onResize();
  }

  init(el, index) {
    this.el = el;
    this.num = index;
    this.rendElem();
    this.createMesh();
    this.addEvents();
  }

  rendElem() {
    this.el.append(this.renderer.domElement);
  }

  createMesh() {
    this.geometry = new THREE.PlaneGeometry(1, 1, 32, 32);
    this.material = new THREE.ShaderMaterial({
      vertexShader: `precision mediump float;
    
          varying vec2 vUv;
          varying float vWave;
          uniform float uTime;
          
          vec3 mod289(vec3 x){
            return x-floor(x*(1./289.))*289.;
          }
          
          vec4 mod289(vec4 x){
            return x-floor(x*(1./289.))*289.;
          }
          
          vec4 permute(vec4 x){
            return mod289(((x*34.)+1.)*x);
          }
          
          vec4 taylorInvSqrt(vec4 r)
          {
            return 1.79284291400159-.85373472095314*r;
          }
          
          float snoise(vec3 v){
            const vec2 C=vec2(1./6.,1./3.);
            const vec4 D=vec4(0.,.5,1.,2.);
            
            vec3 i=floor(v+dot(v,C.yyy));
            vec3 x0=v-i+dot(i,C.xxx);
            
            vec3 g=step(x0.yzx,x0.xyz);
            vec3 l=1.-g;
            vec3 i1=min(g.xyz,l.zxy);
            vec3 i2=max(g.xyz,l.zxy);
            
            vec3 x1=x0-i1+C.xxx;
            vec3 x2=x0-i2+C.yyy;
            vec3 x3=x0-D.yyy;
            
            i=mod289(i);
            vec4 p=permute(permute(permute(
                  i.z+vec4(0.,i1.z,i2.z,1.))
                  +i.y+vec4(0.,i1.y,i2.y,1.))
                  +i.x+vec4(0.,i1.x,i2.x,1.));
                  
                  float n_=.142857142857;
                  vec3 ns=n_*D.wyz-D.xzx;
                  
                  vec4 j=p-49.*floor(p*ns.z*ns.z);
                  
                  vec4 x_=floor(j*ns.z);
                  vec4 y_=floor(j-7.*x_);
                  
                  vec4 x=x_*ns.x+ns.yyyy;
                  vec4 y=y_*ns.x+ns.yyyy;
                  vec4 h=1.-abs(x)-abs(y);
                  
                  vec4 b0=vec4(x.xy,y.xy);
                  vec4 b1=vec4(x.zw,y.zw);
                  
                  vec4 s0=floor(b0)*2.+1.;
                  vec4 s1=floor(b1)*2.+1.;
                  vec4 sh=-step(h,vec4(0.));
                  
                  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
                  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
                  
                  vec3 p0=vec3(a0.xy,h.x);
                  vec3 p1=vec3(a0.zw,h.y);
                  vec3 p2=vec3(a1.xy,h.z);
                  vec3 p3=vec3(a1.zw,h.w);
                  
                  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
                  p0*=norm.x;
                  p1*=norm.y;
                  p2*=norm.z;
                  p3*=norm.w;
                  
                  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
                  m=m*m;
                  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),
                  dot(p2,x2),dot(p3,x3)));
                }
                
                void main(){
                  vUv=uv;
                  
                  vec3 pos=position;
                  float noiseFreq=3.5;
                  float noiseAmp=.04;
                  vec3 noisePos=vec3(pos.x*noiseFreq+uTime,pos.y,pos.z);
                  pos.z+=snoise(noisePos)*noiseAmp;
                  vWave=pos.z;
                  
                  gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.);
                }`,
      fragmentShader: `precision mediump float;
    
          varying vec2 vUv;
          varying float vWave;
          uniform sampler2D uTexture;
          
          void main() {
            float wave = vWave * 0.25;
            float r = texture2D(uTexture, vUv).r;
            float g = texture2D(uTexture, vUv).g;
            float b = texture2D(uTexture, vUv + wave).b;
            vec3 texture = vec3(r, g, b);
            gl_FragColor = vec4(texture, 1.);
          }`,
      uniforms: {
        uTime: { value: 0.0 },
        uTexture: {
          value: new THREE.TextureLoader().load(`./img/3d${this.num}.jpg`),
        },
      },
      // wireframe: true,
      side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  addEvents() {
    window.requestAnimationFrame(this.run.bind(this));
    window.addEventListener("resize", this.onResize.bind(this), false);
  }

  run() {
    requestAnimationFrame(this.run.bind(this));
    this.render();
  }

  render() {
    this.material.uniforms.uTime.value = this.clock.getElapsedTime() / 2;
    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(w, h);
  }
}

const elements = document.querySelectorAll(".prj_im");
elements.forEach((el, index) => new Gl().init(el, index));
