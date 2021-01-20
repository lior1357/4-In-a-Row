import Board from './Board'
import './index.css';


export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.onResetClick = this.onResetClick.bind(this);
        
        this.initialState = {
            gameBoard: this.makeNewBoard(),
            nextSquares: new Array(7).fill(0),
            xIsNext: true,
            lastSpot: [0, 0]
        }
        
        this.state = this.initialState;
        
    }

    makeNewBoard(){
        var board = new Array(7);
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array(6).fill(null);
        }

        return board;
    }

    onResetClick(e) {
        e.preventDefault();
        this.setState({
            gameBoard: this.makeNewBoard(),
            nextSquares: new Array(7).fill(0),
            xIsNext: true,
            lastSpot: [0, 0]
        });
    }
      
    handleClick(i) {
        const nextSquares = this.state.nextSquares;
        const gameBoard = this.state.gameBoard;
        const xIsNext = this.state.xIsNext;
        const lastSpot =this.state.lastSpot;
        
        const [row, col] = lastSpot;
        console.log(`${row}, ${col}`)
        if (this.state.nextSquares[i] === maxCol || isWinner(row, col, gameBoard)) {
            console.log('winner')
            return
        }
    
        
        gameBoard[i][nextSquares[i]] = xIsNext ? 'X': 'O';
        nextSquares[i] += 1;
        
        this.setState ({
            gameBoard: gameBoard,
            nextSquares: nextSquares,
            xIsNext: !xIsNext,
            lastSpot: [i, nextSquares[i] - 1]
        })

    }

        render () {
            const [row, col] = this.state.lastSpot;
            const winner = isWinner(row, col, this.state.gameBoard);

            let status;

            if (winner) {
                status = 'the winner is ' + winner;
            }
            else{
                status = 'the next player is ' + (this.state.xIsNext ? 'X': 'O');
            }
            
            return(
                <div>
            <div>
                <Board onClick = {(i) => this.handleClick(i)} 
                      gameBoard = {this.state.gameBoard}/>
            </div>
            <div>{status}</div>
            <button onClick ={(e) => this.onResetClick(e)}>reset</button>
            </div>
            )
        }
}


function isWinner(row, col, gameBoard) {
    //recieves last spot placed and the board
    
    if (gameBoard[row][col]) {
        var player = gameBoard[row][col];
        var count = 0;

        //horizontal check
        for (let i = 0; i < maxRow; i++) {
            if (gameBoard[i][col] === player)
                count++;
            else {count = 0}
   
            if(count === 4)
                return player;
        }

        //vertical check
        count = 0;

        for (let i = 0; i < maxCol; i++) {
            if (gameBoard[row][i] === player)
                count++;
            else {count = 0}

            if(count === 4)
                return player;
        }

        //left diagonal check
        count = 1;

        let i = row;
        let j = col;

        while(i < maxRow - 1 && j < maxCol - 1 && gameBoard[i+1][j+1] === player) {
            count++;
            console.log(`${count}`);
            if(count === 4) 
                return player        
            i++;
            j++;
        }

        i = row;
        j = col;

        while(i > 0 && j > 0 && gameBoard[i-1][j-1] === player) {
            count++;

            if(count === 4) 
                return player      
            i--;
            j--;
        }
        
        count = 1;
        //right diagonal check
        i = row;
        j = col;

        while(j < maxRow  && i > 0 && gameBoard[j+1][i-1] === player) {
            count++;
            console.log(`${count}`);

            if(count >= 4) 
                return player        
            i--;
            j++;
        }

        i = row;
        j = col;

        while(i < maxCol  && j > 0 && gameBoard[j-1][i+1] === player) {
            count++;
            console.log(`now`);

            if(count >= 4) 
                return player 

            i++;
            j--;
        } 
    }  
    return null;  
}
