//@ts-check

/**
 * Return the empty positions on a board.
 * 
 * @param board {Array<Array<number>>}
 * @returns {Array<Array<number>>} 
 */
function getEmptyCells(board) {
    const result = []
    for (let row = 0; row < board.length; row++) {
        for (let column = 0; column < board.length; column++) {
            if (board[row][column] === 0) {
                result.push([row, column])
            }
        }
    }

    return result
}

/**
 * Perform the backtracking search.
 * 
 * @param board {Array<Array<number>>}
 * @returns {boolean}
 */
function backtrack(board) {
    const emptyCells = getEmptyCells(board)

    // If the board is complete, process it.
    if (emptyCells.length === 0) {
        processSolution(board)
        return true
    }
    // If the soulution is not complete, recursively backtrack.
    else {
        const firstEmptyCell = emptyCells[0]

        // make a deep copy of the board        
        const boardCopy = board.map(row => [...row])

        const candidates = constructCandidates(board, firstEmptyCell)

        // Add each candidate to the currSoln and recursively backtrack.
        for (let candidate of candidates) {
            boardCopy[firstEmptyCell[0]][firstEmptyCell[1]] = candidate
            if (backtrack(boardCopy)) {
                return true
            }
        }

        return false
    }
}

/**
 * Return true iff the sector in the board where num is getting inserted is valid
 * and false otherwise.
 * 
 *        1      2      3
 *      0 0 0  0 0 0  0 0 0 
 *      0 0 0  0 0 0  0 0 0  1
 *      0 0 0  0 0 0  0 0 0
 *      0 0 0  0 0 0  0 0 0
 *      0 0 0  0 0 0  0 0 0  2
 *      0 0 0  0 0 0  0 0 0
 *      0 0 0  0 0 0  0 0 0
 *      0 0 0  0 0 0  0 0 0  3
 *      0 0 0  0 0 0  0 0 0
 * 
 * @param {number} num the potential candidate at the given cell position
 * @param {Array<Array<number>>} board the soduku board.
 * @param {Array<number>} cell a cell to insert the number to.
 * 
 * @returns {boolean} if the sector is valid or not.
 */
function isSectorValid(num, board, cell) {
    const SECTORWIDTH = 3
    const [x, y] = cell

    // Extract sector of the given cell.
    const [sectx, secty] = [
        Math.ceil((x + 1) / SECTORWIDTH),
        Math.ceil((y + 1) / SECTORWIDTH)
    ]

    // Find the first element in the sector.
    const [firstx, firsty] = [
        (sectx - 1) * SECTORWIDTH,
        (secty - 1) * SECTORWIDTH
    ]

    for (let i = 0; i < SECTORWIDTH; i++) {
        for (let j = 0; j < SECTORWIDTH; j++) {
            const [elemx, elemy] = [
                firstx + i,
                firsty + j
            ]

            if (board[elemx][elemy] === num) {
                return false
            }
        }
    }

    return true
}
let nineBynine = [
    [1, 0, 0, 2, 0, 0, 0, 0, 9],
    [0, 0, 7, 6, 0, 0, 8, 2, 1],
    [9, 2, 0, 0, 4, 0, 7, 3, 0],
    [0, 9, 0, 0, 0, 2, 5, 0, 0],
    [6, 3, 0, 5, 7, 0, 0, 1, 0],
    [0, 0, 2, 4, 8, 1, 6, 0, 0],
    [2, 0, 3, 0, 0, 4, 0, 7, 0],
    [4, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 6, 8, 0, 2, 0, 0, 0, 4]
]
// console.log(isSectorValid(9, nineBynine, [4, 4]));



/**
 * Returns an array of possible candidates for
 * a cell given the current board configuration.
 * 
 * @param {Array<Array<number>>} board the soduku board.
 * @param {Array<number>} emptyCell an array containg the postion of the empty cell.
 * 
 * @returns {Array<number>}
 */
function constructCandidates(board, emptyCell) {

    let helper = (num) => {
        for (let i = 0; i < board.length; i++) {
            if (board[i][emptyCell[1]] === num ||
                board[emptyCell[0]][i] === num) {
                return false
            }
        }

        return isSectorValid(num, board, emptyCell)
    }

    return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(helper)
}

/**
 * Print the board.
 * 
 * @param {Array<Array<number>>} solution 
 */
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
// let quadx, quady

// for (let i = 0; i < 3; i++) {
//     for (let j = 0; j < 3; j++) {
//         let indx = quadx + i
//         let indy = quady + j
//     }
// }

//console.log(Math.ceil((3 + 1) / 3));
//console.log(Math.ceil((1 + 1) / 3));
