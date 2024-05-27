const JOUEURX = 'X';
const JOUEUR0 = 'O';

let Joueur = JOUEURX; //jouuer de base

let jeuActif = null;

const petitJeu = Array(9).fill(null).map(() => Array(9).fill(''));
const grandJeu = Array(9).fill('');

const resetButton = document.getElementById('disabled');
resetButton.addEventListener('click', resetGame);

    function LancerJeu() {
        const gameBoard = document.getElementById('game-board');

        for (let i = 0; i < 9; i++) {
            const smallBoard = document.createElement('div');
            smallBoard.className = 'board';
            smallBoard.dataset.index = i;

                    for (let j = 0; j < 9; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.index = j;
                cell.dataset.board = i;
                cell.addEventListener('click', handleClick);
                smallBoard.appendChild(cell);
            }
            gameBoard.appendChild(smallBoard);
        }
    }

    function handleClick(event) {
        const cell = event.target;
        const boardIndex = parseInt(cell.dataset.board);
        const cellIndex = parseInt(cell.dataset.index);

        if (grandJeu[boardIndex] !== '' || (jeuActif !== null && jeuActif !== boardIndex && grandJeu[jeuActif] === '')) {
            alert('Vous devez jouer dans le tableau dans lequel le joueur précédent vous a envoyé.');
            return;
        }

        if (petitJeu[boardIndex][cellIndex] === '') {
            cell.textContent = Joueur;
            petitJeu[boardIndex][cellIndex] = Joueur;

            if (checkWin(petitJeu[boardIndex])) {
                grandJeu[boardIndex] = Joueur;
                messageVictoireFinale(boardIndex, Joueur);
                if (checkWin(grandJeu)) {
                    alert(`Le joueur ${Joueur} gagne la partie ! Bien joué le boss`);
                    resetGame();
                    return;
                }
            }

            switchPlayer();
            jeuActif = grandJeu[cellIndex] === '' && petitJeu[cellIndex].some(cell => cell === '') ? cellIndex : null;
        }
    }

function switchPlayer() {
    Joueur = Joueur === JOUEURX ? JOUEUR0 : JOUEURX;
}

function checkWin(board) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern =>
        pattern.every(index => board[index] === Joueur)
    );
}


function messageVictoireFinale(boardIndex, player) {
    const board = document.querySelector(`.board[data-index='${boardIndex}']`);
    board.classList.add('won');
    board.setAttribute('data-winner', player);
}


function resetGame() {
    Joueur = JOUEURX;
    jeuActif = null;
    petitJeu.forEach(board => board.fill(''));
    grandJeu.fill('');

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.textContent = '');

    const boards = document.querySelectorAll('.board');
    boards.forEach(board => {
        board.classList.remove('won');
        board.removeAttribute('data-winner');
    });


}


LancerJeu();
