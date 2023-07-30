"use strict"

function playAudio(path){
    $(".ico-audio").click(function (){
        let id = $(this).attr("id");
        let audio = new Audio(path + id + '.mp3');
        audio.play();
    
        let ico = $("i.fa-solid", this);
        ico.addClass("play");
        audio.addEventListener("ended", ()=>{
            ico.removeClass("play");
            audio.currentTime = 0;
        }, 
        false
        );
    });
}

function playHiragana(){
    playAudio('audio/hiragana/');
}

function playKatakana(){
    playAudio('audio/katakana/');
}