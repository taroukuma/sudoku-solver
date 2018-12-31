// Backtrack algorithm.
function backtrack(currSoln, data) {
    // If the currSoln is complete, process it.
    if (isASolution(currSoln, data)) {
        processSolution(currSoln, data)
    }

    // If the currSoln is not complete, recursively backtrack.
    else {
        // Construct candidates.
        let candidates = constructCandidates(currSoln, data)

        // Add each candidate to the currSoln and recursively backtrack.
        for (let candidate of candidates) {
            backtrack([...currSoln, candidate], data)
        }
    }
}

// Check if a solution is complete.
function isASolution(currSoln, data) {
    return (currSoln.length === data.length)
}

// Process the complete solution.
function processSolution(solution, data) {
    let result = []
    // Add only the elements from data that have 
    // true in the solution at the corresponding
    // index.

    for (let i = 0; i < solution.length; i++) {
        if (solution[i]) {
            result.push(data[i])
        }
    }

    console.log(result);
}

// Construct candidates.
function constructCandidates() {
    return [false, true]
}
