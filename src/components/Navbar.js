import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <>
      <nav>
        <motion.div
          class="nav_wrapper"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 6 }}
        >
          <a href="#" class="home_link">
            thealphaknight<i class="uil uil-ankh"></i>
          </a>
          <a href="#footer" class="about_link">
            Contact
          </a>
        </motion.div>
      </nav>
    </>
  );
};

export default Navbar;
