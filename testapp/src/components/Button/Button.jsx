import React from "react";
import "./Button.css";

function Button({ onButtonClick, activeButtons }) {
    const handleClick = (index) => {
        const buttonId = `btn${index + 1}`;
        onButtonClick(buttonId);
    };

    return (
        <div className="circle-container">
            {[0, 1, 2].map((idx) => {
                const buttonId = `btn${idx + 1}`;
                const isActive = activeButtons[buttonId] || false;
                
                return (
                    <div
                        key={idx}
                        className={`Button ${isActive ? 'Button-active' : ''}`}
                        onClick={() => handleClick(idx)}
                    >
                        Click {idx + 1}
                    </div>
                );
            })}
        </div>
    );
}

export default Button;