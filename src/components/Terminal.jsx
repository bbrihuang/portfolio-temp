import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { site } from '../config.js'
import { projects } from '../data/projects.js'
import { stack } from '../data/skills.js'
import { Code, Cpu, Glyph, Prompt } from './Icons.jsx'

// The homepage terminal. Everything important is printed up front; the prompt
// at the bottom is a small extra for visitors who want to poke at it
// (help, projects, stack, experience, setup, contact, clear).

const intro = [
  { icon: Prompt, color: 'text-emerald-400', cmd: 'whoami', out: [{ text: 'Brian Huang', strong: true, typed: true }] },
  { icon: Code, color: 'text-sky-400', cmd: 'cat current-role.txt', out: [{ text: 'GradientV · Lead Software Engineer' }] },
  {
    icon: Cpu,
    color: 'text-violet-400',
    cmd: 'cat focus.txt',
    out: [{ text: 'Full-stack development' }, { text: 'Applied AI & local LLMs' }, { text: 'Hardware & systems' }],
  },
  {
    icon: (p) => <Glyph name="layers" {...p} />,
    color: 'text-amber-400',
    cmd: 'ls ~/interests',
    out: [{ text: 'pc-homelab/  robotics/  local-llms/  building-things/', folders: true }],
  },
]

const link = 'text-sky-300 underline decoration-sky-300/40 underline-offset-2 hover:text-sky-200'

// What each command prints. Returns an array of lines (strings or JSX).
function run(input) {
  const cmd = input.trim().toLowerCase().replace(/\s+/g, ' ')
  switch (cmd) {
    case '':
      return []
    case 'help':
      return ['commands: projects · stack · experience · setup · contact · whoami · clear']
    case 'whoami':
      return ['Brian Huang · Computer Engineering @ Boston University']
    case 'projects':
    case 'ls projects':
      return projects.map((p) => (
        <Link key={p.slug} to={`/projects/${p.slug}`} className={link}>
          {p.title}
        </Link>
      ))
    case 'stack':
      return stack.map((g) => `${g.group}: ${g.items.map((i) => i.name).join(', ')}`)
    case 'experience':
      return [
        <Link key="e" to="/experience" className={link}>
          → open Experience
        </Link>,
      ]
    case 'setup':
      return [
        <Link key="s" to="/setup" className={link}>
          → open Setup (my PC & homelab)
        </Link>,
      ]
    case 'contact':
    case 'email':
      return [
        <a key="m" href={`mailto:${site.email}`} className={link}>
          {site.email}
        </a>,
      ]
    case 'sudo hire brian':
      return ['permission granted. ' + site.email]
    default:
      return [`command not found: ${input.trim()}. try "help"`]
  }
}

function Block({ icon: Icon, color, cmd, children }) {
  return (
    <div>
      <p className={`flex items-center gap-2.5 ${color}`}>
        <Icon size={16} />
        <span>$ {cmd}</span>
      </p>
      <div className="mt-1 space-y-0.5 pl-[26px]">{children}</div>
    </div>
  )
}

export default function Terminal({ startIndex = 0 }) {
  const [history, setHistory] = useState([])
  const [value, setValue] = useState('')
  const [recall, setRecall] = useState(-1)
  const input = useRef(null)
  const body = useRef(null)

  // Keep the newest output in view inside the terminal (never scrolls the page).
  useEffect(() => {
    if (history.length && body.current) body.current.scrollTop = body.current.scrollHeight
  }, [history])

  const submit = (e) => {
    e.preventDefault()
    const typed = value
    setValue('')
    setRecall(-1)
    if (typed.trim().toLowerCase() === 'clear') return setHistory([])
    setHistory((h) => [...h, { cmd: typed, out: run(typed) }])
  }

  // Up/Down walk back through what was typed, like a real shell.
  const onKeyDown = (e) => {
    const past = history.map((h) => h.cmd).filter((c) => c.trim())
    if (!past.length || (e.key !== 'ArrowUp' && e.key !== 'ArrowDown')) return
    e.preventDefault()
    const next = e.key === 'ArrowUp' ? Math.min(recall + 1, past.length - 1) : Math.max(recall - 1, -1)
    setRecall(next)
    setValue(next === -1 ? '' : past[past.length - 1 - next])
  }

  return (
    <div className="glass rise overflow-hidden rounded-3xl" style={{ '--i': startIndex }}>
      <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-3.5">
        <div className="flex gap-2" aria-hidden>
          <span className="size-3 rounded-full bg-[#ff5f57]/85" />
          <span className="size-3 rounded-full bg-[#febc2e]/85" />
          <span className="size-3 rounded-full bg-[#28c840]/85" />
        </div>
        <span className="font-mono text-xs text-steel">brian@portfolio ~</span>
      </div>

      <div
        ref={body}
        className="max-h-[30rem] space-y-4 overflow-y-auto px-5 py-5 font-mono text-[13px] leading-relaxed [scrollbar-width:thin]"
        onClick={(e) => {
          // Clicking empty space focuses the prompt (on devices with a mouse).
          if (e.target === e.currentTarget && matchMedia('(hover: hover)').matches) input.current?.focus()
        }}
      >
        {intro.map((b, i) => (
          <div key={b.cmd} className="rise" style={{ '--i': startIndex + 1 + i }}>
            <Block {...b}>
              {b.out.map((o) =>
                o.typed ? (
                  <p key={o.text} className="font-semibold text-snow">
                    <span aria-label={o.text}>
                      <span aria-hidden className="typed" style={{ '--chars': o.text.length, width: `${o.text.length}ch` }}>
                        {o.text}
                      </span>
                    </span>
                  </p>
                ) : (
                  <p key={o.text} className={o.folders ? 'text-sky-300' : o.strong ? 'font-semibold text-snow' : 'text-mist'}>
                    {o.text}
                  </p>
                ),
              )}
            </Block>
          </div>
        ))}

        <div aria-live="polite" className="space-y-4 empty:hidden">
          {history.map((h, i) => (
            <div key={i}>
              <p className="flex items-center gap-2.5 text-emerald-400">
                <Prompt size={16} />
                <span>$ {h.cmd}</span>
              </p>
              <div className="mt-1 space-y-0.5 pl-[26px] text-mist">
                {h.out.map((line, k) => (
                  <p key={k}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={submit} className="flex items-center gap-2.5 text-emerald-400">
          <Prompt size={16} />
          <span aria-hidden>$</span>
          <input
            ref={input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Terminal: type a command, or help"
            placeholder="type help"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="send"
            className="min-w-0 flex-1 bg-transparent text-[16px] text-snow caret-emerald-400 outline-none placeholder:text-steel sm:text-[13px]"
          />
        </form>
      </div>
    </div>
  )
}
