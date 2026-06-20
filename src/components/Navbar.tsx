
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = ["about", "skills", "projects", "contact"];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false); // close menu after click
  };

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        className="fixed top-4 right-4 -translate-x-1/2 z-50 glass 
        rounded-full px-3 py-2 flex items-center justify-between 
        w-[auto] md:w-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Logo */}
        <motion.span
          className="font-semibold text-sm px-3 text-gradient cursor-pointer"
          whileHover={{ scale: 1.1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          AF
        </motion.span>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <motion.button
              key={item}
              onClick={() => scrollTo(item)}
              className="text-sm text-muted-foreground hover:text-primary 
              px-3 py-1 rounded-full hover:bg-primary/10 capitalize"
              whileHover={{ scale: 1.05 }}
            >
              {item}
            </motion.button>
          ))}
        </div>

        {/* Hire Me (Desktop) */}
        <motion.a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=ranaferoz792@gmail.com"
          target="_blank"
          className="hidden md:block text-sm font-medium 
          bg-primary text-white px-4 py-1.5 rounded-full"
          whileHover={{ scale: 1.05 }}

        >
          Hire Me
        </motion.a>

        {/* Hamburger (Mobile) */}
        <button
          className="md:hidden text-2xl px-2 "
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 
            bg-transparent/40 backdrop-glass-md 
            rounded-xl p-5 flex flex-col items-right gap-4 w-[50%] md:hidden"
          >
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="text-white text-sm capitalize hover:text-primary"
              >
                {item}
              </button>
            ))}

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=ranaferoz792@gmail.com"
              target="_blank"
              className="bg-primary text-white px-5 py-2 rounded-full text-center"
            >
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;