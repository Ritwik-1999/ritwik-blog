import test from 'node:test'
import assert from 'node:assert/strict'
import { Chess } from 'chess.js'
import { openings, openingFor } from '../src/lib/chessOpenings.js'

test('every curated opening is a legal move sequence and matches its deepest entry', () => {
  for (const opening of openings) {
    const game = new Chess()
    opening.moves.forEach(move => game.move(move))
    assert.equal(openingFor(game.history()).name, opening.name)
  }
})
test('recognition handles reset, undo, and uncovered continuations without inventing a variation', () => {
  assert.equal(openingFor([]), null)
  assert.equal(openingFor(['a3']), null)
  assert.equal(openingFor(['e4', 'c5']).name, 'Sicilian Defense')
  assert.equal(openingFor(['e4', 'c5', 'Nf3']).moves.length, 2)
  assert.equal(openingFor(['e4']).moves.length, 1)
})
test('board engine rejects illegal moves and retains castling, en passant, promotion, and game over', () => {
  const game = new Chess()
  assert.throws(() => game.move({ from: 'e2', to: 'e5' }))
  for (const move of ['e4','e5','Nf3','Nc6','Bc4','Nf6','O-O']) game.move(move)
  assert.equal(game.get('g1').type, 'k')
  game.undo(); assert.equal(game.get('e1').type, 'k')
  game.reset()
  for (const move of ['e4','a6','e5','d5','exd6']) game.move(move)
  assert.equal(game.get('d5'), undefined)
  const promotion = new Chess('7k/P7/8/8/8/8/8/7K w - - 0 1')
  promotion.move({ from:'a7', to:'a8', promotion:'n' })
  assert.equal(promotion.get('a8').type, 'n')
  game.reset()
  for (const move of ['f3','e5','g4','Qh4#']) game.move(move)
  assert.equal(game.isCheckmate(), true)
})
