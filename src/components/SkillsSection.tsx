import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const skillGroups = [
  { title: "Frontend", icon: "🎨", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { title: "Backend", icon: "⚙️", items: ["Node.js", "Python", "MySQL", "Redis", "GraphQL"] },
  { title: "Database", icon: "🚀", items: ["MySQL", "SQL Queries", "Joins", "CRUD Operations", "Database Design"] },
  { title: "Tools", icon: "🛠", items: ["Git", "Figma", "VS Code", "Postman", "Notion"] },
];

const SkillCard = ({ group, index, inView }: { group: typeof skillGroups[0]; index: number; inView: boolean }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="glass rounded-2xl p-6 relative overflow-hidden group cursor-default"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.15 * index }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      {/* Glow background on hover */}
      <motion.div
        className={`absolute inset-0 rounded-2xl ${index % 2 === 0 ? "bg-primary/5" : "bg-secondary/5"}`}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] ${index % 2 === 0 ? "bg-primary/20" : "bg-secondary/20"}`}
        animate={{ scale: hovered ? 1.5 : 0.5, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      <div className="relative z-10">
        <motion.span
          className="text-3xl mb-3 block"
          animate={{ rotate: hovered ? [0, -10, 10, 0] : 0, scale: hovered ? 1.2 : 1 }}
          transition={{ duration: 0.4 }}
        >
          {group.icon}
        </motion.span>
        <h3 className="font-semibold text-lg mb-4 group-hover:text-gradient transition-all">{group.title}</h3>
        <ul className="space-y-2">
          {group.items.map((skill, si) => (
            <motion.li
              key={skill}
              className="text-sm text-muted-foreground flex items-center gap-2 group-hover:text-foreground/80 transition-colors"
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.15 * index + 0.05 * si }}
            >
              <motion.span
                className={`w-1.5 h-1.5 rounded-full ${index % 2 === 0 ? "bg-primary" : "bg-secondary"}`}
                animate={{ scale: hovered ? [1, 1.5, 1] : 1 }}
                transition={{ duration: 0.3, delay: 0.03 * si }}
              />
              {skill}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative" ref={ref}>
      <div className="section-padding">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold">Skills & Tools</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skillGroups.map((group, i) => (
            <SkillCard key={group.title} group={group} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
