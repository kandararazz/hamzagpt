/**
 * ========================================================
 * HAMZA GPT - EASY & UNDERSTANDABLE ROAST ENGINE
 * ========================================================
 */

// Application State
const state = {
  personality: 'hamza',
  soundEnabled: true,
  speechEnabled: true,
};

// Fun & Simple Typing Messages
const TYPING_PHRASES = [
  "Thinking of an easy roast...",
  "Judging your question...",
  "Loading a comeback...",
  "Are you serious right now?...",
  "Preparing emotional damage...",
];

// Easy, Simple, and Understandable Roasts
const SASSY_DATABASE = [
  // SLEEP / TIRED
  {
    keywords: ["tired", "sleep", "insomnia", "exhausted", "bed", "awake", "nap"],
    answer: {
      text: "You're tired because you were on your phone until 3 AM watching useless videos.",
      punchline: "Put your phone down and go to sleep. Your eyes look like glazed donuts.",
      badge: "Sleep Deprived 🥱"
    }
  },

  // MONEY / RICH / BROKE
  {
    keywords: ["rich", "billionaire", "money", "broke", "wealth", "lottery", "crypto", "bitcoin", "millionaire", "cash", "invest"],
    answer: {
      text: "You want to be rich, but you spend all your money on food delivery and iced coffee.",
      punchline: "Your bank account has $4 and you're dreaming about a Lamborghini.",
      badge: "Broke Alert 💸"
    }
  },

  // LOVE / DATING / EX
  {
    keywords: ["ex", "love", "dating", "crush", "girlfriend", "boyfriend", "relationship", "text my ex", "single", "marry", "tinder"],
    answer: {
      text: "Do NOT text your ex! They moved on, and you should too.",
      punchline: "Have some self-respect. Delete their number and go eat a snack.",
      badge: "Down Bad 🤡"
    }
  },

  // HOMEWORK / SCHOOL / MATH
  {
    keywords: ["homework", "math", "calculator", "study", "exam", "test", "school", "college", "2+2", "science"],
    answer: {
      text: "Do your own homework! I'm not going to school for you.",
      punchline: "If I do your homework today, you're still gonna fail the test tomorrow.",
      badge: "Lazy Student 📚"
    }
  },

  // PROGRAMMING / CODING / BUGS
  {
    keywords: ["code", "coding", "programmer", "programming", "javascript", "python", "bug", "software", "developer"],
    answer: {
      text: "Your code isn't working because you don't read error messages.",
      punchline: "Staring at the screen won't fix it. You made the mistake, not the computer.",
      badge: "Skill Issue 💻"
    }
  },

  // FOOD / DIET / GYM
  {
    keywords: ["food", "diet", "gym", "workout", "fat", "weight", "pizza", "eat", "hungry", "healthy", "exercise"],
    answer: {
      text: "You want a six-pack, but you just ate a whole pizza by yourself on the couch.",
      punchline: "The only workout you did today was walking to the fridge.",
      badge: "Couch Potato 🍕"
    }
  },

  // MEANING OF LIFE / WHY ARE WE HERE
  {
    keywords: ["meaning of life", "why are we here", "purpose", "exist", "philosophy", "universe", "destiny"],
    answer: {
      text: "The meaning of life is simple: eat good food, sleep well, and stop overthinking.",
      punchline: "Why are you asking deep questions when you haven't even brushed your teeth today?",
      badge: "Overthinking 🤔"
    }
  },

  // ALIENS / UFO
  {
    keywords: ["alien", "aliens", "ufo", "space", "sky", "flat earth", "moon"],
    answer: {
      text: "If aliens came to Earth and saw you, they would lock their doors and fly away.",
      punchline: "They don't want to talk to us, and honestly, I don't blame them.",
      badge: "Alien Avoided 🛸"
    }
  },

  // WHO ARE YOU / HAMZA GPT
  {
    keywords: ["who are you", "what are you", "hamza", "who made you", "bot", "ai", "chatgpt"],
    answer: {
      text: "I am hamza GPT. You ask a question, and I roast you with the truth.",
      punchline: "Other AIs act nice. I tell you what your friends are afraid to say.",
      badge: "Real Talk 🤖"
    }
  }
];

// Simple, Funny, Easy Fallback Roasts for any other question
const EASY_FALLBACK_ROASTS = [
  {
    text: "Bro, why are you asking this? Use your brain for 5 seconds.",
    punchline: "Google is completely free, but common sense is priceless.",
    badge: "Common Sense 🧠"
  },
  {
    text: "I lost brain cells reading your question.",
    punchline: "Please close your laptop, drink some water, and think about your choices.",
    badge: "Brain Melt 💀"
  },
  {
    text: "You really sat there, typed that out, and thought it was a smart idea.",
    punchline: "Even your Wi-Fi router is embarrassed for you right now.",
    badge: "Embarrassing 📉"
  },
  {
    text: "The answer is NO. Don't do it, don't think about it, just stop.",
    punchline: "I am literally saving you from embarrassing yourself.",
    badge: "Bad Idea 🛑"
  },
  {
    text: "I could give you the answer, but you probably wouldn't listen anyway.",
    punchline: "Ask a mirror who is really causing all your life problems.",
    badge: "Reality Check 🪞"
  }
];

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
    this._playDrumTone(t, 140, 45, 0.14);
    this._playDrumTone(t + 0.18, 220, 90, 0.12);
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

  _playDrumTone(time, startFreq, endFreq, duration) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(startFreq, time);
    osc.frequency.exponentialRampToValueAtTime(endFreq, time + duration);
    gain.gain.setValueAtTime(0.3, time);
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

// ========================================================
// SPEECH SYNTHESIS (Voice Out Loud)
// ========================================================
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

  stop() {
    if (this.synth) this.synth.cancel();
  }
}

const speechEngine = new SpeechEngine();

// ========================================================
// FIND RESPONSE
// ========================================================
function generateResponse(question) {
  const qLower = question.toLowerCase().trim();

  // Check matching keyword
  for (const entry of SASSY_DATABASE) {
    for (const kw of entry.keywords) {
      if (qLower.includes(kw)) {
        return entry.answer;
      }
    }
  }

  // Pick an easy fallback roast
  return EASY_FALLBACK_ROASTS[Math.floor(Math.random() * EASY_FALLBACK_ROASTS.length)];
}

// ========================================================
// UI INITIALIZATION & EVENT HANDLERS
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
  // 2-Second Splash Loader
  const splash = document.getElementById('splashLoader');
  if (splash) {
    setTimeout(() => {
      splash.classList.add('fade-out');
      setTimeout(() => {
        splash.style.display = 'none';
        const input = document.getElementById('userInput');
        if (input) input.focus();
      }, 450);
    }, 2000);
  }

  const chatArea = document.getElementById('chatArea');
  const messagesList = document.getElementById('messagesList');
  const chatForm = document.getElementById('chatForm');
  const userInput = document.getElementById('userInput');
  const typingIndicator = document.getElementById('typingIndicator');
  const typingStatusText = document.getElementById('typingStatusText');
  const welcomeBox = document.getElementById('welcomeBox');

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

    // Reset textarea
    userInput.value = '';
    userInput.style.height = 'auto';

    // Hide welcome box on first question
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

    // 3. Comedic Delay (500ms - 800ms)
    const delay = Math.floor(Math.random() * 300) + 500;
    await new Promise(r => setTimeout(r, delay));

    // 4. Generate Response
    const response = generateResponse(query);
    typingIndicator.style.display = 'none';

    // 5. Render Bot Message
    renderBotMessage(response);

    // 6. Play comedic sound effect
    if (Math.random() < 0.5) synth.playRimshot();
    else synth.playSadTrombone();

    // 7. Auto read aloud
    speechEngine.speak(`${response.text} ${response.punchline}`);
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
    const fullTextForCopy = `"${data.text}" — ${data.punchline}`;

    wrapper.innerHTML = `
      <div class="msg-avatar">😏</div>
      <div class="msg-bubble bot-bubble">
        <div class="msg-header">
          <span class="msg-sender">hamza GPT</span>
          <span class="msg-time">${getCurrentTime()}</span>
          <span class="msg-tag">${escapeHtml(data.badge || 'Roast 🔥')}</span>
        </div>
        
        <p>${escapeHtml(data.text)}</p>
        <div class="punchline-box">
          ${escapeHtml(data.punchline)}
        </div>

        <div class="msg-actions">
          <button class="action-pill-btn copy-btn" data-text="${escapeHtml(fullTextForCopy)}">
            📋 Copy
          </button>
          <button class="action-pill-btn speak-btn" data-text="${escapeHtml(data.text + ' ' + data.punchline)}">
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
