import { useState } from 'react';
import './styles/App.css';
import Game from './components/Game';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>Noah's Dinosaur Matching Game</h1>
      </header>
      <Game />
    </div>
  );
}

export default App;
