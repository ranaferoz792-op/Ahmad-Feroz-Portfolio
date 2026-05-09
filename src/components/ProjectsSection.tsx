import { ExternalLink, Github } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const projects = [
  {
    title: "Burac.ai",
<<<<<<< HEAD
    description: "AI-driven web platform delivering smart automation, modern user experiences, and scalable digital solutions powered by advanced technologies.",
=======
    description: "Real-time monitoring dashboard for cloud infrastructure with live metrics, alerts, and team collaboration.",
>>>>>>> 12e4a61da714230c45878209f4faa69c40231357
    tech: ["React", "TypeScript", "D3.js", "WebSocket"],
    github: "https://github.com/ranaferoz792-op",
    live: "https://burac.ai/",
  },
<<<<<<< HEAD  
  {
    title: "Gul Shahbaz Beauty Salon",
    description: "A modern and fully responsive beauty salon website designed to deliver an elegant and user-friendly experience. The platform showcases salon services, pricing, gallery sections, smooth navigation, and a visually appealing interface built with modern web technologies for enhanced customer engagement.",
    tech: ["React", "Tailwind CSS", "Vercel"],
    github: "https://github.com/ranaferoz792-op/GulShahbaz-Beauty-Salon-",
    live: "https://gul-shahbaz-beauty-salon.vercel.app/",
  },
=======
  // {
  //   title: "DevFlow CLI",
  //   description: "Open-source command-line tool that streamlines dev workflows with automated testing and deployment.",
  //   tech: ["Rust", "GitHub API", "Docker"],
  //   github: "https://github.com/ranaferoz792-op",
  //   live: "#",
  // },
>>>>>>> 12e4a61da714230c45878209f4faa69c40231357
  // {
  //   title: "Neural Notes",
  //   description: "AI-powered note-taking app that auto-organizes your thoughts using natural language processing.",
  //   tech: ["Next.js", "OpenAI", "PostgreSQL", "Tailwind"],
  //   github: "https://github.com/ranaferoz792-op",
  //   live: "#",
  // },
];

const ProjectCard = ({ project, index, inView }: { project: typeof projects[0]; index: number; inView: boolean }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouse = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 8,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 8,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      className="glass rounded-2xl p-8 group relative overflow-hidden cursor-default"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 * index }}
      onMouseMove={handleMouse}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
      whileHover={{ y: -4 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Spotlight effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at ${(mousePos.x / 8 + 0.5) * 100}% ${(mousePos.y / 8 + 0.5) * 100}%, hsl(190 100% 60% / 0.06), transparent)`,
        }}
      />

      {/* Animated border glow */}
      <motion.div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, hsl(190 100% 60% / 0.3), transparent 40%, transparent 60%, hsl(270 80% 65% / 0.3))`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          padding: "1px",
          borderRadius: "1rem",
        }}
      />

      <div className="flex flex-col md:flex-row md:items-start gap-6 relative z-10">
        <motion.div
          className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20"
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-2xl text-gradient font-bold font-mono">{project.title[0]}</span>
        </motion.div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold group-hover:text-gradient transition-all">{project.title}</h3>
            <div className="flex gap-3">
              <motion.a href={project.github} className="text-muted-foreground hover:text-primary transition-colors" whileHover={{ scale: 1.2, y: -2 }}>
                <Github size={18} />
              </motion.a>
              <motion.a href={project.live} className="text-muted-foreground hover:text-primary transition-colors" whileHover={{ scale: 1.2, y: -2 }}>
                <ExternalLink size={18} />
              </motion.a>
            </div>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t, ti) => (
              <motion.span
                key={t}
                className="font-mono text-xs text-primary/80 bg-primary/5 border border-primary/20 px-3 py-1 rounded-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.15 * index + 0.05 * ti }}
                whileHover={{ scale: 1.1, backgroundColor: "hsl(190 100% 60% / 0.15)" }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="relative" ref={ref}>
      <div className="section-padding">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold">Projects</h2>
        </motion.div>

        <div className="space-y-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
