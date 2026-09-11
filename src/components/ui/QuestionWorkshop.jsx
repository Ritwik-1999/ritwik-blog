import { useEffect, useRef, useState } from 'react'

const question = 'M143 147 V128 C143 72 293 62 298 133 C302 177 253 188 235 210 Q222 225 222 253'
const circuit = 'M38 314 H100 L137 277 V223 L103 189 V100 L132 71 H312 L345 104 V252 L315 282 H276 L250 308 V337'

export default function QuestionWorkshop() {
  const scene = useRef(null)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    const element = scene.current
    let visible = true
    const sync = () => { element.dataset.resting = String(!visible || document.hidden) }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync() })
    observer.observe(element)
    document.addEventListener('visibilitychange', sync)
    sync()
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', sync) }
  }, [])

  return <div className="question-workshop" ref={scene} data-paused={paused}>
    <div className="workshop-halo" aria-hidden="true" />
    <svg className="workshop-drawing" viewBox="0 0 440 400" fill="none" aria-hidden="true" focusable="false">
      <defs><pattern id="workshop-grid" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".8" fill="currentColor" /></pattern></defs>
      <rect x="12" y="16" width="416" height="367" fill="url(#workshop-grid)" className="workshop-grid" />
      <g className="workshop-traces"><path d={circuit} /><path d="M38 338 H83 L113 365 H325 L378 312 V150 H404 M60 83 V242 L86 268 V291 M367 54 V92 L387 112 H409" /><circle cx="38" cy="314" r="5" /><circle cx="404" cy="150" r="5" /><circle cx="60" cy="83" r="4" /><circle cx="367" cy="54" r="4" /></g>
      <path className="workshop-signal" d={circuit} pathLength="100" />
      <g className="tube-mounts"><path d="M130 146 H156 M205 81 V103 M281 167 L297 179 M210 242 H234" /></g>
      <path className="question-shadow" d={question} />
      <path className="question-tube" d={question} />
      <path className="question-core" d={question} />
      <circle className="question-tube" cx="222" cy="290" r="11" />
      <circle className="question-core" cx="222" cy="290" r="11" />
      <g className="workshop-idea"><path d="M238 321 C238 305 262 305 262 321 C262 328 256 329 256 336 H244 C244 329 238 328 238 321Z M245 342 H255 M248 347 H252" /><path className="idea-rays" d="M250 298 V290 M272 307 L278 302 M228 307 L222 302 M279 323 H286 M214 323 H221" /></g>
      <g className="workshop-caption"><text x="36" y="40">OBSERVE / QUESTION / REPEAT</text><text x="36" y="389">A THOUGHT IN PROGRESS</text></g>
    </svg>
    <button type="button" className="workshop-pause js-only" aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? 'Play animation' : 'Pause animation'}</button>
  </div>
}
