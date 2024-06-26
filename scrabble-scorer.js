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

const divLine = "\n----------------------------------------------\n"

function initialPrompt() {
   let userInput = input.question("Enter a word: ")
   while (!userInput || !/^[A-Za-z\s]*$/.test(userInput)) {
      console.log("\nPlease enter a valid word.\n")
      userInput = input.question("Enter a word: ")
   }
   return userInput
};

const simpleScorer = function (word) {
   word = word.toUpperCase()
   let points = 0
   for (let char of word) if (char !== " ") points++
   return points
};

const vowelBonusScorer = function (word) {
   word = word.toUpperCase()
   const vowels = "AEIOU"
   let points = 0
   for (let char of word) {
      if (vowels.includes(char)) points += 3
      else if (char !== " ") points++
   }
   return points
};

const scrabbleScorer = function (word) {
   word = word.toUpperCase();
   let points = 0;
   for (let char of word) if (char !== ' ') points += newPointStructure[char.toLowerCase()]
   return points;
};

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
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt() {
   console.log(`${divLine}Which scoring algorithm would you like to use?\n\n0 - Simple: One point per character \n1 - Vowel Bonus: Vowels are worth 3 points \n2 - Scrabble: Uses scrabble point system ${divLine}`)
   let userInput = Number(input.question(`Enter 0, 1, or 2: `))
   while (userInput !== 0 && !userInput || userInput < 0 || userInput > 2) {
      console.log("\nPlease enter a valid scorer.\n")
      userInput = Number(input.question(`Enter 0, 1, or 2: `))
   }
   return scoringAlgorithms[userInput]
}

let newPointStructure = transform(oldPointStructure)

function transform(oldPointStructure) {
   let newPointStructure = {}
   for (let point in oldPointStructure) {
      for (let letter of oldPointStructure[point]) newPointStructure[letter.toLowerCase()] = Number(point)
   }
   return newPointStructure
};

function playAgain() {
   let userInput = input.question("\nWould you like to play again?(Y/N) ").toUpperCase()
   if (userInput === 'Y' || userInput === 'YES') runProgram()
   else if (userInput === 'N' || userInput === 'NO') return
   else {
      console.log("\nPlease enter a valid input.")
      playAgain()
   }
}

function runProgram() {
   console.log(`${divLine}Let's play some scrabble!${divLine}`);
   const word = initialPrompt();
   console.log(`${divLine}Score for '${word}': ${scorerPrompt().scorerFunction(word)}`)
   playAgain()
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
