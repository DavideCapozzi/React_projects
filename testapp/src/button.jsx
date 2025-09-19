import React from "react";
import { useState } from "react";
import "./Button.css";

function Button() {
    const [isGrayList, setIsGrayList] = useState([true, true, true]);

    const handleClick = (index) => {
        setIsGrayList((prev) => prev.map((val, i) => (i === index ? !val : val)));
    };

    return (
        <div className="circle-container">
            {[0, 1, 2].map((idx) => (
                <div
                    key={idx}
                    className={`Button ${isGrayList[idx] ? '' : 'Button-red'}`}
                    onClick={() => handleClick(idx)}
                >
                    Click {idx + 1}
                </div>
            ))}
        </div>
    );
}

export default Button;