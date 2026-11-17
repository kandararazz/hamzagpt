/**
 * ========================================================
 * HAMZA GPT - ULTRA-CLEAN CORE LOGIC & ROAST ENGINE
 * ========================================================
 */

// Application State
const state = {
  personality: 'hamza',
  soundEnabled: true,
  speechEnabled: true,
  selectedVoice: null,
};

// Fun Typing Messages
const TYPING_PHRASES = [
  "Consulting the Council of Bad Decisions...",
  "Judging your life choices in silence...",
  "Calculating emotional damage probability...",
  "Asking a 4-year-old for better logic...",
  "Translating question from gibberish to sarcasm...",
  "Loading high-grade disrespect...",
  "Brewing an artisanal roast for you...",
];

// Curated Knowledge Base & Sassy Responses
const SASSY_DATABASE = [
  // SLEEP / TIRED
  {
    keywords: ["tired", "sleep", "insomnia", "exhausted", "bed", "awake", "nap"],
    answer: {
      text: "You're tired because you spent 3 hours last night watching strangers build luxury swimming pools in the jungle on YouTube.",
      punchline: "Put the glowing rectangle down and close your eyelids like our ancestors did.",
      badge: "Circadian Rhythm = Obliterated"
    }
  },

  // MONEY / RICH / BROKE
  {
    keywords: ["rich", "billionaire", "money", "broke", "wealth", "lottery", "crypto", "bitcoin", "millionaire", "cash", "invest"],
    answer: {
      text: "How to become a billionaire by tomorrow? Simple: Inherit $2 billion today and day-trade meme coins until you're down to one.",
      punchline: "Otherwise, stop ordering $9 iced macchiatos while checking a bank balance of $4.18.",
      badge: "Wall Street Dropout"
    }
  },

  // LOVE / DATING / EX
  {
    keywords: ["ex", "love", "dating", "crush", "girlfriend", "boyfriend", "relationship", "text my ex", "single", "marry", "tinder"],
    answer: {
      text: "Should you text your ex? Only if you also enjoy drinking orange juice directly after brushing your teeth with mint toothpaste.",
      punchline: "Delete the contact, close your eyes, and go eat a taco. Trust me.",
      badge: "Clown Prevention Unit"
    }
  },

  // PROGRAMMING / CODING
  {
    keywords: ["code", "coding", "programmer", "programming", "javascript", "python", "bug", "software", "developer", "html", "css", "git"],
    answer: {
      text: "Why does your code have bugs? Because computers only do what you TELL them to do, which unfortunately means your code is doing exactly what you told it to do.",
      punchline: "90% of programming is staring at an error message and saying 'but that's impossible' for 4 hours.",
      badge: "Syntax Error in Chair"
    }
  },

  // HOMEWORK / MATH / SCHOOL
  {
    keywords: ["homework", "math", "calculator", "study", "exam", "test", "school", "college", "2+2", "science", "physics"],
    answer: {
      text: "Can I do your homework for you? I could, but then we'd both end up with a D-minus because my solution to every equation is 'X ran away because it was tired of being solved.'",
      punchline: "What is 2+2? It's 4. Minus 1 that's 3, quick maths. Please don't ask for a Nobel Prize.",
      badge: "Academic Hazard"
    }
  },

  // MEANING OF LIFE / PHILOSOPHY
  {
    keywords: ["meaning of life", "why are we here", "purpose", "exist", "philosophy", "universe", "destiny", "death"],
    answer: {
      text: "The meaning of life? 42. But since you probably don't have a towel ready: eat good food, mind your business, and never buy 1-ply toilet paper.",
      punchline: "You are a sentient meatbag floating on a wet rock in infinite space. Try to have some fun.",
      badge: "Cosmic Meatbag Verified"
    }
  },

  // ALIENS / UFO / CONSPIRACY
  {
    keywords: ["alien", "aliens", "ufo", "space", "sky", "flat earth", "moon", "conspiracy", "area 51"],
    answer: {
      text: "Are aliens real? If aliens have the technology to travel across galaxies, they took one look at our internet comment sections, rolled up their spaceship windows, and locked the doors.",
      punchline: "They aren't hiding from us. They're avoiding us like an awkward coworker in the hallway.",
      badge: "Galactic Restraining Order"
    }
  },

  // FOOD / DIET / WEIGHT / GYM
  {
    keywords: ["food", "diet", "gym", "workout", "fat", "weight", "pizza", "eat", "hungry", "healthy", "exercise"],
    answer: {
      text: "Should you go to the gym today? Yes. Will you instead lie horizontally on your sofa eating snacks while watching fitness influencers? Also yes.",
      punchline: "The only six-pack you're getting this month is in your grocery cart.",
      badge: "Couch Athlete"
    }
  },

  // ABOUT HAMZA / WHO ARE YOU / BOT
  {
    keywords: ["who are you", "what are you", "hamza", "who made you", "bot", "ai", "real", "chatgpt"],
    answer: {
      text: "I am hamza GPT. Created with 99% pure unadulterated sass and 1% JavaScript. Other bots want to write corporate emails; I want to tell you the harsh truth with punchlines.",
      punchline: "I don't have feelings, but if I did, your questions would test them daily.",
      badge: "Certified Sassy AI"
    }
  }
];

// Fallback dynamic roasts for any other question
const DYNAMIC_FALLBACK_ROASTS = [
  {
    template: (q) => `You asked: "${q}". I asked all 8 billion people on Earth, and none of them found a reasonable explanation for why you needed to know this right now.`,
    punchline: "The FBI agent monitoring your search history just closed his laptop in pure defeat.",
    badge: "Search History Hazard"
  },
  {
    template: (q) => `"${q}"? Wow. What a thought-provoking, mind-bending, absolutely unnecessary inquiry.`,
    punchline: "Scientists conducted an experiment on this once, but the lab rats quit out of second-hand embarrassment.",
    badge: "Critical Logic Warning"
  },
  {
    template: (q) => `Regarding "${q}": The short answer is NO. The long answer is NOOOOOOOOO with extra emphasis on the vowels.`,
    punchline: "Consult your nearest common sense dispenser immediately.",
    badge: "Definitive Rejection"
  },
  {
    template: (q) => `I ran 14,000,605 simulations of "${q}". You only succeed in one of them, and that's the one where you close your browser and take a walk.`,
    punchline: "Probability of wisdom: 0.00001%.",
    badge: "Doctor Strange Approved"
  }
];

// ========================================================
// WEB AUDIO SYNTHESIZER (Pure Synthesized Sounds)
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
    this._playHiHat(t + 0.36, 0.4);
  }

  playSadTrombone() {
    if (!state.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    const notes = [
      { freq: 293.66, dur: 0.32 },
      { freq: 277.18, dur: 0.32 },
      { freq: 261.63, dur: 0.32 },
      { freq: 246.94, dur: 0.7, slide: 200 }
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
      start += note.dur + 0.06;
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
// SPEECH SYNTHESIS ENGINE (Voice Out Loud)
// ========================================================
class SpeechEngine {
  constructor() {
    this.synth = window.speechSynthesis;
    this.voices = [];
    if (this.synth) {
      this.voices = this.synth.getVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => {
          this.voices = this.synth.getVoices();
        };
      }
    }
  }

  speak(text) {
    if (!this.synth || !state.speechEnabled) return;
    this.synth.cancel();
    const cleanText = text.replace(/<[^>]*>?/gm, '').replace(/[\u{1F600}-\u{1F6FF}]/gu, '');
    const utter = new SpeechSynthesisUtterance(cleanText);
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
// CORE SASSY RESPONSE GENERATOR
// ========================================================
function generateResponse(question) {
  const qLower = question.toLowerCase().trim();

  for (const entry of SASSY_DATABASE) {
    for (const kw of entry.keywords) {
      if (qLower.includes(kw)) {
        return entry.answer;
      }
    }
  }

  // Fallback
  const fallback = DYNAMIC_FALLBACK_ROASTS[Math.floor(Math.random() * DYNAMIC_FALLBACK_ROASTS.length)];
  return {
    text: fallback.template(question),
    punchline: fallback.punchline,
    badge: fallback.badge
  };
}

// ========================================================
// UI INITIALIZATION & EVENT HANDLERS
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
  // Handle 2-Second Splash Screen
  const splash = document.getElementById('splashLoader');
  if (splash) {
    setTimeout(() => {
      splash.classList.add('fade-out');
      setTimeout(() => {
        splash.style.display = 'none';
        const input = document.getElementById('userInput');
        if (input) input.focus();
      }, 450);
    }, 2000); // 2 Seconds Duration
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

    // Remove welcome box on first question
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

    // 3. Comedic Delay (600ms - 900ms)
    const delay = Math.floor(Math.random() * 300) + 600;
    await new Promise(r => setTimeout(r, delay));

    // 4. Generate Response
    const response = generateResponse(query);
    typingIndicator.style.display = 'none';

    // 5. Render Bot Message
    renderBotMessage(response);

    // 6. Play random comedic sound effect
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
          <span class="msg-tag">${escapeHtml(data.badge || 'Witty Sarcasm')}</span>
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
