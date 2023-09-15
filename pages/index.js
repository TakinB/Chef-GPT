import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
// import IngredientInput from "./components/IngredientInput";


export default function Home() {
  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsString, setIngredientsString] = useState([]);
  const [result, setResult] = useState();
  const handleAddIngredient = () => {
    if (ingredientInput !== "") {
      setIngredients([...ingredients, ingredientInput]);
      setIngredientInput("");
    }
    if (ingredients.length > 0) {
      setIngredientsString(ingredients.join(", "));
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddIngredient();
    }
  };
  
  const renderRecipe = () => {
    if (result) {
      const resultObj = JSON.parse(result);
      return (
        <ul>
          {Object.entries(resultObj).map(([key, value]) => (
            <li key={key}>
              <span style={{ fontWeight: "bold" }}>{key}: </span>
              {key === "Ingredients" ? (
                  <span style={{ fontStyle: "italic" }}>
                    {value.join(", ")}
                  </span>
                ) : (
                  <span>{value}</span>
                )}
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  async function onSubmit(event) {
    event.preventDefault();
    console.log(ingredientsString);
    // to use text-davinci-003 model use route /api/generate
    try {
      const response = await fetch("/api/chatgpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ things: ingredientsString }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      console.log(data);
      setResult(data.result);
      setIngredientsString("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/robot.png" />
      </Head>
      {/* <IngredientInput/> */}
      <main className={styles.main}>
        <img src="/robot.png" className={styles.icon} />
        <h3>What should I cook?</h3>
        <form onSubmit={onSubmit}>
          <div className="ingredients">
          <input
              type="text"
              name="ingredient"
              placeholder="Enter ingredients"
              value={ingredientInput}
              onKeyPress={handleKeyPress}
              onChange={(e) => setIngredientInput(e.target.value)}
            />
            <button className={styles.button} onClick={handleAddIngredient}>
              Add
            </button>
          </div>
          {ingredients && <p>You have added:</p>}
          <ul className={styles.list}>
            {ingredients.map((ingredients, index) => (
            <li key={index}>{ingredients}</li>
          ))}
          </ul>
          <input type="submit" value="Generate recipe" />
        </form>
      
        {/* <button className={styles.button} onClick={handleAddIngredient}>
            Add
          </button> */}
        <div >{renderRecipe()}</div>
      </main>
    </div>
  );
}
