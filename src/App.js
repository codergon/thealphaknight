import Techs from "./components/Techs";
import { motion } from "framer-motion";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useEffect, useRef, useState } from "react";
import simpleParallax from "simple-parallax-js";
import ScrollText from "./components/ScrollText";
import useMouse from "@react-hook/mouse-position";

import * as THREE from "three";

import { BrowserView, isBrowser } from "react-device-detect";
import { useWindowSize } from "@react-hook/window-size/throttled";

const Homepage = () => {
  const [width, height] = useWindowSize();
  const constraintsRef = useRef(null);
  useEffect(() => {
    const image = document.getElementsByClassName("para_img");
    new simpleParallax(image, {
      delay: 0,
      orientation: "down",
      scale: 1.3,
      overflow: true,
    });
  }, []);

  const [resp, setResp] = useState(false);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (width < 850) {
      setResp(true);
    } else {
      setResp(false);
    }
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

    if (!!resp && width >= 850) {
      const elements = document.querySelectorAll(".prj_im");
      elements.forEach((el, index) => new Gl().init(el, index));
    }
    // eslint-disable-next-line
  }, [width]);

  const ref = useRef(null);
  const mouse = useMouse(ref);

  const refe = useRef(null);
  const mousey = useMouse(refe);

  useEffect(() => {
    if (isBrowser) {
      var cursor = document.querySelector(".cursor");
      var cursorinner = document.querySelector(".cursor2");

      document.addEventListener("mousemove", function (e) {
        cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
      });

      document.addEventListener("mousemove", function (e) {
        var x = e.clientX;
        var y = e.clientY;
        cursorinner.style.left = x + "px";
        cursorinner.style.top = y + "px";
      });
    }
  }, []);

  const icon = {
    hidden: {
      opacity: 0,
      pathLength: 0,
      fill: "none",
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      fill: "none",
    },
  };

  return (
    <main className="main homepage">
      <BrowserView>
        <>
          <div className="cursor" style={{ opacity: !!mousey.isOver ? 0 : 1 }}>
            {!!mouse.isOver && (
              <>
                <i className="uil uil-arrow-left"></i>&nbsp;Drag&nbsp;
                <i className="uil uil-arrow-right"></i>
              </>
            )}
          </div>
          <div
            className="cursor2"
            style={{ opacity: !!mousey.isOver ? 0 : 1 }}
          ></div>
        </>
      </BrowserView>

      {/* ****************************** */}

      <div
        className="loader_comp"
        style={{
          top: 0,
          left: 0,
          zIndex: 12,
          display: "flex",
          fontSize: "16px",
          width: "100vw",
          height: "100vh",
          position: "fixed",
          background: "#fff",
          fontFamily: "satoshi",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          fontVariationSettings: '"wght" 400',
        }}
      >
        <p
          className="loader_county"
          style={{
            color: "#777",
            fontFamily: "branch",
            fontSize: width < 675 ? "8.2vw" : "4vw",
          }}
        >
          0
        </p>

        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          style={{
            width: "84px",
            overflow: "visible",
            stroke: "#777",
            strokeWidth: 2,
            strokeLinejoin: "round",
            strokeLinecap: "round",
            position: "absolute",
          }}
        >
          <motion.path
            d="M -30, 50 a 80,80 0 1,0 160,0 a 80,80 0 1,0 -160, 0"
            variants={icon}
            initial="hidden"
            animate="visible"
            transition={{
              default: { duration: 3.5, ease: "easeInOut" },
            }}
          />
        </motion.svg>
      </div>

      <Navbar />

      <div className="landing_header">
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 7 }}
        >
          Hey there! <br />I am Williams
        </motion.p>
      </div>

      <motion.div
        className="about_me"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 7.7 }}
      >
        <div className="cont_me">
          <div className="first_sect">
            I'm a frontend developer and I have been creating interactive web
            projects since 2018. During this period I have worked on several
            projects while learning multiple web languages I now speak fluently
            and confidently backed by the experiences I have garnered over the
            years. <br />
            <br /> <br /> I acheive all these using different web technologies
            some of which are showcased here. I also incorporate 3d designs into
            projects to give the optimal feel and be of the prominent dev body -
            <a
              href="https://www.awwwards.com/"
              rel="noreferrer"
              target="_blank"
            >
              <div className="circle_text">
                <p>
                  <span className="my_name">Awwwards'</span>
                </p>
                <svg viewBox="0 0 500 150" preserveAspectRatio="none">
                  <path
                    fill="none"
                    d="M 396 18 C 228.7 -3.3 118.5 13.3 45 50 C 13 63 13 71 5.6 82.6 c 1.4 32.4 52.2 54 141.4 56.4 c 66.2 7.1 212.2 7.5 263 -13 c 29 -10 100.3 -49 27.3 -90 C 374 16 181 -16 57 24"
                  />
                </svg>
              </div>
            </a>
            standards.
          </div>

          <ScrollText word={"projects"} />
        </div>
      </motion.div>

      <div className="projects">
        <div className="prjs">
          <div className="prj_scroll">
            <div className="prj_item">
              <div className="cov_prj_det">
                <div className="it_inf_cv">
                  <p className="it_det_hd">CurrenShip</p>
                </div>
                <div className="it_inf_cv">
                  <p className="it_brief">
                    This was inspired by Vladmir Gruev's post on instagram (
                    <a
                      href="https://www.instagram.com/p/CVdY7AhgQiO/"
                      target="_blank"
                      className="linky"
                    >
                      here
                    </a>
                    ) and combined with Adam Roller's Real Estate design (
                    <a
                      href="https://dribbble.com/shots/11560877-Real-Estate-Landing-Page"
                      target="_blank"
                      className="linky"
                    >
                      here
                    </a>
                    ). I also added few touches of 3d magic😉; Check it out
                  </p>
                </div>
                <div className="it_inf_cv it_inf_cv_vw">
                  <i className="uil uil-mars"></i>
                  <a
                    href="https://currenship.netlify.com"
                    target="_blank"
                    className="it_view"
                    rel="noreferrer"
                  >
                    Explore project
                  </a>
                </div>
              </div>
              {width > 850 ? (
                <div className="prj_fixed">
                  <div className="prj_img_cnt">
                    <div className="prj_im"></div>
                  </div>
                </div>
              ) : (
                <div className="mobile_prj_img">
                  <div className="mobile_prj_inn">
                    <img src="img/3d0.jpg" alt="" className="para_img" />
                  </div>
                </div>
              )}
            </div>
            <div className="prj_item">
              <div className="cov_prj_det">
                <div className="it_inf_cv">
                  <p className="it_det_hd">Mochimo Explorer</p>
                </div>
                <div className="it_inf_cv">
                  <p className="it_brief">
                    Designed and developed a website to explore the mochimo
                    cryptocurrency. This website gives access to the mochimo
                    blockchain to explore blocks and transactions as they are
                    recorded in real time!
                  </p>
                </div>
                <div className="it_inf_cv it_inf_cv_vw">
                  <i className="uil uil-mars"></i>
                  <a
                    href="https://mochimap.vercel.app/explorer"
                    target="_blank"
                    className="it_view"
                    rel="noreferrer"
                  >
                    Explore project
                  </a>
                </div>
              </div>
              {width > 850 ? (
                <div className="prj_fixed2">
                  <div className="prj_img_cnt">
                    <div className="prj_im"></div>
                  </div>
                </div>
              ) : (
                <div className="mobile_prj_img">
                  <div className="mobile_prj_inn">
                    <img src="img/3d1.jpg" alt="" className="para_img" />
                  </div>
                </div>
              )}
            </div>
            <div className="prj_item">
              <div className="cov_prj_det">
                <div className="it_inf_cv">
                  <p className="it_det_hd">Shoot Network</p>
                </div>
                <div className="it_inf_cv">
                  <p className="it_brief">
                    This is a social media app still in development that would
                    enable users meet new people with new improved security
                    measures and features.
                  </p>
                </div>
                <div className="it_inf_cv it_inf_cv_vw">
                  <i className="uil uil-mars"></i>
                  <p className="it_view">Explore project</p>
                </div>
              </div>
              {width > 850 ? (
                <div className="prj_fixed3">
                  <div className="prj_img_cnt">
                    <div className="prj_im"></div>
                  </div>
                </div>
              ) : (
                <div className="mobile_prj_img">
                  <div className="mobile_prj_inn">
                    <img src="img/3d2.jpg" alt="" className="para_img" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <Techs />

        <ScrollText word={"freestyles"} />

        <div className="sh_case" ref={ref}>
          <motion.div className="sh_cs_scr" ref={constraintsRef} id="sh_cs_scr">
            <motion.div
              drag="x"
              className="cs_scr"
              dragElastic={0.3}
              dragConstraints={{
                left:
                  width > 850
                    ? -height * 2.8 + width * 0.64
                    : -width * 3.65 + width * 0.7,
                right: 0,
              }}
            >
              {[
                {
                  title: "Strike Js",
                  link: "https://strikejs.netlify.app/",
                  border: true,
                },
                {
                  title: "Social Media Web App",
                  link: false,
                  border: false,
                },
                { title: "Skincare Web Design", link: false, border: false },

                {
                  title: "Modelling Portfolio Concept",
                  link: false,
                  border: false,
                },
                { title: "3d Product Showcase", link: false, border: false },
              ].map((item, index) =>
                !!item?.link ? (
                  <a
                    className="cs_scr_it"
                    key={index}
                    href={item?.link ? item?.link : "undefined"}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <div className="scr_it_pic">
                      <img
                        src={`img/pg${index}.png`}
                        alt={`${item.title}`}
                        style={{
                          border: item?.border && "1px solid #ddd",
                          borderRadius: "10px",
                        }}
                      />
                    </div>
                    <div className="scr_it_det">
                      <p>
                        <i className="uil uil-bowling-ball"></i>&nbsp;
                        {item.title}
                      </p>
                    </div>
                  </a>
                ) : (
                  <div className="cs_scr_it" key={index}>
                    <div className="scr_it_pic">
                      <img src={`img/pg${index}.png`} alt={`${item.title}`} />
                    </div>
                    <div className="scr_it_det">
                      <p>
                        <i className="uil uil-bowling-ball"></i>&nbsp;
                        {item.title}
                      </p>
                    </div>
                  </div>
                )
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Footer refe={refe} />
    </main>
  );
};

export default Homepage;
