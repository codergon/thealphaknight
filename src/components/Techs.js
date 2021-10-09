import Resume from "../Atakere_Williams.pdf";

const Techs = () => {
  return (
    <div className="second_sect">
      <div class="techs">
        <div class="header">
          <span class="__Dot"></span>Technologies you'd see me use
        </div>
        <div class="tech_list">
          <ul>
            <li>Html5</li>
            <li>Css3</li>
            <li>
              <span>Next Js</span>
            </li>
            <li>Javascript</li>
          </ul>
          <ul>
            <li>React</li>
            <li>Php|Mysql</li>
            <li>Typescript</li>
            <li>
              <span>React Native</span>
            </li>
          </ul>
          <ul>
            <li>Node Js</li>
            <li>Three Js</li>
            <li>Netlify</li>
            <li>Github</li>
          </ul>
          <ul>
            <li>Vue Js</li>
            <li>Nuxt Js</li>
            <li>Test</li>
            <li>Tailwind css</li>
          </ul>
        </div>
      </div>

      {/* **** */}

      <div class="view_resume">
        <a target="_blank" rel="noopener noreferrer" href={Resume}>
          <button class="button button--surtur">
            <svg class="textcircle" viewBox="0 0 500 500">
              <defs>
                <path
                  id="textcircle"
                  d="M250,400 a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z"
                />
              </defs>
              <text>
                <textPath
                  xlinkHref="#textcircle"
                  aria-label="Projects & client work 2020"
                  textLength="900"
                >
                  View resume — View resume —
                </textPath>
              </text>
            </svg>
            <svg
              aria-hidden="true"
              class="eye"
              width="70"
              height="70"
              viewBox="0 0 70 70"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="eye__outer"
                d="M10.5 35.308c5.227-7.98 14.248-13.252 24.5-13.252s19.273 5.271 24.5 13.252c-5.227 7.98-14.248 13.253-24.5 13.253s-19.273-5.272-24.5-13.253z"
              />
              <path
                class="eye__lashes-up"
                d="M35 8.802v8.836M49.537 11.383l-3.31 8.192M20.522 11.684l3.31 8.192"
              />
              <path
                class="eye__lashes-down"
                d="M35 61.818v-8.836 8.836zM49.537 59.237l-3.31-8.193 3.31 8.193zM20.522 58.936l3.31-8.193-3.31 8.193z"
              />
              <circle class="eye__iris" cx="35" cy="35.31" r="5.221" />
              <circle class="eye__inner" cx="35" cy="35.31" r="10.041" />
            </svg>
          </button>
        </a>

        <div class="inspirations">
          <p>Don't be boring 🤪</p>
          <p>choose one</p>
        </div>

        <div
          onClick={() => {
            var threeSect = document.getElementById("txt_for_exm");
            threeSect.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <button class="button button--surtur">
            <svg class="textcircle" viewBox="0 0 500 500">
              <defs>
                <path
                  id="textcircle"
                  d="M250,400 a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z"
                />
              </defs>
              <text>
                <textPath
                  xlinkHref="#textcircle"
                  aria-label="Projects & client work 2020"
                  textLength="900"
                >
                  Design Idea — Design Idea —
                </textPath>
              </text>
            </svg>
            <svg
              aria-hidden="true"
              class="eye"
              width="70"
              height="70"
              viewBox="0 0 70 70"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="eye__outer"
                d="M10.5 35.308c5.227-7.98 14.248-13.252 24.5-13.252s19.273 5.271 24.5 13.252c-5.227 7.98-14.248 13.253-24.5 13.253s-19.273-5.272-24.5-13.253z"
              />
              <path
                class="eye__lashes-up"
                d="M35 8.802v8.836M49.537 11.383l-3.31 8.192M20.522 11.684l3.31 8.192"
              />
              <path
                class="eye__lashes-down"
                d="M35 61.818v-8.836 8.836zM49.537 59.237l-3.31-8.193 3.31 8.193zM20.522 58.936l3.31-8.193-3.31 8.193z"
              />
              <circle class="eye__iris" cx="35" cy="35.31" r="5.221" />
              <circle class="eye__inner" cx="35" cy="35.31" r="10.041" />
            </svg>
          </button>
        </div>
      </div>
      {/* *********** */}
    </div>
  );
};

export default Techs;
