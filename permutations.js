// Backtrack algorithm.
function backtrack(currSoln, data) {
    // If the currSoln is complete, process it.
    if (isASolution(currSoln, data)) {
        processSolution(currSoln)
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
function processSolution(solution) {
    console.log(solution);
}

// Construct candidates based on currSoln.
function constructCandidates(currSoln, data) {
    let candidates = []

    for (let item of data) {
        if (!currSoln.includes(item)) {
            candidates.push(item)
        }
    }

    return candidates
}
