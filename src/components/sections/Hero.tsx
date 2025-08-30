import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Code } from 'lucide-react';
import { PiLinuxLogo } from "react-icons/pi";
import { SiFastapi } from "react-icons/si";
import { FaLinux, FaPython } from "react-icons/fa";
import { personalInfo } from '../../data/portfolio';

const Hero = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const texts = useMemo(() => [
    'AI Developer',
    'Backend Developer',
    'Linux Enthusiast',
    'Physics Lover',
    'Low-Level Coder',
  ], []);

  useEffect(() => {
    const typeSpeed = isDeleting ? 30 : 60;
    const deleteSpeed = 30;
    const pauseTime = 1500;

    const typeText = () => {
      const currentFullText = texts[currentIndex];
      
      if (isDeleting) {
        setCurrentText(currentFullText.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      } else {
        setCurrentText(currentFullText.substring(0, currentText.length + 1));
        if (currentText === currentFullText) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      }
    };

    const timer = setTimeout(typeText, isDeleting ? deleteSpeed : typeSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentIndex, texts]);

  const handleScrollDown = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-5" />
      
      {/* Optimized Black Hole Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Event Horizon - Central Black Hole */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{
              scale: [1, 1.02, 1],
              opacity: [0.9, 1, 0.9],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-32 h-32 bg-black rounded-full shadow-2xl shadow-black/70"
          />
        </div>

        {/* Event Horizon Ring - Optimized Green Sparks */}
        {[...Array(36)].map((_, i) => (
          <motion.div
            key={`event-horizon-${i}`}
            animate={{
              x: [0, Math.cos((i * 10) * Math.PI / 180) * 80, 0],
              y: [0, Math.sin((i * 10) * Math.PI / 180) * 80, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <motion.div
              animate={{
                scale: [0.3, 1.5, 0.3],
                opacity: [0.1, 0.6, 0.1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className={`w-${i % 4 === 0 ? '1' : i % 4 === 1 ? '2' : i % 4 === 2 ? '3' : '4'} h-${i % 4 === 0 ? '1' : i % 4 === 1 ? '2' : i % 4 === 2 ? '3' : '4'} bg-green-400/40 rounded-full shadow-lg shadow-green-400/30`}
            />
          </motion.div>
        ))}

        {/* Inner Accretion Disk - Optimized */}
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={`inner-accretion-${i}`}
            animate={{
              x: [0, Math.cos((i * 15) * Math.PI / 180) * 160, 0],
              y: [0, Math.sin((i * 15) * Math.PI / 180) * 160, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <motion.div
              animate={{
                scale: [0.4, 1.3, 0.4],
                opacity: [0.08, 0.3, 0.08],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className={`w-${i % 3 === 0 ? '2' : i % 3 === 1 ? '3' : '4'} h-${i % 3 === 0 ? '2' : i % 3 === 1 ? '3' : '4'} bg-green-500/25 rounded-full shadow-lg shadow-green-500/15`}
            />
          </motion.div>
        ))}

        {/* Middle Accretion Disk - Optimized */}
        {[...Array(32)].map((_, i) => (
          <motion.div
            key={`middle-accretion-${i}`}
            animate={{
              x: [0, Math.cos((i * 11.25) * Math.PI / 180) * 280, 0],
              y: [0, Math.sin((i * 11.25) * Math.PI / 180) * 280, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <motion.div
              animate={{
                scale: [0.3, 1.1, 0.3],
                opacity: [0.06, 0.25, 0.06],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className={`w-${i % 4 === 0 ? '1.5' : i % 4 === 1 ? '2' : i % 4 === 2 ? '2.5' : '3'} h-${i % 4 === 0 ? '1.5' : i % 4 === 1 ? '2' : i % 4 === 2 ? '2.5' : '3'} bg-green-600/20 rounded-full shadow-lg shadow-green-600/10`}
            />
          </motion.div>
        ))}

        {/* Outer Accretion Disk - Optimized */}
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={`outer-accretion-${i}`}
            animate={{
              x: [0, Math.cos((i * 9) * Math.PI / 180) * 420, 0],
              y: [0, Math.sin((i * 9) * Math.PI / 180) * 420, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <motion.div
              animate={{
                scale: [0.2, 0.9, 0.2],
                opacity: [0.04, 0.18, 0.04],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className={`w-${i % 5 === 0 ? '1' : i % 5 === 1 ? '1.5' : i % 5 === 2 ? '2' : i % 5 === 3 ? '2.5' : '3'} h-${i % 5 === 0 ? '1' : i % 5 === 1 ? '1.5' : i % 5 === 2 ? '2' : i % 5 === 3 ? '2.5' : '3'} bg-green-700/15 rounded-full shadow-lg shadow-green-700/8`}
            />
          </motion.div>
        ))}

        {/* Optimized Gravitational Lensing - CSS-based */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] animate-pulse">
            <div className="w-full h-full rounded-full border-t-12 border-green-400/10 transform -translate-y-144" />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] animate-pulse" style={{ animationDelay: '1s' }}>
            <div className="w-full h-full rounded-full border-b-12 border-green-500/8 transform translate-y-144" />
          </div>
        </div>

        {/* Optimized Background Glow */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px] bg-gradient-to-r from-green-400/3 via-green-500/2 to-green-400/3 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />
        </div>

        {/* Optimized Background Stars - Reduced Count */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`background-stars-${i}`}
            animate={{
              x: [0, Math.cos((i * 7.2) * Math.PI / 180) * (600 + i * 20), 0],
              y: [0, Math.sin((i * 7.2) * Math.PI / 180) * (600 + i * 20), 0],
            }}
            transition={{
              duration: 50,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <motion.div
              animate={{
                scale: [0.1, 0.7, 0.1],
                opacity: [0.01, 0.08, 0.01],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className={`w-${i % 5 === 0 ? '0.5' : i % 5 === 1 ? '1' : i % 5 === 2 ? '1.5' : i % 5 === 3 ? '2' : '2.5'} h-${i % 5 === 0 ? '0.5' : i % 5 === 1 ? '1' : i % 5 === 2 ? '1.5' : i % 5 === 3 ? '2' : '2.5'} bg-green-400/15 rounded-full shadow-lg shadow-green-400/8`}
            />
          </motion.div>
        ))}
      </div>

      <div className="container-custom section-padding text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Avatar and Name */}
          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-primary-accent p-1"
            >
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                <PiLinuxLogo className="w-12 h-12 text-primary" />
              </div>
            </motion.div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold">
              <span className="text-foreground">{personalInfo.name}</span>
            </h1>
          </div>

          {/* Typing Animation */}
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-foreground-secondary font-mono text-lg sm:text-xl">
                $ whoami
              </span>
            </div>
            
            <div className="h-8 sm:h-10 flex items-center justify-center">
              <span className="text-primary font-mono text-lg sm:text-xl">
                {currentText}
                <span className="animate-blink">|</span>
              </span>
            </div>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-foreground-secondary text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            {personalInfo.description}
          </motion.p>

          {/* Tech Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex items-center justify-center space-x-6 text-foreground-secondary"
          >
            <motion.div
              whileHover={{ scale: 1.2, color: '#00ff88' }}
              className="flex items-center space-x-2"
            >
              <Code className="w-6 h-6" />
              <span className="font-mono text-sm">C</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.2, color: '#00ff88' }}
              className="flex items-center space-x-2"
            >
              <FaLinux className="w-6 h-6" />
              <span className="font-mono text-sm">Linux</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.2, color: '#00ff88' }}
              className="flex items-center space-x-2"
            >
              <FaPython className="w-6 h-6" />
              <span className="font-mono text-sm">AI</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.2, color: '#00ff88' }}
              className="flex items-center space-x-2"
            >
              <SiFastapi className="w-6 h-6" />
              <span className="font-mono text-sm">Backend</span>
            </motion.div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-primary text-background font-semibold rounded-lg hover:bg-primary-secondary transition-colors duration-200 glow-border"
            >
              View Projects
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 transition-colors duration-200"
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-foreground-secondary hover:text-primary transition-colors duration-200"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Hero; 