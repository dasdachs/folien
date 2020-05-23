import React, { useEffect, useState } from "react";

import Slide from "./Slide";

import "./App.css";

const slides = [
    {title: "Test", content: "Test data all the way"},
    {title: "Test 2", content: "Some more test data"},
];

function App() {
    const [ slideIndex, setSlideIndex ] = useState(0);

    const handleMovement = (e:KeyboardEvent ): void => {
        switch(e.key) {
        case "ArrowDown":
            setSlideIndex((slideIndex + slides.length - 1) % slides.length);
            break;
        case "ArrowUp":
            setSlideIndex((slideIndex + 1) % slides.length);
            break;
        default:
            break;
        }

    };

    useEffect(() => {
        document.addEventListener("keyup", handleMovement);

        return() => {
            document.removeEventListener("keyup", handleMovement);
        };
    });

    return (
        <div className="slide">
            <Slide title={slides[slideIndex].title} content={slides[slideIndex].content} />
        </div>
    );
}

export default App;
