// Solid, font-independent silhouettes drawn on a shared 48 × 48 canvas.
const shapes = {
  p: <><circle cx="24" cy="12" r="7" /><path d="M19 20h10l-2 8 6 9H15l6-9z" /></>,
  r: <path d="M12 7h7v6h3V7h5v6h3V7h6v14l-5 4 1 12H16l1-12-5-4z" />,
  n: <path d="M14 37c0-9 4-13 12-18l-9 3-6-5 8-9 1-5 7 5c12 3 12 19 9 29H14zm9-24h3v-3h-3z" fillRule="evenodd" />,
  b: <><path d="M25 4c-6 6-12 10-10 16 1 4 5 6 9 6s8-2 9-6c1-4-2-8-5-11l-6 10-3-2 7-11zM20 27h8l5 10H15z" /><circle cx="25" cy="4" r="2" /></>,
  q: <><path d="m10 14 8 7 6-12 6 12 8-7-6 22H16z" /><circle cx="10" cy="11" r="3" /><circle cx="24" cy="6" r="3" /><circle cx="38" cy="11" r="3" /></>,
  k: <><path d="M22 3h4v5h5v4h-5v5h-4v-5h-5V8h5zM24 19c-13-12-21 4-9 12l2 6h14l2-6c12-8 4-24-9-12z" /></>,
}

export default function ChessPiece({ type, color }) {
  return <svg className={`chess-piece piece-${color}`} viewBox="0 0 48 48" aria-hidden="true" focusable="false"><g fill="currentColor" strokeLinejoin="round">{shapes[type]}<path d="M14 37h20l3 6H11z" /></g></svg>
}
