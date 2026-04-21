/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import MusicPlayer from './components/MusicPlayer';
import SnakeGame from './components/SnakeGame';
import { motion } from 'motion/react';
import { ExternalLink, Github, Terminal } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-neon-magenta/30 overflow-x-hidden relative">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-purple/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-neon-cyan/10 blur-[140px] rounded-full" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-neon-magenta/5 blur-[100px] rounded-full" />
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Scanlines effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none z-50 opacity-[0.05]" />
      </div>

      {/* Navigation / Header */}
      <nav className="relative z-10 px-8 py-6 flex items-center justify-between border-b border-gray-900 bg-black/20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-neon-magenta flex items-center justify-center shadow-[0_0_15px_rgba(255,0,255,0.4)]">
            <Terminal size={20} className="text-black" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tighter neon-text-magenta">NEON_LABS</span>
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest leading-none">v0.4.2-alpha</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest text-gray-400 uppercase">
          <a href="#" className="hover:text-neon-cyan transition-colors">Neural Link</a>
          <a href="#" className="hover:text-neon-magenta transition-colors">Grid Access</a>
          <a href="#" className="hover:text-neon-lime transition-colors">Data Streams</a>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 border border-gray-800 rounded-full text-xs font-mono uppercase text-gray-400 hover:border-neon-cyan hover:text-neon-cyan transition-all">
            Connect
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-3 py-1 rounded-full border border-neon-cyan/30 text-[10px] font-mono text-neon-cyan uppercase tracking-[0.3em] mb-6 bg-neon-cyan/5">
            Experimental UI Experience
          </span>
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-4 selection:bg-neon-cyan">
             <span className="neon-text-magenta">SONIC</span> <span className="text-white/20">MATRIX</span>
          </h1>
          <p className="max-w-xl mx-auto text-gray-400 font-mono text-sm leading-relaxed">
            Interface between rhythm and reflex. Navigate the neon grid and lose yourself in the algorithmic pulse.
          </p>
        </motion.div>

        {/* Layout Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start justify-center max-w-7xl">
          
          {/* Side Info / Stats */}
          <motion.div 
             initial={{ opacity: 0, x: -50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="lg:col-span-3 space-y-8 hidden lg:block"
          >
            <div className="p-6 neon-border-cyan rounded-2xl bg-black/40 backdrop-blur-xl">
              <h3 className="text-xs font-mono text-neon-cyan uppercase tracking-widest mb-4">Core Telemetry</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-end border-b border-gray-800 pb-2">
                  <span className="text-[10px] text-gray-500 uppercase">Uptime</span>
                  <span className="text-sm font-mono text-gray-300">12:44:03</span>
                </div>
                <div className="flex justify-between items-end border-b border-gray-800 pb-2">
                  <span className="text-[10px] text-gray-500 uppercase">Latency</span>
                  <span className="text-sm font-mono text-neon-lime">14ms</span>
                </div>
                <div className="flex justify-between items-end border-b border-gray-800 pb-2">
                  <span className="text-[10px] text-gray-500 uppercase">Packets</span>
                  <span className="text-sm font-mono text-gray-300">2.1TB</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="w-8 h-8 rounded border border-gray-800 flex items-center justify-center group-hover:border-neon-magenta text-gray-600 transition-colors">
                  <Github size={14} />
                </div>
                <span className="text-[10px] font-mono uppercase text-gray-500 group-hover:text-white transition-colors">View Source</span>
              </div>
              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="w-8 h-8 rounded border border-gray-800 flex items-center justify-center group-hover:border-neon-cyan text-gray-600 transition-colors">
                  <ExternalLink size={14} />
                </div>
                <span className="text-[10px] font-mono uppercase text-gray-500 group-hover:text-white transition-colors">Documentation</span>
              </div>
            </div>
          </motion.div>

          {/* Game Window */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-6 w-full flex justify-center"
          >
            <SnakeGame />
          </motion.div>

          {/* Music Player */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3 w-full flex justify-center lg:justify-end"
          >
            <MusicPlayer />
          </motion.div>

        </div>

        {/* Footer Marquee Section (Recipe 5) */}
        <div className="w-full mt-32 border-t border-gray-900 pt-8 pb-16 overflow-hidden">
           <div className="flex whitespace-nowrap animate-marquee">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex items-center gap-8 mx-8">
                   <span className="text-8xl font-black text-white/5 italic tracking-tighter">NEON_SONIC_GRID</span>
                   <div className="w-4 h-4 bg-neon-magenta/20 rotate-45" />
                </div>
              ))}
           </div>
        </div>
      </main>

      <footer className="relative z-10 px-8 py-12 border-t border-gray-900 bg-black/40 backdrop-blur-md">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2">
             <span className="text-xl font-bold neon-text-cyan">NEON_SONIC_GRID</span>
             <p className="text-xs text-gray-500 font-mono">Designed for the digital void &copy; 2026</p>
          </div>
          <div className="flex gap-8 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacy Protcol</a>
            <a href="#" className="hover:text-white transition-colors">Binary Terms</a>
            <a href="#" className="hover:text-white transition-colors">Node Status</a>
          </div>
        </div>
      </footer>

      {/* Global CSS for Marquee */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
          width: fit-content;
        }
      `}} />
    </div>
  );
}
