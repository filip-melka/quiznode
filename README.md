# Quiznode

<p align="center">
  <img src="https://github.com/filip-melka/quiznode/assets/173664063/4519713d-27da-4215-977e-47fa920d25b4" />
</p>

> The version of Quiznode on this branch doesn't use any backend server for handling requests to the OpenAI API. Because all requests are sent from the frontend, your OpenAI Secret key may be exposed.

Quiznode is a Chrome extension that leverages ChatGPT to create custom quizzes based on any Hashnode blog post.

As a software development student, I often read technical articles on Hashnode. To reinforce my learning, I created this extension to quiz myself on the content of any Hashnode article.

## Demo

https://github.com/filip-melka/quiznode/assets/173664063/e2cc24f6-ba57-4979-8d88-5d111a69b384

## Installation

In order to be able to run it, you will need OpenAI Secret key.

If you already have a Secret key, follow these instructions:

1. Clone this repo
2. Create an `openaiConfig.js` file and paste in the following code:
   ```js
   export const OPENAI_KEY = /* your OpenAI Secret key */
   ```
3. Load the extension in Chrome
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" by toggling the switch in the top right corner
   - Click on the "Load unpacked" button and select the `extension` folder of this repository
4. Pin the extension:
   - Click on the "Extensions" button next to the search bar and pin the "Quiznode" extension to your toolbar

## Usage

Whenever you are on a page containing a Hashnode article, the extension's icon will turn blue, indicating it is enabled.

<p align="center">
  <img src="https://github.com/filip-melka/quiznode/assets/173664063/b2df3866-b6d8-4259-80b2-02c8bac1ac81" />
</p>

Click on the icon to open a popup with the quiz.

## OpenAI Token Limit

The `max_tokens` property for the OpenAI API requests is set to `200`. You can modify this value in the `openai.js` file if needed.

---

Enjoy testing your knowledge with Quiznode!
