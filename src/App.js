import React, {useState, useEffect, useContext} from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import Tile from './components/Tile';
import { gameContext } from './contexts/gameContext';
import Header from './components/Header';

const map = (n, start1, stop1, start2, stop2) => {
  return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
};


function App() {

  const [dimension, setDimension] = useState(15);
  const [board, setBoard] = useState(Array(dimension * dimension).fill())
  const [difficulty, setDifficulty] = useState(1)
  const [mouseDown, setMouseDown] = useState(false)

  const game = useContext(gameContext)

  const reset = () => {

    let boardArray = Array(dimension * dimension).fill().map(() => {
      return {
        hasBomb: false,
        isClicked: false,
        neighbors: 0,
        isFlag: false
      }
    })
    const indexes = [...Array(dimension * dimension).keys()].sort(() => Math.random()-.5).slice(0, game.mineCount)
    indexes.forEach(index => boardArray[index].hasBomb = true)
    setBoard(boardArray)
    game.setFlagCount(0)
    game.setGameIsOver(false)
    game.setWinner(false)
  }

  useEffect(() => {
    reset()
  }, [dimension, difficulty])

  return (
      <div className="App" onContextMenu={e => e.preventDefault()} onMouseUp={() => setMouseDown(false)} onMouseDown={() => setMouseDown(true)}>
        <Header mouseDown={mouseDown} onClick={reset}/>
        <GameBoard board={board} dimension={dimension}/>
      </div>
  );
}

export default App;