import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Music, Disc } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Track {
  id: number;
  title: string;
  artist: string;
  url: string;
  cover: string;
  color: string;
}

const TRACKS: Track[] = [
  {
    id: 1,
    title: "Cyber Pulse",
    artist: "AI Synth Unit",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://picsum.photos/seed/cyber/300/300",
    color: "var(--color-neon-cyan)"
  },
  {
    id: 2,
    title: "Neon Nights",
    artist: "Neural Drift",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://picsum.photos/seed/neon/300/300",
    color: "var(--color-neon-magenta)"
  },
  {
    id: 3,
    title: "Digital Storm",
    artist: "Void Mapper",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://picsum.photos/seed/storm/300/300",
    color: "var(--color-neon-lime)"
  }
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Playback failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setProgress(0);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  const handleEnded = () => {
    nextTrack();
  };

  return (
    <div className="w-full max-w-md p-6 glass-morphism neon-border-cyan rounded-3xl bg-black/40 backdrop-blur-xl flex flex-col gap-6">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-mono mb-1">Now Playing</span>
          <h2 className="text-xl font-bold neon-text-cyan truncate max-w-[200px]">{currentTrack.title}</h2>
          <p className="text-sm text-gray-400 font-mono">{currentTrack.artist}</p>
        </div>
        <div className="p-2 rounded-full border border-gray-800 bg-gray-900/50">
          <Music size={18} className="text-neon-cyan" />
        </div>
      </div>

      <div className="relative aspect-square w-full group overflow-hidden rounded-2xl border border-gray-800/50">
        <motion.img
          key={currentTrack.cover}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          src={currentTrack.cover}
          alt={currentTrack.title}
          className="w-full h-full object-cover grayscale-[0.2] group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
        
        {/* Animated Disc in the corner */}
        <motion.div 
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-4 right-4"
        >
          <Disc size={40} className="text-neon-cyan/50" />
        </motion.div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-neon-cyan" 
            style={{ width: `${progress}%` }}
            transition={{ type: "spring", bounce: 0, duration: 0.1 }}
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-gray-500">
          <span>0:00</span>
          <span>DEMO</span>
        </div>
      </div>

      <div className="flex items-center justify-between px-4">
        <button 
          onClick={prevTrack}
          className="p-3 rounded-full hover:bg-gray-800 transition-colors text-gray-400 hover:text-neon-cyan"
        >
          <SkipBack size={24} />
        </button>
        
        <button 
          onClick={togglePlay}
          className="p-5 rounded-full bg-neon-cyan text-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,243,255,0.4)]"
        >
          {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
        </button>

        <button 
          onClick={nextTrack}
          className="p-3 rounded-full hover:bg-gray-800 transition-colors text-gray-400 hover:text-neon-cyan"
        >
          <SkipForward size={24} />
        </button>
      </div>

      <div className="flex items-center gap-3 px-2 py-3 bg-gray-900/40 rounded-xl border border-gray-800/50">
        <Volume2 size={16} className="text-gray-500" />
        <div className="flex-1 h-0.5 bg-gray-800 rounded-full">
          <div className="w-2/3 h-full bg-gray-500 rounded-full" />
        </div>
      </div>
    </div>
  );
}
