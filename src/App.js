import React, { useState, useEffect } from 'react';
import './style.css';

export default function App() {
  const [turn, setTurn] = useState('X');
  const [cells, setCells] = useState(Array(9).fill(''));
  const [winner, setWinner] = useState();

  //if draw, the restart button will display, so I using counter to count the turn
  const [counter, setCounter] = useState(0);

  const checkForTheWinner = (squares) => {
    let combos = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagnol: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };

    for (let combo in combos) {
      combos[combo].forEach((pattern) => {
        if (
          squares[pattern[0]] === '' ||
          squares[pattern[1]] === '' ||
          squares[pattern[2]] === ''
        ) {
          //do nothing
        } else if (
          squares[pattern[0]] === squares[pattern[1]] &&
          squares[pattern[1]] === squares[pattern[2]]
        ) {
          setWinner(squares[pattern[0]]);
        }
      });
    }
  };

  const handleClick = (num) => {
    if (cells[num] !== '' || winner) {
      return;
    }
    let squares = [...cells];

    if (turn === 'X') {
      squares[num] = 'X';
      setTurn('O');
    } else {
      squares[num] = 'O';
      setTurn('X');
    }

    //check the winner and insert value to cells
    checkForTheWinner(squares);
    setCells(squares);
  };

  useEffect(() => {
    setCounter(counter + 1);
    console.log(counter);
  }, [cells]);

  const restartGame = () => {
    setCounter(0);
    setTurn('X');
    setWinner();
    setCells(Array(9).fill(''));
  };

  const Block = ({ num }) => {
    return (
      <td
        onClick={() => handleClick(num)}
        class={`${cells[num] === 'X' ? 'blue' : 'red'}`}
      >
        {cells[num]}
      </td>
    );
  };

  return (
    <div>
      <h1>Turn: {turn}</h1>
      <table>
        <tr>
          <Block num={0} />
          <Block num={1} />
          <Block num={2} />
        </tr>

        <tr>
          <Block num={3} />
          <Block num={4} />
          <Block num={5} />
        </tr>

        <tr>
          <Block num={6} />
          <Block num={7} />
          <Block num={8} />
        </tr>
      </table>

      {winner && (
        <div>
          <h1>The winner is {winner}</h1>
          <button onClick={restartGame}>play again? </button>
        </div>
      )}
      {counter >= 10 && <button onClick={restartGame}>play again?</button>}
    </div>
  );
}
