// UI sounds, synthesized with Web Audio: soft sine tones only (no noise or
// clicks) and no audio files. Each is shaped to match the motion it accompanies.
// Off until a visitor turns it on with the speaker button (in the nav, or in the
// footer on phones); that choice is remembered. Quiet when it is on.
//
// Nothing plays until the visitor's first click or keypress (browsers require
// a gesture before audio can start, and it means nothing plays on page load).

const KEY = 'sound'
const VOLUME = 0.22 // master level: quiet

let ctx = null
let master = null
let enabled = false
const listeners = new Set()

try {
  enabled = localStorage.getItem(KEY) === 'on'
} catch {
  // Storage blocked (private mode etc.): stay off.
}

// On iPhone, "ambient" respects the silent switch and won't pause the
// visitor's music.
try {
  if (navigator.audioSession) navigator.audioSession.type = 'ambient'
} catch {}

function setup() {
  if (ctx) return ctx
  const AC = window.AudioContext || window.webkitAudioContext
  if (!AC) return null
  ctx = new AC()
  // Everything passes through a gentle low-pass (nothing bright or hissy)
  // and a soft compressor (overlapping sounds never stack up harshly).
  const lowpass = ctx.createBiquadFilter()
  lowpass.type = 'lowpass'
  lowpass.frequency.value = 2400
  lowpass.Q.value = 0.5
  const comp = ctx.createDynamicsCompressor()
  comp.threshold.value = -18
  comp.ratio.value = 4
  master = ctx.createGain()
  master.gain.value = VOLUME
  master.connect(lowpass).connect(comp).connect(ctx.destination)
  return ctx
}

// Unlock on the first real gesture.
if (typeof window !== 'undefined') {
  const unlock = () => {
    if (setup()?.state === 'suspended') ctx.resume()
  }
  window.addEventListener('pointerdown', unlock, { capture: true, passive: true })
  window.addEventListener('keydown', unlock, { capture: true })
}

function ready() {
  if (!enabled || !ctx || ctx.state !== 'running') return false
  return true
}

// A soft sine tone: a gentle (not clicky) attack, an exponential decay, and
// an optional pitch glide. Every sound is built from these, so the set stays
// round and mellow.
function tone({ freq, to, gain = 0.15, attack = 0.008, decay = 0.12, delay = 0 }) {
  const t = ctx.currentTime + delay
  const osc = ctx.createOscillator()
  const g = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(freq, t)
  if (to) osc.frequency.exponentialRampToValueAtTime(to, t + attack + decay * 0.7)
  g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(gain, t + attack)
  g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay)
  osc.connect(g).connect(master)
  osc.start(t)
  osc.stop(t + attack + decay + 0.02)
}

// Notes from a major pentatonic scale, so any two sounds that overlap still
// sound pleasant together. Repeated sounds pick a nearby note each time
// instead of repeating the exact same pitch.
const pick = (notes) => notes[Math.floor(Math.random() * notes.length)]

const sounds = {
  // Buttons and links: a very soft, low "pup" with a slow fade-in, so it has
  // no sharp edge at all.
  tick() {
    tone({ freq: pick([294, 330, 349]), gain: 0.09, attack: 0.018, decay: 0.12 })
  },
  // Sliding highlights (nav, filters, tabs): two soft rising notes as the pill moves.
  slide() {
    tone({ freq: 440, gain: 0.08, attack: 0.012, decay: 0.12 })
    tone({ freq: 587, gain: 0.07, attack: 0.012, decay: 0.15, delay: 0.07 })
  },
  // Panels opening and closing (quick look, gallery): two notes up, two down.
  open() {
    tone({ freq: 440, gain: 0.08, attack: 0.012, decay: 0.12 })
    tone({ freq: 659, gain: 0.07, attack: 0.012, decay: 0.16, delay: 0.06 })
  },
  close() {
    tone({ freq: 659, gain: 0.07, attack: 0.012, decay: 0.12 })
    tone({ freq: 440, gain: 0.06, attack: 0.012, decay: 0.15, delay: 0.06 })
  },
  // Something worked (email copied): a small two-note chime.
  done() {
    tone({ freq: 784, gain: 0.09, attack: 0.012, decay: 0.3 })
    tone({ freq: 1175, gain: 0.08, attack: 0.012, decay: 0.38, delay: 0.08 })
  },
  // Terminal: very faint taps that wander across the scale, and two notes on Enter.
  key() {
    tone({ freq: pick([523, 587, 659, 784, 880]), gain: 0.03, attack: 0.008, decay: 0.05 })
  },
  enter() {
    tone({ freq: 587, gain: 0.07, attack: 0.01, decay: 0.09 })
    tone({ freq: 880, gain: 0.06, attack: 0.01, decay: 0.12, delay: 0.05 })
  },
}

/** Play a named sound if sound is on and the audio engine is running. */
export function play(name) {
  if (!ready()) return
  try {
    sounds[name]?.()
  } catch {
    // Never let a sound break the page.
  }
}

export function isSoundOn() {
  return enabled
}

export function setSoundOn(on) {
  enabled = on
  try {
    localStorage.setItem(KEY, on ? 'on' : 'off')
  } catch {}
  listeners.forEach((fn) => fn(on))
  if (on) {
    if (setup()?.state === 'suspended') ctx.resume().then(() => play('tick'))
    else play('tick')
  }
}

export function onSoundChange(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

// One listener for every click on the site, so each button and link gets the
// right sound without wiring them one by one. It runs before the click is
// handled, so it can see whether a panel is about to open or close.
//   [data-sound="name"]  plays that sound instead (or "off" for none)
//   [aria-expanded]      open / close
//   role="tab" / [aria-pressed]   slide
//   any other button or link      tick
if (typeof document !== 'undefined') {
  document.addEventListener(
    'click',
    (e) => {
      const el = e.target.closest?.('a, button, [role="tab"], [data-sound]')
      if (!el) return
      const custom = el.closest('[data-sound]')?.dataset.sound
      if (custom) return custom !== 'off' && play(custom)
      if (el.hasAttribute('aria-expanded')) return play(el.getAttribute('aria-expanded') === 'true' ? 'close' : 'open')
      if (el.getAttribute('role') === 'tab' || el.hasAttribute('aria-pressed')) return play('slide')
      play('tick')
    },
    true,
  )
}
