"use client";

import React from 'react';

const Ghost = ({ position }) => {
    return (
        <div
            className="ghost"
            style={{
                left: position.x * 20,
                top: position.y * 20,
                backgroundImage: 'url(/images/ghost.png)',
                backgroundSize: 'cover',
            }}
        >
            <style jsx>{`
                .ghost {
                    width: 20px;
                    height: 20px;
                    position: absolute;
                }
            `}</style>
        </div>
    );
};

export default Ghost;