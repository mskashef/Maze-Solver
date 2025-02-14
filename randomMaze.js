const positionToString = pos => pos.join(',')

const getRandomCell = arr => arr[Math.floor(Math.random() * arr.length)]

function generateRandomMaze(rows, cols) {
    const maze = [];
    
    for (let i = 0; i < rows; i++) {
        maze.push([])
        for (let j = 0; j < cols; j++) {
            if (i % 2 === 0 || j % 2 === 0) maze[i][j] = 1
            else maze[i][j] = 0
        }
    }

    const stack = [[1,1]]
    const visited = new Set(['1,1'])

    while (stack.length !== 0) {
        const cur = stack.pop()
        const [i, j] = cur
        const unVisitedNeighbours = [
            [i + 2, j],    // down
            [i, j + 2],    // right
            [i - 2, j],    // up
            [i, j - 2],    // left
        ].filter(neighbour => {
            if (neighbour[0] < 0 || neighbour[1] < 0) return false;
            if (neighbour[0] >= maze.length || neighbour[1] >= maze[0].length) return false;
            if (visited.has(positionToString(neighbour))) return false;
            return maze[neighbour[0]][neighbour[1]] !== 1;
        });
        if (unVisitedNeighbours.length > 0) {
            // Push the current cell to the stack
            stack.push(cur);
            // Choose one of the unvisited neighbours
            const chosenCell = getRandomCell(unVisitedNeighbours);
            // Remove the wall between the current cell and the chosen cell
            const diff = [(chosenCell[0] - cur[0]) / 2, (chosenCell[1] - cur[1]) / 2];
            const wallToRemove = [cur[0] + diff[0], cur[1] + diff[1]]
            maze[wallToRemove[0]][wallToRemove[1]] = 0
            // Mark the chosen cell as visited and push it to the stack
            visited.add(positionToString(chosenCell))
            stack.push(chosenCell)
        }
    }

    return maze;
}

module.exports = {
    generateRandomMaze
}

// // Example usage:
// const rows = 21; // Number of rows in the maze
// const cols = 41; // Number of columns in the maze

// const randomMaze = generateRandomMaze(rows, cols);
// // printMaze(randomMaze)

// const canvas = mazeToCanvas(randomMaze, 50, 0);
// const buffer = canvas.toBuffer('image/png')
// fs.writeFileSync('./rm.png', buffer)