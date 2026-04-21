import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Trophy, Play, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  
  const moveSnake = useCallback(() => {
    if (gameOver || !gameStarted) return;

    const newSnake = [...snake];
    const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };

    // Wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      setGameOver(true);
      return;
    }

    // Self collision
    if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
      setGameOver(true);
      return;
    }

    newSnake.unshift(head);

    // Food collision
    if (head.x === food.x && head.y === food.y) {
      setScore(s => s + 10);
      setFood({
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      });
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [snake, direction, food, gameOver, gameStarted]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    const interval = setInterval(moveSnake, 100);
    return () => clearInterval(interval);
  }, [moveSnake]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines (subtle)
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(canvas.width, i * CELL_SIZE);
      ctx.stroke();
    }

    // Draw snake
    snake.forEach((segment, index) => {
      const alpha = 1 - (index / snake.length) * 0.5;
      ctx.fillStyle = `rgba(255, 0, 255, ${alpha})`;
      ctx.shadowBlur = index === 0 ? 15 : 5;
      ctx.shadowColor = '#ff00ff';
      
      // Rounded snake segments
      ctx.beginPath();
      ctx.roundRect(segment.x * CELL_SIZE + 1, segment.y * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2, 4);
      ctx.fill();
    });

    // Draw food
    ctx.fillStyle = '#39ff14';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#39ff14';
    ctx.beginPath();
    ctx.arc(food.x * CELL_SIZE + CELL_SIZE / 2, food.y * CELL_SIZE + CELL_SIZE / 2, CELL_SIZE / 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0; // Reset
  }, [snake, food]);

  useEffect(() => {
    if (score > highScore) setHighScore(score);
  }, [score, highScore]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setGameOver(false);
    setScore(0);
    setGameStarted(true);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 neon-border-magenta rounded-3xl bg-black/40 backdrop-blur-xl relative overflow-hidden">
      <div className="flex items-center justify-between w-full px-4 mb-2">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-mono mb-1">Grid Systems</span>
          <h2 className="text-xl font-bold neon-text-magenta">CYBER SNAKE</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[8px] font-mono text-gray-500">SCORE</span>
            <span className="text-xl font-bold font-mono neon-text-lime">{score.toString().padStart(4, '0')}</span>
          </div>
          <div className="flex flex-col items-end opacity-50">
            <span className="text-[8px] font-mono text-gray-500">BEST</span>
            <span className="text-xl font-bold font-mono text-gray-400">{highScore.toString().padStart(4, '0')}</span>
          </div>
        </div>
      </div>

      <div className="relative border-4 border-gray-900 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(255,0,255,0.1)]">
        <canvas
          ref={canvasRef}
          width={GRID_SIZE * CELL_SIZE}
          height={GRID_SIZE * CELL_SIZE}
          className="block"
        />

        <AnimatePresence>
          {(!gameStarted || gameOver) && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center"
            >
              {gameOver ? (
                <>
                  <Trophy size={48} className="text-neon-lime mb-4 drop-shadow-[0_0_15px_rgba(57,255,20,0.5)]" />
                  <h3 className="text-2xl font-bold text-white mb-2">SEQUENCE TERMINATED</h3>
                  <p className="text-gray-400 font-mono text-sm mb-6">Final Score: {score}</p>
                  <button 
                    onClick={resetGame}
                    className="flex items-center gap-2 px-8 py-3 bg-neon-magenta text-black font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,0,255,0.4)]"
                  >
                    <RotateCcw size={20} />
                    REBOOT
                  </button>
                </>
              ) : (
                <>
                  <div className="relative mb-6">
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-neon-magenta blur-2xl opacity-20"
                    />
                    <Play size={64} className="text-neon-magenta relative" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">INITIATE GAME</h3>
                  <p className="text-gray-400 font-mono text-sm mb-6 max-w-[200px]">Use ARROW KEYS or WASD to navigate the matrix</p>
                  <button 
                    onClick={() => setGameStarted(true)}
                    className="px-10 py-3 bg-neon-magenta text-black font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,0,255,0.4)]"
                  >
                    BOOT SYSTEM
                  </button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex gap-4 w-full">
        <div className="flex-1 p-3 rounded-xl bg-gray-900/50 border border-gray-800 flex items-center justify-center gap-2 group hover:border-neon-magenta transition-colors">
          <div className="w-2 h-2 rounded-full bg-neon-magenta animate-pulse" />
          <span className="text-[10px] font-mono text-gray-400 group-hover:text-white transition-colors uppercase tracking-widest">System Active</span>
        </div>
      </div>
    </div>
  );
}
