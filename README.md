# Hat Finding Game

Welcome to the Hat Finding Game! In this console-based game, your goal is to find the hat symbol (👑) hidden in a field while avoiding holes (🚽) and staying within the field bounds.

## Installation

1. Make sure you have Node.js installed on your system.
2. Clone this repository: `git clone https://github.com/siwakorn-nd/hat-finding-game.git`
3. Navigate to the project folder: `cd hat-finding-game`
4. Install the required dependencies: `npm install`

## Usage

1. Start the game: `node index.js`
2. Use the following controls to move the player character (👩):
   - `a`: Move left
   - `w`: Move up
   - `d`: Move right
   - `s`: Move down
3. Your goal is to find the hat (👑) symbol hidden somewhere on the field while avoiding holes (🚽) and staying within the field boundaries.
4. If you find the hat, you win! If you fall into a hole or hit a border, the game is over.

## Gameplay Details

### Field Map

The game starts with a field map filled with purple squares (🟪) representing the ground.

### Player Character

You control the player character (👩) using the controls mentioned above. The player starts at the top-left corner of the field.

### Hat

The hat symbol (👑) is hidden somewhere on the field. Your goal is to find the hat to win the game.

### Holes

Holes (🚽) are randomly placed throughout the field. If you fall into a hole, the game is over.

### Winning

If you find the hat (👑), you win the game! The game will prompt you to play again.

### Losing

If you fall into a hole or hit a field boundary, the game is over. The game will prompt you to play again.
