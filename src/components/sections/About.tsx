import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Terminal, Code, Network, Brain, GraduationCap } from 'lucide-react';
import { LuBrainCircuit } from "react-icons/lu";
import { FaLinux, FaSpaceShuttle } from 'react-icons/fa';


const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const interests = [
    {
      icon: FaLinux,
      title: 'Linux',
      description: 'Knowledge in Linux, system administration, and performance optimization.',
    },
    {
      icon: Network,
      title: 'Network Engineering',
      description: 'TCP/IP protocols, network security, packet analysis, and infrastructure design.',
    },
    {
      icon: Code,
      title: 'Backend',
      description: 'FastAPI, Django, Spring Boot backend development for AI and other applications.',
    },
    {
      icon: LuBrainCircuit,
      title: 'AI',
      description: 'Knowledge in AI, machine learning, and deep learning.',
    },
    {
      icon: Brain,
      title: 'Computer Science',
      description: 'Algorithms, data structures, distributed systems, and theoretical foundations.',
    },
    {
      icon: FaSpaceShuttle,
      title: 'Physics',
      description: 'Engineering Physics and Ethusiast for Science',
    },
  ];

  const education = [
    {
      institution: 'Escuela Politécnica Nacional',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Escuela_Polit%C3%A9cnica_Nacional.png',
      title: 'Computer Science Engineering',
      period: '2023 - 2028',
      description: 'Studying Computer Science Engineering at Ecuador\'s top engineering university, focusing on algorithms, data structures, SO, Cloud Computing, and software development fundamentals.',
      type: 'university'
    },
    {
      institution: 'Escuela Politécnica Nacional',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Escuela_Polit%C3%A9cnica_Nacional.png',
      title: 'Data Science Diploma',
      period: '2023',
      description: 'Specialized diploma in Data Science covering statistical analysis, machine learning, and data visualization techniques.',
      certificateUrl: 'https://aps.cec-epn.edu.ec/diplomas/2023/CAPACITACION_Y_CONSULTORIA/6/diploma_190908_53970-signed.pdf',
      type: 'diploma'
    },
    {
      institution: 'IBM',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png',
      title: 'AI Engineering Professional Certificate',
      period: '2023',
      description: 'Comprehensive AI engineering program covering machine learning, deep learning with Keras/TensorFlow/PyTorch, computer vision, and neural networks implementation.',
      certificateUrl: 'https://coursera.org/share/770b0e12af6b0e1391e7f09c49f3610a',
      type: 'certificate'
    },
    {
      institution: 'IBM',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png',
      title: 'Data Science Professional Certificate',
      period: '2023',
      description: 'Complete data science program including Python, SQL, data analysis, visualization, machine learning, and hands-on projects with cloud-based labs.',
      certificateUrl: 'https://coursera.org/share/ce10faea4e3ca0a66209020b00cb7a60',
      type: 'certificate'
    }
    // {
    //   institution: 'IBM',
    //   logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png',
    //   title: 'Introduction to Data Science',
    //   period: '2023',
    //   description: 'Foundational data science skills including methodology, tools like Jupyter Notebooks, SQL databases, and hands-on project experience.',
    //   certificateUrl: 'https://coursera.org/share/488c323b95d86974d182302a612ea06a',
    //   type: 'certificate'
    // }
  ];

  return (
    <section id="about" className="section-padding relative">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Column - About Text */}
          <div className="space-y-6">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="flex items-center space-x-3"
              >
                <Terminal className="w-8 h-8 text-primary" />
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                  About Me
                </h2>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="space-y-4"
              >
                <p className="text-foreground-secondary text-lg leading-relaxed">
                  I'm a passionate developer with a deep love for the fundamentals of Computer Science. 
                  My journey in technology started with curiosity about how things work at the lowest level.
                </p>
                
                <p className="text-foreground-secondary text-lg leading-relaxed">
                  When I'm not diving into AI, Backend or analyzing network packets, you'll find me 
                  exploring the fascinating intersection of Computer Science and Physics, building 
                  systems that are both performant and secure.
                </p>
                
                <p className="text-foreground-secondary text-lg leading-relaxed">
                  Even though I'm still learning, I believe in the power of Open Source and the Linux philosophy - 
                  <span className="text-primary font-mono"> "do one thing and do it well"</span>.
                </p>
              </motion.div>
            </div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6"
            >
              <div className="text-center p-4 glass-effect rounded-lg">
                <div className="text-2xl font-bold text-primary">5+</div>
                <div className="text-sm text-foreground-secondary">Years Experience</div>
              </div>
              <div className="text-center p-4 glass-effect rounded-lg">
                <div className="text-2xl font-bold text-primary">20+</div>
                <div className="text-sm text-foreground-secondary">Projects</div>
              </div>
              <div className="text-center p-4 glass-effect rounded-lg">
                <div className="text-2xl font-bold text-primary">10+</div>
                <div className="text-sm text-foreground-secondary">Technologies</div>
              </div>
              <div className="text-center p-4 glass-effect rounded-lg">
                <div className="text-2xl font-bold text-primary">∞</div>
                <div className="text-sm text-foreground-secondary">Learning</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Interests Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {interests.map((interest, index) => (
              <motion.div
                key={interest.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="p-6 glass-effect rounded-lg border border-border/30 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <interest.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">
                      {interest.title}
                    </h3>
                    <p className="text-sm text-foreground-secondary leading-relaxed">
                      {interest.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 space-y-8"
        >
          {/* Education Header */}
          <div className="flex items-center space-x-3">
            <GraduationCap className="w-8 h-8 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">
              Education & Certifications
            </h3>
          </div>

          {/* Education Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {education.map((item, index) => (
              <motion.div
                key={`${item.institution}-${item.title}`}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="p-6 glass-effect rounded-xl border border-border/30 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="space-y-4">
                  {/* Header with Logo and Institution */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-background-secondary flex items-center justify-center overflow-hidden">
                        <img 
                          src={item.logo} 
                          alt={`${item.institution} logo`}
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                          {item.title}
                        </h4>
                        <p className="text-sm text-foreground-secondary">
                          {item.institution}
                        </p>
                      </div>
                    </div>
                    {item.certificateUrl && (
                      <a
                        href={item.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:text-primary-accent transition-colors duration-200 flex items-center space-x-1"
                      >
                        <span>View Certificate</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>

                  {/* Period */}
                  <div className="text-xs text-foreground-secondary font-mono">
                    {item.period}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-foreground-secondary leading-relaxed">
                    {item.description}
                  </p>

                  {/* Type Badge */}
                  <div className="flex justify-end">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.type === 'university' ? 'bg-blue-500/20 text-blue-400' :
                      item.type === 'diploma' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {item.type === 'university' ? 'University' :
                       item.type === 'diploma' ? 'Diploma' : 'Professional Certificate'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Terminal-style Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 p-6 bg-background-secondary border border-border rounded-lg"
        >
          <div className="font-mono text-sm space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-terminal-green">daxrpm@linux:~$</span>
              <span className="text-foreground">cat philosophy.txt</span>
            </div>
            <div className="text-foreground-secondary pl-4 space-y-1">
              <div>"The 100% secure code is the one that is not written."</div>
              <div>"Everything is a file." - Unix Philosophy</div>
              <div>"Is not the cloud, it's just someone else's computer."</div>
              <div>"Self-taught and projects is the best way to learn."</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 