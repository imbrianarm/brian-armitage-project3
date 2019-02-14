$(document).ready(function () { 
  
  //HIDE PLAY AGAIN BUTTON
  $('.play-again-button').hide();

  //ENABLE FLIP JQUERY PLUGIN - CHANGING TRIGGER TO MANUAL - TO BE DEFINED ON CLICK BELOW
  $(".card").flip({
    trigger: 'manual'
  }); //https://nnattawat.github.io/flip/
  
  //DEFINE VARIABLE FOR PLAYER'S NAME AND AGE
  let playerName;
  let playerAge;

  //CLEARING NAME AND AGE UPON PAGE LOAD
  $('.name').val('');
  $('.age').val('');

  //HIDING MAIN PLAYING AREA UNTIL NAME IS SUBMITTED
  $('.playing-area').hide();

  //DEFINING ACTION ONCE NAME AND AGE ARE SUBMITTED
  //PLAYER NAME FROM FORM VALUE PUSHED TO PLAYERNAME VARIABLE
  //PLAYER AGE FROM FORM PUSHED TO PLAYERAGE VARIABLE
  //IF UNDER 19, WILL RECEIVE ERROR MESSAGE
  //IF OVER 19, WILL PROCEED TO HIDE FORM ONCE SUBMITTED
  //SHOW MAIN PLAING AREA ONCE NAME AND AGE SUBMITTED
  $('form').on('submit', function (event) {
    event.preventDefault();
    playerName = $('.name').val();
    playerAge = $('.age').val();
    if (playerAge >= 19) {
    $('form').hide();
    $('.playing-area').show();
    } else {
      $('.aside-message').html(`Sorry ${playerName}, you must be 19 to enter the casino`);
    }
  });
  
  //START CLICK ACTION
  //TRIGGERING CARD FLIP ON BUTTON CLICK
  //HIDE DEAL BUTTON ON CLICK
  //SHOW PLAY AGAIN BUTTON
  $('.deal-button').on('click', function (event) {
    event.preventDefault();
    $('.card').flip(true);
    $(this).hide();
    $('.play-again-button').show();

    //DEFINING PLAY AGAIN BUTTON CLICK ACTION
    //FLIP CARDS BACK
    //HIDE PLAY AGAIN BUTTON ON CLICK
    //SHOW DEAL BUTTON
    //REMOVING PLAYER CARD TEXT FROM BACK OF CARD
    //REMOVING DEALER CARD TEXT FROM BACK OF CARD
    //REMOVE MAIN RESULT MESSAGE
    $('.play-again-button').on('click', function (event) {
      event.preventDefault();
      $('.card').flip(false);
      $(this).hide();
      $('.deal-button').show();
      $('.player-card-text').html(``);
      $('.dealer-card-text').html(``);
      $('.message').html(``);
    })

    //SELECT A RANDOM PLAYER CARD FACE FROM 1 - 13 (TWO THROUGH ACE)
    let playerFace = Math.floor(Math.random() * 13);
    //SELECT A RANDOM DEALER CARD FACE FROM 1 - 13 (TWO THROUGH ACE)
    let dealerFace = Math.floor(Math.random() * 13);
    
    //DEFINE ACTION FOR PLAYER WIN SCENARIO AND PRINT RESULT MESSAGE TO SCREEN
    //DEFINE ACTION FOR DEALER WIN SCENARIO AND PRINT RESULT MESSAGE TO SCREEN
    //DEFINE ACTION FOR TIE SCENARIO AND PRINT RESULT MESSAGE TO SCREEN
    if (playerFace > dealerFace) {
      $('.message').html(`Congrats ${playerName}, you win! Please play again!!!`);
    } else if (playerFace < dealerFace) {
      $('.message').html(`Sorry ${playerName}, you lost. Please play again!!!`);
    } else {
      $('.message').html(`It looks like it is a tie ${playerName}.  Please play again!!!`);
    }

    //SELECT A RANDOM PLAYER CARD SUIT FROM 1 - 4 (4 SUITS)
    let playerSuit = Math.floor(Math.random() * 4);
    //SELECT A RANDOM DEALER CARD SUIT FROM 1 - 4 (4 SUITS)
    let dealerSuit = Math.floor(Math.random() * 4);

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
  })
});
