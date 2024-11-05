"use client";

import React from 'react';

const Ghost = ({ position }) => {
  return (
    <div
      className="ghost"
      style={{
        left: position.x * 20,
        top: position.y * 20,
      }}
    >
      <style jsx>{`
        .ghost {
          width: 20px;
          height: 20px;
          background-color: red;
          position: absolute;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default Ghost;