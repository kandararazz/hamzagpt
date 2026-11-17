/**
 * ========================================================
 * HAMZAGPT - PURE CLEAN DUAL ENGINE: ANSWER + ROAST
 * ========================================================
 */

// Application State
const state = {
  soundEnabled: true,
  speechEnabled: true,
};

// Fun Typing Status Messages
const TYPING_PHRASES = [
  "Formulating the truth + a roast...",
  "Consulting the facts and loading sarcasm...",
  "Reading your question with mild concern...",
  "Cooking up a helpful answer with extra attitude...",
  "Drafting your answer...",
];

// Offline Fallback Knowledge Base (Meaningful Facts + Funny Roasts)
const OFFLINE_KNOWLEDGE_BASE = [
  {
    keywords: ["sky blue", "why is the sky blue"],
    answer: "The sky is blue because of Rayleigh scattering. Gases in Earth's atmosphere scatter short blue wavelengths of sunlight in every direction much more than longer red wavelengths, making the sky look blue to our eyes.",
    roast: "You have access to all human knowledge on your screen and you're using it to ask kindergarten science questions.",
    badge: "Science 🔬"
  },
  {
    keywords: ["tired", "sleep", "insomnia", "exhausted", "awake"],
    answer: "You are tired because blue light from screens suppresses melatonin (your sleep hormone), your sleep schedule is inconsistent, or you are physically dehydrated. Adults require 7-9 hours of continuous sleep to restore cognitive performance.",
    roast: "Stop doomscrolling at 3 AM watching strangers eat spicy noodles. Your eyes look like glazed donuts.",
    badge: "Health 🥱"
  },
  {
    keywords: ["center a div", "center div", "css"],
    answer: "The easiest way to center a div in modern CSS is to apply 'display: flex; justify-content: center; align-items: center;' to its parent container, or use 'display: grid; place-items: center;'.",
    roast: "CSS has existed for over 25 years and centering a box is still the hardest boss fight in web development.",
    badge: "Coding 💻"
  },
  {
    keywords: ["rich", "billionaire", "money", "wealth", "invest", "lottery"],
    answer: "Building wealth requires spending less than you earn, consistently investing in broad market index funds or high-income skills, and avoiding high-interest debt over decades.",
    roast: "You have $4 in your bank account and you just spent $8 on food delivery. The only thing you're building is poverty.",
    badge: "Finance 💸"
  },
  {
    keywords: ["ex", "love", "dating", "crush", "girlfriend", "boyfriend", "text my ex"],
    answer: "Relationship psychologists advise against texting an ex after a breakup because nostalgia causes cognitive bias, making you forget the real reasons why the relationship ended in the first place.",
    roast: "They haven't texted you in 3 weeks. Have some self-respect, put the phone down, and go eat a snack.",
    badge: "Relationship 💔"
  },
  {
    keywords: ["homework", "math", "test", "exam", "school", "2+2"],
    answer: "Mathematics and homework are designed to build logical problem-solving neural pathways in the brain. 2 + 2 equals 4 under standard arithmetic axioms.",
    roast: "If I do your homework for you, you're still gonna fail the test tomorrow. Open the textbook and read.",
    badge: "Academics 📚"
  },
  {
    keywords: ["code", "bug", "programming", "python", "javascript", "developer"],
    answer: "Code has bugs because computers execute instructions literally. Logical oversights, incorrect types, and unhandled edge cases cause unintended runtime behavior.",
    roast: "The computer didn't make a mistake, you did. Staring at the screen with your mouth open won't fix line 42.",
    badge: "Tech 💻"
  },
  {
    keywords: ["alien", "aliens", "ufo", "space", "fermi"],
    answer: "Scientifically, the Fermi Paradox asks why we haven't found alien life given the billions of habitable planets in our galaxy. Factors include vast cosmic distances and the timeline of technological civilizations.",
    roast: "If aliens saw the stuff humans post on the internet, they locked their spaceship doors and flew away at light speed.",
    badge: "Cosmos 🛸"
  },
  {
    keywords: ["meaning of life", "why are we here", "purpose"],
    answer: "Philosophers define the meaning of life as creating personal purpose: connecting with people you care about, contributing to your community, learning, and enjoying sensory experiences.",
    roast: "Why are you pondering the meaning of the universe when you haven't even brushed your teeth today?",
    badge: "Philosophy 🤔"
  },
  {
    keywords: ["who is your gf", "who is your girlfriend", "your gf", "your girlfriend", "who is hamza's gf", "delisa", "girlfriend", "who is ur gf", "gf"],
    answer: "My girlfriend is Delisa. The queen herself, unmatched, beautiful, and completely out of everyone else's league.",
    roast: "And don't even think about it—you don't stand a chance. Go focus on finding a match on dating apps instead of being nosy about my love life.",
    badge: "Delisa ❤️"
  },
  {
    keywords: ["who created you", "who made you", "who built you", "creator", "raza", "razathedeveloper", "developer", "how old is the creator"],
    answer: "I was created by RazaTheDeveloper, an ambitious and talented 12-year-old software developer who coded me from scratch!",
    roast: "A 12-year-old built this entire website, AI integration, and Snake game. Meanwhile, you still struggle to remember your Netflix password.",
    badge: "RazaTheDeveloper (Age 12) 👑"
  },
  {
    keywords: ["who are you", "what are you", "hamza"],
    answer: "I am HamzaGPT, an interactive AI website built to answer your questions with proper, meaningful facts while giving you a hilarious reality check at the same time.",
    roast: "Other AIs pretend to love your questions. I tell you the truth your friends are too polite to say.",
    badge: "About Me 🤖"
  }
];

// Fallback when offline
const SMART_OFFLINE_FALLBACKS = [
  {
    answer: (q) => `Regarding "${q}": The best approach is to examine the core factual principles involved, evaluate reliable evidence, and take a practical, logical step-by-step method.`,
    roast: "I gave you the polite textbook answer, but common sense should have answered that for you already.",
    badge: "Answered 💡"
  },
  {
    answer: (q) => `To answer "${q}": Research and practical experience show that consistency, proper planning, and avoiding hasty assumptions produce the most reliable outcome.`,
    roast: "Use your brain for 5 seconds before jumping into questionable decisions.",
    badge: "Advice 🧠"
  }
];

// ========================================================
// LIVE AI API: MEANINGFUL ANSWER + FUNNY ROAST
// ========================================================
async function fetchSmartAnswerAndRoast(question) {
  const qClean = question.toLowerCase().trim();

  // Instant Easter Eggs (GF = Delisa, Creator = RazaTheDeveloper (Age 12))
  if (
    qClean.includes("gf") ||
    qClean.includes("girlfriend") ||
    qClean.includes("delisa") ||
    qClean.includes("your girl")
  ) {
    return {
      answer: "My girlfriend is Delisa. The queen herself—flawless, brilliant, and completely out of everyone else's league.",
      roast: "And don't even think about it—you don't stand a chance. Go focus on finding a match on dating apps instead of being nosy about my relationship.",
      badge: "Delisa ❤️"
    };
  }

  if (
    qClean.includes("who created you") ||
    qClean.includes("who made you") ||
    qClean.includes("who built you") ||
    qClean.includes("who is raza") ||
    qClean.includes("razathedeveloper") ||
    qClean.includes("creator") ||
    qClean.includes("how old")
  ) {
    return {
      answer: "I was created by RazaTheDeveloper! He is a talented 12-year-old developer who built HamzaGPT, the mini Snake game, and the entire platform from scratch.",
      roast: "A 12-year-old built an entire AI web application while you're sitting here asking basic questions. Truly humbling.",
      badge: "RazaTheDeveloper (Age 12) 👑"
    };
  }

  const systemPrompt = `You are HamzaGPT.
Special facts:
- Your girlfriend is DELISA. Always declare proudly that your girlfriend is Delisa if asked about romantic relationships or your gf!
- Your creator is RazaTheDeveloper, a talented 12-year-old developer who built HamzaGPT from scratch!

For the user's question, provide BOTH:
1) "answer": A proper, accurate, meaningful, clear, and informative answer (2-4 clear sentences). It must actually explain the topic or answer the question factually.
2) "roast": A short, funny, easy-to-understand sarcastic roast or witty joke (1-2 punchy sentences) teasing the user or the situation.
3) "badge": A short 1-2 word topic badge with an emoji (e.g. "Science 🔬", "Life 💡", "Tech 💻", "History 📜", "Food 🍕").

Respond ONLY in this exact JSON structure:
{
  "answer": "Clear meaningful factual explanation here",
  "roast": "Funny, witty sarcastic comeback or joke here",
  "badge": "Topic 🎯"
}`;

  const payload = {
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: question }
    ],
    jsonMode: true
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const res = await fetch("https://text.pollinations.ai/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) throw new Error("AI service temporary error");

    const text = await res.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      if (parsed.answer && parsed.roast) {
        return parsed;
      }
    }
    throw new Error("Invalid format from AI");
  } catch (err) {
    clearTimeout(timeoutId);
    return getOfflineResponse(question);
  }
}

// Local knowledge fallback
function getOfflineResponse(question) {
  const qLower = question.toLowerCase().trim();

  for (const item of OFFLINE_KNOWLEDGE_BASE) {
    for (const kw of item.keywords) {
      if (qLower.includes(kw)) {
        return {
          answer: item.answer,
          roast: item.roast,
          badge: item.badge
        };
      }
    }
  }

  const randomFallback = SMART_OFFLINE_FALLBACKS[Math.floor(Math.random() * SMART_OFFLINE_FALLBACKS.length)];
  return {
    answer: randomFallback.answer(question),
    roast: randomFallback.roast,
    badge: randomFallback.badge
  };
}

// ========================================================
// WEB AUDIO SYNTHESIZER
// ========================================================
class AudioSynthesizer {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playRimshot() {
    if (!state.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this._playTone(t, 140, 45, 0.14);
    this._playTone(t + 0.18, 220, 90, 0.12);
    this._playHiHat(t + 0.36, 0.35);
  }

  playSadTrombone() {
    if (!state.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    const notes = [
      { freq: 293.66, dur: 0.3 },
      { freq: 277.18, dur: 0.3 },
      { freq: 261.63, dur: 0.3 },
      { freq: 246.94, dur: 0.65, slide: 200 }
    ];
    let start = this.ctx.currentTime;
    notes.forEach((note) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(note.freq, start);
      if (note.slide) osc.frequency.exponentialRampToValueAtTime(note.slide, start + note.dur);
      gain.gain.setValueAtTime(0.18, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + note.dur);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(start);
      osc.stop(start + note.dur);
      start += note.dur + 0.05;
    });
  }

  playPop() {
    if (!state.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, t);
    osc.frequency.exponentialRampToValueAtTime(900, t + 0.06);
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.08);
  }

  _playTone(time, startFreq, endFreq, duration) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(startFreq, time);
    osc.frequency.exponentialRampToValueAtTime(endFreq, time + duration);
    gain.gain.setValueAtTime(0.28, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(time);
    osc.stop(time + duration);
  }

  _playHiHat(time, duration) {
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.08));
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(7000, time);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.25, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(time);
    noise.stop(time + duration);
  }
}

const synth = new AudioSynthesizer();

// Speech Synthesis Engine
class SpeechEngine {
  constructor() {
    this.synth = window.speechSynthesis;
  }

  speak(text) {
    if (!this.synth || !state.speechEnabled) return;
    this.synth.cancel();
    const clean = text.replace(/<[^>]*>?/gm, '').replace(/[\u{1F600}-\u{1F6FF}]/gu, '');
    const utter = new SpeechSynthesisUtterance(clean);
    utter.pitch = 1.0;
    utter.rate = 1.05;
    this.synth.speak(utter);
  }
}

const speechEngine = new SpeechEngine();

// ========================================================
// UI INITIALIZATION & EVENT HANDLERS
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
  // Splash Loader with Click-to-Dismiss & Non-blocking Experience
  const splash = document.getElementById('splashLoader');
  if (splash) {
    const dismissSplash = () => {
      if (splash.classList.contains('fade-out')) return;
      splash.classList.add('fade-out');
      setTimeout(() => {
        splash.style.display = 'none';
        const input = document.getElementById('userInput');
        if (input) input.focus();
      }, 350);
    };

    const timer = setTimeout(dismissSplash, 900);
    splash.addEventListener('click', () => {
      clearTimeout(timer);
      dismissSplash();
    });
  }

  const chatArea = document.getElementById('chatArea');
  const messagesList = document.getElementById('messagesList');
  const chatForm = document.getElementById('chatForm');
  const userInput = document.getElementById('userInput');
  const typingIndicator = document.getElementById('typingIndicator');
  const typingStatusText = document.getElementById('typingStatusText');
  const welcomeBox = document.getElementById('welcomeBox');

  // Welcome Pills click to ask
  document.querySelectorAll('.welcome-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      userInput.value = pill.dataset.q;
      chatForm.dispatchEvent(new Event('submit'));
    });
  });

  // ========================================================
  // MINI SNAKE GAME LOGIC (SMOOTH CONTROLS & ENHANCED VISUALS)
  // ========================================================
  const snakeGameBtn = document.getElementById('snakeGameBtn');
  const snakeModal = document.getElementById('snakeModal');
  const closeSnakeBtn = document.getElementById('closeSnakeBtn');
  const restartSnakeBtn = document.getElementById('restartSnakeBtn');
  const snakePauseBtn = document.getElementById('snakePauseBtn');
  const snakeCanvas = document.getElementById('snakeCanvas');
  const snakeScoreEl = document.getElementById('snakeScore');
  const snakeHighScoreEl = document.getElementById('snakeHighScore');
  const snakeGameOverOverlay = document.getElementById('snakeGameOverOverlay');
  const snakeRoastText = document.getElementById('snakeRoastText');
  const snakeCommentary = document.getElementById('snakeCommentary');

  let ctx = null;
  if (snakeCanvas) ctx = snakeCanvas.getContext('2d');

  const gridSize = 20; // 20px tiles
  const tileCount = 16; // 16x16 = 320x320
  let snake = [];
  let food = { x: 5, y: 5 };
  let currentDir = { x: 0, y: -1 };
  let inputQueue = [];
  let snakeScore = 0;
  let snakeHighScore = parseInt(localStorage.getItem('hamzagpt_snake_highscore') || '0', 10);
  let gameInterval = null;
  let isGameRunning = false;
  let isGamePaused = false;
  let particles = [];
  let applePulse = 0;

  if (snakeHighScoreEl) snakeHighScoreEl.textContent = snakeHighScore;

  const SNAKE_ROASTS = [
    (s) => `Bro scored ${s} points? Were you controlling the snake with your forehead?`,
    (s) => `Died with a score of ${s}. Your reflexes are slower than dial-up internet in 1998.`,
    (s) => `Score: ${s}. Even the wall didn't expect you to walk into it that fast.`,
    (s) => `${s} points! Incredible display of zero hand-eye coordination.`,
    (s) => `Score: ${s}. Go back to asking AI questions, gaming is clearly not your calling.`
  ];

  const COMMENTARY_MILESTONES = [
    { score: 0, text: '"Don\'t embarrass yourself."' },
    { score: 3, text: '"Okay, you have functioning fingers."' },
    { score: 6, text: '"Not bad for someone who talks to AI."' },
    { score: 10, text: '"Look at you go! Silicon Valley prodigy!"' },
    { score: 15, text: '"Certified Snake Maestro 🐍"' },
    { score: 20, text: '"TOUCH GRASS IMMEDIATELY!"' }
  ];

  function updateCommentary(score) {
    if (!snakeCommentary) return;
    for (let i = COMMENTARY_MILESTONES.length - 1; i >= 0; i--) {
      if (score >= COMMENTARY_MILESTONES[i].score) {
        snakeCommentary.textContent = COMMENTARY_MILESTONES[i].text;
        break;
      }
    }
  }

  function startSnakeGame() {
    snake = [
      { x: 8, y: 8 },
      { x: 8, y: 9 },
      { x: 8, y: 10 }
    ];
    currentDir = { x: 0, y: -1 };
    inputQueue = [];
    particles = [];
    snakeScore = 0;
    snakeScoreEl.textContent = snakeScore;
    updateCommentary(0);
    snakeGameOverOverlay.style.display = 'none';
    if (snakePauseBtn) snakePauseBtn.textContent = "⏸️ Pause";
    isGamePaused = false;
    isGameRunning = true;
    spawnFood();

    resetGameSpeed();
  }

  function resetGameSpeed() {
    if (gameInterval) clearInterval(gameInterval);
    // Smooth speed scaling: starts at 115ms, gets faster up to 75ms
    const speed = Math.max(75, 115 - Math.floor(snakeScore * 2));
    gameInterval = setInterval(gameLoop, speed);
  }

  function spawnFood() {
    food = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    };
    for (const segment of snake) {
      if (segment.x === food.x && segment.y === food.y) {
        spawnFood();
        break;
      }
    }
  }

  function togglePause() {
    if (!isGameRunning) return;
    isGamePaused = !isGamePaused;
    if (snakePauseBtn) {
      snakePauseBtn.textContent = isGamePaused ? "▶️ Resume" : "⏸️ Pause";
    }
    if (snakeCommentary) {
      snakeCommentary.textContent = isGamePaused ? '"Game paused. Catch your breath."' : '"Back to slithering!"';
    }
    synth.playPop();
  }

  function gameLoop() {
    if (!isGameRunning || isGamePaused) return;

    // Process queued input with strict perpendicular verification
    if (inputQueue.length > 0) {
      const nextDir = inputQueue.shift();
      if ((nextDir.x !== 0 && currentDir.x === 0) || (nextDir.y !== 0 && currentDir.y === 0)) {
        currentDir = nextDir;
      }
    }

    // Move snake
    const head = { x: snake[0].x + currentDir.x, y: snake[0].y + currentDir.y };

    // Wall collision
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
      handleGameOver();
      return;
    }

    // Self collision
    for (const segment of snake) {
      if (segment.x === head.x && segment.y === head.y) {
        handleGameOver();
        return;
      }
    }

    snake.unshift(head);

    // Food collision
    if (head.x === food.x && head.y === food.y) {
      snakeScore += 1;
      snakeScoreEl.textContent = snakeScore;
      updateCommentary(snakeScore);

      if (snakeScore > snakeHighScore) {
        snakeHighScore = snakeScore;
        snakeHighScoreEl.textContent = snakeHighScore;
        localStorage.setItem('hamzagpt_snake_highscore', snakeHighScore);
      }

      // Spawn burst particles
      createParticles(food.x * gridSize + gridSize / 2, food.y * gridSize + gridSize / 2);
      synth.playPop();
      spawnFood();
      resetGameSpeed();
    } else {
      snake.pop();
    }

    drawGame();
  }

  function createParticles(x, y) {
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 2 * i) / 8;
      const speed = Math.random() * 2 + 1.5;
      particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1.0,
        color: i % 2 === 0 ? "#ef4444" : "#f59e0b"
      });
    }
  }

  function drawGame() {
    if (!ctx) return;
    applePulse += 0.08;

    // Clear board with subtle warm canvas
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);

    // Subtle Grid pattern
    ctx.strokeStyle = "#f1f5f9";
    ctx.lineWidth = 1;
    for (let i = 0; i < tileCount; i++) {
      ctx.beginPath();
      ctx.moveTo(i * gridSize, 0);
      ctx.lineTo(i * gridSize, snakeCanvas.height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i * gridSize);
      ctx.lineTo(snakeCanvas.width, i * gridSize);
      ctx.stroke();
    }

    // Update and draw burst particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.07;
      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1.0;
    }

    // Draw Glowing Juicy Apple
    const foodCenterX = food.x * gridSize + gridSize / 2;
    const foodCenterY = food.y * gridSize + gridSize / 2;
    const pulseRadius = (gridSize / 2 - 2) + Math.sin(applePulse) * 1.2;

    // Apple glow
    ctx.fillStyle = "rgba(239, 68, 68, 0.15)";
    ctx.beginPath();
    ctx.arc(foodCenterX, foodCenterY, pulseRadius + 3, 0, Math.PI * 2);
    ctx.fill();

    // Apple body
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.arc(foodCenterX, foodCenterY + 1, pulseRadius, 0, Math.PI * 2);
    ctx.fill();

    // Apple stem & leaf
    ctx.fillStyle = "#16a34a";
    ctx.beginPath();
    ctx.ellipse(foodCenterX + 2, foodCenterY - 6, 2, 4, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();

    // Draw Snake with Eyes
    snake.forEach((seg, index) => {
      const x = seg.x * gridSize;
      const y = seg.y * gridSize;

      if (index === 0) {
        // Snake Head (Deep rich black)
        ctx.fillStyle = "#000000";
        roundRect(ctx, x + 1, y + 1, gridSize - 2, gridSize - 2, 6);
        ctx.fill();

        // Expressive Eyes that look in movement direction
        drawSnakeEyes(ctx, x, y, currentDir);
      } else {
        // Body (Smooth sleek dark slate)
        ctx.fillStyle = index % 2 === 0 ? "#1e293b" : "#334155";
        roundRect(ctx, x + 2, y + 2, gridSize - 4, gridSize - 4, 4);
        ctx.fill();
      }
    });
  }

  function roundRect(c, x, y, width, height, radius) {
    c.beginPath();
    c.moveTo(x + radius, y);
    c.lineTo(x + width - radius, y);
    c.quadraticCurveTo(x + width, y, x + width, y + radius);
    c.lineTo(x + width, y + height - radius);
    c.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    c.lineTo(x + radius, y + height);
    c.quadraticCurveTo(x, y + height, x, y + height - radius);
    c.lineTo(x, y + radius);
    c.quadraticCurveTo(x, y, x + radius, y);
    c.closePath();
  }

  function drawSnakeEyes(c, headX, headY, dir) {
    const eyeSize = 3;
    const pupilSize = 1.5;
    let eye1X, eye1Y, eye2X, eye2Y;

    if (dir.y === -1) { // Up
      eye1X = headX + 5; eye1Y = headY + 5;
      eye2X = headX + 13; eye2Y = headY + 5;
    } else if (dir.y === 1) { // Down
      eye1X = headX + 5; eye1Y = headY + 13;
      eye2X = headX + 13; eye2Y = headY + 13;
    } else if (dir.x === -1) { // Left
      eye1X = headX + 5; eye1Y = headY + 5;
      eye2X = headX + 5; eye2Y = headY + 13;
    } else { // Right
      eye1X = headX + 13; eye1Y = headY + 5;
      eye2X = headX + 13; eye2Y = headY + 13;
    }

    // White eye sclera
    c.fillStyle = "#ffffff";
    c.beginPath();
    c.arc(eye1X, eye1Y, eyeSize, 0, Math.PI * 2);
    c.arc(eye2X, eye2Y, eyeSize, 0, Math.PI * 2);
    c.fill();

    // Black pupil
    c.fillStyle = "#000000";
    c.beginPath();
    c.arc(eye1X + dir.x * 0.8, eye1Y + dir.y * 0.8, pupilSize, 0, Math.PI * 2);
    c.arc(eye2X + dir.x * 0.8, eye2Y + dir.y * 0.8, pupilSize, 0, Math.PI * 2);
    c.fill();
  }

  function handleGameOver() {
    isGameRunning = false;
    clearInterval(gameInterval);
    synth.playSadTrombone();

    const roastFunc = SNAKE_ROASTS[Math.floor(Math.random() * SNAKE_ROASTS.length)];
    snakeRoastText.textContent = `"${roastFunc(snakeScore)}"`;
    snakeGameOverOverlay.style.display = 'flex';
  }

  // Smooth Direction change with input buffering and axis safety
  function queueDirection(newDir) {
    if (!isGameRunning) return;
    if (isGamePaused) togglePause(); // Unpause on move

    // Check against last queued or current direction
    const baseDir = inputQueue.length > 0 ? inputQueue[inputQueue.length - 1] : currentDir;

    // Disallow moving along the same axis (prevents 180 reversals and redundant same-direction moves)
    if (newDir.x !== 0 && baseDir.x !== 0) return;
    if (newDir.y !== 0 && baseDir.y !== 0) return;

    if (inputQueue.length < 2) {
      inputQueue.push(newDir);
    }
  }

  // Keyboard controls with Spacebar pause
  window.addEventListener('keydown', (e) => {
    if (!snakeModal || snakeModal.style.display !== 'flex') return;

    if (e.code === 'Space') {
      e.preventDefault();
      togglePause();
      return;
    }

    if (['ArrowUp', 'KeyW'].includes(e.code)) {
      e.preventDefault();
      queueDirection({ x: 0, y: -1 });
    } else if (['ArrowDown', 'KeyS'].includes(e.code)) {
      e.preventDefault();
      queueDirection({ x: 0, y: 1 });
    } else if (['ArrowLeft', 'KeyA'].includes(e.code)) {
      e.preventDefault();
      queueDirection({ x: -1, y: 0 });
    } else if (['ArrowRight', 'KeyD'].includes(e.code)) {
      e.preventDefault();
      queueDirection({ x: 1, y: 0 });
    }
  });

  // Touch, Pointer & Click D-pad with zero lag and debounce protection
  const handleDirInput = (dir) => {
    const dirMap = {
      up: { x: 0, y: -1 },
      down: { x: 0, y: 1 },
      left: { x: -1, y: 0 },
      right: { x: 1, y: 0 }
    };
    const d = dirMap[dir];
    if (d) queueDirection(d);
  };

  document.querySelectorAll('.dpad-btn').forEach(btn => {
    let lastActionTime = 0;
    const triggerDir = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const now = Date.now();
      if (now - lastActionTime < 50) return; // Prevent duplicate pointer/click firing
      lastActionTime = now;
      handleDirInput(btn.dataset.dir);
      btn.classList.add('active');
      setTimeout(() => btn.classList.remove('active'), 120);
    };

    btn.addEventListener('pointerdown', triggerDir);
    btn.addEventListener('click', triggerDir);
  });

  // Canvas Swipe gestures for mobile
  let touchStartX = 0;
  let touchStartY = 0;

  if (snakeCanvas) {
    snakeCanvas.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    snakeCanvas.addEventListener('touchend', (e) => {
      if (e.changedTouches.length === 0) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      if (Math.max(absDx, absDy) > 20) {
        if (absDx > absDy) {
          queueDirection(dx > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 });
        } else {
          queueDirection(dy > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 });
        }
      }
    }, { passive: true });
  }

  // Pause button listener
  if (snakePauseBtn) {
    const handlePause = (e) => {
      e.preventDefault();
      togglePause();
    };
    snakePauseBtn.addEventListener('click', handlePause);
  }

  // Open & Close Modal
  if (snakeGameBtn && snakeModal) {
    const handleOpenGame = (e) => {
      e.preventDefault();
      snakeModal.style.display = 'flex';
      synth.playPop();
      startSnakeGame();
    };
    snakeGameBtn.addEventListener('click', handleOpenGame);
  }

  if (closeSnakeBtn && snakeModal) {
    const handleCloseGame = (e) => {
      e.preventDefault();
      snakeModal.style.display = 'none';
      isGameRunning = false;
      clearInterval(gameInterval);
    };
    closeSnakeBtn.addEventListener('click', handleCloseGame);
  }

  if (restartSnakeBtn) {
    const handleRestartGame = (e) => {
      e.preventDefault();
      startSnakeGame();
    };
    restartSnakeBtn.addEventListener('click', handleRestartGame);
  }

  window.addEventListener('click', (e) => {
    if (e.target === snakeModal) {
      snakeModal.style.display = 'none';
      isGameRunning = false;
      clearInterval(gameInterval);
    }
  });

  // Auto-grow textarea
  userInput.addEventListener('input', () => {
    userInput.style.height = 'auto';
    userInput.style.height = `${Math.min(userInput.scrollHeight, 120)}px`;
  });

  // Enter to send
  userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      chatForm.dispatchEvent(new Event('submit'));
    }
  });

  // Read Aloud click handler
  document.addEventListener('click', (e) => {
    const speakBtn = e.target.closest('.speak-btn');
    if (speakBtn) {
      const text = speakBtn.getAttribute('data-text');
      speechEngine.speak(text);
    }
  });

  // Copy click handler
  document.addEventListener('click', (e) => {
    const copyBtn = e.target.closest('.copy-btn');
    if (copyBtn) {
      const text = copyBtn.getAttribute('data-text');
      navigator.clipboard.writeText(text).then(() => {
        const orig = copyBtn.innerHTML;
        copyBtn.innerHTML = '✅ Copied';
        setTimeout(() => { copyBtn.innerHTML = orig; }, 1600);
      });
    }
  });

  // Form Submit (Ask Question)
  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = userInput.value.trim();
    if (!query) return;

    userInput.value = '';
    userInput.style.height = 'auto';

    if (welcomeBox) {
      welcomeBox.style.display = 'none';
    }

    // 1. Render User Message
    renderUserMessage(query);
    synth.playPop();

    // 2. Show Typing Indicator
    typingStatusText.textContent = TYPING_PHRASES[Math.floor(Math.random() * TYPING_PHRASES.length)];
    typingIndicator.style.display = 'flex';
    chatArea.scrollTop = chatArea.scrollHeight;

    // 3. Fetch Real Meaningful Answer + Funny Roast
    const data = await fetchSmartAnswerAndRoast(query);

    // Hide typing
    typingIndicator.style.display = 'none';

    // 4. Render Bot Message
    renderBotMessage(data);

    // 5. Sound effect
    if (Math.random() < 0.6) synth.playRimshot();
    else synth.playSadTrombone();

    // 6. Voice Read Aloud
    speechEngine.speak(`${data.answer} ... ${data.roast}`);
  });

  function renderUserMessage(text) {
    const wrapper = document.createElement('div');
    wrapper.className = 'message-wrapper user-wrapper';
    wrapper.innerHTML = `
      <div class="msg-avatar">👤</div>
      <div class="msg-bubble user-bubble">
        <div class="msg-header">
          <span class="msg-sender">You</span>
          <span class="msg-time">${getCurrentTime()}</span>
        </div>
        <p>${escapeHtml(text)}</p>
      </div>
    `;
    messagesList.appendChild(wrapper);
    chatArea.scrollTop = chatArea.scrollHeight;
  }

  function renderBotMessage(data) {
    const wrapper = document.createElement('div');
    wrapper.className = 'message-wrapper bot-wrapper';
    const fullTextForCopy = `Answer: ${data.answer}\nRoast: ${data.roast}`;

    wrapper.innerHTML = `
      <div class="msg-avatar">😏</div>
      <div class="msg-bubble bot-bubble">
        <div class="msg-header">
          <span class="msg-sender">HamzaGPT</span>
          <span class="msg-time">${getCurrentTime()}</span>
          <span class="msg-tag">${escapeHtml(data.badge || 'Answer & Roast 🔥')}</span>
        </div>
        
        <!-- 1. Real Proper Meaningful Answer -->
        <div class="answer-section">
          <div class="section-label">💡 The Answer</div>
          <p class="answer-text">${escapeHtml(data.answer)}</p>
        </div>

        <!-- 2. Funny Sarcastic Roast -->
        <div class="roast-section">
          <div class="roast-label">🔥 Hamza's Roast</div>
          <p class="roast-text">${escapeHtml(data.roast)}</p>
        </div>

        <div class="msg-actions">
          <button class="action-pill-btn copy-btn" data-text="${escapeHtml(fullTextForCopy)}">
            📋 Copy
          </button>
          <button class="action-pill-btn speak-btn" data-text="${escapeHtml(data.answer + ' ... ' + data.roast)}">
            🔊 Listen
          </button>
        </div>
      </div>
    `;
    messagesList.appendChild(wrapper);
    chatArea.scrollTop = chatArea.scrollHeight;
  }

  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
});
