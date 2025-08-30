import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FolderOpen, Star, Eye } from 'lucide-react';
import { FaGithub } from "react-icons/fa";
import { projects } from '../../data/portfolio';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section id="projects" className="section-padding relative">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex items-center justify-center space-x-3"
            >
              <FolderOpen className="w-8 h-8 text-primary" />
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Projects
              </h2>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-foreground-secondary text-lg max-w-2xl mx-auto"
            >
              A collection of projects showcasing my passion for OpenSource, Computer Science and Physics.
            </motion.p>
          </div>

          {/* Featured Projects */}
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                whileHover={{ y: -5 }}
                className="group relative p-6 glass-effect rounded-lg border border-border/30 hover:border-primary/30 transition-all duration-300"
              >
                {/* Featured Badge */}
                <div className="absolute -top-3 -right-3">
                  <div className="flex items-center space-x-1 px-3 py-1 bg-primary text-background text-xs font-semibold rounded-full">
                    <Star className="w-3 h-3" />
                    <span>Featured</span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="space-y-4">
                  {/* Preview Image */}
                  {project.image && (
                    <div className="relative overflow-hidden rounded-lg bg-background-tertiary">
                      {project.liveUrl ? (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block cursor-pointer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <img
                            src={project.image}
                            alt={`${project.title} preview`}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute top-3 right-3 bg-primary/80 text-background px-2 py-1 rounded text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Click to Preview
                          </div>
                        </motion.a>
                      ) : (
                        <>
                          <img
                            src={project.image}
                            alt={`${project.title} preview`}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </>
                      )}
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-foreground-secondary leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-background-tertiary text-foreground-secondary text-xs font-mono rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center space-x-4 pt-4">
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 text-foreground-secondary hover:text-primary transition-colors"
                      >
                        <FaGithub className="w-5 h-5" />
                        <span className="text-sm">Code</span>
                      </motion.a>
                    )}
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 text-foreground-secondary hover:text-primary transition-colors"
                      >
                        <Eye className="w-5 h-5" />
                        <span className="text-sm">Preview</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Other Projects */}
          {otherProjects.length > 0 && (
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-center"
              >
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  More Projects
                </h3>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1 + index * 0.1, duration: 0.8 }}
                    whileHover={{ y: -3 }}
                    className="p-4 glass-effect rounded-lg border border-border/30 hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="space-y-3">
                      {/* Preview Image for Other Projects */}
                      {project.image && (
                        <div className="relative overflow-hidden rounded-lg bg-background-tertiary">
                          {project.liveUrl ? (
                            <motion.a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block cursor-pointer"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <img
                                src={project.image}
                                alt={`${project.title} preview`}
                                className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <div className="absolute top-2 right-2 bg-primary/80 text-background px-1.5 py-0.5 rounded text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Preview
                              </div>
                            </motion.a>
                          ) : (
                            <>
                              <img
                                src={project.image}
                                alt={`${project.title} preview`}
                                className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </>
                          )}
                        </div>
                      )}
                      
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-sm text-foreground-secondary leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-background-tertiary text-foreground-secondary text-xs font-mono rounded"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-background-tertiary text-foreground-secondary text-xs font-mono rounded">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-3">
                        {project.githubUrl && (
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center space-x-1 text-foreground-secondary hover:text-primary transition-colors text-sm"
                          >
                            <FaGithub className="w-4 h-4" />
                            <span>Code</span>
                          </motion.a>
                        )}
                        {project.liveUrl && (
                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center space-x-1 text-foreground-secondary hover:text-primary transition-colors text-sm"
                          >
                            <Eye className="w-4 h-4" />
                            <span>Preview</span>
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Terminal-style Project Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="p-6 bg-background-secondary border border-border rounded-lg"
          >
            <div className="font-mono text-sm space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-terminal-green">dax@linux:~$</span>
                <span className="text-foreground">ls -la projects/</span>
              </div>
              <div className="text-foreground-secondary pl-4 space-y-1">
                <div>Total projects: {projects.length}</div>
                <div>Featured projects: {featuredProjects.length}</div>
                <div>Technologies used: {Array.from(new Set(projects.flatMap(p => p.technologies))).length}</div>
                <div className="text-terminal-green">Status: Always building something new</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 