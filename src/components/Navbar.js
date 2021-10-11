import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <>
      <nav>
        <motion.div
          id="nav_wrapper"
          className="nav_wrapper"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 6 }}
        >
          <a href="#nav_wrapper" className="home_link">
            thealphaknight<i className="uil uil-ankh"></i>
          </a>
          <a href="#footer" className="about_link">
            Contact
          </a>
        </motion.div>
      </nav>
    </>
  );
};

export default Navbar;
