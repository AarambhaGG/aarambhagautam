'use client';

import Terminal from '@/components/Terminal';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export default function Home() {
  const [particles, setParticles] = useState([]);
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 8000);
    const newParticles = [];
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.7 + 0.3,
      });
    }
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const terminalWindow = document.querySelector('.terminal-window');
      if (terminalWindow) {
        setIsMaximized(terminalWindow.classList.contains('maximized'));
      }
    });

    const terminalWindow = document.querySelector('.terminal-window');
    if (terminalWindow) {
      observer.observe(terminalWindow, { attributes: true, attributeFilter: ['class'] });
      setIsMaximized(terminalWindow.classList.contains('maximized'));
    }

    return () => observer.disconnect();
  }, []);

  const socialLinks = [
    {
      icon: FaGithub,
      name: 'GitHub',
      url: 'https://github.com/AarambhaGG',
    },
    {
      icon: FaLinkedin,
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/aarambha-gautam/',
    },
  ];

  return (
    <main className="page-container">
      {/* Animated Background - Starfield */}
      <div className="background-layer">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="star"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animation: `twinkle ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
            }}
          ></div>
        ))}
        <div className="grid-overlay"></div>
      </div>
      
      {/* Social Icons Sidebar */}
      {!isMaximized && (
        <div className="social-sidebar">
          {socialLinks.map((link) => {
            const IconComponent = link.icon;
            const isExternal = !link.url.startsWith('mailto');
            return (
              <a
                key={link.name}
                href={link.url}
                {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                className="social-icon"
                title={link.name}
              >
                <IconComponent />
              </a>
            );
          })}
        </div>
      )}

      {/* Terminal */}
      <Terminal />
    </main>
  );
}
