import React from "react";
import { Card } from "../App";
import './singleCard.css';

interface cardProps {
    card: Card;
    handleChoice: (card: Card) => void;
    flipped: boolean;
}

const SingleCard = ({ card, flipped, handleChoice }: cardProps) => {    
    const handleClick = () => {
        handleChoice(card);
     }
    return (
        <div className={flipped ? "flipped card" : "card"}>
                <div className='card-front'>
                    <img src={card.src} alt='card front' />
                </div>
                <img 
                    src={'/img/card-back.png'} 
                    alt='card back' 
                    className='card-back'
                    onClick={handleClick}
                />
        </div>
    )
} 

export { SingleCard }