import React, {createContext, useState} from "react"

export const gameContext = createContext({
    flagCount: 0,
    setFlagCount: () => {},
    gameIsOver: false,
    setGameIsOver: () => {}
})

export const GameContextProvider = props => {
    const [flagCount, setFlagCount] = useState(0)
    const [gameIsOver, setGameisOver] = useState(false)
    const [winner, setWinner] = useState(false)
    const [mineCount, setMineCount] = useState(50)
    const [time, setTime] = useState()

    return (
        <gameContext.Provider
            value={{
                flagCount: flagCount,
                setFlagCount: setFlagCount,
                gameIsOver: gameIsOver,
                setGameIsOver: setGameisOver,
                winner: winner,
                setWinner: setWinner,
                mineCount: mineCount,
                setMineCount: setMineCount,
                time: time,
                setTime: setTime
            }}
        >
            {props.children}
        </gameContext.Provider>
    )
}

