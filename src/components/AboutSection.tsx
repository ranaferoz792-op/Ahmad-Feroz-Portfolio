import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { num: "8 Months", label: "Months Experience" },
    { num: "2+", label: "Projects Delivered" },
    { num: "2+", label: "Happy Clients" },
    { num: "4+", label: "Open Source Repos" },
  ];

  return (
    <section id="about" className="relative" ref={ref}>
      <div className="section-padding">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          
          <h2 className="text-4xl md:text-5xl font-bold">Get to Know Me</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            className="glass rounded-2xl p-8 glow-cyan group hover:border-primary/30 transition-colors"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            whileHover={{ y: -4 }}
          >
            <h3 className="text-xl font-semibold mb-4 group-hover:text-gradient transition-all">Who I Am</h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm a passionate full-stack developer with 8 months of experience building web applications
                that people love to use. I believe great software is the intersection of clean code,
                thoughtful design, and genuine empathy for users.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing to open source,
                or experimenting with creative coding and generative art.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="glass rounded-2xl p-6 text-center group cursor-default hover:border-primary/30 transition-colors"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -6, scale: 1.03 }}
              >
                <motion.span
                  className="text-3xl font-bold text-gradient block mb-1"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {s.num}
                </motion.span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
