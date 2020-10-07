/*----- constants -----*/
// Model

const COMBOS = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [6, 4, 2]
];

const LOOKUP = {
    '1': 'X',
    '-1': 'O',
    'null': ''
};



/*----- app's state (variables) -----*/

// Model

let turn, winner, gameboard;


/*----- cached element references -----*/

// View

const $gameboardEl = $('#gameboard');
const $squareEls = $('.square');
const $buttonEl = $('#reset-btn');
const $messageEl = $('#message');


/*----- event listeners -----*/

// Controller
$gameboardEl.on('click', handleMove);
$buttonEl.on('click', handleInit);

/*----- functions -----*/

// Controller

// Start the game once the browser loads
handleInit();

function handleInit() {
    // This function will do two things

    //1) Start the game
    // a) create an empty gameboard
    gameboard = new Array(9).fill().map(() => null);
    //^ is same as gameboard = [null, null, null, null, null, null, null, null, null]
    
    // b) assign the turn - player 1 goes first - X goes first
    turn = 1;
    // c) set the winner to false
    winner = false;
    // d) visualize the state of the game to the DOM
    render();
    //2) Reset the game
}

function checkWinner() {
    // compare the positions of the player's pieces (1 or -1) in the combos array
    for(let i = 0; i <COMBOS.length; i++) {
        if(Math.abs(gameboard[COMBOS[i][0]] + 
                    gameboard[COMBOS[i][1]] + 
                    gameboard[COMBOS[i][2]]) === 3) {
                        return gameboard[COMBOS[i][0]];
        }
    } if(gameboard.includes(null)) return false;
    return 'T';
}


function handleMove(evt) {
    const position = evt.target.dataset.index;
    if(winner || gameboard[position]) return;
    gameboard[position] = turn;
    // check to see if we have a winner
    winner = checkWinner();

    turn *= -1;
    render();
    
}

function render() {
    // render is going to look at the gameboard array
    gameboard.forEach(function(value, index) {
        $($squareEls[index]).text(LOOKUP[value])
    });
    // render will also update our message based on the turn or if we won
    if(!winner) {
        $messageEl.text(`It's Player ${LOOKUP[turn]}'s Turn`);
    } else if (winner === 'T') {
        $messageEl.text('Tie Game');
    } else {
        $messageEl.text(`Congratulations ${LOOKUP[winner]} Wins`)
    }
}