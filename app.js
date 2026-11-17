/**
 * ========================================================
 * HAMZA GPT - DUAL ENGINE: MEANINGFUL ANSWER + FUNNY ROAST
 * ========================================================
 */

// Application State
const state = {
  personality: 'hamza',
  soundEnabled: true,
  speechEnabled: true,
};

// Fun Typing Status Messages
const TYPING_PHRASES = [
  "Finding the real answer & preparing a roast...",
  "Consulting the facts and loading sarcasm...",
  "Reading your question with mild concern...",
  "Formulating the truth + a punchline...",
  "Cooking up a helpful answer with extra attitude...",
];

// Offline Fallback Knowledge Base (Real Meaningful Answers + Funny Roasts)
const OFFLINE_KNOWLEDGE_BASE = [
  {
    keywords: ["sky blue", "why is the sky blue"],
    answer: "The sky is blue because of a phenomenon called Rayleigh scattering. Sunlight contains all colors of the rainbow, but gases in Earth's atmosphere scatter short blue wavelengths much more than other colors, making the sky look blue.",
    roast: "You have a supercomputer in your pocket and you're using it to ask kindergarten science questions.",
    badge: "Science 🔬"
  },
  {
    keywords: ["tired", "sleep", "insomnia", "exhausted", "awake"],
    answer: "You are tired because blue light from screens suppresses melatonin (your sleep hormone), your sleep schedule is inconsistent, or you are physically dehydrated. Adults need 7-9 hours of continuous sleep to restore cognitive function.",
    roast: "Stop doomscrolling at 3 AM watching strangers eat spicy noodles. Your eyes look like glazed donuts.",
    badge: "Health 🥱"
  },
  {
    keywords: ["rich", "billionaire", "money", "wealth", "invest", "lottery"],
    answer: "Building wealth requires spending less than you earn, consistently investing in broad market index funds or high-value skills, and avoiding high-interest debt over decades.",
    roast: "You have $4 in your bank account and you just spent $8 on food delivery. The only thing you're building is poverty.",
    badge: "Finance 💸"
  },
  {
    keywords: ["ex", "love", "dating", "crush", "girlfriend", "boyfriend", "text my ex"],
    answer: "Relationship experts advise against texting an ex right after a breakup because nostalgia causes cognitive bias, making you forget why the relationship ended in the first place.",
    roast: "They haven't texted you in 3 weeks. Have some self-respect, put the phone down, and go eat a taco.",
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
    keywords: ["water wet", "is water wet"],
    answer: "In chemistry, liquid water makes other solid materials wet by adhering to their surfaces. Water molecules are cohesive with each other, so scientists debate whether water itself is wet or merely the wetting agent.",
    roast: "Congratulations on asking the most debated argument of middle school lunch tables.",
    badge: "Physics 💧"
  },
  {
    keywords: ["who are you", "what are you", "hamza"],
    answer: "I am hamza GPT, an interactive AI website built to answer your questions with proper, meaningful facts while giving you a hilarious reality check at the same time.",
    roast: "Other AIs pretend to love your questions. I tell you the truth your friends are too polite to say.",
    badge: "About Me 🤖"
  }
];

// Fallback when offline for unmatched questions
const SMART_OFFLINE_FALLBACKS = [
  {
    answer: (q) => `To answer "${q}": The primary cause or solution usually depends on understanding the basic principles involved, evaluating the evidence, and taking a practical, logical step-by-step approach.`,
    roast: "I just gave you the polite textbook answer, but deep down you already know what common sense says.",
    badge: "Answered 💡"
  },
  {
    answer: (q) => `Regarding "${q}": Most research and practical experience show that consistency, proper research, and avoiding hasty decisions produce the best results.`,
    roast: "Use your brain for 5 seconds before jumping into bad decisions.",
    badge: "Advice 🧠"
  }
];

// ========================================================
// LIVE AI API: MEANINGFUL ANSWER + FUNNY ROAST
// ========================================================
async function fetchSmartAnswerAndRoast(question) {
  const systemPrompt = `You are hamza GPT, an intelligent and funny AI.
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
  const timeoutId = setTimeout(() => controller.abort(), 6500); // 6.5s timeout

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
    // Parse JSON safely
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
    console.warn("Falling back to local knowledge base:", err);
    return getOfflineResponse(question);
  }
}

// Local knowledge fallback
function getOfflineResponse(question) {
  const qLower = question.toLowerCase().trim();

  // Search keyword database
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

  // Fallback
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

// ========================================================
// SPEECH SYNTHESIS ENGINE (Voice Out Loud)
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

  // Enter sends message
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

    // 3. Fetch Meaningful Answer + Funny Roast
    const data = await fetchSmartAnswerAndRoast(query);

    // Hide typing
    typingIndicator.style.display = 'none';

    // 4. Render Bot Message with BOTH Meaningful Answer + Funny Roast
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
          <span class="msg-sender">hamza GPT</span>
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
