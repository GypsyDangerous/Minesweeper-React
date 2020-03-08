import React, { useState, useEffect, useContext } from 'react';
import Emoji, { Twemoji, Emojione} from "react-emoji-render"
import { gameContext } from '../contexts/gameContext';
import { useStopwatch } from "react-timer-hook"


const winnerFace = "😎"

const Header = props => {

    const {
        seconds,
        minutes,
        start,
        pause,
        reset,
    } = useStopwatch({ autoStart: true });

    const [emoji, setEmoji] = useState(":)")
    const [mouseDown, setMouseDown] = useState(false)

    const game = useContext(gameContext)

    useEffect(() => {
        setMouseDown(props.mouseDown)
    }, [props])

    useEffect(() => {
        setEmoji(game.winner ? winnerFace : game.gameIsOver ? "☠️" : mouseDown ? ":o" : ":)")
    }, [mouseDown, game])

    useEffect(() => {
        if(game.gameIsOver || game.winner){
            pause()
        }
    }, [game])

    return (
        <div className="header">
            <div className="header__text">0{game.mineCount-game.flagCount}</div>
            <button onClick={() => {props.onClick(); reset()}} className="header__button"><Emoji className="emoji" text={emoji}/></button>
            <div className="header__text">{minutes < 10 && "0"}{minutes}:{seconds < 10 && "0"}{seconds}</div>
        </div>
    );
}

export default Header;
