function generateRandomMaze(rows, cols, startPosition, endPosition) {
  const getRandomCell = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const maze = [];
  for (let i = 0; i < rows; i++) {
    maze.push([]);
    for (let j = 0; j < cols; j++) {
      if (i % 2 === 0 || j % 2 === 0) maze[i][j] = '#';
      else maze[i][j] = ' ';
    }
  }

  maze[startPosition[0]][startPosition[1]] = 'S'
  maze[endPosition[0]][endPosition[1]] = 'E'

  const stack = [startPosition];
  const visited = new Set([startPosition.join(',')]);

  while (stack.length !== 0) {
    const cur = stack.pop();
    const [i, j] = cur;
    // Searching for unvisited neighbours
    const unVisitedNeighbours = [
      [i + 2, j], // down
      [i, j + 2], // right
      [i - 2, j], // up
      [i, j - 2], // left
    ].filter((neighbour) => {
      if (
        neighbour[0] < 0 ||
        neighbour[0] >= maze.length ||
        neighbour[1] < 0 ||
        neighbour[1] >= maze[0].length ||
        visited.has(neighbour.join(","))
      )
        return false;
      return maze[neighbour[0]][neighbour[1]] !== '#';
    });
    if (unVisitedNeighbours.length > 0) {
      // Push the current cell to the stack
      stack.push(cur);
      // Choose one of the unvisited neighbours
      const chosenCell = getRandomCell(unVisitedNeighbours);
      // Remove the wall between the current cell and the chosen cell
      const diff = [(chosenCell[0] - cur[0]) / 2, (chosenCell[1] - cur[1]) / 2];
      const wallToRemove = [cur[0] + diff[0], cur[1] + diff[1]];
      maze[wallToRemove[0]][wallToRemove[1]] = ' ';
      // Mark the chosen cell as visited and push it to the stack
      visited.add(chosenCell.join(","));
      stack.push(chosenCell);
    }
  }
  console.log(maze)
  return maze;
}