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
    let p1 = Player("Player 1","X");
    let p2 = Player("Player 2", "O");
    const gameboard = document.querySelector("#gameboard");
    const gameboxes= new Array(9);
    const DOMboxes = document.querySelectorAll(".gamebox");
    

    const render = () => {
        console.log("Rendering gameboard");
        for(let i=0;i<gameboxes.length;i++)
        {
            debuglog(`iteration ${i}`);
            DOMboxes[i].innerText=gameboxes[i];
        }
    }

    const resetBoxes = () => {
        for(let i=0;i<gameboxes.length;i++)
        {
            gameboxes[i]="";
        }
    };

    const resetGame = () => {
        resetBoxes();
        render();
    }

    const setBox = (index) => {
        debuglog(`index:${index}`);
        if(gameboxes[index]==="")
        {
            if(player){
                gameboxes[index] = p2.token;
            }
            else
            {
                gameboxes[index] = p1.token;
            }
            render();
            player=!player;
            turn++;
        }
        else
        {
            alert("Box already used!");
        }
        
    }

    const index2rowcol = (index) => [Math.floor(index / 3), index % 3];
    const rowcol2index = (row,col) => 3 * row + col;

    const checkWin = () => {

    }

    resetGame();
    gameboard.addEventListener("click",(e)=>{
        console.log(e.target.ariaLabel);
        setBox(e.target.ariaLabel);
    })

    return {index2rowcol, rowcol2index ,setBox, render, resetBoxes};
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
    return {token, won, reset, getWins, nextTurn, resetTurn, getTurn};
}


//Init

const game = Gameboard();

restartBtn.addEventListener("click",game.resetGame)