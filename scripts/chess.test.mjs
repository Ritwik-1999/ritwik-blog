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
import { readPosts, pageData } from './content.mjs'
import { articleFor } from '../src/lib/chessOpenings.js'

test('six opening articles resolve to real pages and recommendations follow undo/reset', () => {
  const posts = readPosts()
  const lines = [
    ['d4 d5 c4', 'queens-gambit'], ['e4 e5 f4', 'kings-gambit'],
    ['e4 e5 Nf3 Nc6 Bb5', 'ruy-lopez'], ['e4 c5', 'sicilian-defense'],
    ['e4 d5', 'scandinavian-defense'], ['e4 e5 Nf3 Nc6 Bc4', 'italian-game'],
  ]
  for (const [line, slug] of lines) {
    const history = line.split(' ')
    const post = articleFor(history, posts)
    assert.equal(post.slug, slug)
    assert.equal(pageData(post.path, posts).kind, 'article')
    assert.equal(articleFor(history.slice(0, -1), posts), null)
    assert.equal(articleFor(history, [{ ...post, status: 'draft' }]), null)
    assert.equal(articleFor(history, [{ ...post, status: 'preview' }]), null)
  }
  assert.equal(articleFor(['d4','d5','c4','e6'], posts).slug, 'queens-gambit')
  assert.equal(articleFor(['d4','d5','c4','c6'], posts).slug, 'queens-gambit')
  assert.equal(articleFor([], posts), null)
  assert.equal(articleFor(['a3'], posts), null)
})
