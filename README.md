EI-Lotteria Game Application
A  interactive lottery game app where players can select numbers on a grid. Numbers are drawn randomly, and players win by completing a row or column. The app tracks numbers and visually marks them as they are drawn.

Features
Interactive Grid: Players can select numbers on a grid.
Random Number Generation: Draws random numbers and crosses them out on the player’s grid.
Win Condition: Players win when a row or column is fully crossed out.
Game End: Option to end the game once a win condition is met.
Project Structure
plaintext
Copy code
project-root/
├── backend/              # Backend logic (Node.js, Express)
│   ├── routes/           # API routes
│   └── server.js         # Server setup and game logic
└── client/               # Frontend (React)
    ├── src/
    │   ├── components/   # UI components for the game grid
    │   ├── App.js        # Main game logic and components
    │   └── index.js      # Entry point for React
    └── public/           # Static assets
Setup and Installation
Prerequisites
Node.js
Steps
Clone the Repository:

bash
Copy code
git clone <repository-url>
cd project-root
Backend Setup:

Navigate to the backend directory:
bash
Copy code
cd backend
Install dependencies:
bash
Copy code
npm install
Start the server:
bash
Copy code
npm start
Frontend Setup:

Go to the client directory:
bash
Copy code
cd ../client
Install frontend dependencies:
bash
Copy code
npm install
Start the client application:
bash
Copy code
npm start
Access the Game:

Visit http://localhost:3000 to start playing.
How to Play
Click numbers on the grid to select your lucky numbers.
Press "Start Game" to begin drawing random numbers.
Watch as your selected numbers are crossed out.
Win by completing a full row or column on the grid!
Contributing
Pull requests and issue reports are welcome to improve the gameplay.

