import { useState, useEffect } from 'react';
import './App.css';
import { SingleCard } from './components/singleCard';


const cardImages = [
  {src: '/img/card-1.png'},
  {src: '/img/card-2.png'},
  {src: '/img/card-3.png'},
  {src: '/img/card-4.png'},
  {src: '/img/card-5.png'},
  {src: '/img/card-6.png'}
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
      if (choice1.src === choice2.src) {
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

  return (
    <div className="App">
      <h1>Pirate Matching Game</h1>
      <button onClick={shuffleCards}>New Game</button>
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
  );
}

export default App;
