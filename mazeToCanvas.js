const { createCanvas } = require('canvas');

module.exports.mazeToCanvas = (maze, blockSize = 50, gap = 1) => {
    const width = maze[0].length * blockSize;
    const height = maze.length * blockSize;
    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');
    context.fillStyle = '#fff'
    context.fillRect(0, 0, width, height)

    for (let i = 0; i < maze.length; i++) {
        for (let j = 0; j < maze[i].length; j++) {
            if (maze[i][j] === 1) {
                context.fillStyle = '#000'
                context.fillRect(j * blockSize + gap, i * blockSize + gap, blockSize - 2 * gap, blockSize - 2 * gap)
            } else if (maze[i][j] === 2) {
                context.fillStyle = '#0a0'
                context.fillRect(j * blockSize, i * blockSize, blockSize, blockSize)
            }
            // context.fillStyle = '#f00'
            // context.font = `${blockSize * (1 / 3)}px Arial`
            // context.fillText(`${i},${j}`, j * blockSize, i * blockSize + blockSize * (2 / 3))
        }
    }
    return canvas;
}