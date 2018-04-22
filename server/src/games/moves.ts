export const moves =  (board1:any, board2:any) => 

board1
  .map((row:any, y:any) => row.filter((cell:any, x:any) => board2[y][x] !== cell))
  .reduce((a:any, b:any) => a.concat(b))
  .length