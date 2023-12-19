import './css/normalise.css';

class Node {
    constructor(coord, predecessor = null) {
        this.coord = coord;
        this.predecessor = predecessor;
    }
}

function knightMoves(start, target) {
    const path = [];
    const visited = new Set();
    const queue = [];

    let current = new Node(start);
    let currentCoord = null;
    queue.push(current);

    // keep on going until reach the end or exahust all options
    while (queue.length !== 0) {
        // take one coord
        current = queue.shift();
        currentCoord = current.coord;

        // regenerate the possible moves for each new coord
        const row = currentCoord[0];
        const col = currentCoord[1];

        const otherPath = [
            [row + 2, col + 1],
            [row + 2, col - 1],
            [row + 1, col + 2],
            [row + 1, col - 2],
            [row - 1, col + 2],
            [row - 1, col - 2],
            [row - 2, col - 1],
            [row - 2, col + 1]
        ];

        // check if we reached the end
        if (currentCoord[0] === target[0] && currentCoord[1] === target[1]) {
            path.push(current);
            break;
        }

        // if not, add current coor to the visited list
        visited.add(currentCoord.toString());
        path.push(current);

        // add all the possible next coord not visited and within the board
        // boundary to the queue
        for (let i = 0; i < otherPath.length; i++) {
            // currently, next is only coord, not a node
            const next = otherPath[i];
            const nextRow = next[0];
            const nextCol = next[1];

            if (
                !visited.has(next.toString()) &&
                nextRow >= 0 &&
                nextRow <= 7 &&
                nextCol >= 0 &&
                nextCol <= 7
            ) {
                // add nodes created with their coordinate and their predecessor
                // the current node
                queue.push(new Node(next, current));
            }
        }
    }

    // return array consisting of all the nodes of the path
    // start from the node at the end of the path and backtrack,
    // add all the predecessor's coord go until predecessor is null
    // which is the start
    const shortestPath = [];
    let pathNode = path[path.length - 1];
    shortestPath.push(pathNode.coord);
    while (pathNode.predecessor) {
        pathNode = pathNode.predecessor;
        shortestPath.push(pathNode.coord);
    }

    return shortestPath;
}

const a = knightMoves([3, 3], [4, 3]);

// create the coord in linear format
let coordinate = '';
for (let i = a.length - 1; i >= 0; i--) {
    coordinate += `\n[${a[i]}]`;
}

console.log(`The shortest path is:${coordinate}`);

console.log(a);
