const openBtn = document.getElementById('open-btn');
const closeBtn = document.getElementById('close-btn');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const clearBtn = document.getElementById('clear-btn');
const addCardForm = document.getElementById('form-add-card');
const addCardContainer = document.getElementById('add-card-container');
const container = document.getElementById('container');
const cardContainer = document.getElementById('card-container');
const cardArr = getCardsLocalStorage();
var currentCard = 0;
var totalCards = 0;
var totalCardsParagraph = document.getElementById('total-cards');
const cardElementArr = [];

showCardsDom();

// add new card
function addNewCard(e) {
    e.preventDefault();
    
    let question = document.getElementById('question').value;
    let answer = document.getElementById('answer').value;
    const cardContent = {question, answer};

    cardArr.push(cardContent);
    setCardsLocalStorage(cardArr);

}

// show cards in DOM
function showCardsDom() {
    cardArr.forEach((card) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.innerHTML = 
            `
            <p class="card-question">${card.question}</p>
            <hr class="card-hr">
            <p class="card-answer">${card.answer}</p>
            <button class="btn btn-showAnswer" onclick="showAnswer(event)">Show answer</button>`
        cardContainer.appendChild(cardElement);
        cardElementArr.push(cardElement);
        totalCards++;
    });

    if(cardElementArr[0]) {
        cardElementArr[0].classList.add('active');
        totalCardsParagraph.innerText = `${currentCard + 1}/${totalCards}`;
    } else {
        totalCardsParagraph.innerText = `${currentCard}/${totalCards}`;
    }
}

// set cards to local storage
function setCardsLocalStorage(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));
    window.location.reload();
}

// get cards from local storage
function getCardsLocalStorage() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}

// clear all cards 
clearBtn.addEventListener('click', () => {
    localStorage.clear();
    window.location.reload();console.log('teste');
})

// show answer
function showAnswer(event) {
    event.target.previousElementSibling.classList.add('active');

    event.target.style.display = 'none';
}

// hide btns
function hideBtns() {
    // hide next btn
    if(cardElementArr.length == currentCard + 1) {
        nextBtn.classList.add('hide');
    } else {
        nextBtn.classList.remove('hide');
    }


    // hide prev btn
    if(currentCard == 0) {
        prevBtn.classList.add('hide');
    } else {
        prevBtn.classList.remove('hide');
    }
}

// show next card
function showNextCard() {

    currentCard = currentCard + 1;

    cardElementArr[currentCard].classList.add('active');

    cardElementArr[currentCard - 1].classList.remove('active');

    totalCardsParagraph.innerText = `${currentCard + 1}/${totalCards}`;

    hideBtns();
}

// show prev card
function showPrevCard() {

    cardElementArr[currentCard].classList.remove('active');

    currentCard = currentCard - 1;

    cardElementArr[currentCard].classList.add('active');

    totalCardsParagraph.innerText = `${currentCard + 1}/${totalCards}`;

    console.log(cardElementArr);
    console.log(currentCard + 1);

    hideBtns();
}

// open add card container
openBtn.addEventListener('click', () => {
    addCardContainer.classList.add('active');
});

// close add card container
closeBtn.addEventListener('click', () => {
    addCardContainer.classList.remove('active');
});

addCardForm.addEventListener('submit', addNewCard);
nextBtn.addEventListener('click', showNextCard);
prevBtn.addEventListener('click', showPrevCard);