document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.box');
    const resetButton = document.getElementById('reset-btn');
    const message = document.querySelector('h1');
    let turn0 = true;

    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWinner = () => {
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            
            if (boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[a].innerText === boxes[c].innerText) {
                message.innerText = `Congratulations! Player ${boxes[a].innerText} wins!`;
                return true;
            }
        }

        if (Array.from(boxes).every(box => box.innerText)) {
            message.innerText = "It's a draw!";
            return true;
        }

        return false;
    };

    const resetGame = () => {
        boxes.forEach(box => {
            box.innerText = '';
            box.disabled = false;
        });
        turn0 = true;
        message.innerText = "Tic Tac Toe";
    };

    boxes.forEach(box => {
        box.addEventListener('click', () => {
            box.innerText = turn0 ? '0' : 'X';
            box.disabled = true;
            turn0 = !turn0;

            if (checkWinner()) {
                boxes.forEach(box => box.disabled = true);
            }
        });
    });

    resetButton.addEventListener('click', resetGame);
});
