import React, { useEffect, useState } from 'react';
import Tile from './Tile';

import "./GameBoard.css"

const GameBoard = props => {

    const [board, setBoard] = useState([])
    const [size, setSize] = useState(500)

    useEffect(() => {
        setBoard(props.board)
    }, [props])

    const styleObj = {
        gridTemplateColumns: `repeat(${props.dimension}, 1fr)`
    }

    return (
        <div className="game-board" style={styleObj}>
            {board.map((t, i) => (
                <Tile key={i} index={i} tile={t} board={[board, setBoard]} boardDimension={props.dimension} boardSize={size} />
            ))}
        </div>
    );
}

export default GameBoard;
