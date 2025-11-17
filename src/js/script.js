const TicTacToe = (function () {
    const getSquares = (text) => document.querySelectorAll(text);
		const restartButton = document.querySelector(".restart");
		const oWin = document.querySelector(".oWon");
		const xWin = document.querySelector(".xWon");

    let counter = 0;
    let gameOver = false;

    const tableArray = new Array(9).fill(null);

    const clickSquares = () => {
        getSquares(".square").forEach(square => {
            square.addEventListener("click", () => {
                if (gameOver) return;

                const classes = square.className.split(" ");
                const index = classes[1];

                if (Number.isNaN(index)) return;

                if (counter < 9 && square.textContent === "") {
                    if (counter % 2 === 0) {
                        tableArray[index] = "X";
                        square.textContent = "X";
                    } else {
                        tableArray[index] = "O";
                        square.textContent = "O";
                    }
                    counter += 1;
                    checkWin(); // run win check after each move
                }
            })
        });
    }

    const checkWin = function() {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const possibility of winConditions) {
            const [a, b, c] = possibility;
            if (tableArray[a] === "X" && tableArray[b] === "X" && tableArray[c] === "X") {
							gameOver = true;
							xWin.style.opacity = 1;
              return;
            }
            if (tableArray[a] === "O" && tableArray[b] === "O" && tableArray[c] === "O") {
                oWin.style.opacity = 1;
                gameOver = true;
                return;
            }
        }

        if (counter >= 9 && !gameOver) {
            alert("It's a draw!");
            gameOver = true;
						restart()
        }
    }


		const restart = function() {
			getSquares(".square").forEach(square => {
				square.textContent = "";
			});
			tableArray.fill(null);
			counter = 0;
			gameOver = false;
			oWin.style.opacity = 0;
			xWin.style.opacity = 0;
		};

		restartButton.addEventListener("click", restart);

    return {
        clickSquares,
        checkWin,
				restart,
    } 

})();

TicTacToe.clickSquares();
