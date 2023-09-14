import React, { useState } from "react";
import styles from "./IngredientInput.module.css";

const IngredientInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [result, setResult] = useState();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddIngredient = () => {
    if (inputValue !== "") {
      setIngredients([...ingredients, inputValue]);
      setInputValue("");
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ things: ingredients }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setIngredients("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className={styles.container}>
      <label className={styles.label}>Ingredients:</label>
      <input
        className={styles.input}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter ingredients..."
      />
      <button className={styles.button} onClick={handleAddIngredient}>
        Add
      </button>
      <ul className={styles.list}>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      {result && <p>{result}</p>}
      {ingredients.length > 0 && (
        <button className={styles.submitButton} onClick={handleSubmit}>
          Submit
        </button>
      )}
    </div>
  );
};

export default IngredientInput;
