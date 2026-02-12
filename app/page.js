'use client';

import Terminal from '@/components/Terminal';

export default function Home() {
  return (
    <main className="page-container">
      {/* Animated Background */}
      <div className="background-layer">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="grid-overlay"></div>
      </div>
      
      {/* Terminal */}
      <Terminal />
    </main>
  );
}
