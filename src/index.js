import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GameContextProvider } from './contexts/gameContext';

ReactDOM.render(<GameContextProvider><App /></GameContextProvider>, document.getElementById('root'));