import React from "react";
import Model from "./Model";
import ScrollText from "./ScrollText";

const Footer = ({ refe }) => {
  return (
    <>
      <>
        <ScrollText word={"why three js"} forward={true} />
        <Model refe={refe} />
      </>
      <footer className="home_footer" id="footer">
        <div className="contact_sect">
          <div className="contact_sect_inn">
            <a
              href="mailto:atakerewilliams@gmail.com?subject=Let%27s%20make%20something%20cool"
              target="_blank"
              rel="noopener noreferrer"
              className="contact_header"
            >
              yourproject@williams.com
            </a>
            <div className="contact_content">
              <ul className="socials">
                <li>
                  <a
                    href="https://www.instagram.com/atakere_williams"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/atakerewilliams"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://dribbble.com/Alphaknight"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/codergon"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Dribbble
                  </a>
                </li>
              </ul>
              <div style={{ maxWidth: "40%" }}>
                <p className="contact_det">
                  Created for, designed by, and developed by Atakere Williams in
                  2021. Wow, you scrolled this far... you might as well just
                  click that email up there.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="foot_note">
          <p>2021 || Williams</p>
          <p>6.3345°N, 3.6745°E</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
