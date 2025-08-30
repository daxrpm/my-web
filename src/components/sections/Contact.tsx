import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, MessageSquare, Send, Github, Linkedin, Twitter, Rss } from 'lucide-react';
import { personalInfo, socialLinks } from '../../data/portfolio';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this to your backend
    const mailtoLink = `mailto:${personalInfo.email}?subject=Contact from ${formData.name}&body=${formData.message}`;
    window.open(mailtoLink, '_blank');
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'github':
        return Github;
      case 'linkedin':
        return Linkedin;
      case 'twitter':
        return Twitter;
      case 'rss':
        return Rss;
      default:
        return Github;
    }
  };

  return (
    <section id="contact" className="section-padding relative">
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
              <MessageSquare className="w-8 h-8 text-primary" />
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Get In Touch
              </h2>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-foreground-secondary text-lg max-w-2xl mx-auto"
            >
              Interested in collaborating on a project or just want to chat about Linux, networking, or physics?
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold text-foreground">
                Send a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-foreground-secondary">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-background-secondary border border-border rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder-foreground-muted"
                    placeholder="Your name"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-foreground-secondary">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-background-secondary border border-border rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder-foreground-muted"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-foreground-secondary">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-background-secondary border border-border rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder-foreground-muted resize-none"
                    placeholder="Tell me about your project or just say hello!"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 bg-primary text-background font-semibold rounded-lg hover:bg-primary-secondary transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-foreground">
                  Contact Information
                </h3>
                
                <div className="space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-4 p-4 glass-effect rounded-lg border border-border/30"
                  >
                    <Mail className="w-6 h-6 text-primary" />
                    <div>
                      <p className="text-sm text-foreground-secondary">Email</p>
                      <a 
                        href={`mailto:${personalInfo.email}`}
                        className="text-foreground hover:text-primary transition-colors font-mono"
                      >
                        {personalInfo.email}
                      </a>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-4 p-4 glass-effect rounded-lg border border-border/30"
                  >
                    <Mail className="w-6 h-6 text-primary" />
                    <div>
                      <p className="text-sm text-foreground-secondary">Email</p>
                      <a 
                        href={`mailto:daxrpm@proton.me`}
                        className="text-foreground hover:text-primary transition-colors font-mono"
                      >
                        daxrpm@proton.me
                      </a>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-4 p-4 glass-effect rounded-lg border border-border/30"
                  >
                    <Mail className="w-6 h-6 text-primary" />
                    <div>
                      <p className="text-sm text-foreground-secondary">Email</p>
                      <a 
                        href={`mailto:ariel.dax.navarrette.freire@cern.ch`}
                        className="text-foreground hover:text-primary transition-colors font-mono"
                      >
                        ariel.dax.navarrette.freire@cern.ch
                      </a>
                    </div>
                  </motion.div>

                 
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground">
                  Follow Me
                </h4>
                
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social) => {
                    const IconComponent = getSocialIcon(social.icon);
                    return (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-3 p-4 glass-effect rounded-lg border border-border/30 hover:border-primary/30 transition-all duration-300"
                      >
                        <IconComponent className="w-5 h-5 text-primary" />
                        <span className="text-foreground hover:text-primary transition-colors">
                          {social.name}
                        </span>
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Terminal-style Contact Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1, duration: 0.8 }}
            className="p-6 bg-background-secondary border border-border rounded-lg"
          >
            <div className="font-mono text-sm space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-terminal-green">dax@linux:~$</span>
                <span className="text-foreground">./contact.sh</span>
              </div>
              <div className="text-foreground-secondary pl-4 space-y-1">
                <div>Email: {personalInfo.email}</div>
                <div>Location: {personalInfo.location}</div>
                <div>Social profiles: {socialLinks.length}</div>
                <div className="text-terminal-green">Status: Always open to interesting conversations</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact; 