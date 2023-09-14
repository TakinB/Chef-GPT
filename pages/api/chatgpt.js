import { ChatGPTAPI } from 'chatgpt'

const configuration = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY,
    completionParams: {
      model: 'gpt-4',
      temperature: 0.5,
      top_p: 0.8
    }
  })

const chatgpt = new ChatGPTAPI(configuration);

export default async function (req, res) {
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
      
      try {
        const completion = await chatgpt.sendMessage(generatePrompt(things));
        console.log(completion);
        res.status(200).json({ result: completion.text });
      } catch(error) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
          console.error(error.response.status, error.response.data);
          res.status(error.response.status).json(error.response.data);
        } else {
          console.error(`Error with OpenAI API request: ${error.message}`);
          res.status(500).json({
            error: {
              message: 'An error occurred during your request.',
            }
          });
        }
      }
    }

function generatePrompt(things) {
    return `Suggest a recipe using only ${things} n the following format:Name of the recipe,Ingredients, Time to prepare,Steps`;
  }