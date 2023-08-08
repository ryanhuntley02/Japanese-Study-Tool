function shuffle(){
    $('.shuffle').on('click', shuffleOn);
}

function reOrder(isShuffled){
    if(isShuffled){
        let activeCpy = JSON.parse(JSON.stringify(activeSet));
        $('.flip-card').each((index, card)=>{
            let rand = getRand(Object.keys(activeCpy).length);
            let key = Object.keys(activeCpy)[rand];
            $('.flip-card-front p', card).html(key);
            $('.flip-card-back p', card).html(activeCpy[key]);
            delete activeCpy[key];
        })
    }
    else{
        for(let i = 0; i<Object.keys(activeSet).length; i++){
            let card = $('.flip-card-inner')[i];
            let key = Object.keys(activeSet)[i];
            $('.flip-card-front p', card).html(key);
            $('.flip-card-back p', card).html(activeSet[key]);
        }
    }
}

function shuffleOn(){
    $(this).off('click', shuffleOn);
    $(this).on('click', shuffleOff);
    reOrder(true);
}

function shuffleOff(){
    $(this).off('click', shuffleOff)
    $(this).on('click', shuffleOn);
    reOrder(false);
}

function getRand(max){
    return Math.floor(Math.random()*max);
}

