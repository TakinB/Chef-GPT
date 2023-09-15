# What should I cook tonight?

You have a few ingridients, you want to cook, and you don't want to make a shopping trip. Ask chat GPT to create a recipe based on the ingridients you have at home.

It will also create an image of what it may look like! (upcoming feature)
![](public/chef-gpt.gif)

## Setup

1. If you don’t have Node.js installed, [install it from here](https://nodejs.org/en/) (Node.js version >= 14.6.0 required)

2. Clone this repository

3. Navigate into the project directory

   ```bash
   $ cd Chef-GPT
   ```

4. Install the requirements

   ```bash
   $ npm install
   ```

5. Make a file called .env with the following content

   ``` OPENAI_API_KEY="YOUR KEY HERE"```
6. Add your [API key](https://platform.openai.com/account/api-keys) to the newly created `.env` file


7. Run the app

   ```bash
   $ npm run dev
   ```

You should now be able to access the app at [http://localhost:3000](http://localhost:3000)! For the full context behind this example app, check out the [tutorial](https://platform.openai.com/docs/quickstart).
# chef-GPT
