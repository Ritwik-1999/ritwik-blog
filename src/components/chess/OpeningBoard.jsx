import { useState } from 'react'
import { Chess } from 'chess.js'
import { openingFor } from '../../lib/chessOpenings'

const symbols = { k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟' }
const names = { k: 'king', q: 'queen', r: 'rook', b: 'bishop', n: 'knight', p: 'pawn' }

export default function OpeningBoard() {
  const [history, setHistory] = useState([])
  const [selected, setSelected] = useState(null)
  const [promotion, setPromotion] = useState(null)
  const [message, setMessage] = useState('')
  const game = new Chess()
  history.forEach(move => game.move(move))
  const legal = selected ? game.moves({ square: selected, verbose: true }) : []
  const opening = openingFor(history)
  const turn = game.turn() === 'w' ? 'White' : 'Black'
  const status = game.isCheckmate() ? `Checkmate. ${turn} is checkmated.` : game.isDraw() ? 'Draw. Undo or reset to explore another line.' : `${turn} to move${game.isCheck() ? ' — check' : ''}.`

  function play(from, to, promote) {
    const move = game.move({ from, to, ...(promote ? { promotion: promote } : {}) })
    setHistory([...history, move.san]); setSelected(null); setPromotion(null); setMessage('')
  }
  function choose(square) {
    if (game.isGameOver() || promotion) return
    if (square === selected) { setSelected(null); return }
    const candidates = legal.filter(move => move.to === square)
    if (candidates.length) {
      if (candidates.some(move => move.promotion)) setPromotion({ from: selected, to: square })
      else play(selected, square)
      return
    }
    const piece = game.get(square)
    if (piece?.color === game.turn()) { setSelected(square); setMessage('') }
    else setMessage('Select a piece of the side to move, then a highlighted destination.')
  }
  function restore(moves) { setHistory(moves); setSelected(null); setPromotion(null); setMessage('') }
  const last = game.history({ verbose: true }).at(-1)
  return <div className="chess-board-figure opening-explorer">
    <p className="board-instructions" id="board-help">Play both sides. Select a piece, then a highlighted square. Use Tab and Enter on a keyboard.</p>
    <div className="chess-board" role="group" aria-label="Interactive chessboard, White at the bottom" aria-describedby="board-help">
      {game.board().flat().map((piece, index) => {
        const rank = Math.floor(index / 8), file = index % 8, square = `${'abcdefgh'[file]}${8 - rank}`
        const possible = legal.some(move => move.to === square)
        return <button type="button" key={square} onClick={() => choose(square)} aria-pressed={selected === square} aria-label={`${square}${piece ? `, ${piece.color === 'w' ? 'White' : 'Black'} ${names[piece.type]}` : ', empty'}${possible ? ', legal destination' : ''}`} className={`chess-square ${(rank + file) % 2 ? 'wood-dark' : 'wood-light'} ${piece?.color === 'w' ? 'white-piece' : 'black-piece'} ${selected === square ? 'square-selected' : ''} ${possible ? 'square-legal' : ''} ${last && [last.from, last.to].includes(square) ? 'square-last' : ''}`}><span aria-hidden="true">{piece ? symbols[piece.type] : ''}</span><small aria-hidden="true">{square}</small></button>
      })}
    </div>
    {promotion && <div className="board-promotion" role="group" aria-label="Choose promotion piece"><p>Promote to:</p>{['q', 'r', 'b', 'n'].map(piece => <button key={piece} onClick={() => play(promotion.from, promotion.to, piece)}>{names[piece]}</button>)}<button onClick={() => setPromotion(null)}>Cancel</button></div>}
    <div className="board-controls"><button disabled={!history.length} onClick={() => restore(history.slice(0, -1))}>Undo</button><button disabled={!history.length} onClick={() => restore([])}>Reset board</button></div>
    <div aria-live="polite" aria-atomic="true" className="opening-trivia"><p className="board-status">{status} {message}</p><p className="chess-label">{history.length ? `After ${last?.san}` : 'Opening explorer'}</p><h3>{opening ? opening.name : history.length ? 'An uncharted opening' : 'Make the first move.'}</h3><p>{opening ? opening.fact : history.length ? 'This move order is outside our small opening collection. Try undoing and exploring e4, d4, c4, or Nf3.' : 'Try e4 or d4 to discover the ideas behind familiar openings.'}</p>{opening && history.length > opening.moves.length && <p className="board-note">Last recognized line: {opening.moves.join(' ')}. This continuation is not yet covered by our trivia collection.</p>}{opening && <a href={opening.source}>Browse the Lichess opening reference</a>}</div>
    {history.length > 0 && <details className="board-history"><summary>Move history</summary><p>{history.map((move, i) => `${i % 2 === 0 ? `${Math.floor(i / 2) + 1}. ` : ''}${move}`).join(' ')}</p></details>}
    <noscript>Enable JavaScript to move pieces and explore openings.</noscript>
  </div>
}
