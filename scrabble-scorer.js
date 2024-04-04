// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
   word = word.toUpperCase();
   let letterPoints = "";

   for (let i = 0; i < word.length; i++) {

      for (const pointValue in oldPointStructure) {

         if (oldPointStructure[pointValue].includes(word[i])) {
            letterPoints += `Points for '${word[i]}': ${pointValue}\n`
         }

      }
   }
   return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!\n\n");
   console.log(oldScrabbleScorer(input.question("Enter a word: ")))
};

let simpleScorer = function (word) {
   word = word.toUpperCase()
   let points = 0
   for (let i = 0; i < word.length; i++) {
      points++
   }
   return points
};

let vowelBonusScorer = function (word) {
   word = word.toUpperCase()
   let vowels = "AEIOU"
   let points = 0
   for (let i = 0; i < word.length; i++) {
      if (vowels.includes(word[i])) points += 3
      else points++
   }
   return points
};

let scrabbleScorer;

const scoringAlgorithms = [
   {
      name: "Simple Score",
      description: "Each letter is worth 1 point.",
      scoringFunction: "A function with a parameter for user input that returns a score."
   },
   {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scoringFunction: "A function that returns a score based on the number of vowels and consonants."
   },
   {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scoringFunction: "Uses the oldScrabbleScorer() function to determine the score for a given word."
   }
];

function scorerPrompt() {}

function transform() { };

let newPointStructure = {
   A: 1,
   B: 3,
   C: 3,
   D: 2,
   E: 1,
   F: 4,
   G: 2,
   H: 4,
   I: 1,
   J: 8,
   K: 5,
   L: 1,
   M: 3,
   N: 1,
   O: 1,
   P: 3,
   Q: 10,
   R: 1,
   S: 1,
   T: 1,
   U: 1,
   V: 4,
   W: 4,
   X: 8,
   Y: 4,
   Z: 10
};

function runProgram() {
   initialPrompt();

}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
   runProgram: runProgram,
   scorerPrompt: scorerPrompt
};
