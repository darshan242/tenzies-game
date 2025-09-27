import React from "react";
import Die from "./Die";
import { useState } from "react";
import { nanoid } from "nanoid";

const MainComponent = () => {
  const [dieNumber, setDieNumber] = useState(generateAllNewDice());

  const gameWon =
    dieNumber.every((die) => die.isHeld) &&
    dieNumber.every((die) => die.value === dieNumber[0].value);
  function generateAllNewDice() {
    // for (let i = 0; i <= 9; i++) {
    //   let arrValue = Math.floor(Math.random() * 6) + 1;
    //   arr.push(arrValue);
    // }
    // return arr;

    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }
  function rollDice() {
    const clickedDie = dieNumber.map((element) => {
      if (element.isHeld === true) {
        return element;
      }
      return { ...element, value: Math.ceil(Math.random() * 6) };
    });
    setDieNumber(clickedDie);
  }
  function hold(id) {
    const updatedDie = dieNumber.map((element) => {
      if (element.id === id) {
        return { ...element, isHeld: !element.isHeld };
      }
      return element;
    });
    setDieNumber(updatedDie);
  }

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">
        {dieNumber.map((dieObject) => {
          return (
            <Die
              value={dieObject.value}
              isHeld={dieObject.isHeld}
              key={dieObject.id}
              id={dieObject.id}
              hold={hold}
            ></Die>
          );
        })}
      </div>
      <button onClick={rollDice} className="roll-dice">
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
};

export default MainComponent;
