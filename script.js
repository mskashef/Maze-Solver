// const blockWidth = 20;
// const w = 21;
// const h = 21;

// const maze = generateRandomMaze(w, h, [3, 11], [3, 3]);
// const canvas = document.getElementById("canvas");
// canvas.setAttribute("width", w * blockWidth);
// canvas.setAttribute("height", h * blockWidth);

// const drawMaze = (maze, blockSize = blockWidth, gap = 1) => {
//   const width = maze[0].length * blockSize;
//   const height = maze.length * blockSize;
//   const context = canvas.getContext("2d");
//   context.fillStyle = "#fff";
//   context.fillRect(0, 0, width, height);
//   const drawBlockAt = (i, j, color, letter, letterColor = '#000') => {
//     context.fillStyle = color;
//     context.fillRect(
//       j * blockSize + gap,
//       i * blockSize + gap,
//       blockSize - 2 * gap,
//       blockSize - 2 * gap
//     );
//     if (letter) {
//       context.fillStyle = letterColor
//       context.font = `${blockSize * 3 / 4}px Arial`;
//       context.textAlign="center"; 
//       context.textBaseline = "middle";
//       context.fillText(letter, j * blockSize + blockSize / 2, i * blockSize + blockSize / 2)
//     }
//   }
//   for (let i = 0; i < maze.length; i++) {
//     for (let j = 0; j < maze[i].length; j++) {
//       const cell = maze[i][j]
//       if (cell === '#') {
//         drawBlockAt(i, j, '#000')
//       } else if (cell === 'S') {
//         drawBlockAt(i, j, '#F00', 'S')
//       } else if (cell === 'E') {
//         drawBlockAt(i, j, 'gold', 'E')
//       } else if (cell === 'P') {
//         context.fillStyle = "#0a0";
//         context.fillRect(j * blockSize, i * blockSize, blockSize, blockSize);
//       }
//     }
//   }
// };

// function solveMazeBFS(maze) {
//   let startPosition, endPosition;
//   for (let i = 0; i < maze.length; i++) {
//     for (let j = 0; j < maze[i].length; j++) {
//       if (maze[i][j] === "S") startPosition = [i, j];
//       if (maze[i][j] === "E") endPosition = [i, j];
//     }
//   }
//   const stack = [{ self: startPosition, parent: null }];
//   const visited = new Set();

//   while (true) {
//     let currentPosition = stack.shift();
//     const curPos = currentPosition.self;
//     visited.add(curPos.join(","));

//     // Check if we reached to the end
//     if (curPos[0] === endPosition[0] && curPos[1] === endPosition[1]) {
//       return currentPosition;
//     }

//     let i = curPos[0];
//     let j = curPos[1];

//     const neighbours = [
//       [i + 1, j], // down
//       [i, j + 1], // right
//       [i - 1, j], // up
//       [i, j - 1], // left
//     ].filter((neighbour) => {
//       if (neighbour[0] < 0 || neighbour[1] < 0) return false;
//       if (neighbour[0] >= maze.length || neighbour[1] >= maze[0].length)
//         return false;
//       if (visited.has(neighbour.join(","))) return false;
//       return maze[neighbour[0]][neighbour[1]] !== '#';
//     });
//     stack.push(
//       ...neighbours.map((n) => ({ self: n, parent: currentPosition }))
//     );
//   }
// }

// let res = solveMazeBFS(maze);
// while (res) {
//   let pos = res.self;
//   const cell = maze[pos[0]][pos[1]]
//   if (cell === ' ')
//     maze[pos[0]][pos[1]] = 'P';
//   res = res.parent;
// }

// drawMaze(maze);
