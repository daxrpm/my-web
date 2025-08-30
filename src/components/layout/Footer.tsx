import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { personalInfo } from '../../data/portfolio';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background-secondary/30">
      <div className="container-custom px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Logo and Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center space-x-3"
          >
            <Terminal className="w-6 h-6 text-primary" />
            <div className="text-foreground-secondary text-sm">
              <span className="font-mono">© {currentYear} {personalInfo.name}</span>
              <span className="mx-2">•</span>
            
            </div>
          </motion.div>

          {/* Terminal-style Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono text-sm text-foreground-secondary"
          >
            <span className="text-terminal-green">dax@linux:~$</span>
            <span className="mx-2">echo "Thanks for visiting!"</span>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 pt-6 border-t border-border/30 text-center"
        >
          <p className="text-xs text-foreground-muted font-mono">
            Knowledge is not just power, it is FREEDOM
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 