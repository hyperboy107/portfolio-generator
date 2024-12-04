import React, { useEffect, useState } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { PortfolioData } from '../types/Portfolio';
import { Github, Linkedin, Mail, Twitter, ExternalLink } from 'lucide-react';
import Navigation from './Navigation';
import TechnologyStack from './TechnologyStack';

interface Props {
  data: PortfolioData;
}

export default function Portfolio({ data }: Props) {
  const controls = useAnimation();
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const { scrollYProgress } = useScroll();

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    controls.start('show');
    typeText();
  }, []);

  const typeText = async () => {
    const text = data.about;
    let currentIndex = 0;

    const typeInterval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        setTimeout(() => {
          setDisplayText('');
          currentIndex = 0;
          setIsTyping(true);
          typeText();
        }, 2000);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = `mailto:${data.contact.email}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-16 relative overflow-hidden">
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{
          background: 'linear-gradient(45deg, #3b82f6 0%, #8b5cf6 50%, #6366f1 100%)',
          y: backgroundY
        }}
      />
      
      <Navigation />
      <motion.div
        variants={container}
        initial="hidden"
        animate={controls}
        className="max-w-4xl mx-auto p-8 relative"
      >
        <motion.header 
          variants={item} 
          className="text-center mb-16"
          animate={floatingAnimation}
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 bg-clip-text text-transparent">
            {data.name}
          </h1>
          <p className="text-xl mt-4 text-gray-300">{data.title}</p>
        </motion.header>

        <motion.section 
          id="about"
          variants={item} 
          className="mb-16 scroll-mt-20"
        >
          <h2 className="text-2xl font-bold mb-6 text-violet-400">About Me</h2>
          <div className="text-gray-300 leading-relaxed min-h-[100px]">
            <span>{displayText}</span>
            {isTyping && (
              <span className="inline-block w-2 h-4 bg-violet-400 ml-1 animate-pulse" />
            )}
          </div>
        </motion.section>

        <motion.section 
          id="technologies"
          variants={item} 
          className="mb-16 scroll-mt-20"
        >
          <h2 className="text-2xl font-bold mb-6 text-violet-400">Technologies</h2>
          <TechnologyStack />
        </motion.section>

        {/* Rest of the sections remain the same */}
        <motion.section 
          id="experience"
          variants={item} 
          className="mb-16 scroll-mt-20"
        >
          <h2 className="text-2xl font-bold mb-6 text-violet-400">Experience</h2>
          <div className="space-y-8">
            {data.experience.map((exp, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ x: 10 }}
                className="border-l-2 border-violet-500 pl-6 relative"
              >
                <div className="absolute w-3 h-3 bg-violet-500 rounded-full -left-[7px] top-2" />
                <h3 className="text-xl font-semibold">{exp.company}</h3>
                <p className="text-violet-400">{exp.position}</p>
                <p className="text-gray-400 text-sm">{exp.duration}</p>
                <p className="mt-2 text-gray-300">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          id="projects"
          variants={item} 
          className="mb-16 scroll-mt-20"
        >
          <h2 className="text-2xl font-bold mb-6 text-violet-400">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.projects.map((project, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -5 }}
                className="bg-gray-800 rounded-lg overflow-hidden"
              >
                {project.imageUrl && (
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    {project.link && (
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-violet-400 hover:text-violet-300"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-violet-500 bg-opacity-20 text-violet-300 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          id="contact"
          variants={item}
          className="scroll-mt-20"
        >
          <h2 className="text-2xl font-bold mb-6 text-violet-400">Contact</h2>
          <div className="flex flex-wrap gap-4">
            <motion.a
              whileHover={{ scale: 1.1 }}
              href={`mailto:${data.contact.email}`}
              onClick={handleEmailClick}
              className="flex items-center gap-2 text-gray-300 hover:text-violet-400 transition-colors"
            >
              <Mail size={20} />
              {data.contact.email}
            </motion.a>
            {data.contact.linkedin && (
              <motion.a
                whileHover={{ scale: 1.1 }}
                href={data.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-violet-400 transition-colors"
              >
                <Linkedin size={20} />
                LinkedIn
              </motion.a>
            )}
            {data.contact.github && (
              <motion.a
                whileHover={{ scale: 1.1 }}
                href={data.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-violet-400 transition-colors"
              >
                <Github size={20} />
                GitHub
              </motion.a>
            )}
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}