// import { motion, useInView } from "framer-motion";
// import { useRef } from "react";

// const ContactSection = () => {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-100px" });

//   const socials = ["GitHub", "LinkedIn", "Twitter"];

//   return (
//     <section id="contact" className="relative" ref={ref}>
//       <div className="section-padding text-center">
//         <motion.span
//           className="font-mono text-sm text-primary mb-2 block"
//           initial={{ opacity: 0 }}
//           animate={inView ? { opacity: 1 } : {}}
//           transition={{ duration: 0.5 }}
//         >
//           // let's connect
//         </motion.span>
//         <motion.h2
//           className="text-4xl md:text-6xl font-bold mb-6"
//           initial={{ opacity: 0, y: 30 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.7, delay: 0.1 }}
//         >
//           Got a Project?<br />
//           <span className="text-gradient">Let's Talk</span>
//         </motion.h2>
//         <motion.p
//           className="text-muted-foreground max-w-md mx-auto mb-10 leading-relaxed"
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6, delay: 0.3 }}
//         >
//           I'm always open to discussing new projects, creative ideas, or opportunities to be part of something great.
//         </motion.p>

//         <motion.a
//           href="mailto:ranaferoz792@gmail.com"
//           className="inline-block bg-primary text-primary-foreground px-10 py-4 rounded-full font-medium text-lg glow-cyan relative overflow-hidden group"
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={inView ? { opacity: 1, scale: 1 } : {}}
//           transition={{ duration: 0.5, delay: 0.4 }}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           <span className="relative z-10">ranaferoz792@gmail.com</span>
//           <motion.span
//             className="absolute inset-0 bg-secondary/30 rounded-full"
//             initial={{ x: "-100%" }}
//             whileHover={{ x: "0%" }}
//             transition={{ duration: 0.3 }}
//           />
//         </motion.a>

//         <div className="flex justify-center gap-4 mt-12">
//           {socials.map((s, i) => (
//             <motion.a
//               key={s}
//               href="#"
//               className="glass px-5 py-2 rounded-full text-sm text-muted-foreground hover:text-primary transition-colors"
//               initial={{ opacity: 0, y: 20 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
//               whileHover={{ y: -3, scale: 1.05 }}
//             >
//               {s}
//             </motion.a>
//           ))}
//         </div>

//         <motion.footer
//           className="mt-24 text-muted-foreground text-sm"
//           initial={{ opacity: 0 }}
//           animate={inView ? { opacity: 1 } : {}}
//           transition={{ duration: 0.5, delay: 0.8 }}
//         >
//           <p>© 2026 Ahmad Feroz · Built with passion</p>
//         </motion.footer>
//       </div>
//     </section>
//   );
// };

// export default ContactSection;

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const socials = [
    { name: "GitHub", link: "https://github.com/ranaferoz792-op" },
    { name: "LinkedIn", link: "https://www.linkedin.com/in/ahmad-feroz-arshad-158303213/" },
    { name: "Twitter", link: "https://twitter.com/your-handle" },
  ];

  return (
    <section id="contact" className="relative" ref={ref}>
      <div className="section-padding text-center">
        <motion.span
          className="font-mono text-sm text-primary mb-2 block"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
        </motion.span>
        <motion.h2
          className="text-4xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Got a Project?<br />
          <span className="text-gradient">Let's Talk</span>
        </motion.h2>
        <motion.p
          className="text-muted-foreground max-w-md mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of something great.
        </motion.p>

        {/* <motion.a
          href="mailto:ranaferoz792@gmail.com"
          className="inline-block bg-primary text-primary-foreground px-10 py-4 rounded-full font-medium text-lg glow-cyan relative overflow-hidden group"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">ranaferoz792@gmail.com</span>
          <motion.span
            className="absolute inset-0 bg-secondary/30 rounded-full"
            initial={{ x: "-100%" }}
            whileHover={{ x: "0%" }}
            transition={{ duration: 0.3 }}
          />
        </motion.a> */}
<motion.a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=ranaferoz792@gmail.com"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block bg-primary text-primary-foreground px-10 py-4 rounded-full font-medium text-lg glow-cyan relative overflow-hidden group"
  initial={{ opacity: 0, scale: 0.9 }}
  animate={inView ? { opacity: 1, scale: 1 } : {}}
  transition={{ duration: 0.5, delay: 0.4 }}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  <span className="relative z-10">ranaferoz792@gmail.com</span>
  <motion.span
    className="absolute inset-0 bg-secondary/30 rounded-full"
    initial={{ x: "-100%" }}
    whileHover={{ x: "0%" }}
    transition={{ duration: 0.3 }}
  />
</motion.a>
        <div className="flex justify-center gap-4 mt-12">
          {socials.map((s, i) => (
            <motion.a
              key={s.name}
              href={s.link}
              target="_blank"
              rel="noopener noreferrer"
              className="glass px-5 py-2 rounded-full text-sm text-muted-foreground hover:text-primary transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              whileHover={{ y: -3, scale: 1.05 }}
            >
              {s.name}
            </motion.a>
          ))}
        </div>

        <motion.footer
          className="mt-24 text-muted-foreground text-sm"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p>© 2026 Ahmad Feroz · Built with passion</p>
        </motion.footer>
      </div>
    </section>
  );
};

export default ContactSection;