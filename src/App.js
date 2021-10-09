import Techs from "./components/Techs";
import { motion } from "framer-motion";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useEffect, useRef } from "react";
import simpleParallax from "simple-parallax-js";
import ScrollText from "./components/ScrollText";
import useMouse from "@react-hook/mouse-position";
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
          <div class="cursor" style={{ opacity: !!mousey.isOver ? 0 : 1 }}>
            {!!mouse.isOver && (
              <>
                <i class="uil uil-arrow-left"></i>&nbsp;Drag&nbsp;
                <i class="uil uil-arrow-right"></i>
              </>
            )}
          </div>
          <div
            class="cursor2"
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

      <div class="landing_header">
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
        <div class="cont_me">
          <div class="first_sect">
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
              <div class="circle_text">
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

      <div class="projects">
        <div className="prjs">
          <div className="prj_scroll">
            <div className="prj_item">
              <div className="cov_prj_det">
                <div className="it_inf_cv">
                  <p className="it_det_hd">Ordinace Redesign</p>
                </div>
                <div className="it_inf_cv">
                  <p className="it_brief">
                    This is a redesign of the fashion company's official
                    website. The project was inspired by the awesome UX or UI I
                    experienced on the site.
                  </p>
                </div>
                <div className="it_inf_cv it_inf_cv_vw">
                  <i class="uil uil-mars"></i>
                  <p className="it_view">Explore project</p>
                </div>
              </div>
              {width > 675 ? (
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
                  <i class="uil uil-mars"></i>
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
              {width > 675 ? (
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
                  <i class="uil uil-mars"></i>
                  <p className="it_view">Explore project</p>
                </div>
              </div>
              {width > 675 ? (
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
                  width > 675
                    ? -height * 2.8 + width * 0.64
                    : -width * 3.65 + width * 0.7,
                right: 0,
              }}
            >
              {[
                "3d Product Showcase",
                "Skincare Web Design",
                "Social Media Web App Templates",
                "Get Key Attribute",
                "Modelling Portfolio Concept",
              ].map((item, index) => (
                <div className="cs_scr_it" key={index}>
                  <div className="scr_it_pic">
                    <img src={`img/pg${index}.png`} alt={`${item}`} />
                  </div>
                  <div className="scr_it_det">
                    <p>
                      <i class="uil uil-bowling-ball"></i>&nbsp;
                      {item}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Footer refe={refe} />
    </main>
  );
};

export default Homepage;
