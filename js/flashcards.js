let setEnum = {
    'hi':0,
    'ka':1
}

let activeSet;

window.onload = () => {
    let setCodeSearch = new URLSearchParams(window.location.search);
    let setCode = Object.fromEntries(setCodeSearch.entries());
    fetch('../flashcards.json').then((res)=>{
        return res.json();
    }).then((data)=>{
        activeSet = data[setEnum[setCode.set]]
        loadSet(activeSet);
    });
};

function loadSet(set) {
    carousel = $(".carousel-inner")[0];
    for(let key in set){
        card = document.createElement("div");
        card.setAttribute("class", 'carousel-item');

        flipCard = document.createElement("div");
        flipCard.setAttribute("class", "flip-card");

        flipCardInner = document.createElement("div");
        flipCardInner.setAttribute("class", "flip-card-inner");

        flipCardFront = document.createElement("div");
        flipCardFront.setAttribute('class', 'flip-card-front');

        keyText = document.createElement("p");
        keyText.innerHTML = key;
        valueText = document.createElement("p");
        valueText.innerHTML = set[key];

        flipCardBack = document.createElement("div");
        flipCardBack.setAttribute('class','flip-card-back');

        flipCardBack.appendChild(valueText);
        flipCardFront.appendChild(keyText);
        flipCardInner.appendChild(flipCardFront);
        flipCardInner.appendChild(flipCardBack);
        flipCard.appendChild(flipCardInner);
        card.appendChild(flipCard);
        carousel.appendChild(card);
    }
    $('.carousel-item')[0].className += ' active';
}

function loadshuffle(set){
    
    carousel = $(".carousel-inner")[0];
    let activeCpy = JSON.parse(JSON.stringify(activeSet));
    for(let i = 0; i<Object.keys(activeSet).length; i++){
        let rand = getRand(Object.keys(activeCpy).length);
        let key = Object.keys(activeCpy)[rand];

        card = document.createElement("div");
        card.setAttribute("class", 'carousel-item');

        flipCard = document.createElement("div");
        flipCard.setAttribute("class", "flip-card");

        flipCardInner = document.createElement("div");
        flipCardInner.setAttribute("class", "flip-card-inner");

        flipCardFront = document.createElement("div");
        flipCardFront.setAttribute('class', 'flip-card-front');

        keyText = document.createElement("p");
        keyText.innerHTML = key;
        valueText = document.createElement("p");
        valueText.innerHTML = activeCpy[key];

        flipCardBack = document.createElement("div");
        flipCardBack.setAttribute('class','flip-card-back');

        flipCardBack.appendChild(valueText);
        flipCardFront.appendChild(keyText);
        flipCardInner.appendChild(flipCardFront);
        flipCardInner.appendChild(flipCardBack);
        flipCard.appendChild(flipCardInner);
        card.appendChild(flipCard);
        carousel.appendChild(card);
        delete activeCpy[key];
    }
    $('.carousel-item')[0].className += ' active';
}

function shuffle(){
    $('.shuffle').on('click', shuffleOn);
}

// function reOrder(isShuffled){
//     if(isShuffled){
//         let activeCpy = JSON.parse(JSON.stringify(activeSet));
//         for(card in $('.flip-card-inner')){
//             let rand = getRand(Object.keys(activeCpy).length);
//             let key = Object.keys(activeCpy)[rand];
//             $('.flip-card-front p', card).html(key);
//             $('.flip-card-back p', card).html(activeCpy[key]);
//             delete activeCpy[key];
//         }
//     }
//     else{
//         for(let i = 0; i<Object.keys(activeSet).length; i++){
//             let card = $('.flip-card-inner')[i];
//             let key = Object.keys(activeSet)[i];
//             $('.flip-card-front p', card).html(key);
//             $('.flip-card-back p', card).html(activeSet[key]);
//         }
//     }
// }

function shuffleOn(){
    $('.carousel-item').remove();
    $(this).off('click', shuffleOn);
    $(this).on('click', shuffleOff);
    loadshuffle(activeSet);
}

function shuffleOff(){
    $('.carousel-item').remove();
    $(this).off('click', shuffleOff)
    $(this).on('click', shuffleOn);
    loadSet(activeSet);
}

function getRand(max){
    return Math.floor(Math.random()*max);
}

