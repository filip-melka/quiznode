# Quiznode

<p align="center">
  <img src="https://github.com/filip-melka/quiznode/assets/173664063/4519713d-27da-4215-977e-47fa920d25b4" />
</p>

Quiznode is a Chrome extension that leverages ChatGPT to create custom quizzes based on any Hashnode blog post.

As a software development student, I often read technical articles on Hashnode. To reinforce my learning, I created this extension to quiz myself on the content of any Hashnode article.

## Demo

https://github.com/filip-melka/quiznode/assets/173664063/acffdf8b-e01c-4afd-bd54-6009187f35cc

## Installation

To run Quiznode, you will need an OpenAI Secret key. If you already have one, follow these steps:

1. Clone this repository
2. Install server dependencies:
   - Navigate to the `server` folder and run:
   ```
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file inside the `server` folder and add your OpenAI Secret key:
   ```
   OPENAI_KEY=<your_secret_key>
   ```
4. Start the server
   - Inside the `server` folder, run:
   ```
   node app
   ```
5. Load the extension in Chrome
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" by toggling the switch in the top right corner
   - Click on the "Load unpacked" button and select the `extension` folder of this repository
6. Pin the extension:
   - Click on the "Extensions" button next to the search bar and pin the "Quiznode" extension to your toolbar

> If you don't want to use a backend server for dealing with OpenAI requests, you can switch to the `frontend` branch, where all requests are sent from the frontend. However, this is not recommended, due to security risks.

## Usage

Whenever you are on a page containing a Hashnode article, the extension's icon will turn blue, indicating it is enabled.

<p align="center">
  <img src="https://github.com/filip-melka/quiznode/assets/173664063/b2df3866-b6d8-4259-80b2-02c8bac1ac81" />
</p>

Click on the icon to open a popup with the quiz.

## OpenAI Token Limit

The `max_tokens` property for the OpenAI API requests is set to `200`. You can modify this value in the `server/openai.js` file if needed.

---

Enjoy testing your knowledge with Quiznote!
