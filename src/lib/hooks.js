import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { site } from '../config.js'

// Position an indicator over the child of `ref` that matches `selector`
// (e.g. the current nav link). Re-measures when `dep` changes, when the
// container resizes and once web fonts load. `animate` turns on after the
// first paint so the indicator doesn't slide in from the corner.
export function useSlidingPill(ref, selector, dep, axis = 'x') {
  const [box, setBox] = useState(null)
  const [animate, setAnimate] = useState(false)

  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return
    const measure = () => {
      const el = root.querySelector(selector)
      setBox(el ? { x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight } : null)
    }
    measure()
    document.fonts?.ready.then(measure)
    const ro = new ResizeObserver(measure)
    ro.observe(root)
    const id = requestAnimationFrame(() => setAnimate(true))
    return () => {
      cancelAnimationFrame(id)
      ro.disconnect()
    }
  }, [ref, selector, dep])

  const style =
    axis === 'x'
      ? { width: box?.w ?? 0, transform: `translateX(${box?.x ?? 0}px)`, opacity: box ? 1 : 0 }
      : { height: box?.h ?? 0, transform: `translateY(${box?.y ?? 0}px)`, opacity: box ? 1 : 0 }
  return { style, animate }
}

export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} · ${site.name}` : `${site.name} · Computer Engineering`
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    }
  }, [title, description])
}

// Copy text to the clipboard. `copied` stays true for a moment afterwards.
// Falls back to opening the mail client if the clipboard is unavailable.
export function useCopyEmail() {
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)
  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${site.email}`
    }
  }, [])

  return { copied, copy }
}

// Tilt an element toward the pointer and track a highlight under it.
// Writes --rx, --ry (degrees) and --gx, --gy (percent) on the element.
export function useTilt(max = 5) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return
    let frame = 0
    const onMove = (e) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width
        const y = (e.clientY - r.top) / r.height
        el.style.setProperty('--rx', `${((0.5 - y) * max).toFixed(2)}deg`)
        el.style.setProperty('--ry', `${((x - 0.5) * max).toFixed(2)}deg`)
        el.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`)
        el.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`)
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(frame)
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [max])
  return ref
}
