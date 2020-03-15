import React, {useState, useEffect, useContext} from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import Tile from './components/Tile';
import { gameContext } from './contexts/gameContext';
import Header from './components/Header';
import Footer from './components/Footer';
import firebase from "./firebase"
import Modal from "./components/Modal"

const map = (n, start1, stop1, start2, stop2) => {
  return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
};

const difficultyMap = {
  easy: 5,
  medium: 30,
  hard: 50,
  extreme: 90
}

const segment = (arr, key, categories) => {
  const result = []
  for(const cat of categories){
    result.push(arr.filter(item => item[key] === cat))
  }
  return result
}

function App() {

  const [dimension, setDimension] = useState(15);
  const [board, setBoard] = useState(Array(dimension * dimension).fill())
  const [difficulty, setDifficulty] = useState("easy")
  const [mouseDown, setMouseDown] = useState(false)
  const [scores, setScores] = useState([])
  const [show, setShow] = useState(false)
  const [userName, setUserName] = useState()

  const game = useContext(gameContext)

  const getData = async () => {
    const db = firebase.firestore()
    const data = await db.collection("scores").get()
    const scores = data.docs.map(doc => ({...doc.data(), id: doc.id}))
    setScores(segment(scores, "difficulty", ["easy", "medium", "hard", "extreme" ]))
    console.log(scores)
  }

  useEffect(() => {
    getData()
  }, [])


  const reset = () => {

    let boardArray = Array(dimension * dimension).fill().map(() => {
      return {
        hasBomb: false,
        isClicked: false,
        neighbors: 0,
        isFlag: false
      }
    })
    const n = Math.floor(Math.random()*((dimension*dimension)-(game.mineCount+1)))
    const indexes = [...Array(dimension * dimension).keys()].sort(() => Math.random()-.5).slice(n, n+game.mineCount)
    indexes.forEach(index => boardArray[index].hasBomb = true)
    setBoard(boardArray)
    game.setFlagCount(0)
    game.setGameIsOver(false)
    game.setWinner(false)
    game.setTime("")
  }

  useEffect(() => {
    game.setMineCount(difficultyMap[difficulty])
    reset()
  }, [dimension, difficulty, game.mineCount])

  useEffect(() => {
    if(game.winner){
      setShow(true)
    }
  }, [game])

  const addScore = async e => {
    e.preventDefault()
    const item = {
      username: userName,
      time: game.time,
      difficulty: difficulty
    }
    console.log(item)
    const db = firebase.firestore()
    await db.collection("scores").add(item)
    setShow(false)
    getData()
  }


  return (
      <div className="App" onContextMenu={e => e.preventDefault()} onMouseUp={() => setMouseDown(false)} onMouseDown={() => setMouseDown(true)}>
        <Modal show={show} onCancel={() => setShow(false)}  header={<h3>Congratulations</h3>} footer={
          <>
            <button className="submit__button" onClick={addScore}>Add Score</button>
            <button className="submit__button" onClick={() => setShow(false)} type="submit">Cancel</button>
          </>
        }>
          <article>You cleared all the mines in {game.time}, if you want to add your score to the scoreboard please enter a display Name</article>
          <br/>
          <label htmlFor="username">Display Name </label>
          <input type="text" id="username" value={userName} onChange={e => setUserName(e.target.value)}/>
        </Modal>
        <Header mouseDown={mouseDown} onClick={reset}/>
        <GameBoard board={board} dimension={dimension}/>
        <Footer onDifficultyChange={setDifficulty} difficulty={difficulty} dimension={[dimension, setDimension]}/>
        <div className="scores">
          {scores.map((cat, i) => (
            <div>
              <div className="scores__header">{Object.keys(difficultyMap)[i]}</div>
              
              {cat.map(item => (
                <div>
                  {item.username} : {" "}
                  {item.time}
                  </div>
              ))}
            </div>
          ))}
        </div>
      </div>
  );
}

export default App;