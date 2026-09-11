export default function DecisionBoundary() {
  return <figure className="decision-figure">
    <svg viewBox="0 0 440 410" role="img" aria-labelledby="decision-title decision-description">
      <title id="decision-title">Where should an agent’s authority end?</title>
      <desc id="decision-description">An AI agent proposes an action. In this example policy, it can inspect a system or prepare a change. Applying the change requires human approval, shown beyond a crimson boundary.</desc>
      <defs>
        <marker id="decision-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M1 1 L6 3.5 L1 6" fill="none" stroke="currentColor" /></marker>
      </defs>
      <g className="decision-guide" fill="none"><path d="M32 75H410 M32 150H410 M32 225H410 M32 300H410 M80 30V385 M220 30V385 M360 30V385" /></g>
      <text x="32" y="24" className="decision-kicker">A QUESTION OF AUTHORITY</text>
      <g className="decision-path" fill="none" markerEnd="url(#decision-arrow)"><path d="M220 105V153" /><path d="M220 153H82V191" /><path d="M220 153V191" /><path d="M220 153H358V296" /></g>
      <g className="decision-node"><rect x="141" y="57" width="158" height="48" rx="2" /><rect x="32" y="193" width="100" height="46" rx="2" /><rect x="165" y="193" width="110" height="46" rx="2" /><rect x="302" y="300" width="112" height="54" rx="2" /></g>
      <g className="decision-label" textAnchor="middle"><text x="220" y="86">Propose an action</text><text x="82" y="221">Inspect</text><text x="220" y="221">Prepare</text><text x="358" y="322">Apply a</text><text x="358" y="342">change</text></g>
      <circle className="decision-junction" cx="220" cy="153" r="4" />
      <path className="decision-boundary" d="M32 271H414" />
      <circle className="decision-gate" cx="358" cy="271" r="7" />
      <text className="decision-note" x="32" y="261">Human approval</text>
      <text className="decision-footnote" x="32" y="380">Capability ≠ permission</text>
    </svg>
    <figcaption>One possible boundary for a production change.</figcaption>
  </figure>
}
