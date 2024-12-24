"use client";

import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import Leaderboard from './components/Leaderboard';

export default function Home() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [players, setPlayers] = useState([]);

  const startGame = () => {
    setIsGameStarted(true);
    setIsGameOver(false);
    setFinalScore(0);
  };

  const resetGame = () => {
    setIsGameStarted(false);
    setIsGameOver(false);
    setFinalScore(0);
  };

  const handleGameOver = (score) => {
    setIsGameOver(true);
    setFinalScore(score);
    const playerName = prompt("Enter your name:");
    setPlayers((prevPlayers) => [...prevPlayers, { name: playerName, score }]);
  };

  return (
      <div className="container">
        <h1>Pac-Man Game</h1>

        {!isGameStarted ? (
            <button onClick={startGame} className="start-button">Start Game</button>
        ) : (
            <button onClick={resetGame} className="reset-button">Restart Game</button>
        )}

        {isGameStarted && !isGameOver && <GameBoard onGameOver={handleGameOver} />}
        {isGameOver && <div className="final-score">Game Over! Your score: {finalScore}</div>}

        <Leaderboard players={players} />

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
          color: #ffff00;
        }

        .start-button, .reset-button {
          padding: 10px 20px;
          font-size: 16px;
          margin: 20px 0;
          cursor: pointer;
          background-color: #800080;
          color: #fff;
          border: none;
          border-radius: 5px;
        }

        .game-board {
          margin-top: 20px;
        }

        .final-score {
          margin-top: 20px;
          font-size: 18px;
          color: #333;
          text-align: center;
        }
      `}</style>
      </div>
  );
}