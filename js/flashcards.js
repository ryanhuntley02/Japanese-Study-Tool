let qCards;

function loadCards(){
    qCards = $('.carousel-item');
}

function shuffle() {
    $('.shuffle').on('click', shuffleOn);
}

function flipCard(){
    qCards = $('.carousel-item');
}

function reOrder(isShuffled) {
    //Get active card sets
    let qCurrent = $('.carousel-item');
    let qActive = $('.carousel-item.active')[0];
    let activeIndex = qCurrent.index(qActive);
    let qActivePre = qCurrent.slice(0, activeIndex);
    let qActivePost = qCurrent.slice(activeIndex);
    $('.carousel-item').remove();

    //Reorder sets
    if (isShuffled) {
        let qActivePreCpy = qActivePre.clone();
        for (let i = 0; i < qActivePre.length; i++) {
            let rand = getRand(qActivePreCpy.length);
            qActivePre[i] = qActivePreCpy[rand];
            qActivePreCpy.splice(rand, 1);
            console.log(qActivePreCpy.length);
        }
        let qActivePostCpy = qActivePost.clone();
        for (let i = 0; i < qActivePost.length; i++) {
            let rand = getRand(qActivePostCpy.length);
            qActivePost[i] = qActivePostCpy[rand];
            qActivePostCpy.splice(rand, 1);
        }
        qActivePost.removeClass('active');
        qActivePost[0].classList.add('active');
    }
    else{

    }

    //Add new ordered set
    qActivePre.each((index, card) => {
        $('.carousel-inner').append(card);
    });
    qActivePost.each((index, card) => {
        $('.carousel-inner').append(card);
    });

}

function shuffleOn() {
    $(this).off('click', shuffleOn);
    $(this).on('click', shuffleOff);
    reOrder(true);
}

function shuffleOff() {
    $(this).off('click', shuffleOff)
    $(this).on('click', shuffleOn);
    reOrder(false);
}

function getRand(max) {
    return Math.floor(Math.random() * max);
}

function compareCards(card1, card2) {
    if (qCards.index(card1) < qCards.index(card2)) {
        return -1;
    }
    if (qCards.index(card1) > qCards.index(card2)) {
        return 1;
    }
    else {
        return 0;
    }
}

