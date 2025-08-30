import type { Project, Skill, Experience, SocialLink, SkillCategory } from '../types';
import { 
  SiCplusplus, SiPython, SiJavascript, SiTypescript,
  SiReact, SiTailwindcss, SiNextdotjs,
  SiFastapi, SiPostgresql, SiRedis, SiLinux, SiDocker,
  SiKubernetes, SiGit, SiVim,
  SiArchlinux, SiMongodb, SiMysql,
  SiDjango, SiSpringboot, SiFlask,
  SiSupabase,
  SiHostinger,
  SiHetzner,
  SiAlacritty,
  SiFedora,
  SiGnome,
  SiKde,
  SiHyprland,
  SiGnubash,
  SiNginx,
  SiWireshark,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
  SiTensorflow,
  SiKeras,
  SiOpencv,
  SiJupyter,
  SiPlotly,
  SiPytorch,
  SiScipy,
  SiAnaconda
} from 'react-icons/si';
import { 
  FaNetworkWired, FaShieldAlt, FaDatabase, FaTools, FaJava
} from 'react-icons/fa';
import { LuBrainCircuit } from "react-icons/lu";
import { 
  BiCodeAlt, BiServer, BiChip, BiCloud
} from 'react-icons/bi';

export const personalInfo = {
  name: 'Dax',
  title: 'Backend Developer & Linux Enthusiast',
  subtitle: 'Passionate about networks, computer science, and physics',
  description: 'Backend and AI developer with a deep love for Open Source, network engineering, and the intersection of technology and science.',
  email: 'dax@dax-ec.ru',
  location: 'Ecuador',
  avatar: '/avatar.jpg',
};

export const skillCategories: SkillCategory[] = [
  {
    key: 'languages',
    label: 'Programming Languages',
    icon: BiCodeAlt,
    color: 'text-blue-400',
    description: 'Core programming languages and paradigms'
  },
  {
    key: 'backend',
    label: 'Backend Development',
    icon: BiServer,
    color: 'text-emerald-400',
    description: 'Server-side technologies and frameworks'
  },
  {
    key: 'frontend',
    label: 'Frontend Development',
    icon: SiReact,
    color: 'text-cyan-400',
    description: 'Modern web frontend technologies'
  },
  
  {
    key: 'databases',
    label: 'Databases & Storage',
    icon: FaDatabase,
    color: 'text-purple-400',
    description: 'Database systems and data management'
  },
  {
    key: 'devops',
    label: 'DevOps & Infrastructure',
    icon: BiChip,
    color: 'text-orange-400',
    description: 'Infrastructure, containers, and automation'
  },
  {
    key: 'cloud',
    label: 'Cloud & Platforms',
    icon: BiCloud,
    color: 'text-indigo-400',
    description: 'Cloud platforms and services'
  },
  {
    key: 'ai',
    label: 'Data Science & AI',
    icon: LuBrainCircuit,
    color: 'text-purple-400',
    description: 'Machine learning, data analysis, and AI technologies'
  },
  {
    key: 'tools',
    label: 'Development Tools',
    icon: FaTools,
    color: 'text-gray-400',
    description: 'Essential development and system tools'
  },
];

export const skills: Skill[] = [
  // Programming Languages
  { 
    name: 'Python', 
    category: 'languages', 
    level: 5, 
    icon: SiPython,
    color: 'text-green-400',
    description: 'AI/ML, automation, and rapid development'
  },
  { 
    name: 'Java', 
    category: 'languages', 
    level: 4, 
    icon: FaJava,
    color: 'text-red-600',
    description: 'Object-Oriented Programming and Enterprise Applications'
  },
  { 
    name: 'C/C++', 
    category: 'languages', 
    level: 3, 
    icon: SiCplusplus,
    color: 'text-blue-500',
    description: 'System programming (Syscalls) and performance-critical applications'
  },
  {
    name: 'Bash',
    category: 'languages',
    level: 4,
    icon: SiGnubash,
    color: 'text-green-600',
    description: 'Shell scripting and automation'
  },
  
  { 
    name: 'JavaScript', 
    category: 'languages', 
    level: 3, 
    icon: SiJavascript,
    color: 'text-yellow-400',
    description: 'Web development and Node.js ecosystem'
  },
  { 
    name: 'TypeScript', 
    category: 'languages', 
    level: 3, 
    icon: SiTypescript,
    color: 'text-blue-600',
    description: 'Type-safe JavaScript development'
  },

  // Backend
  {
    name: 'Django',
    category: 'backend',
    level: 4,
    icon: SiDjango,
    color: 'text-green-500',
    description: 'Python web framework for MVC architecture'
  },
  { 
    name: 'FastAPI', 
    category: 'backend', 
    level: 4, 
    icon: SiFastapi,
    color: 'text-teal-500',
    description: 'Modern Python web framework for API development with AI integration'
  },
  {
    name: 'Spring Boot',
    category: 'backend',
    level: 3,
    icon: SiSpringboot,
    color: 'text-green-500',
    description: 'Java web framework for enterprise applications'
  },
  {
    name: 'Flask',
    category: 'backend',
    level: 3,
    icon: SiFlask,
    color: 'text-gray-300',
    description: 'Minimalist web framework for Python'
  },
  { 
    name: 'Nginx', 
    category: 'backend', 
    level: 4, 
    icon: SiNginx,
    color: 'text-green-600',
    description: 'High-performance web server and reverse proxy'
  },
  { name: 'Supabase',
    category: 'backend',
    level: 3,
    icon: SiSupabase,
    color: 'text-green-600',
    description: 'Open-source backend as a service (Is this a backend? idk)'
  },
  
  
  // Frontend
  { 
    name: 'React', 
    category: 'frontend', 
    level: 3, 
    icon: SiReact,
    color: 'text-cyan-400',
    description: 'Modern UI development with hooks and context'
  },
  
  { 
    name: 'TailwindCSS', 
    category: 'frontend', 
    level: 3, 
    icon: SiTailwindcss,
    color: 'text-cyan-500',
    description: 'Utility-first CSS framework'
  },
  { 
    name: 'Next.js', 
    category: 'frontend', 
    level: 3, 
    icon: SiNextdotjs,
    color: 'text-gray-800 dark:text-white',
    description: 'Full-stack React framework'
  },
  
  
  // Databases
  { 
    name: 'PostgreSQL', 
    category: 'databases', 
    level: 4, 
    icon: SiPostgresql,
    color: 'text-blue-600',
    description: 'Advanced open-source relational database'
  },
  { 
    name: 'Redis', 
    category: 'databases', 
    level: 3, 
    icon: SiRedis,
    color: 'text-red-500',
    description: 'In-memory data structure store'
  },
  { 
    name: 'MongoDB', 
    category: 'databases', 
    level: 2, 
    icon: SiMongodb,
    color: 'text-green-500',
    description: 'Document-oriented NoSQL database'
  },
  { 
    name: 'MySQL', 
    category: 'databases', 
    level: 3, 
    icon: SiMysql,
    color: 'text-blue-500',
    description: 'Reliable relational database management system'
  },
  
  // DevOps & Infrastructure
  { 
    name: 'Linux', 
    category: 'devops', 
    level: 5, 
    icon: SiLinux,
    color: 'text-yellow-500',
    description: 'System administration and kernel-level operations'
  },
  { 
    name: 'Docker', 
    category: 'devops', 
    level: 4, 
    icon: SiDocker,
    color: 'text-blue-500',
    description: 'Containerization and application packaging'
  },
  { 
    name: 'Kubernetes', 
    category: 'devops', 
    level: 2, 
    icon: SiKubernetes,
    color: 'text-blue-600',
    description: 'Container orchestration and management'
  },
  
  
  { 
    name: 'Network Engineering', 
    category: 'devops', 
    level: 4, 
    icon: FaNetworkWired,
    color: 'text-blue-400',
    description: 'TCP/IP protocols and network infrastructure'
  },
  { 
    name: 'Network Security', 
    category: 'devops', 
    level: 4, 
    icon: FaShieldAlt,
    color: 'text-green-500',
    description: 'Network security and threat protection'
  },
  
  // Cloud Platforms
  {name: 'Personal VPS',
    category: 'cloud',
    level: 4,
    icon: SiHostinger,
    color: 'text-purple-900',
    description: 'Personal VPS for development and testing'
  },
  {name: 'Web Hosting',
    category: 'cloud',
    level: 4,
    icon: SiHetzner,
    color: 'text-gray-500',
    description: 'Web hosting for personal projects'
  },
  
  // Data Science & AI
  { 
    name: 'NumPy', 
    category: 'ai', 
    level: 3, 
    icon: SiNumpy,
    color: 'text-blue-500',
    description: 'Numerical computing and array operations'
  },
  { 
    name: 'Pandas', 
    category: 'ai', 
    level: 3, 
    icon: SiPandas,
    color: 'text-blue-600',
    description: 'Data manipulation and analysis'
  },
  { 
    name: 'Scikit-learn', 
    category: 'ai', 
    level: 3, 
    icon: SiScikitlearn,
    color: 'text-orange-500',
    description: 'Machine learning algorithms and tools'
  },
  { 
    name: 'TensorFlow', 
    category: 'ai', 
    level: 3, 
    icon: SiTensorflow,
    color: 'text-orange-600',
    description: 'Deep learning framework for neural networks'
  },
  { 
    name: 'Keras', 
    category: 'ai', 
    level: 3, 
    icon: SiKeras,
    color: 'text-red-500',
    description: 'High-level neural networks API'
  },
  { 
    name: 'OpenCV', 
    category: 'ai', 
    level: 3, 
    icon: SiOpencv,
    color: 'text-blue-500',
    description: 'Computer vision and image processing'
  },
  { 
    name: 'Jupyter', 
    category: 'ai', 
    level: 3, 
    icon: SiJupyter,
    color: 'text-orange-500',
    description: 'Interactive computing and data analysis'
  },
  { 
    name: 'Plotly', 
    category: 'ai', 
    level: 3, 
    icon: SiPlotly,
    color: 'text-blue-500',
    description: 'Interactive data visualization'
  },
  { 
    name: 'PyTorch', 
    category: 'ai', 
    level: 3, 
    icon: SiPytorch,
    color: 'text-red-500',
    description: 'Deep learning framework with dynamic computation'
  },
  { 
    name: 'SciPy', 
    category: 'ai', 
    level: 3, 
    icon: SiScipy,
    color: 'text-blue-600',
    description: 'Scientific computing and optimization'
  },
  { 
    name: 'Anaconda', 
    category: 'ai', 
    level: 3, 
    icon: SiAnaconda,
    color: 'text-green-500',
    description: 'Data science platform and package management'
  },
  { 
    name: 'Matplotlib', 
    category: 'ai', 
    level: 3, 
    icon: SiPlotly,
    color: 'text-blue-500',
    description: 'Comprehensive plotting library for Python'
  },
  { 
    name: 'Seaborn', 
    category: 'ai', 
    level: 3, 
    icon: SiPlotly,
    color: 'text-purple-500',
    description: 'Statistical data visualization library'
  },
  
  // Development Tools
  { 
    name: 'Git', 
    category: 'tools', 
    level: 4, 
    icon: SiGit,
    color: 'text-orange-500',
    description: 'Version control and collaboration'
  },
  { 
    name: 'Vim/Neovim', 
    category: 'tools', 
    level: 4, 
    icon: SiVim,
    color: 'text-green-500',
    description: 'Efficient text editing and development'
  },
  { 
    name: 'Alacritty', 
    category: 'tools', 
    level: 4, 
    icon: SiAlacritty,
    color: 'text-gray-400',
    description: 'Terminal emulator for productivity'
  },
  { 
    name: 'Arch Linux', 
    category: 'tools', 
    level: 5, 
    icon: SiArchlinux,
    color: 'text-blue-500',
    description: 'Minimalist and flexible Linux distribution'
  },
  {
    name: 'Fedora',
    category: 'tools',
    level: 5,
    icon: SiFedora,
    color: 'text-blue-500',
    description: 'Linux distribution for developers'
  },
  { 
    name: 'Wireshark', 
    category: 'tools', 
    level: 4, 
    icon: SiWireshark,
    color: 'text-blue-600',
    description: 'Network protocol analyzer'
  },
  {
    name: 'Gnome',
    category: 'tools',
    level: 5,
    icon: SiGnome,
    color: 'text-gray-500',
    description: 'Linux desktop environment'
  },
  {
    name: 'KDE',
    category: 'tools',
    level: 4,
    icon: SiKde,
    color: 'text-gray-200',
    description: 'Linux desktop environment'
  },
  {
    name: 'Hyprland',
    category: 'tools',
    level: 4,
    icon: SiHyprland,
    color: 'text-blue-500',
    description: 'Linux desktop environment'
  }
];

export const projects: Project[] = [
  {
    id: 'dax-auth',
    title: 'Dax Auth',
    description: 'Dax Auth is a PAM module with face recognition for Linux.',
    technologies: ['C', 'Linux', 'PAM', 'Face Recognition', 'AI'],
    githubUrl: 'https://github.com/daxrpm/dax-auth',
    featured: false,
  },
  {
    id: 'PDF-Editor',
    title: 'PDF Editor',
    description: 'PDF Editor is a simple, modern and secure PDF editor with a web interface.',
    technologies: ['Python', 'FastAPI', 'PDF', 'React'],
    githubUrl: 'https://github.com/daxrpm/PDFeditor-web',
    liveUrl: 'https://pdf-editor.dax-ec.ru',
    image: '/projects/pdf-editor.png',
    featured: false,
  },
  {
    id: 'cms-colaboration',
    title: 'CERN CMS Collaboration',
    description: 'Im a colaborator of the CERN CMS project at the DPOA (Data Preservation and Open Access) group, at my university EPN.',
    technologies: ['Docker', 'Linux', 'Python', 'MadGraph', 'GitHub'],
    githubUrl: 'https://github.com/daxrpm/cms-colaboration',
    image: '/projects/cms.jpeg',
    featured: true,
  },
  {
    id: 'nexalink',
    title: 'Nexalink Tracking System',
    description: 'Nexalink is a tracking system based on Traccar',
    technologies: ['Java', 'Linux', 'Websockets', 'REST API', 'Docker'],
    githubUrl: 'https://github.com/daxrpm/traccar',
    liveUrl: 'https://nexalink.dax-ec.ru',
    image: '/projects/nexalink.png',
    featured: false,
  },
  {
    id: 'osint-api',
    title: 'OSINT API Ec',
    description: 'OSINT API is a REST API for OSINT in Ecuador with a web interface.\nNon deployed due to cors policies where the webscapping is done.',
    technologies: ['Python', 'Flask', 'SQLite', 'REST API'],
    githubUrl: 'https://github.com/daxrpm/osint-api',
    liveUrl: 'https://osint-api.dax-ec.ru',
    image: '/projects/osint-api.svg',
    featured: false,
  },
  {
    id: 'dash',
    title: 'Dash',
    description: 'My own very simple shell for Linux.',
    technologies: ['C', 'Linux', 'Shell'],
    githubUrl: 'https://github.com/daxrpm/dash',
    featured: false,
  },
];

export const experience: Experience[] = [
  {
    id: 'senior-dev',
    title: 'Senior Software Engineer',
    company: 'Tech Company',
    period: '2022 - Present',
    description: 'Leading development of high-performance systems, focusing on network programming, security, and Linux system optimization.',
    technologies: ['Rust', 'C++', 'Linux', 'Networking', 'Security'],
  },
  {
    id: 'network-engineer',
    title: 'Network Engineer',
    company: 'Network Solutions',
    period: '2020 - 2022',
    description: 'Designed and implemented secure network infrastructures, optimized routing protocols, and developed network monitoring tools.',
    technologies: ['Cisco', 'Linux', 'Python', 'Network Security', 'Monitoring'],
  },
  {
    id: 'system-admin',
    title: 'Linux System Administrator',
    company: 'IT Services',
    period: '2018 - 2020',
    description: 'Managed Linux server infrastructure, implemented automation scripts, and ensured system security and performance.',
    technologies: ['Linux', 'Bash', 'Python', 'Docker', 'Ansible'],
  },
];

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/daxrpm',
    icon: 'github',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/dax-navarrete-b07b3826a/',
    icon: 'linkedin',
  },
  
  
];

export const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  // { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]; 