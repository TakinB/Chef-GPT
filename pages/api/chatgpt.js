
export default async function (req, res) {
    const { messages } = generatePrompt(req.body.things)
    const apiKey = process.env.OPENAI_API_KEY
    const url = 'https://api.openai.com/v1/chat/completions'
  
    if (!configuration.apiKey) {
        res.status(500).json({
          error: {
            message: "OpenAI API key not configured, please follow instructions in README.md",
          }
        });
        return;
      }
    
      const things = req.body.things || '';
      if (things.trim().length === 0) {
        res.status(400).json({
          error: {
            message: "Please enter a valid ingredient",
          }
        });
        return;
      }
      
    const body = JSON.stringify({
      messages,
      model: 'gpt-3.5-turbo',
      stream: false
    })
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body
      })
      const data = await response.json()
      res.status(200).json({ data })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
}

function generatePrompt(things) {
    return `Suggest a recipe using only ${things} n the following format:Name of the recipe,Ingredients, Time to prepare,Steps`;
  }