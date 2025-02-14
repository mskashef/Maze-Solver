class Maze {
  #maze;
  width;
  height;
  #rows;
  #cols;
  #startPoint;
  #goal;
  #path;

  renderConf = {
    blockSize: 20,
    gap: 1,
    containerId: null,
    renderMode: "canvas",
  };

  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.#cols = this.width * 2 + 1;
    this.#rows = this.height * 2 + 1;

    this.generateRandom();
  }

  generateRandom() {
    const getRandomCell = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const maze = [];
    for (let i = 0; i < this.#rows; i++) {
      maze.push([]);
      for (let j = 0; j < this.#cols; j++) {
        if (i % 2 === 0 || j % 2 === 0) maze[i][j] = "#"; // wall
        else maze[i][j] = " "; // empty cell
      }
    }
    const stack = [[1, 1]];
    const visited = new Set(["1,1"]);

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
        return maze[neighbour[0]][neighbour[1]] !== "#";
      });
      if (unVisitedNeighbours.length > 0) {
        // Push the current cell to the stack
        stack.push(cur);
        // Choose one of the unvisited neighbours
        const chosenCell = getRandomCell(unVisitedNeighbours);
        // Remove the wall between the current cell and the chosen cell
        const diff = [
          (chosenCell[0] - cur[0]) / 2,
          (chosenCell[1] - cur[1]) / 2,
        ];
        const wallToRemove = [cur[0] + diff[0], cur[1] + diff[1]];
        maze[wallToRemove[0]][wallToRemove[1]] = " ";
        // Mark the chosen cell as visited and push it to the stack
        visited.add(chosenCell.join(","));
        stack.push(chosenCell);
      }
    }
    this.#maze = maze;
    this.render();
  }

  addStartPoint(point) {
    point = point.reverse();
    const pOld = this.#startPoint;
    if (pOld) this.#maze[pOld[0]][pOld[1]] = " "; // remove the previous startPoint
    const pNew = point.map((c) => c * 2 + 1);
    this.#startPoint = pNew;
    this.#maze[pNew[0]][pNew[1]] = "S";
    this.render();
  }

  addGoal(point) {
    point = point.reverse();
    const pOld = this.#goal;
    if (pOld) this.#maze[pOld[0]][pOld[1]] = " "; // remove the previous goal
    const pNew = point.map((c) => c * 2 + 1);
    this.#goal = pNew;
    this.#maze[pNew[0]][pNew[1]] = "E";
    this.render();
  }

  #solve() {
    let startPosition = this.#startPoint,
      endPosition = this.#goal;
    const maze = this.#maze;
    for (let i = 0; i < maze.length; i++) {
      for (let j = 0; j < maze[i].length; j++) {
        if (maze[i][j] === "S") startPosition = [i, j];
        if (maze[i][j] === "E") endPosition = [i, j];
      }
    }
    const stack = [{ self: startPosition, parent: null }];
    const visited = new Set();

    while (true) {
      let currentPosition = stack.shift();
      const curPos = currentPosition.self;
      visited.add(curPos.join(","));

      // Check if we reached to the end
      if (curPos[0] === endPosition[0] && curPos[1] === endPosition[1]) {
        return currentPosition;
      }

      let i = curPos[0];
      let j = curPos[1];

      const neighbours = [
        [i + 1, j], // down
        [i, j + 1], // right
        [i - 1, j], // up
        [i, j - 1], // left
      ].filter((neighbour) => {
        if (neighbour[0] < 0 || neighbour[1] < 0) return false;
        if (neighbour[0] >= maze.length || neighbour[1] >= maze[0].length)
          return false;
        if (visited.has(neighbour.join(","))) return false;
        return maze[neighbour[0]][neighbour[1]] !== "#";
      });
      stack.push(
        ...neighbours.map((n) => ({ self: n, parent: currentPosition }))
      );
    }
  }

  showAnswer() {
    let ans = this.#solve();
    const maze = this.#maze;
    this.#path = [];
    while (ans) {
      let pos = ans.self;
      this.#path.push(pos);
      const cell = maze[pos[0]][pos[1]];
      if (cell === " ") maze[pos[0]][pos[1]] = "P"; // Leave the 'S' and 'E'
      ans = ans.parent;
    }
    this.render();
  }

  hideAnswer() {
    this.#path.forEach((p) => {
      if (this.#maze[p[0]][p[1]] === "P") this.#maze[p[0]][p[1]] = " ";
    });
    this.render();
  }

  render() {
    const { blockSize, containerId } = this.renderConf;
    if (!containerId) return;
    const maze = this.#maze;
    const width = this.#cols * blockSize;
    const height = this.#rows * blockSize;
    const canvas = document.getElementById(containerId);
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
    const context = canvas.getContext("2d");
    context.fillStyle = "#fff";
    context.fillRect(0, 0, width, height);

    const drawBlockAt = (i, j, color, letter, letterColor = "#000", gap) => {
      if (typeof gap !== "number") gap = this.renderConf.gap;
      context.fillStyle = color;
      context.fillRect(
        j * blockSize + gap,
        i * blockSize + gap,
        blockSize - 2 * gap,
        blockSize - 2 * gap
      );
      if (letter) {
        context.fillStyle = letterColor;
        context.font = `${(blockSize * 3) / 4}px Arial`;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(
          letter,
          j * blockSize + blockSize / 2,
          i * blockSize + blockSize / 2
        );
      }
    };

    for (let i = 0; i < maze.length; i++) {
      for (let j = 0; j < maze[i].length; j++) {
        const cell = maze[i][j];
        if (cell === "#") {
          drawBlockAt(i, j, "#000");
        } else if (cell === "S") {
          drawBlockAt(i, j, "#F00", "S");
        } else if (cell === "E") {
          drawBlockAt(i, j, "gold", "E");
        } else if (cell === "P") {
          drawBlockAt(i, j, "#0A0", null, null, 0);
        }
      }
    }
  }
}
