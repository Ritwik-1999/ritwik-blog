// Curated starting lines; names can be explored in the Lichess opening explorer.
export const openings = [
  ['e4', "King’s Pawn Opening", 'Moving the king’s pawn opens diagonals for both the queen and the light-squared bishop.'],
  ['d4', "Queen’s Pawn Opening", 'Unlike an e4 pawn, a pawn on d4 is already protected by its queen.'],
  ['c4', 'English Opening', 'The c-pawn controls d5 from the flank, leaving the central pawns flexible.'],
  ['Nf3', 'Zukertort Opening', 'Developing a knight first keeps several central pawn structures available.'],
  ['e4 e5', 'Open Game', 'Both players claim central space; the knights can develop while attacking the opposing central pawns.'],
  ['e4 c5', 'Sicilian Defense', 'Black challenges d4 with the c-pawn, creating an asymmetric pawn structure from the first move.'],
  ['e4 e6', 'French Defense', 'The e6 pawn prepares d5, but also temporarily closes the diagonal of Black’s light-squared bishop.'],
  ['e4 c6', 'Caro-Kann Defense', 'The c6 pawn supports a future d5 advance while leaving the c8 bishop’s diagonal open.'],
  ['e4 d5', 'Scandinavian Defense', 'Black immediately challenges the e4 pawn rather than first supporting a central advance.'],
  ['e4 e5 Nf3', 'King’s Knight Opening', 'Nf3 develops a piece and attacks e5 at the same time.'],
  ['e4 e5 Nf3 Nc6', 'Open Game: two knights developed', 'The c6 knight defends e5. White can now choose a bishop development or a central pawn break.'],
  ['e4 e5 Nf3 Nc6 Bc4', 'Italian Game', 'The bishop on c4 points at f7, a pawn initially defended only by Black’s king.'],
  ['e4 e5 Nf3 Nc6 Bb5', 'Ruy Lopez', 'The bishop pressures the knight defending e5; the central tension is not resolved by that pressure alone.'],
  ['e4 e5 Nf3 Nc6 d4', 'Scotch Game', 'White opens the center early with d4 instead of developing a bishop first.'],
  ['e4 e5 Nf3 Nf6', 'Petrov Defense', 'Black counterattacks e4 with a knight instead of directly defending e5.'],
  ['d4 d5', 'Closed Game', 'Both sides occupy the center with supported d-pawns. The c-pawns can challenge this structure.'],
  ['d4 d5 c4', 'Queen’s Gambit', 'White offers the c-pawn to draw Black’s d-pawn away from the center.'],
  ['d4 d5 c4 e6', 'Queen’s Gambit Declined', 'Black reinforces d5 and keeps the central pawn, at the cost of restricting the c8 bishop.'],
  ['d4 d5 c4 c6', 'Slav Defense', 'Black supports d5 with the c-pawn, leaving the light-squared bishop’s diagonal unobstructed.'],
].map(([line, name, fact]) => ({ moves: line.split(' '), name, fact, source: 'https://lichess.org/opening' }))

export function openingFor(history) {
  return openings.filter(o => o.moves.length <= history.length && o.moves.every((move, i) => move === history[i])).sort((a, b) => b.moves.length - a.moves.length)[0] || null
}
