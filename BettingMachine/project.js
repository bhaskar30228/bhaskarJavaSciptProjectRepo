const prompt = require("prompt-sync")();

const rows = 3;
const cols = 3;
const symbol_count = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
};

const symbol_value = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2,
};

const deposit = () => {
    while (true) {
        const depositAmount = prompt("Enter the deposit amount: ");
        const parsedDeposit = parseFloat(depositAmount);
        if (isNaN(parsedDeposit) || parsedDeposit <= 0) {
            console.log("Please enter a valid amount.");
        } else {
            return parsedDeposit;
        }
    }
};

const getNumberOfLines = () => {
    while (true) {
        const numberLine = prompt("Enter the number of lines to bet (1-3): ");
        const numberOfLines = parseInt(numberLine);
        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Please enter a valid number of lines.");
        } else {
            return numberOfLines;
        }
    }
};

const getBet = (depositAmount, linesToBet) => {
    while (true) {
        const betAmt = prompt("Enter the bet amount per line: ");
        const numBet = parseFloat(betAmt);
        if (isNaN(numBet) || numBet <= 0 || numBet > (depositAmount / linesToBet)) {
            console.log("Please enter a valid bet amount.");
        } else {
            return numBet;
        }
    }
};

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(symbol_count)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }
    
    const reels = [];
    for (let i = 0; i < cols; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < rows; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};

const transpose = (reels) => {
    const transposedRows = [];
    for (let i = 0; i < rows; i++) {
        transposedRows.push([]);
        for (let j = 0; j < cols; j++) {
            transposedRows[i].push(reels[j][i]);
        }
    }
    return transposedRows;
};

const printRows = (rows) => {
    for (const row of rows) {
        console.log(row.join(" | "));
    }
};

const isWinning = (rows, bet, lines) => {
    let winnings = 0;
    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = symbols.every(symbol => symbol === symbols[0]);
        if (allSame) {
            winnings += bet * symbol_value[symbols[0]];
        }
    }
    return winnings;
};

const game = () => {
    let depositAmt = deposit();
    console.log(`Your balance is $${depositAmt}`);
    
    while (true) {
        const linesToBet = getNumberOfLines();
        const bet = getBet(depositAmt, linesToBet);
        depositAmt -= bet * linesToBet;
        
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        
        const winnings = isWinning(rows, bet, linesToBet);
        depositAmt += winnings;
        
        console.log("You won, $" + winnings.toString());
        console.log(`Your new balance is $${depositAmt}`);
        
        if (depositAmt <= 0) {
            console.log("You ran out of money.");
            break;
        }
        
        const playAgain = prompt("Do you want to play again? (Y/N): ").toUpperCase();
        if (playAgain !== "Y") {
            break;
        }
    }
};

game();
