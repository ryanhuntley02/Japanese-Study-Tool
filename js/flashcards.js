let setEnum = {
    'hi':0,
    'ka':1
}

let sets = [
    {
        "あ":"A",	
        "い":"I",	
        "う":"U",	
        "え":"E",	
        "お":"O",
        "か":"Ka",	
        "き":"Ki",	
        "く":"Ku",	
        "け":"Ke",	
        "こ":"Ko",
        "さ":"Sa",	
        "し":"Shi",	
        "す":"Su",	
        "せ":"Se",	
        "そ":"So",
        "た":"Ta",	
        "ち":"Chi",	
        "つ":"Tsu",	
        "て":"Te",	
        "と":"To",
        "な":"Na",	
        "に":"Ni",	
        "ぬ":"Nu",	
        "ね":"Ne",	
        "の":"No",
        "は":"Ha",	
        "ひ":"Hi",	
        "ふ":"Fu",	
        "へ":"He",	
        "ほ":"Ho",
        "ま":"Ma",	
        "み":"Mi",	
        "む":"Mu",	
        "め":"Me",	
        "も":"Mo",
        "や":"Ya",
        "ゆ":"Yu",	
        "よ":"Yo",
        "ら":"Ra",	
        "り":"Ri",	
        "る":"Ru",	
        "れ":"Re",	
        "ろ":"Ro",
        "わ":"Wa",		
        "を":"Wo",
        "ん":"N",
        "が":"Ga",
	    "ぎ":"Gi",
	    "ぐ":"Gu",
	    "げ":"Ge",
	    "ご":"Go",
	    "ぎゃ":"Gya",
	    "ぎゅ":"Gyu",
	    "ぎょ":"Gyo",
	    "ざ":"Za",
	    "じ":"Ji",
	    "ず":"Zu",
	    "ぜ":"Ze",
	    "ぞ":"Zo",
	    "じゃ":"Ja",
	    "じゅ":"Ju",
	    "じょ":"Jo",
	    "だ":"Da",
        "ぢ":"Ji",
	    "づ":"Zu",
	    "で":"De",
	    "ど":"Do",
	    "ば":"Ba",
	    "び":"Bi",
	    "ぶ":"Bu",
	    "べ":"Be",
	    "ぼ":"Bo",
	    "びゃ":"Hya",
	    "びゅ":"Hyu",
	    "びょ":"Hyo",
	    "ぱ":"Pa",
	    "ぴ":"Pi",
	    "ぷ":"Pu",
	    "ぺ":"Pa",
	    "ぽ":"Po",
	    "ぴゃ":"Pya",
	    "ぴゅ":"Pyu",
	    "ぴょ":"Pyo",
        "きゃ":"Kya",
        "きゅ":"Kyu",
        "きょ":"Kyo",
        "しゃ":"Sha",
        "しゅ":"Shu",
        "しょ":"Sho",
        "ちゃ":"Cha",
        "ちゅ":"Chu",
        "ちょ":"Cho",
        "にゃ":"Nya",
     	"にゅ":"Nyu",
     	"にょ":"Nyo",
        "ひゃ":"Hya",
        "ひゅ":"Hyu",
        "ひょ":"Hyo",
        "みゃ":"Mya",
     	"みゅ":"Myu",
     	"みょ":"Myo",
        "りゃ":"Rya",
        "りゅ":"Ryu",
        "りょ":"Ryo"
    }
    ,
    {
        "ア": "A",
        "イ": "I",
        "ウ": "U",
        "エ": "E",
        "オ": "O",
        "カ": "Ka",
        "キ": "Ki",
        "ク": "Ku",
        "ケ": "Ke",
        "コ": "Ko",
        "ガ": "Ga",
        "ギ": "Gi",
        "グ": "Gu",
        "ゲ": "Ge",
        "ゴ": "Go",
        "サ": "Sa",
        "シ": "Shi",
        "ス": "Su",
        "セ": "Se",
        "ソ": "So",
        "ザ": "Za",
        "ジ": "Ji",
        "ズ": "Zu",
        "ゼ": "Ze",
        "ゾ": "Zo",
        "タ": "Ta",
        "チ": "Chi",
        "ツ": "Tsu",
        "テ": "Te",
        "ト": "To",
        "ダ": "Da",
        "ヂ": "Ji",
        "ヅ": "Zu",
        "デ": "De",
        "ド": "Do",
        "ナ": "Na",
        "ニ": "Ni",
        "ヌ": "Nu",
        "ネ": "Ne",
        "ノ": "No",
        "ハ": "Ha",
        "ヒ": "Hi",
        "フ": "Fu",
        "ヘ": "He",
        "ホ": "Ho",
        "バ": "Ba",
        "ビ": "Bi",
        "ブ": "Bu",
        "ベ": "Be",
        "ボ": "Bo",
        "パ": "Pa",
        "ピ": "Pi",
        "プ": "Pu",
        "ペ": "Pe",
        "ポ": "Po",
        "マ": "Ma",
        "ミ": "Mi",
        "ム": "Mu",
        "メ": "Me",
        "モ": "Mo",
        "ヤ": "Ya",
        "ユ": "Yu",
        "ヨ": "Yo",
        "ラ": "Ra",
        "リ": "Ri",
        "ル": "Ru",
        "レ": "Re",
        "ロ": "Ro",
        "ワ": "Wa",
        "ヲ": "Wo (Rare)",
        "ン": "N",
        "キャ":"Kya",
    	"キュ":"Kyu",
    	"キョ":"Kyo",
        "シャ":"Sha",
        "シュ":"Shu",
        "ショ":"Sho",
        "チャ":"Cha",
     	"チュ":"Chu",
     	"チョ":"Cho",
        "ニャ":"Nya",
     	"ニュ":"Nyu",
     	"ニョ":"Nyo",
        "ヒャ":"Hya",
        "ヒュ":"Hyu",
        "ヒョ":"Hyo",
        "ミャ":"Mya",
     	"ミュ":"Myu",
     	"ミョ":"Myo",
        "リャ":"Rya",
    	"リュ":"Ryu",
    	"リョ":"Ryo",
        "ギャ":"Gya",
        "ギュ":"Gyu",
        "ギョ":"Gyu",
        "ジャ":"Ja",
        "ジュ":"Ju",
        "ジョ":"Jo",
        "ビャ":"Bya",
        "ビュ":"Byu",
        "ビョ":"Byo",
        "ピャ":"Pya",
        "ピュ":"Pyu",
        "ピョ":"Pyo"
    }
];

let activeSet;

window.onload = () => {
    let setCodeSearch = new URLSearchParams(window.location.search);
    let setCode = Object.fromEntries(setCodeSearch.entries());
    activeSet = sets[setEnum[setCode.set]];
    loadSet(activeSet);
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

