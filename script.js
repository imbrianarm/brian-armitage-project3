const myApp = {};

$(document).ready(function () { 
  myApp.init();
});

myApp.init = () => {
  //HIDE PLAY AGAIN BUTTON, HEADER, AND MAIN PLAYING AREA ON PAGE LOAD UNTIL NAME/AGE SUBMITTED
  myApp.hideFunction('.play-again-button');
  myApp.hideFunction('section');
  myApp.hideFunction('header');
  //CLEARING NAME AND AGE UPON PAGE LOAD
  myApp.clearForm('.name');
  myApp.clearForm('.age');
  //CALL NAME FORM SUBMIT BUTTON EVENT LISTENER
  myApp.nameFormSubmit();
  //DEAL BUTTON ACTION EVENT LISTENER
  myApp.dealButtonAction();
  //PLAY AGAIN BUTTON ACTION EVENT LISTENER
  myApp.playAgainButtonAction();
};

//DEFINE HIDE FUNCTION
myApp.hideFunction = (hide) => {
  $(hide).hide();
}

//DEFINE SHOW FUNCTION
myApp.showFunction = (show) => {
  $(show).show();
}

//DEFINE FORM CLEAR FUNCTION
myApp.clearForm = (form) => {
  $(form).val('');
}

//ENABLE FLIP JQUERY PLUGIN - CHANGING TRIGGER TO MANUAL - TO BE DEFINED ON CLICK BELOW
$(".card").flip({
  trigger: 'manual'
}); //https://nnattawat.github.io/flip/


//DEFINING ACTION ONCE NAME AND AGE ARE SUBMITTED
//PLAYER NAME FROM FORM VALUE PUSHED TO PLAYERNAME VARIABLE
//PLAYER AGE FROM FORM PUSHED TO PLAYERAGE VARIABLE
//IF UNDER 19, WILL RECEIVE ERROR MESSAGE
//IF OVER 19, WILL PROCEED TO HIDE FORM ONCE SUBMITTED
//SHOW HEADER AND MAIN PLAING AREA ONCE NAME AND AGE SUBMITTED
//PLAY DOG BARKING SOUND
myApp.nameFormSubmit = () => {
  $('form').on('submit', function (event) {
    event.preventDefault();
    myApp.playerName = $('.name').val();
    myApp.playerAge = $('.age').val();
    if (myApp.playerAge >= 19) {
      myApp.hideFunction('aside');
      myApp.showFunction('section');
      myApp.showFunction('header');
      $('.playing-area').append(`
      <audio autoplay>
        <source src="audio/bark.mp3" type="audio/mpeg">
        <source src="audio/bark.wav" type="audio/wav">
        Your browser does not support the audio element.
      </audio>
      `);
      $('.zoomInRight h3').append(`<span>${myApp.playerName}'s</span> Card`);
    } else {
      $('.aside-message').html(`Sorry ${myApp.playerName}, you must be 19 to enter the casino`);
    }
  });
}

//START CLICK ACTION
//TRIGGERING CARD FLIP ON BUTTON CLICK
//PLAY CARD FLIP SOUND
//HIDE DEAL BUTTON ON CLICK
//SHOW PLAY AGAIN BUTTON
myApp.dealButtonAction = () => {
  $('.deal-button').on('click', function (event) {
    event.preventDefault();
    $('.playing-area').append(`
    <audio autoplay>
      <source src="audio/card-flip.mp3" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
    `);
    $('.card').flip(true);
    myApp.hideFunction(this);
    myApp.showFunction('.play-again-button');
    
    //DEFINING RANDOM INTEGER GENERATOR
    myApp.random = (number) => {
      return Math.floor(Math.random() * number);
    }

    //SELECT A RANDOM PLAYER CARD FACE FROM 1 - 13 (TWO THROUGH ACE)
    myApp.playerFace = myApp.random(13);
    //SELECT A RANDOM DEALER CARD FACE FROM 1 - 13 (TWO THROUGH ACE)
    myApp.dealerFace = myApp.random(13);
    
    //DEFINE ACTION FOR PLAYER WIN SCENARIO AND PRINT RESULT MESSAGE TO SCREEN
    //DEFINE ACTION FOR DEALER WIN SCENARIO AND PRINT RESULT MESSAGE TO SCREEN
    //DEFINE ACTION FOR TIE SCENARIO AND PRINT RESULT MESSAGE TO SCREEN
    if (myApp.playerFace > myApp.dealerFace) {
      $('.message').html(`Congrats ${myApp.playerName}, you win! Please play again!!!`);
      $('.main-image').html(`<img src="images/mimi-win-${myApp.random(2)}.jpg" class="animated fadeIn" alt="Mimi is happy, you won">`);
    } else if (myApp.playerFace < myApp.dealerFace) {
      $('.message').html(`Sorry ${myApp.playerName}, you lose. Please play again!!!`);
      $('.main-image').html(`<img src="images/mimi-lose-${myApp.random(2)}.jpg" class="animated fadeIn" alt="Mimi is angry, you lost">`);
    } else {
      $('.message').html(`It looks like it is a tie ${myApp.playerName}.  Please play again!!!`);
      $('.main-image').html(`<img src="images/mimi-tie-${myApp.random(2)}.jpg" class="animated fadeIn" alt="Mimi is chillin, it's a tie">`);
    }
    
    //SELECT A RANDOM PLAYER CARD SUIT FROM 1 - 4 (4 SUITS)
    myApp.playerSuit = myApp.random(4);
    //SELECT A RANDOM DEALER CARD SUIT FROM 1 - 4 (4 SUITS)
    myApp.dealerSuit = myApp.random(4);
    
    //ARRAY CONVERTING FACE VALUES TO ACTUAL CARD VALUES
    myApp.faceValue = [
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
    myApp.suitValue = [
      "Clubs",
      "Diamonds",
      "Hearts",
      "Spades"
    ];
    
    //PLAYER ACTUAL CARD DEFINITION
    myApp.playerCard = `${myApp.faceValue[myApp.playerFace]} of ${myApp.suitValue[myApp.playerSuit]}`;
    
    //DEALER ACTUAL CARD DEFINITION
    myApp.dealerCard = `${myApp.faceValue[myApp.dealerFace]} of ${myApp.suitValue[myApp.dealerSuit]}`;
    
    //DEFINING CARD IMAGE PUSH TO CARD CONTAINER
    myApp.cardPush = (user, face, suit, card) => {
      $(`.${user}-back`).html(`
      <img src="images/cards/${face}-${suit}.png" alt="${card}">
      <div class="text-box">
      <h3 class="${user}-card-text"></h3>
      </div>
      `);
    };

    //ADDING PLAYER CARD IMAGE WITH ALT TEXT TO BACK OF CARD
    myApp.cardPush('player', myApp.playerFace, myApp.playerSuit, myApp.playerCard);
    //ADDING DEALER CARD IMAGE WITH ALT TEXT TO BACK OF CARD
    myApp.cardPush('dealer', myApp.dealerFace, myApp.dealerSuit, myApp.dealerCard);
    
    //DEFINING PUSHING CARD TEXT MESSAGE
    myApp.cardTextPush = (container, card) => {
      $(`${container}`).html(`${card}`);
    }

    //ADDING PLAYER CARD TEXT TO BACK OF CARD
    myApp.cardTextPush('.player-card-text', myApp.playerCard);
    // $('.player-card-text').html(`${myApp.playerCard}`);
    
    //ADDING DEALER CARD TEXT TO BACK OF CARD
    myApp.cardTextPush('.dealer-card-text', myApp.dealerCard);
    // $('.dealer-card-text').html(`${myApp.dealerCard}`);
  });
};

//DEFINE ELEMENT CLEARING FUNCTION
myApp.clearElement = (element) => {
  $(element).html('');
}

//DEFINING PLAY AGAIN BUTTON CLICK ACTION
//FLIP CARDS BACK
//HIDE PLAY AGAIN BUTTON ON CLICK
//SHOW DEAL BUTTON
//REMOVING PLAYER CARD TEXT FROM BACK OF CARD
//REMOVING DEALER CARD TEXT FROM BACK OF CARD
//REMOVE MAIN RESULT MESSAGE
myApp.playAgainButtonAction = () => {
  $('.play-again-button').on('click', function (event) {
    event.preventDefault();
    $('.card').flip(false);
    myApp.hideFunction(this);
    myApp.showFunction('.deal-button');
    myApp.clearElement('.player-card-text');
    myApp.clearElement('.dealer-card-text');
    myApp.clearElement('.message');
    myApp.clearElement('.main-image');
  })
}