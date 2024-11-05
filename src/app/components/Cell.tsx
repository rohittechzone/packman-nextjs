// components/Cell.js
import React from 'react';

const Cell = ({ type }) => {
  let cellClass = '';
  
  switch (type) {
    case 1:
      cellClass = 'wall';
      break;
    case 0:
      cellClass = 'food';
      break;
    case -1:
      cellClass = 'empty';
      break;
    default:
      cellClass = 'empty';
  }

  return (
    <div className={`cell ${cellClass}`}>
      <style jsx>{`
        .cell {
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }
        .wall {
          background-color: #333;
        }
        .food {
          background-color: #fff;
          border-radius: 50%;
          width: 8px;
          height: 8px;
        }
        .empty {
          background-color: #000;
        }
      `}</style>
    </div>
  );
};

export default Cell;