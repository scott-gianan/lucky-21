'use strict';
const cards = {
    1: ['1-C','1-D','1-H','1-S'],
    2: ['2-C','2-D','2-H','2-S'],
    3: ['3-C','3-D','3-H','3-S'],
    4: ['4-C','4-D','4-H','4-S'],
    5: ['5-C','5-D','5-H','5-S'],
    6: ['6-C','6-D','6-H','6-S'],
    7: ['7-C','7-D','7-H','7-S'],
    8: ['8-C','8-D','8-H','8-S'],
    9: ['9-C','9-D','9-H','9-S'],
    10: ['10-C','10-D','10-H','10-S','J-C','J-D','J-H', 'J-S','Q-C','Q-D','Q-H','Q-S','K-C','K-D','K-H','K-S'],
};
//cards in the table
const disposedCards = [];
const playerHandCards = [];
const dealerHandCards = [];
//card value
let playerHandValue = 0;
let dealerHandValue =0;
//bets
let playerBet = 0;
let playerMoney = Number.parseInt(localStorage.getItem('playerMoney'),10);
const bets = document.querySelectorAll('.bet');
//text
const playerHandValueText = document.querySelector('#player-hand-value');
const dealerHandValueText = document.querySelector('#dealer-hand-value');
const playerMoneyText = document.querySelector('#player-money');
//hands
const dealerHand = document.querySelector('#dealer-hand');
const playerHand = document.querySelector('#player-hand');
//buttons
const hitBtn = document.querySelector('#hit-button');
const standBtn = document.querySelector('#stand-button');
const playAgainBtn = document.querySelector('#play-again');
//cover card
const coverCard = document.querySelector('.cover-card');

function randomCardValue(){
    return Math.floor(Math.random()*10)+1;
}

function randomCard(){
    let randomCardArray = cards[randomCardValue()];
    return randomCardArray[Math.round(Math.random()*(randomCardArray.length-1))]
}

function generateCard(){
    let cardImg = document.createElement('img');
    let card = randomCard();
    if(disposedCards.every(disposedCard => disposedCard!==card)){
        disposedCards.push(card);
        cardImg.src=`./card-img/${card}.png`;
        if(card[0]==='J' || card[0]==='Q'|| card[0]==='K' || card.length===4){
            cardImg.alt = `10`;
        } else {
            cardImg.alt = card[0];
        }
        cardImg.width = '100';
        cardImg.className = 'player-card';
        return cardImg;
    } else {
        return generateCard();
    }
}

function firstDealtCards(){
    //player hand
    for(let i=1; i<=2; i++){
        let firstPlayerDealtCard = playerHand.appendChild(generateCard());
        playerHandCards.push(firstPlayerDealtCard.src);
    }
    //dealer hand
    for(let i=1; i<=2; i++){
        let firstDealerDealthCards = dealerHand.appendChild(generateCard());
        firstDealerDealthCards.className = 'dealer-card';
        dealerHandCards.push(firstDealerDealthCards.src);
    }
}
firstDealtCards();

const playerCards = document.querySelectorAll('.player-card');
const dealerCards = document.querySelectorAll('.dealer-card');

function countPlayerValue(){
    playerCards.forEach(playerCard => {
        playerHandValue += Number.parseInt(playerCard.alt,10);
    })
}
countPlayerValue();

function countDealerValue(){
    dealerCards.forEach(dealerCard => {
        dealerHandValue += Number.parseInt(dealerCard.alt,10);
    })
}
countDealerValue();

function hit(){
    let hittedCard = playerHand.appendChild(generateCard());
    playerHandValue += Number.parseInt(hittedCard.alt,10);
    playerHandCards.push(hittedCard.src);
    showPlayerHandValue();
    gameOver();
}

function showPlayerHandValue(){
    playerHandValueText.innerText = `Your Hand: ${playerHandValue}`
}
showPlayerHandValue();

function gameOver(){
    if (playerHandValue>21){
        showFirstCard();
        playerLost();
        showDealerValue();
    } else if (playerHandValue === 21){
        showFirstCard();
        playerBlackJack();
        showDealerValue();
    }
}

function playAgain(){
    location.reload();
    playAgainBtn.disabled = true;
    localStorage.removeItem('playerBet');
}

bets.forEach(bet => {
    bet.addEventListener('click', ()=> {
        playerMoney = Number.parseInt(localStorage.getItem('playerMoney'),10);
        playAgainBtn.disabled = true;
        localStorage.setItem('playerBet',bet.innerText);
        playerBet = Number.parseInt(localStorage.getItem('playerBet'),10);
        setTimeout(() => {
            bets.forEach(bet=>{
                bet.disabled=true;
                hitBtn.disabled = false;
                standBtn.disabled = false;
            })
        }, 100);
    })
})

function disableHitStandEnablePlay(){
    hitBtn.disabled = true;
    standBtn.disabled = true;
    playAgainBtn.disabled = false;
}

function playerBlackJack(){
    disableHitStandEnablePlay();
    localStorage.setItem('playerMoney',playerMoney+(1.5*playerBet));
    playerMoney = Number.parseInt(localStorage.getItem('playerMoney'),10);
    showPlayerMoney();
}

function playerLost(){
    disableHitStandEnablePlay();
    localStorage.setItem('playerMoney',playerMoney-(2*playerBet));
    playerMoney = Number.parseInt(localStorage.getItem('playerMoney'),10);
    showPlayerMoney();
}

function playerWon(){
    disableHitStandEnablePlay();
    localStorage.setItem('playerMoney',playerMoney+(2*playerBet));
    playerMoney = Number.parseInt(localStorage.getItem('playerMoney'),10);
    showPlayerMoney();
}

function draw(){
    disableHitStandEnablePlay();
}

function showPlayerMoney(){
    playerMoneyText.innerText = `Money: ${playerMoney}`;
}
showPlayerMoney();

function showDealerValue(){
    dealerHandValueText.innerText = `Hand: ${dealerHandValue}`;
}

function showFirstCard(){
    dealerHand.removeChild(coverCard);
}

function stand(){
    showDealerValue();
    showFirstCard();
    if(playerHandValue>dealerHandValue){
        playerWon();
    } else if (dealerHandValue>playerHandValue){
        playerLost();
    } else if (dealerHandValue===playerHandValue){
        draw();
    }
}

// this function will loop through the cards to see if they have an 'Ace'



//function invokation:


