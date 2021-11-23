import React from "react";
import { Card } from "../App";
import './singleCard.css';

interface cardProps {
    card: Card
}

const SingleCard = ({ card }: cardProps) => {
     
    return (
        <div key={card.id}>
              <div >
                <img src={card.src} className='card card-front' alt='card front' />
                <img src={'/img/card-back.png'} alt='card back' className='card card-back' />
            </div>
        </div>
    )
} 

export { SingleCard }