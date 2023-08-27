const fs = require('fs');
const {mazeToCanvas} = require('./mazeToCanvas');

const maze = [
    [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,1,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,1,0,0,1,0,1,1,1,0,0,0,0,1,1,1,0,1],
    [1,0,0,0,1,1,1,0,0,0,1,0,1,0,1,0,1,1,1,1,0,1,1,1],
    [1,1,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1],
    [1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,1,0,0,1],
    [1,0,1,1,1,1,1,0,1,1,1,0,1,0,0,1,1,1,1,0,0,0,1,1],
    [1,0,0,0,1,0,0,0,0,1,0,0,1,1,1,1,0,0,1,0,1,1,1,1],
    [1,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
]

const startPosition = [0,1]
const endPosition = [10, 22]

const positionToString = pos => {
    return `${pos[0]},${pos[1]}`
}

function solveMazeDFS (maze, startPosition, endPosition) {
    const stack = [{self: startPosition, parent: null}];
    const visited = new Set()
    
    while (true) {
        let currentPosition = stack.shift()
        const curPos = currentPosition.self
        visited.add(positionToString(curPos))

        // Check if we reached to the end
        if (curPos[0] === endPosition[0] && curPos[1] === endPosition[1]) {
            return currentPosition
        }

        let i = curPos[0];
        let j = curPos[1];
        
        const neighbours = [
            [i + 1, j],    // down
            [i, j + 1],    // right
            [i - 1, j],    // up
            [i, j - 1],    // left
        ].filter(neighbour => {
            if (neighbour[0] < 0 || neighbour[1] < 0) return false;
            if (neighbour[0] >= maze.length || neighbour[1] >= maze[0].length) return false;
            if (visited.has(positionToString(neighbour))) return false;
            return maze[neighbour[0]][neighbour[1]] !== 1;
        });
        stack.unshift(...neighbours.map(n => ({self: n, parent: currentPosition})))
    }
}

function solveMazeBFS (maze, startPosition, endPosition) {
    const stack = [{self: startPosition, parent: null}];
    const visited = new Set()
    
    while (true) {
        let currentPosition = stack.shift()
        const curPos = currentPosition.self
        visited.add(positionToString(curPos))

        // Check if we reached to the end
        if (curPos[0] === endPosition[0] && curPos[1] === endPosition[1]) {
            return currentPosition
        }

        let i = curPos[0];
        let j = curPos[1];
        
        const neighbours = [
            [i + 1, j],    // down
            [i, j + 1],    // right
            [i - 1, j],    // up
            [i, j - 1],    // left
        ].filter(neighbour => {
            if (neighbour[0] < 0 || neighbour[1] < 0) return false;
            if (neighbour[0] >= maze.length || neighbour[1] >= maze[0].length) return false;
            if (visited.has(positionToString(neighbour))) return false;
            return maze[neighbour[0]][neighbour[1]] !== 1;
        });
        stack.push(...neighbours.map(n => ({self: n, parent: currentPosition})))
    }
}

let res = solveMazeBFS(maze, startPosition, endPosition)
while (res) {
    let pos = res.self 
    maze[pos[0]][pos[1]] = 2
    res = res.parent
}
const canvas = mazeToCanvas(maze);
const buffer = canvas.toBuffer('image/png')
fs.writeFileSync('./image.png', buffer)