import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const roles = ["Full Stack Developer", "UI/UX Engineer", "Creative Technologist"];

const HeroSection = () => {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const current = roles[roleIndex];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, charIndex + 1));
        if (charIndex + 1 === current.length) setTimeout(() => setDeleting(true), 1800);
        else setCharIndex(charIndex + 1);
      } else {
        setText(current.slice(0, charIndex));
        if (charIndex === 0) { setDeleting(false); setRoleIndex((roleIndex + 1) % roles.length); }
        else setCharIndex(charIndex - 1);
      }
    }, deleting ? 35 : 70);
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: (e.clientX / window.innerWidth - 0.5) * 30, y: (e.clientY / window.innerHeight - 0.5) * 30 });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-mesh">
      {/* Parallax orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-primary/10 blur-[100px]"
        animate={{ x: mousePos.x * 1.5, y: mousePos.y * 1.5 }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
        style={{ animation: "float 8s ease-in-out infinite" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/10 blur-[120px]"
        animate={{ x: mousePos.x * -1, y: mousePos.y * -1 }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
        style={{ animation: "float 10s ease-in-out infinite 2s" }}
      />
      {/* Extra orb */}
      <motion.div
        className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-primary/5 blur-[80px]"
        animate={{ x: mousePos.x * 2, y: mousePos.y * -1.5 }}
        transition={{ type: "spring", stiffness: 40, damping: 25 }}
      />

      <div className="text-center z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-block glass rounded-full px-5 py-2 mb-8"
        >
          <span className="text-sm text-muted-foreground">👋 Welcome to my portfolio</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
        >
          Hi, I'm <span className="text-gradient">Ahmad Feroz</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="h-10 mb-8"
        >
          <span className="font-mono text-lg text-primary">{text}</span>
          <span className="text-primary animate-pulse">|</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
        >
          I craft beautiful, performant web experiences with modern technologies.
          Turning complex problems into elegant, user-friendly solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex items-center justify-center gap-4"
        >
          <motion.a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium glow-cyan relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">View Projects</span>
            <motion.span
              className="absolute inset-0 bg-secondary rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.5, opacity: 0.3 }}
              transition={{ duration: 0.4 }}
            />
          </motion.a>
          <motion.a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="glass px-8 py-3 rounded-full font-medium text-foreground hover:border-primary/40 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Me
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <motion.div
            className="w-1 h-2 bg-primary rounded-full"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
