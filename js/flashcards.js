let qCards;
let activePreShuffle;
let count = 1;

//Page setup functions
////////////////////////////////////
function setup() {
    loadCards();
    shuffle();
    flipCard();
    carouselControls();
}

function loadCards() {
    qCards = $('.carousel-item');
    qCards[0].classList.add('active');
}

function shuffle() {
    $('.shuffle').on('click', shuffleOn);
}

function flipCard() {
    qCards.find('.flip-card-inner').on('click', function () {
        $(this).parent().hasClass('flip-card-play') ? $(this).parent().removeClass('flip-card-play') : $(this).parent().addClass('flip-card-play');
    });
    qCards.find('.flip-card-inner').on('transitionend', (e) => {
        e.stopPropagation();
    });
}

function carouselControls() {
    //Show current card count
    let counter = $('.carousel-counter');
    counter.html(count + '/' + qCards.length);
    $('.carousel-control-next').on('click', function () {
        $('.carousel').off('transitionend');
        $('.carousel').on('transitionend', function () {
            if (count < qCards.length)
                counter.html(++count + "/" + qCards.length);
            $(this).off('transitionend', arguments.callee);
        });
    });
    $('.carousel-control-prev').on('click', function () {
        $('.carousel').off('transitionend');
        $('.carousel').on('transitionend', function () {
            if (count > 1)
                counter.html(--count + "/" + qCards.length);
            $(this).off('transitionend', arguments.callee);
        });
    })

    //Track which cards have been studied already
    $('.carousel-control-next').on('click', () => {
        $('.carousel-item.active').addClass('studied');
    });

    //Return to default side after moving to another card
    $('.carousel-control-next, .carousel-control-prev').on('click', function () {
        $(this).parent().parent().parent().find('.carousel').on('transitionend', function () {
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
        $('.flip-card').removeClass('flip-card-play');
        qActivePre = qActivePre.sort(compareCards);
        qActivePost = qActivePost.sort(compareCards);
        activePreShuffle.classList.add('active');

    }

    $('.carousel-item').remove();
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
