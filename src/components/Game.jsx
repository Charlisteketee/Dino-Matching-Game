import React, { useState, useEffect } from "react";
import Card from "./Card";
import '../styles/Game.css';


const shuffleCards = (array) => {
  // Fisher-Yates shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Game = () => {
  const [points, setPoints] = useState(0);
  const [cards, setCards] = useState([
    { id: 1, species: 'T-Rex', flipped: false, matched: false },
    { id: 2, species: 'T-Rex', flipped: false, matched: false },
    { id: 3, species: 'Brachiosaurus', flipped: false, matched: false },
    { id: 4, species: 'Brachiosaurus', flipped: false, matched: false },
    { id: 5, species: 'Brontosaurus', flipped: false, matched: false },
    { id: 6, species: 'Brontosaurus', flipped: false, matched: false },
    { id: 7, species: 'Triceratops', flipped: false, matched: false },
    { id: 8, species: 'Triceratops', flipped: false, matched: false },
    { id: 9, species: 'Stegosaurus', flipped: false, matched: false },
    { id: 10, species: 'Stegosaurus', flipped: false, matched: false },
    { id: 11, species: 'Pterodactylus', flipped: false, matched: false },
    { id: 12, species: 'Pterodactylus', flipped: false, matched: false },

  ])
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [isChecking, setIsChecking] = useState(null);

  // Shuffle cards only on initial render
  useEffect(() => {
    setCards(shuffleCards(cards.slice()));
  }, []); // Empty dependency array ensures it runs only once on initial render

  const handleCardClick = (index) => {
    if (isChecking || cards[index].flipped || cards[index].matched) {
      return;
    }

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);

    if (firstCard === null) {
      setFirstCard(index);
    } else {
      setSecondCard(index);
      setIsChecking(true);

      if (cards[firstCard].species === cards[index].species) {
        const matchedCards = [...cards];
        matchedCards[firstCard].matched = true;
        matchedCards[index].matched = true;
        setCards(matchedCards);
        setPoints(points + 1);
        resetCards();
      } else {
        setTimeout(() => {
          const resetCardState = [...cards];
          resetCardState[firstCard].flipped = false;
          resetCardState[index].flipped = false;
          setCards(resetCardState);
          resetCards();
        }, 3000); // 5 seconds delay
      }
    }
  };

  const resetCards = () => {
    setFirstCard(null);
    setSecondCard(null);
    setIsChecking(false);
  };

  return (
    <div className="game-container">
      <h1>Noah's Dinosaur Matching Game</h1>
      <div className="points">POINTS: {points}</div>
      <div className="game-board">
        {cards.map((card, index) => (
          <Card
            key={index}
            card={card}
            index={index}
            handleCardClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Game;