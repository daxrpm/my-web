import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code } from 'lucide-react';
import { skills, skillCategories } from '../../data/portfolio';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  const getLevelText = (level: number) => {
    switch (level) {
      case 5: return 'Expert';
      case 4: return 'Advanced';
      case 3: return 'Intermediate';
      case 2: return 'Basic';
      case 1: return 'Learning';
      default: return 'Unknown';
    }
  };

  const getLevelColor = (level: number) => {
    switch (level) {
      case 5: return 'text-emerald-400';
      case 4: return 'text-blue-400';
      case 3: return 'text-yellow-400';
      case 2: return 'text-orange-400';
      case 1: return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <section id="skills" className="section-padding relative">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-16"
        >
          {/* Header */}
          <div className="text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex items-center justify-center space-x-3"
            >
              <Code className="w-8 h-8 text-primary" />
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Skills & Technologies
              </h2>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-foreground-secondary text-lg max-w-3xl mx-auto leading-relaxed"
            >
              My technical expertise spans from low-level systems programming to modern cloud technologies. 
              Each skill represents years of hands-on experience and continuous learning.
            </motion.p>
          </div>

          {/* Skills Categories */}
          <div className="space-y-12">
            {skillCategories.map((category, categoryIndex) => {
              const categorySkills = getSkillsByCategory(category.key);
              
              if (categorySkills.length === 0) return null;
              
              return (
                <motion.div
                  key={category.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + categoryIndex * 0.1, duration: 0.8 }}
                  className="space-y-8"
                >
                  {/* Category Header */}
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg bg-background-secondary ${category.color}`}>
                      <category.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">
                        {category.label}
                      </h3>
                      <p className="text-foreground-secondary text-sm">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categorySkills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ 
                          delay: 0.8 + categoryIndex * 0.1 + skillIndex * 0.05, 
                          duration: 0.6 
                        }}
                        whileHover={{ 
                          scale: 1.02, 
                          y: -4,
                          transition: { duration: 0.2 }
                        }}
                        className="group p-6 glass-effect rounded-xl border border-border/30 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                      >
                        <div className="space-y-4">
                          {/* Skill Header */}
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`p-2 rounded-lg bg-background-secondary group-hover:scale-110 transition-transform duration-200 ${skill.color || 'text-primary'}`}>
                                <skill.icon className="w-7 h-7" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                                  {skill.name}
                                </h4>
                                {skill.description && (
                                  <p className="text-xs text-foreground-secondary mt-1 line-clamp-2">
                                    {skill.description}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <span className={`text-sm font-medium ${getLevelColor(skill.level)}`}>
                                {getLevelText(skill.level)}
                              </span>
                              <div className="text-xs text-foreground-secondary mt-1">
                                {skill.level}/5
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            
                            
                            {/* Skill Level Dots */}
                            <div className="flex space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                    i < skill.level 
                                      ? `${skill.color || 'bg-primary'} shadow-sm` 
                                      : 'bg-background-tertiary'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Skills Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 p-8 glass-effect rounded-xl border border-border/30"
          >
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">{skills.length}</div>
              <div className="text-sm text-foreground-secondary">Total Skills</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-emerald-400">
                {skills.filter(s => s.level === 5).length}
              </div>
              <div className="text-sm text-foreground-secondary">Expert Level</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-blue-400">
                {skills.filter(s => s.level === 4).length}
              </div>
              <div className="text-sm text-foreground-secondary">Advanced Level</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-yellow-400">
                {skills.filter(s => s.level === 3).length}
              </div>
              <div className="text-sm text-foreground-secondary">Intermediate Level</div>
            </div>
          </motion.div>

          {/* Terminal-style Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="p-6 bg-background-secondary border border-border rounded-lg"
          >
            <div className="font-mono text-sm space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-terminal-green">dax@linux:~$</span>
                <span className="text-foreground">./skills.sh</span>
              </div>
              <div className="text-foreground-secondary pl-4 space-y-1">
                <div>✓ Total skills loaded: {skills.length}</div>
                <div>✓ Categories: {skillCategories.length}</div>
                <div>✓ Expert skills: {skills.filter(s => s.level === 5).length}</div>
                <div className="text-terminal-green">Status: Continuously expanding knowledge base</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 