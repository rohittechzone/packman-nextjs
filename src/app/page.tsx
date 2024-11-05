"use client";

import React, { useState } from 'react';
import GameBoard from './components/GameBoard';

export default function Home() {
  const [isGameStarted, setIsGameStarted] = useState(false);

  const startGame = () => {
    setIsGameStarted(true);
  };

  const resetGame = () => {
    setIsGameStarted(false);
  };

  return (
    <div className="container">
      <h1>Pac-Man Game</h1>
      
      {/* Start/Reset button */}
      {!isGameStarted ? (
        <button onClick={startGame} className="start-button">Start Game</button>
      ) : (
        <button onClick={resetGame} className="reset-button">Restart Game</button>
      )}
      
      {/* Game Board */}
      {isGameStarted && <GameBoard />}

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 50px;
          font-family: Arial, sans-serif;
        }
        
        h1 {
          font-size: 2rem;
          color: #333;
        }

        .start-button, .reset-button {
          padding: 10px 20px;
          font-size: 16px;
          margin: 20px 0;
          cursor: pointer;
          background-color: #333;
          color: #fff;
          border: none;
          border-radius: 5px;
        }

        .game-board {
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}