export
const moves =  (board1: string[][], board2: string[][]) => {

return board1
  .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
  .reduce((a, b) => a.concat(b))
  .length 
}