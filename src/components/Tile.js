import React, { useState, useEffect, useContext } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBomb, faFlag} from "@fortawesome/free-solid-svg-icons"
import { gameContext } from '../contexts/gameContext';

const Index = (i, j, n = 3) => {
    if(i < 0 || j < 0 || i >= n || j >= n)return
    return n * i + j
}

const twoDInex = (n, cols) => {
    const i = n%cols
    const j = Math.floor(n/cols)
    return [j, i]
} 

const Tile = props => {

    const [tile, setTile] = useState({})
    const [board, setBoard] = props.board
    const [hover, setHover] = useState(false)
    const game = useContext(gameContext)

    useEffect(() => {
        setTile(t => props.tile || t)
    }, [props])

    const {boardSize, boardDimension} = props

    const reveal = (index, force=false) => {
        const copy = [...board]
        const current = copy[index]
        if(!current.isClicked && (!current.isFlag || force)){
            copy[index].isClicked = true
            if(copy[index].hasBomb){
                game.setGameIsOver(true)
                copy.forEach((t, i) => reveal(i, true))
            }
            const [x, y] = twoDInex(index, boardDimension)
            
            if (!copy[index].hasBomb) {
                for (let i = -1; i < 2; i++) {
                    for (let j = -1; j < 2; j++) {
                        const k = Index(i + x, j + y, boardDimension)
                        if (copy[k]) {
                            copy[index].neighbors += copy[k].hasBomb ? 1 : 0
                        }
                    }
                }
                if(copy[index].neighbors <= 0){
                    for (let i = -1; i < 2; i++) {
                        for (let j = -1; j < 2; j++) {
                            const k = Index(i + x, j + y, boardDimension)
                            const neighbor = copy[k]
                            if(neighbor && !neighbor.hasBomb && k !== index){
                                reveal(k)
                            }
                        }
                    }
                }
            }
            setBoard(copy)
        }
    }

    const extraClick = () => {
        game.setFlagCount(board.reduce((acc, cur, i) => cur.isFlag ? acc + 1 : acc, 0))
        game.setWinner(board.reduce((acc, cur) => cur.isFlag && cur.hasBomb ? acc + 1 : acc, 0) === board.reduce((acc, cur) => cur.hasBomb ? acc + 1 : acc, 0))
    }

    const clickHandler = e => {
        reveal(props.index)
        extraClick()
    }

    const contextHandler = e => {
        const copy = [...board]
        if (!copy[props.index].isClicked) {
            copy[props.index].isFlag = !copy[props.index].isFlag
            setBoard(copy)
        }
        extraClick()
    }

    const handleMouseOver = e => {
        if(e.buttons === 1 || e.buttons === 2){
            setHover(true)
        }   
    }

    return (
        <button onContextMenu={contextHandler} onClick={clickHandler} onMouseOver={handleMouseOver} onMouseLeave={() => setHover(false)} className={`tile ${tile.isClicked && "inset"} ${!tile.isClicked && hover && "no-bomb inset"} ${tile.isClicked && !tile.hasBomb && "no-bomb"}`} style={{width: boardSize/boardDimension, height: boardSize/boardDimension}}>
            {tile.isClicked && tile.hasBomb && <FontAwesomeIcon icon={faBomb}/>}
            {(!tile.isClicked || tile.hasBomb) && tile.isFlag && <FontAwesomeIcon style={{color: "red"}} icon={faFlag}/>}
            {tile.isClicked && !tile.hasBomb && tile.neighbors > 0 ? tile.neighbors : ""}
        </button>
    );
}

export default Tile;
