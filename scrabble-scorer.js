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
      scorerFunction: simpleScorer
   },
   {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer
   },
   {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scorerFunction: undefined
   }
];

function scorerPrompt() { }

let newPointStructure = transform(oldPointStructure)

function transform(oldPointStructure) {
   let newPointStructure = {}
   for (let point in oldPointStructure) {
      for (let i of oldPointStructure[point]) {
         newPointStructure[i.toLowerCase()] = Number(point)
      }
   }
   return newPointStructure
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
