import React from "react";
import { useState } from "react";
import "./Button.css";

function Button({ onButtonClick }) {
    const [activeButtons, setActiveButtons] = useState([]);

    const handleClick = (index) => {
        const buttonId = `btn${index + 1}`;
        
        // Toggle del bottone
        if (activeButtons.includes(buttonId)) {
            setActiveButtons(activeButtons.filter(btn => btn !== buttonId));
        } else {
            setActiveButtons([...activeButtons, buttonId]);
        }
        
        // Notifica al componente genitore
        if (onButtonClick) {
            onButtonClick(buttonId);
        }
    };

    return (
        <div className="circle-container">
            {[0, 1, 2].map((idx) => {
                const buttonId = `btn${idx + 1}`;
                const isActive = activeButtons.includes(buttonId);
                
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