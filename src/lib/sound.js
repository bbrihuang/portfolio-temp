// UI sounds, synthesized with Web Audio: soft sine tones only (no noise or
// clicks) and no audio files. Each is shaped to match the motion it accompanies.
// On by default and quiet; the speaker button in the nav turns it off, and that
// choice is remembered.
//
// Nothing plays until the visitor's first click or keypress (browsers require
// a gesture before audio can start, and it means nothing plays on page load).

const KEY = 'sound'
const VOLUME = 0.22 // master level: quiet

let ctx = null
let master = null
let enabled = true
const listeners = new Set()

try {
  enabled = localStorage.getItem(KEY) !== 'off'
} catch {
  // Storage blocked (private mode etc.): fall back to on.
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

const sounds = {
  // Buttons and links: a soft, low "tok", like a muted wooden tap.
  tick() {
    tone({ freq: 560, to: 430, gain: 0.24, attack: 0.006, decay: 0.09 })
    tone({ freq: 1120, to: 860, gain: 0.04, attack: 0.006, decay: 0.05 })
  },
  // Sliding highlights (nav, filters, tabs): two soft rising notes as the pill moves.
  slide() {
    tone({ freq: 494, gain: 0.13, decay: 0.1 })
    tone({ freq: 659, gain: 0.11, decay: 0.13, delay: 0.07 })
  },
  // Page change: a soft two-note bloom that swells as the new page slides in
  // and settles with it (the slide is a 0.9s ease-out, so most of it is early).
  page() {
    tone({ freq: 513, to: 523, gain: 0.07, attack: 0.06, decay: 0.5 })
    tone({ freq: 768, to: 784, gain: 0.04, attack: 0.08, decay: 0.45, delay: 0.04 })
  },
  // Panels opening and closing (quick look, gallery).
  open() {
    tone({ freq: 440, to: 660, gain: 0.14, decay: 0.14 })
  },
  close() {
    tone({ freq: 660, to: 440, gain: 0.12, decay: 0.12 })
  },
  // Something worked (email copied): a small two-note chime.
  done() {
    tone({ freq: 784, gain: 0.12, decay: 0.3 })
    tone({ freq: 1175, gain: 0.1, decay: 0.38, delay: 0.08 })
  },
  // Terminal: very faint keystroke taps and a soft blip on Enter.
  key() {
    tone({ freq: 680 + Math.random() * 120, gain: 0.05, attack: 0.003, decay: 0.03 })
  },
  enter() {
    tone({ freq: 587, gain: 0.09, decay: 0.08 })
    tone({ freq: 880, gain: 0.08, decay: 0.1, delay: 0.05 })
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
