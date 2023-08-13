let qCards;
let activePreShuffle;

//Page setup functions
////////////////////////////////////
function setup() {
    loadCards();
    shuffle();
    flipCard();
    trackStudied();
    flipOnChange();
}

function loadCards() {
    qCards = $('.carousel-item');
    qCards[0].classList.add('active');
}

function shuffle() {
    $('.shuffle').on('click', shuffleOn);
}

function flipCard() {
    qCards = $('.carousel-item');
    qCards.find('.flip-card').on('click', function () {
        $(this).hasClass('flip-card-play') ? $(this).removeClass('flip-card-play') : $(this).addClass('flip-card-play');
    });
}

function trackStudied() {
    $('.carousel-control-next').on('click', () => {
        $('.carousel-item.active').addClass('studied');
    });
}

function flipOnChange() {
    $('.carousel-control-next, .carousel-control-prev').on('click', function () {
        $(this).parent().on('transitionend', function () {
            $('.flip-card').removeClass('flip-card-play');
            $(this).off('transitionend', arguments.callee);
        });
    });
}
////////////////////////////////////

function reOrder(isShuffled) {
    let activePreUnshuffle;

    //Get active card sets
    let qActivePre = $('.carousel-item.studied');
    let qActivePost = $('.carousel-item').not('.studied');

    //Reorder sets
    if (isShuffled) {
        activePreShuffle = $('.carousel-item.active')[0];
        $('.carousel-item').removeClass('active');
        shuffleArray(qActivePre);
        shuffleArray(qActivePost);
        qActivePost[0].classList.add('active');
        if ($('.flip-card', activePreShuffle).hasClass('flip-card-play'))
            $('.flip-card', qActivePost[0]).addClass('flip-card-play');
    }
    else {
        activePreUnshuffle = $('.carousel-item.active')[0];
        $('.carousel-item').removeClass('active');
        qActivePre = qActivePre.sort(compareCards);
        qActivePost = qActivePost.sort(compareCards);
        activePreShuffle.classList.add('active');
    }

    $('.carousel-item').remove();

    if (activePreUnshuffle)
        if ($('.flip-card', activePreUnshuffle).hasClass('flip-card-play'))
            $('.flip-card', activePreUnshuffle).removeClass('flip-card-play');

    //Add new ordered set
    qActivePre.each((index, card) => {
        $('.carousel-inner').append(card);
    });
    qActivePost.each((index, card) => {
        $('.carousel-inner').append(card);
    });
    flipCard();

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
    return qCards.index(card1) - qCards.index(card2);
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
