"use client";

import React, { useState, useEffect } from 'react';
import Pacman from './Pacman';
import Ghost from './Ghost';
import Cell from './Cell';

// 1 is for wall, 0 is for food, 2 is for ghost
const initialBoard = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 2, 0, 1, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1],
  [1, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 0, 0, 0, 2, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const GameBoard = () => {
  const [board, setBoard] = useState(initialBoard);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [pacmanPosition, setPacmanPosition] = useState({ x: 1, y: 1 });

  const initializeGhostPositions = () => {
    const positions = [];
    initialBoard.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 2) {
          positions.push({ x, y });
        }
      });
    });
    return positions;
  };

  const [ghostPositions, setGhostPositions] = useState(initializeGhostPositions());

  const handleMove = (x, y) => {
    const newX = pacmanPosition.x + x;
    const newY = pacmanPosition.y + y;

    if (board[newY][newX] === 1) return;

    if (board[newY][newX] === 0) {
      setScore((prevScore) => prevScore + 1);
      const newBoard = board.map((row, rowIndex) =>
        row.map((cell, colIndex) =>
          rowIndex === newY && colIndex === newX ? -1 : cell
        )
      );
      setBoard(newBoard);
    }

    setPacmanPosition({ x: newX, y: newY });

    ghostPositions.forEach((ghost) => {
      if (newX === ghost.x && newY === ghost.y) {
        setGameOver(true);
      }
    });
  };

  const moveGhosts = () => {
    if (gameOver) return;

    setGhostPositions((prevPositions) =>
      prevPositions.map((ghostPosition) => {
        const directions = [
          { x: 0, y: -1 }, // up
          { x: 0, y: 1 },  // down
          { x: -1, y: 0 }, // left
          { x: 1, y: 0 },  // right
        ];

        const validMoves = directions
          .map((dir) => ({
            x: ghostPosition.x + dir.x,
            y: ghostPosition.y + dir.y,
          }))
          .filter(
            (pos) =>
              pos.x >= 0 &&
              pos.x < board[0].length &&
              pos.y >= 0 &&
              pos.y < board.length &&
              board[pos.y][pos.x] !== 1
          );

        if (validMoves.length > 0) {
          const nextMove = validMoves[Math.floor(Math.random() * validMoves.length)];
          
          if (nextMove.x === pacmanPosition.x && nextMove.y === pacmanPosition.y) {
            setGameOver(true);
          }
          
          return nextMove;
        }

        return ghostPosition;
      })
    );
  };

  useEffect(() => {
    const intervalId = setInterval(moveGhosts, 500); // Move ghost every 500ms
    return () => clearInterval(intervalId);
  }, [ghostPositions, gameOver]);

  // Calculate grid dimensions based on board size
  const numRows = board.length;
  const numCols = board[0].length;

  return (
    <div className="game-board" style={{ gridTemplateColumns: `repeat(${numCols}, 20px)`, gridTemplateRows: `repeat(${numRows}, 20px)` }}>
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell key={`${rowIndex}-${colIndex}`} type={cell} />
        ))
      )}
      <Pacman position={pacmanPosition} onMove={handleMove} />
      {ghostPositions.map((position, index) => (
        <Ghost key={index} position={position} />
      ))}

      <div className="score">Score: {score}</div>
      {gameOver && <div className="game-over">Game Over</div>}

      <style jsx>{`
        .game-board {
          display: grid;
          position: relative;
          margin: 20px auto;
        }
        .score {
          margin-top: 10px;
          font-size: 18px;
          color: #333;
          text-align: center;
        }
        .game-over {
          color: red;
          font-weight: bold;
          text-align: center;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default GameBoard;