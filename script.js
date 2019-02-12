$(document).ready(function () { 
  
  //HIDE PLAY AGAIN BUTTON
  $('button').hide();

  //ENABLE FLIP JQUERY PLUGIN - CHANGING TRIGGER TO MANUAL - TO BE DEFINED ON CLICK BELOW
  $(".card").flip({
    trigger: 'manual'
  });
  //https://nnattawat.github.io/flip/
  
  //DEFINE VARIABLE FOR PLAYER'S NAME
  const playerName = prompt(`Welcome to Mimi's War... name please?`);

  //START CLICK ACTION
  $('form').on('submit', function (event) {
    event.preventDefault();

    //TRIGGERING CARD FLIP ON BUTTON CLICK
    $('.card').flip(true);

    //HIDE DEAL BUTTON ON CLICK
    $(this).hide();

    //SHOW PLAY AGAIN BUTTON
    $('button').show();

    //DEFINING PLAY AGAIN BUTTON CLICK ACTION
    $('button').on('click', function (event) {
      event.preventDefault();

      //FLIP CARDS BACK
      $('.card').flip(false);

      //HIDE PLAY AGAIN BUTTON ON CLICK
      $(this).hide();

      //SHOW DEAL BUTTON
      $('form').show();

      //REMOVING PLAYER CARD TEXT FROM BACK OF CARD
      $('.player-card-text').html(``);
      //REMOVING DEALER CARD TEXT FROM BACK OF CARD
      $('.dealer-card-text').html(``);

      //REMOVE MAIN RESULT MESSAGE
      $('.message').html(``);

    })

    //SELECT A RANDOM PLAYER CARD FACE FROM 1 - 13 (TWO THROUGH ACE)
    let playerFace = Math.floor(Math.random() * 13);
    //SELECT A RANDOM DEALER CARD FACE FROM 1 - 13 (TWO THROUGH ACE)
    let dealerFace = Math.floor(Math.random() * 13);
    // console.log(playerFace, dealerFace);
    
    //DEFINE ACTION FOR PLAYER WIN SCENARIO AND PRINT RESULT MESSAGE TO SCREEN
    if (playerFace > dealerFace) {
      $('.message').html(`Congrats ${playerName}, you win! Please play again!!!`);
    //DEFINE ACTION FOR DEALER WIN SCENARIO AND PRINT RESULT MESSAGE TO SCREEN
    } else if (playerFace < dealerFace) {
      $('.message').html(`Sorry ${playerName}, you lost. Please play again!!!`);
    //DEFINE ACTION FOR TIE SCENARIO AND PRINT RESULT MESSAGE TO SCREEN
    } else {
      $('.message').html(`It looks like it is a tie ${playerName}.  Please play again!!!`);
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

    //ADDING PLAYER CARD IMAGE WITH ALT TEXT TO BACK OF CARD
    $('.player-back').html(`<img src="images/cards/${playerFace}-${playerSuit}.png" alt="${playerCard}">`);
    //ADDING DEALER CARD IMAGE WITH ALT TEXT TO BACK OF CARD
    $('.dealer-back').html(`<img src="images/cards/${dealerFace}-${dealerSuit}.png" alt="${dealerCard}">`);

    //ADDING PLAYER CARD TEXT TO BACK OF CARD
    $('.player-card-text').html(`${playerCard}`);
    //ADDING DEALER CARD TEXT TO BACK OF CARD
    $('.dealer-card-text').html(`${dealerCard}`);

    // console.log(`${playerName}: ${playerCard}; Dealer: ${dealerCard}`);
  })
});
