# Dev's Gambit

Welcome to the Dev's Gambit project!

Dev's Gambit is a web application that allows users to play chess against a computer or a friend.

## Functional Requirements

### Entities:
- **Game**: Each game has a unique ID, players, moves, and other relevant details.
- **User**: Users can start new games, view ongoing games, and review past games.

### Features:
- **Play Against Computer**: Users can play chess against a computer opponent.
- **Play Against Friend**: Users can play chess against another human player.
- **View Game History**: Users can view the history of moves in a game.

## Components

- **Home**: The landing page of the application.
- **ChessBoard**: Displays the chessboard and handles game logic.
- **MoveList**: Shows the list of moves made in the game.
- **ComputerMode**: Handles the logic for playing against the computer.
- **NavBar**: Navigation bar for the application.

## Technologies Used

- **Angular**: Framework for building web applications.
- **Angular Material**: UI component library for Angular.
- **RxJS**: Library for reactive programming using Observables.
- **TypeScript**: Typed superset of JavaScript.
- **SCSS**: CSS preprocessor for styling.

## Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in the development mode.
Open [http://localhost:4200](http://localhost:4200) to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

### `npm run build`
Builds the app for production to the `dist` folder.
It correctly bundles Angular in production mode and optimizes the build for the best performance.

## Installation
To install and run the Student Management Frontend project locally, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/dsvetiev/devs-gambit.git
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Start the application:
    ```sh
    npm run start
    ```

5. Open your browser and visit `http://localhost:4200` to access Dev's Gambit.