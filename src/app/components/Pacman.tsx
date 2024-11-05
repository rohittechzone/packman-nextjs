"use client";

import React, { useEffect } from 'react';

const Pacman = ({ position, onMove }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          onMove(0, -1);
          break;
        case 'ArrowDown':
          onMove(0, 1);
          break;
        case 'ArrowLeft':
          onMove(-1, 0);
          break;
        case 'ArrowRight':
          onMove(1, 0);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onMove]);

  return (
    <div
      className="pacman"
      style={{
        left: position.x * 20,
        top: position.y * 20,
      }}
    >
      <style jsx>{`
        .pacman {
          width: 20px;
          height: 20px;
          background-color: yellow;
          position: absolute;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default Pacman;