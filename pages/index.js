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


  
  async function onSubmit(event) {
    event.preventDefault();
    console.log(ingredientsString);
    // to use text-davinci-003 model use route /api/generate
    try {
      const response = await fetch("/api/generate", {
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
        <link rel="icon" href="/dog.png" />
      </Head>
      {/* <IngredientInput/> */}
      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>What should I cook?</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="ingredient"
            placeholder="Enter ingredients"
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
          />
          <input type="submit" value="Generate recipe" />
        </form>
        <button className={styles.button} onClick={handleAddIngredient}>
            Add
          </button>
        {/* <div className={styles.result}>{result}</div> */}
        {result && <p>{result}</p>}
      </main>
    </div>
  );
}
