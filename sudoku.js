//@ts-check

function getEmptyCells(board) {
    const result = []
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] === 0) {
                result.push([i, j])
            }
        }
    }

    return result
}


/**
 * @board {[][]} - Current board configuration.
 */
function backtrack(board) {
    //[[1,2]]
    const emptyCells = getEmptyCells(board)

    // If the board is complete, process it.
    if (emptyCells.length === 0) {
        processSolution(board)
        return true
    }

    // If the currSoln is not complete, recursively backtrack.
    else {
        const firstEmptyCell = emptyCells[0]
        const boardCopy = board.map(row => [...row])

        // Construct candidates.
        const candidates = constructCandidates(board, firstEmptyCell)

        // Add each candidate to the currSoln and recursively backtrack.
        for (let candidate of candidates) {
            boardCopy[firstEmptyCell[0]][firstEmptyCell[1]] = candidate
            if (backtrack(boardCopy) === true) {
                return true
            }
        }

        return false
    }
}

// Construct candidates 
function constructCandidates(board, emptyCell) {

    let helper = (num) => {
        for (let i = 0; i < board.length; i++) {
            if (board[i][emptyCell[1]] === num ||
                board[emptyCell[0]][i] === num) {
                return false
            }
        }
        return true
    }

    return [1, 2, 3].filter(helper)
}

// Process the complete solution.
function processSolution(solution) {
    console.log(solution);
}

let sudoku = [
    [1, 0, 0],
    [0, 2, 0],
    [0, 0, 3]
]

// console.log(constructCandidates(sudoku, [0, 1]));

// console.log(backtrack(sudoku));
//   1      2      3
// 0 0 0  0 0 0  0 0 0 
// 0 0 0  0 0 0  0 0 0  1
// 0 0 0  0 0 0  0 0 0

// 0 0 0  0 0 0  0 0 0
// 0 0 0  0 0 0  0 0 0  2
// 0 0 0  0 0 0  0 0 0

// 0 0 0  0 0 0  0 0 0
// 0 0 0  0 0 0  0 0 0  3
// 0 0 0  0 0 0  0 0 0
// [2, 6]
// [3,1] => 2-1
// Math.ceil((3 + 1) / 3) = 2
// Math.ceil((1 + 1) / 3) = 1
// (6 + 1) / 3 = 2
// 
// 3, 3
// (3 - 1) * 3
// 2, 1
// (2 - 1) * 3; (1 - 1) * 3;
let quadx, quady

for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        let indx = quadx
    }
}

console.log(Math.ceil((3 + 1) / 3));
console.log(Math.ceil((1 + 1) / 3));
