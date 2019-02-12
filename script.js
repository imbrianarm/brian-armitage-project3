$(document).ready(function () { 
  
  //DEFINE VARIABLE FOR PLAYER'S NAME
  const playerName = prompt(`Hi, what is your name?`)
  
  //START CLICK ACTION
  $('form').on('submit', function (event) {
    event.preventDefault();

    //SELECT A RANDOM PLAYER CARD FACE FROM 1 - 13 (TWO THROUGH ACE)
    let playerFace = Math.floor(Math.random() * 13);
    //SELECT A RANDOM DEALER CARD FACE FROM 1 - 13 (TWO THROUGH ACE)
    let dealerFace = Math.floor(Math.random() * 13);
    // console.log(playerFace, dealerFace);
    
    //DEFINE ACTION FOR PLAYER WIN SCENARIO
    if (playerFace > dealerFace) {
      console.log(`Congrats ${playerName}, you win! Please play again!!!`)
    //DEFINE ACTION FOR DEALER WIN SCENARIO
    } else if (playerFace < dealerFace) {
      console.log(`Sorry ${playerName}, you lost. Please play again!!!`)
    //DEFINE ACTION FOR TIE SCENARIO
    } else {
      console.log (`It looks like it is a tie.  Please play again!!!`)
    }

    //SELECT A RANDOM PLAYER CARD SUIT FROM 1 - 4 (4 SUITS)
    let playerSuit = Math.floor(Math.random() * 4);
    //SELECT A RANDOM DEALER CARD SUIT FROM 1 - 4 (4 SUITS)
    let dealerSuit = Math.floor(Math.random() * 4);
    // console.log(playerSuit, dealerSuit);

    //ARRAY CONVERTING FACE VALUES TO ACTUAL CARD VALUES
    const faceValue = [
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Jack",
      "Queen",
      "King",
      "Ace"
    ];

    //ARRAY CONVERTING SUIT VALUES TO ACTUAL SUITS
    const suitValue = [
      "Clubs",
      "Diamonds",
      "Hearts",
      "Spades"
    ];

    //PLAYER ACTUAL CARD DEFINITION
    let playerCard = `${faceValue[playerFace]} of ${suitValue[playerSuit]}`;
    //DEALER ACTUAL CARD DEFINITION
    let dealerCard = `${faceValue[dealerFace]} of ${suitValue[dealerSuit]}`;
    console.log(`${playerName}: ${playerCard}; Dealer: ${dealerCard}`);

  })
});
