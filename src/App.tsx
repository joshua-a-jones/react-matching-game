import { useState, useEffect } from 'react';
import './App.css';
import { SingleCard } from './components/singleCard';
import card1Img from './assets/img/card-1.png';
import card2Img from './assets/img/card-2.png';
import card3Img from './assets/img/card-3.png';
import card4Img from './assets/img/card-4.png';
import card5Img from './assets/img/card-5.png';
import card6Img from './assets/img/card-6.png';

const cardImages = [
  {src: card1Img},
  {src: card2Img},
  {src: card3Img},
  {src: card4Img},
  {src: card5Img},
  {src: card6Img}
]

export interface Card {
  src: string;
  id: number;
  matched: boolean;
}

function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState(0);
  const [choice1, setChoice1] = useState<Card | null>(null)
  const [choice2, setChoice2] = useState<Card | null>(null)

  const shuffleCards = () => {
    const shuffledCards = [];
    // for each of the six cards, duplicate it and add random ID's, then push to shuffledDeck
    for (let i = 0; i < cardImages.length; i++) {
      let randId = Math.floor(Math.random()*10000);
      shuffledCards.push(
        {...cardImages[i],
          id:randId,
          matched: false
        }
      );
      randId = Math.floor(Math.random()*10000);
      shuffledCards.push(
        {...cardImages[i],
          id:randId,
          matched:false
        }
      );
      setChoice1(null);
      setChoice2(null);
    };

    setCards(shuffledCards.sort((a, b) => a.id - b.id));
    setTurns(0);
  };

  const handleChoice = (card: Card) => {
    if (choice1 && choice2) {
      return;
    } else if (choice1) {
      setChoice2(card)
    } else {
      setChoice1(card);
    }
  }

  const resetTurn = () => {
    setChoice1(null);
    setChoice2(null);
    setTurns(prevTurns => prevTurns + 1);
  }

  useEffect(() => {
    if (choice1 && choice2 ) {
      if (choice1.src === choice2.src && choice1.id !== choice2.id) {
        setCards(prevCards => { 
          return prevCards.map(card => {
            if (card.src === choice1.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  },[choice1, choice2])


  useEffect(() => {
    shuffleCards();
  }, [])

  return (
    <div className="App">
      <h1>Treasure Hunt</h1>

      <div className={'container'}>
        <div className="card-grid" >
          {cards.map(card => 
            <SingleCard
              card={card}
              key={card.id}
              handleChoice={handleChoice}
              flipped={card === choice1 || card === choice2 || card.matched}
              />
          )}
        </div>
      </div>
      <button onClick={shuffleCards} className='new-button'>New Game</button>
      {cards.length > 0 && <div><p>Number of turns: {turns}</p></div>}
    </div>
  );
}

export default App;
