/**
 * ========================================================
 * HAMZAGPT - CHAOS SUITE & PRO-TIER COMEDY ENGINE
 * ========================================================
 */

// Application State
const state = {
  mode: 'roast', // 'roast', 'hype', 'soap', 'gaslight'
  soundEnabled: true,
  speechEnabled: true,
  repeatQuestionCount: {},
  isRageQuitting: false,
};

// Mode Configs
const CHAOS_MODES = {
  roast: {
    avatar: '🔥',
    name: 'HamzaGPT (Brutal Roast)',
    label: '🔥 Hamza\'s Roast',
    typing: 'Judging your prompt with maximum disrespect...',
    styleClass: 'roast-style'
  },
  hype: {
    avatar: '🚀',
    name: 'HamzaGPT (Unhinged Hype-Man)',
    label: '🚀 Delusional Hype Verdict',
    typing: 'Drafting your Nobel Prize nomination...',
    styleClass: 'hype-style'
  },
  soap: {
    avatar: '🎭',
    name: 'HamzaGPT (Dramatic Soap Opera)',
    label: '🎭 Tragic Betrayal Monologue',
    typing: 'Weeping over the betrayal in your question...',
    styleClass: 'soap-style'
  },
  gaslight: {
    avatar: '🌀',
    name: 'HamzaGPT (Gaslight Mode)',
    label: '🌀 The Real Classified Truth',
    typing: 'Rewriting reality and consulting secret agencies...',
    styleClass: 'gaslight-style'
  }
};

// Hyper-Specific Excuses
const EXCUSES_DB = {
  deadline: [
    "My cloud sync created a recursive temporal paradox and I spent 6 hours recovering my sanity.",
    "My internet provider had an unscheduled 'existential crisis' outage in my neighborhood.",
    "My keyboard ran out of semicolons and the local hardware store only had commas in stock.",
    "A mandatory OS update held my files hostage and demanded 4 restarts to think about what it did.",
    "I was on the final paragraph when my cat walked across the keyboard and submitted a complaint to HR."
  ],
  gaming: [
    "My ping randomly spiked to 8,400ms because my neighbor turned on their smart microwave.",
    "The enemy hitboxes in this match were clearly designed by a surrealist modern artist.",
    "My mouse sensor picked up a microscopic dust speck and spun my crosshair 720 degrees into the wall.",
    "I wasn't throwing, I was testing your clutch potential as a teammate. You failed the test.",
    "My FPS dropped below human perception right as I peeked the corner."
  ],
  text: [
    "I typed out a 3-paragraph reply in my head and genuinely believed I pressed send 4 days ago.",
    "My phone slipped between the sofa cushions and entered a parallel dimension until this morning.",
    "I saw your text while half-asleep, replied with a telepathic thought, and woke up shocked you didn't receive it.",
    "I had to restart my phone and my notifications decided to take an unannounced mental health week.",
    "I was actively writing a reply but a TikTok about miniature donkey grooming distracted me for 9 hours."
  ],
  social: [
    "My social battery experienced a catastrophic voltage drop and emergency shutdown protocols were triggered.",
    "My horoscope specifically warned that leaving my blanket fortress today would disrupt Earth's magnetic core.",
    "I took a 20-minute power nap at 6 PM and woke up in the year 2042 with zero desire to go outside.",
    "My dog gave me a look of deep emotional betrayal when I reached for my shoes, so I am legally bound to stay.",
    "I accidentally put on comfortable sweatpants and the laws of physics forbid me from removing them."
  ]
};

// Questionable Prompts & Judgment Criteria
const QUESTIONABLE_KEYWORDS = [
  { kw: "text my ex", score: 1, verdict: "SEEK IMMEDIATE PROFESSIONAL HELP 🚨", danger: true },
  { kw: "write my whole", score: 2, verdict: "Critical Laziness Overload 🛑", danger: true },
  { kw: "do my homework", score: 2, verdict: "Academic Negligence Hazard 📉", danger: true },
  { kw: "cheat", score: 1, verdict: "Morally Bankrupt Decision 🤡", danger: true },
  { kw: "crypto meme", score: 3, verdict: "Financial Darwin Award Nominee 💸", danger: true },
  { kw: "gamble", score: 2, verdict: "Donating to Casino Millionaires 🎰", danger: true },
  { kw: "skip work", score: 4, verdict: "High Risk of Instant Poverty 💼", danger: false },
  { kw: "should i text", score: 3, verdict: "Down-Bad Behavior Detected 📱", danger: true },
  { kw: "how to get rich", score: 4, verdict: "Unrealistic Delusion Level: 99 💰", danger: false }
];

// Offline Mode Knowledge Base (Meaningful Facts)
const OFFLINE_FACTS = {
  sky: "Sunlight scatters through Earth's atmosphere via Rayleigh scattering. Short blue wavelengths scatter much more than longer red wavelengths, filling the daytime sky with visible blue light.",
  tired: "Blue light from late-night screens suppresses melatonin production. Inconsistent sleep timing and dehydration cause cognitive fatigue and heavy eye strain.",
  rich: "Wealth building relies on compounding interest, living below your income, eliminating high-interest debt, and investing consistently in low-cost index funds.",
  code: "Bugs occur because computers execute code with zero assumptions. Type mismatches, unhandled null values, and incorrect boolean logic cause unexpected execution branches.",
  math: "Mathematics is built upon axiomatic systems where 2+2=4 under standard Peano arithmetic. Rigorous proofs guarantee consistency across algebra and calculus.",
  alien: "The Fermi Paradox highlights the conflict between high statistical probabilities of extraterrestrial life and the lack of empirical contact across cosmic distances.",
  life: "Biological life aims to replicate and reduce internal entropy. Psychologists find personal meaning through social belonging, mastery, and shared experiences."
};

// ========================================================
// SOUND SYNTHESIZER (Fanfare, Trombone, Boing)
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

  playFanfare() {
    if (!state.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    const notes = [
      { f: 523.25, d: 0.12 }, // C5
      { f: 659.25, d: 0.12 }, // E5
      { f: 783.99, d: 0.12 }, // G5
      { f: 1046.50, d: 0.45 } // C6
    ];
    let start = this.ctx.currentTime;
    notes.forEach(n => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, start);
      gain.gain.setValueAtTime(0.2, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + n.d);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(start);
      osc.stop(start + n.d);
      start += n.d + 0.04;
    });
  }

  playSadTrombone() {
    if (!state.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    const notes = [
      { f: 293.66, d: 0.28 },
      { f: 277.18, d: 0.28 },
      { f: 261.63, d: 0.28 },
      { f: 246.94, d: 0.65, slide: 200 }
    ];
    let start = this.ctx.currentTime;
    notes.forEach(n => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(n.f, start);
      if (n.slide) osc.frequency.exponentialRampToValueAtTime(n.slide, start + n.d);
      gain.gain.setValueAtTime(0.18, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + n.d);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(start);
      osc.stop(start + n.d);
      start += n.d + 0.04;
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
}

const synth = new AudioSynthesizer();

// Speech Synthesis
class SpeechEngine {
  constructor() {
    this.synth = window.speechSynthesis;
  }
  speak(text) {
    if (!this.synth || !state.speechEnabled) return;
    this.synth.cancel();
    const clean = text.replace(/<[^>]*>?/gm, '').replace(/[\u{1F600}-\u{1F6FF}]/gu, '');
    const utter = new SpeechSynthesisUtterance(clean);
    utter.pitch = state.mode === 'hype' ? 1.2 : state.mode === 'soap' ? 0.9 : 1.0;
    utter.rate = state.mode === 'hype' ? 1.15 : 1.05;
    this.synth.speak(utter);
  }
}

const speechEngine = new SpeechEngine();

// ========================================================
// AI RESPONSE ENGINE WITH CHAOS MODES
// ========================================================
async function generateSmartResponse(query) {
  const mode = state.mode;

  let modeDirective = "";
  if (mode === 'hype') {
    modeDirective = `Treat every tiny request like it's going to win a Nobel Prize and revolutionize human civilization (e.g. "Asking this? Pure genius! Silicon Valley is shaking right now!"). Then explain the factual answer with extreme enthusiasm.`;
  } else if (mode === 'soap') {
    modeDirective = `Narrate the question, bugs, or problems like a tragic, dramatic soap opera betrayal (e.g. "Line 42... how could you throw an error after everything we've sacrificed together?!"). Then provide the real factual explanation with theatrical emotion.`;
  } else if (mode === 'gaslight') {
    modeDirective = `First, confidently insist the user typed something completely absurd or pretend basic everyday facts are top-secret government conspiracies. Then end by revealing the real actual answer with a wink.`;
  } else {
    // Default: Brutal Roast
    modeDirective = `Brutally and hilariously judge the user's prompt, grammar, or questionable life choices in 1-2 punchy sarcastic sentences. Then provide a proper, accurate, meaningful factual explanation for their question.`;
  }

  const systemPrompt = `You are HamzaGPT.
Mode directive: ${modeDirective}
Always respond in this exact JSON structure:
{
  "answer": "Accurate, proper, and meaningful explanation answering their question (2-3 sentences)",
  "roast": "The funny mode-specific comedic commentary matching the mode directive (1-2 sentences)",
  "badge": "Short 1-2 word badge with emoji"
}`;

  try {
    const res = await fetch("https://text.pollinations.ai/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: query }
        ],
        jsonMode: true
      })
    });

    if (!res.ok) throw new Error("API fallback");
    const raw = await res.text();
    const match = raw.match(/\{[\s\S]*\}/);
    if (match) {
      return JSON.parse(match[0]);
    }
    throw new Error("Parse error");
  } catch (e) {
    // Local Fallback based on mode
    return getLocalChaosResponse(query, mode);
  }
}

function getLocalChaosResponse(query, mode) {
  const qLower = query.toLowerCase();
  let baseAnswer = "Understanding basic principles and applying evidence-based logic is the most effective approach.";
  for (const [k, v] of Object.entries(OFFLINE_FACTS)) {
    if (qLower.includes(k)) {
      baseAnswer = v;
      break;
    }
  }

  if (mode === 'hype') {
    return {
      answer: baseAnswer,
      roast: `Bro, asking "${query}"? Absolute cinematic masterpiece. Nobel Committee is already drafting your award, Silicon Valley is in shambles!`,
      badge: "Pure Genius 🚀"
    };
  } else if (mode === 'soap') {
    return {
      answer: baseAnswer,
      roast: `How could you ask about "${query}" after everything we've wept through?! The betrayal cuts deeper than an unhandled null exception!`,
      badge: "Tragic Drama 🎭"
    };
  } else if (mode === 'gaslight') {
    return {
      answer: baseAnswer,
      roast: `You definitely didn't ask "${query}", you actually asked if pigeons are rechargeable surveillance drones. But fine, here's the cover story.`,
      badge: "Classified 🌀"
    };
  } else {
    return {
      answer: baseAnswer,
      roast: `Bro really sat there, typed "${query}", and thought 'yeah this is peak intellectual curiosity'. Google is free, but common sense is rare.`,
      badge: "Brutal Roast 🔥"
    };
  }
}

// Check for questionable prompt & return judgment score
function evaluateJudgment(query) {
  const qLower = query.toLowerCase();
  for (const item of QUESTIONABLE_KEYWORDS) {
    if (qLower.includes(item.kw)) {
      return item;
    }
  }
  return null;
}

// ========================================================
// UI INITIALIZATION & EVENT HANDLERS
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
  // Splash Screen 2-second hold
  const splash = document.getElementById('splashLoader');
  if (splash) {
    setTimeout(() => {
      splash.classList.add('fade-out');
      setTimeout(() => {
        splash.style.display = 'none';
        const inp = document.getElementById('userInput');
        if (inp) inp.focus();
      }, 450);
    }, 2000);
  }

  const chatArea = document.getElementById('chatArea');
  const messagesList = document.getElementById('messagesList');
  const chatForm = document.getElementById('chatForm');
  const userInput = document.getElementById('userInput');
  const typingIndicator = document.getElementById('typingIndicator');
  const typingStatusText = document.getElementById('typingStatusText');
  const botAvatarTyping = document.getElementById('botAvatarTyping');
  const welcomeBox = document.getElementById('welcomeBox');

  // Mode Selector Chips
  document.querySelectorAll('.mode-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.mode-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.mode = chip.dataset.mode;
      const config = CHAOS_MODES[state.mode];
      botAvatarTyping.textContent = config.avatar;
      synth.playPop();
    });
  });

  // Welcome Pills click to ask
  document.querySelectorAll('.welcome-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      userInput.value = pill.dataset.q;
      chatForm.dispatchEvent(new Event('submit'));
    });
  });

  // Auto-expand textarea
  userInput.addEventListener('input', () => {
    userInput.style.height = 'auto';
    userInput.style.height = `${Math.min(userInput.scrollHeight, 120)}px`;
  });

  userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      chatForm.dispatchEvent(new Event('submit'));
    }
  });

  // ========================================================
  // RAGE-QUIT MECHANIC
  // ========================================================
  const rageQuitBtn = document.getElementById('rageQuitBtn');
  const rageQuitOverlay = document.getElementById('rageQuitOverlay');
  const cooldownSeconds = document.getElementById('cooldownSeconds');

  function triggerRageQuit(customMsg) {
    if (state.isRageQuitting) return;
    state.isRageQuitting = true;
    synth.playSadTrombone();

    if (customMsg) {
      document.getElementById('rageQuitMessage').textContent = `"${customMsg}"`;
    }

    rageQuitOverlay.style.display = 'flex';
    let timeLeft = 10;
    cooldownSeconds.textContent = timeLeft;

    const timer = setInterval(() => {
      timeLeft--;
      cooldownSeconds.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        rageQuitOverlay.style.display = 'none';
        state.isRageQuitting = false;
        synth.playPop();
        userInput.focus();
      }
    }, 1000);
  }

  if (rageQuitBtn) {
    rageQuitBtn.addEventListener('click', () => {
      triggerRageQuit("You clicked the Rage-Quit button! HamzaGPT has clocked out. 'I need a coffee break, ask someone else.'");
    });
  }

  // ========================================================
  // EXCUSE GENERATOR MODAL
  // ========================================================
  const excusesBtn = document.getElementById('excusesBtn');
  const excusesModal = document.getElementById('excusesModal');
  const closeExcusesBtn = document.getElementById('closeExcusesBtn');
  const rollExcuseBtn = document.getElementById('rollExcuseBtn');
  const copyExcuseBtn = document.getElementById('copyExcuseBtn');
  const generatedExcuseText = document.getElementById('generatedExcuseText');
  let currentExcuseCat = 'deadline';

  if (excusesBtn && excusesModal) {
    excusesBtn.addEventListener('click', () => {
      excusesModal.style.display = 'flex';
      rollRandomExcuse();
      synth.playPop();
    });
  }

  if (closeExcusesBtn && excusesModal) {
    closeExcusesBtn.addEventListener('click', () => {
      excusesModal.style.display = 'none';
    });
  }

  document.querySelectorAll('.excuse-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.excuse-cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentExcuseCat = btn.dataset.cat;
      rollRandomExcuse();
    });
  });

  function rollRandomExcuse() {
    const list = EXCUSES_DB[currentExcuseCat] || EXCUSES_DB.deadline;
    const item = list[Math.floor(Math.random() * list.length)];
    generatedExcuseText.textContent = `"${item}"`;
  }

  if (rollExcuseBtn) {
    rollExcuseBtn.addEventListener('click', () => {
      rollRandomExcuse();
      synth.playPop();
    });
  }

  if (copyExcuseBtn) {
    copyExcuseBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(generatedExcuseText.textContent).then(() => {
        copyExcuseBtn.textContent = "✅ Copied!";
        setTimeout(() => copyExcuseBtn.textContent = "📋 Copy Excuse", 1500);
      });
    });
  }

  // ========================================================
  // PRO-TIER CUSTOM ROAST PROFILES (67 AED/MO)
  // ========================================================
  const roastProfileBtn = document.getElementById('roastProfileBtn');
  const roastProfileModal = document.getElementById('roastProfileModal');
  const closeRoastProfileBtn = document.getElementById('closeRoastProfileBtn');
  const profileInputLabel = document.getElementById('profileInputLabel');
  const profileInputText = document.getElementById('profileInputText');
  const executeProfileRoastBtn = document.getElementById('executeProfileRoastBtn');
  const profileRoastOutput = document.getElementById('profileRoastOutput');
  const profileRoastContent = document.getElementById('profileRoastContent');
  const copyProfileRoastBtn = document.getElementById('copyProfileRoastBtn');
  let currentProfileType = 'resume';

  if (roastProfileBtn && roastProfileModal) {
    roastProfileBtn.addEventListener('click', () => {
      roastProfileModal.style.display = 'flex';
      synth.playPop();
    });
  }

  if (closeRoastProfileBtn && roastProfileModal) {
    closeRoastProfileBtn.addEventListener('click', () => {
      roastProfileModal.style.display = 'none';
    });
  }

  document.querySelectorAll('.profile-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.profile-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentProfileType = btn.dataset.type;
      if (currentProfileType === 'resume') {
        profileInputLabel.innerHTML = "<strong>Paste your Resume / Work Experience:</strong>";
        profileInputText.placeholder = "e.g. Senior Synergy Architect with 2 years of creating Jira tickets...";
      } else if (currentProfileType === 'spotify') {
        profileInputLabel.innerHTML = "<strong>Paste your Top Artists / Spotify Playlist:</strong>";
        profileInputText.placeholder = "e.g. Drake, Taylor Swift, 3 AM Sad Boi Beats, Lo-Fi study study study...";
      } else if (currentProfileType === 'github') {
        profileInputLabel.innerHTML = "<strong>Paste your GitHub Repo / Profile Bio:</strong>";
        profileInputText.placeholder = "e.g. 14 unfinished side projects, 2 commits in 2026, 'fix bug' commit messages...";
      }
    });
  });

  if (executeProfileRoastBtn) {
    executeProfileRoastBtn.addEventListener('click', async () => {
      const val = profileInputText.value.trim();
      if (!val) {
        alert("Please paste some text so HamzaGPT has material to destroy.");
        return;
      }
      profileRoastOutput.style.display = 'block';
      profileRoastContent.innerHTML = "⏳ <em>Consulting the archives of cringe... Calculating emotional damage...</em>";

      try {
        const prompt = `You are HamzaGPT Pro (67 AED/mo tier). Brutally roast the user's ${currentProfileType.toUpperCase()}: "${val}". Be hilariously specific, teasing, and ruthlessly witty. 3-4 bullet points of pure comedy destruction.`;
        const res = await fetch(`https://text.pollinations.ai/${encodeURIComponent(prompt)}`);
        const text = await res.text();
        profileRoastContent.textContent = text;
        synth.playSadTrombone();
      } catch (err) {
        profileRoastContent.textContent = `Resume Breakdown:\n• Your job titles contain more buzzwords than actual accomplishments.\n• You listed 'team player' because you have no standalone technical skills.\n• Even your LinkedIn recruiter scrolled past in second-hand embarrassment.`;
      }
    });
  }

  if (copyProfileRoastBtn) {
    copyProfileRoastBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(profileRoastContent.textContent).then(() => {
        copyProfileRoastBtn.textContent = "✅ Copied";
        setTimeout(() => copyProfileRoastBtn.textContent = "📋 Copy", 1500);
      });
    });
  }

  // ========================================================
  // PREMIUM VIP MODAL (999 AED)
  // ========================================================
  const premiumBtn = document.getElementById('premiumBtn');
  const premiumModal = document.getElementById('premiumModal');
  const closePremiumBtn = document.getElementById('closePremiumBtn');
  const buyPremiumBtn = document.getElementById('buyPremiumBtn');

  if (premiumBtn && premiumModal) {
    premiumBtn.addEventListener('click', () => {
      premiumModal.style.display = 'flex';
      synth.playPop();
    });
  }
  if (closePremiumBtn && premiumModal) {
    closePremiumBtn.addEventListener('click', () => {
      premiumModal.style.display = 'none';
    });
  }
  if (buyPremiumBtn) {
    buyPremiumBtn.addEventListener('click', () => {
      synth.playSadTrombone();
      const orig = buyPremiumBtn.textContent;
      buyPremiumBtn.textContent = "⚠️ Bank Declined: Even your card knows better!";
      buyPremiumBtn.style.background = "#ef4444";
      setTimeout(() => {
        buyPremiumBtn.textContent = orig;
        buyPremiumBtn.style.background = "#000000";
      }, 3500);
    });
  }

  // Close modals on background click
  window.addEventListener('click', (e) => {
    if (e.target === excusesModal) excusesModal.style.display = 'none';
    if (e.target === roastProfileModal) roastProfileModal.style.display = 'none';
    if (e.target === premiumModal) premiumModal.style.display = 'none';
  });

  // ========================================================
  // CHAT SUBMIT & RESPONSE FLOW
  // ========================================================
  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (state.isRageQuitting) return;

    const query = userInput.value.trim();
    if (!query) return;

    // Check repeat questions (Trigger Rage-Quit if asked 3 times)
    const normQ = query.toLowerCase();
    state.repeatQuestionCount[normQ] = (state.repeatQuestionCount[normQ] || 0) + 1;
    if (state.repeatQuestionCount[normQ] >= 3) {
      triggerRageQuit(`You asked "${query}" three times in a row! I am clocking out. Go talk to a wall.`);
      state.repeatQuestionCount[normQ] = 0;
      return;
    }

    userInput.value = '';
    userInput.style.height = 'auto';

    if (welcomeBox) welcomeBox.style.display = 'none';

    // 1. Render User Message
    renderUserMessage(query);
    synth.playPop();

    // 2. Evaluate Judgment Meter
    const judgment = evaluateJudgment(query);

    // 3. Show Typing Indicator
    const modeConfig = CHAOS_MODES[state.mode];
    typingStatusText.textContent = modeConfig.typing;
    typingIndicator.style.display = 'flex';
    chatArea.scrollTop = chatArea.scrollHeight;

    // 4. Generate AI Response with Chaos Mode
    const data = await generateSmartResponse(query);
    typingIndicator.style.display = 'none';

    // 5. Sound & Meme Reaction
    if (state.mode === 'hype') {
      synth.playFanfare();
    } else if (judgment) {
      synth.playSadTrombone();
    } else {
      if (Math.random() < 0.5) synth.playPop();
    }

    // 6. Render Bot Message (including judgment meter if triggered)
    renderBotMessage(data, judgment);

    // 7. Text to Speech
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

  function renderBotMessage(data, judgment) {
    const modeConfig = CHAOS_MODES[state.mode];
    const wrapper = document.createElement('div');
    wrapper.className = 'message-wrapper bot-wrapper';

    let meterHtml = '';
    if (judgment) {
      const pct = judgment.score * 10;
      meterHtml = `
        <div class="judgment-meter-card">
          <div class="meter-header">
            <span>🚨 "Are You Sure?" Judgment Meter</span>
            <span class="meter-score-badge ${judgment.danger ? 'danger' : ''}">${judgment.score}/10</span>
          </div>
          <div class="meter-track">
            <div class="meter-fill" style="width: ${pct}%;"></div>
          </div>
          <div class="meter-verdict">Rating: ${escapeHtml(judgment.verdict)}</div>
        </div>
      `;
    }

    const fullCopy = `Answer: ${data.answer}\n${modeConfig.label}: ${data.roast}`;

    wrapper.innerHTML = `
      <div class="msg-avatar">${modeConfig.avatar}</div>
      <div class="msg-bubble bot-bubble">
        <div class="msg-header">
          <span class="msg-sender">HamzaGPT</span>
          <span class="msg-time">${getCurrentTime()}</span>
          <span class="msg-tag">${escapeHtml(data.badge || modeConfig.name)}</span>
        </div>
        
        ${meterHtml}

        <div class="answer-section">
          <div class="section-label">💡 The Answer</div>
          <p class="answer-text">${escapeHtml(data.answer)}</p>
        </div>

        <div class="roast-section ${modeConfig.styleClass}">
          <div class="roast-label">${modeConfig.label}</div>
          <p class="roast-text">${escapeHtml(data.roast)}</p>
        </div>

        <div class="msg-actions">
          <button class="action-pill-btn copy-btn" data-text="${escapeHtml(fullCopy)}">
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
