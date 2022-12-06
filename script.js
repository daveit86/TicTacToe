console.log ("script loaded!");
const debug=true;
function debuglog(message)
{
    if(debug){console.log(message);}
}
const restartBtn = document.querySelector("button.restart");

//Gameboard class
const Gameboard = () => {
    let turn = 0;
    let player = false;
    let players = [
        Player("Player 1","X"),
        Player("Player 2","O")
    ]
    const i2rc = (index) => [Math.floor(index / 3), index % 3];
    const rc2i = (row,col) => 3 * row + col;
    const gameboard = document.querySelector("#gameboard");
    const gameboxes= new Array(9);
    const DOMboxes = document.querySelectorAll(".gamebox");

    const bindGameboardListener = () =>{
        gameboard.addEventListener("click",gameListener)
    }

    const removeGameboardListener = () =>{
        gameboard.removeEventListener("click",gameListener, false)
    }

    const gameListener = (e) => {
        console.log(e.target.ariaLabel);
        setBox(e.target.ariaLabel);
    }


    const render = () => {
        console.log("Rendering gameboard");
        for(let i=0;i<gameboxes.length;i++)
        {
            DOMboxes[i].innerText=gameboxes[i];
        }
    }

    const resetClicked = () => {
        for(let i=0;i<gameboxes.length;i++)
        {
            DOMboxes[i].classList.remove("clicked");
        }
    }

    const resetBoxes = () => {
        for(let i=0;i<gameboxes.length;i++)
        {
            gameboxes[i]="";
        }
    };

    const resetGame = () => {
        player=false;
        turn=0;
        resetBoxes();
        resetClicked();
        render();
        bindGameboardListener();
        players[0].resetTurn();
        players[1].resetTurn();
    }

    const setBox = (index) => {
        debuglog(`index:${index}`);
        if(gameboxes[index]==="")
        {
            gameboxes[index] = players[player?1:0].token;
            DOMboxes[index].classList.add("clicked");
            render();
            debuglog(gameboxes);
            debuglog(`turn:${turn}`);
            checkWin(index,players[player?1:0]);
            players[player?1:0].nextTurn();
            player=!player;
            turn++;
        }
        else
        {
            alert("Box already used!");
        }
        
    }

    const checkWin = (index, player) => {
        if(turn<9)
        {   
            let found = false;
            let symbol = gameboxes[index];
            let xy=i2rc(index);
            if(
                checkLine([0,1,2],symbol) ||
                checkLine([3,4,5],symbol) ||
                checkLine([6,7,8],symbol) ||
                checkLine([0,3,6],symbol) ||
                checkLine([1,4,7],symbol) ||
                checkLine([2,5,8],symbol) ||
                checkLine([0,4,8],symbol) ||
                checkLine([2,4,6],symbol)
            )
            {
                found = true;
            }

            if(found)
            {
                alert (`${player.getName()} won!`);
                removeGameboardListener();
            }
        }
        else
        {
            setTimeout(function() { alert('Game Over'); }, 1);
            removeGameboardListener();
            //resetGame();
        }
    }

    const checkLine = (line, val) => gameboxes[line[0]]===val && gameboxes[line[1]]===val && gameboxes[line[2]]===val

    resetGame();
    restartBtn.addEventListener("click",resetGame);
    

    bindGameboardListener();

    return {players, gameboxes ,setBox, render, resetBoxes};
}

//Player Class
const Player = (name, token) => {
    let wins = 0;
    let turn = 0;
    const won = () => {wins++; console.log(`${name} won ${wins} times!`);};
    const reset = () => {wins = 0; console.log(`${name} won ${wins} times!`);};
    const getWins = () => {return wins;console.log(`${name} won ${wins} times!`);};
    const nextTurn = () => {turn++; console.log(`${name} - Turn #${turn}`);};
    const resetTurn = () => {turn = 0; console.log(`${name} - Turn #${turn}`);};
    const getTurn = () => {return turn; console.log(`${name} - Turn #${turn}`);};
    const getName = () => name;
    return {name, token, won, reset, getWins, nextTurn, resetTurn, getTurn, getName};
}


//Init

const game = Gameboard();

restartBtn.addEventListener("click",game.resetGame)