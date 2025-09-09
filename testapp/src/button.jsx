import React from "react";
import { useState } from "react";
import "./Button.css";

function Button() {
    const [isGray, setIsGray] = useState(true);

    const handleClick = () => {
        setIsGray(!isGray);
    };

    return (
        <div className="circle-container">
            <div className={`Button ${isGray ? '' : 'Button-red'}`} 
                onClick={handleClick} >
                Click me 
            </div>
        </div>
    );
}

export default Button;