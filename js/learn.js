let terms;
let easeMap = {};
let roundTerms = [];
let roundNum = 1;
let roundQuestions;
let checkedAns = {};

function loadSet() {
    let params = new URLSearchParams(window.location.search);
    let set = params.get('set');
    $.ajax({
        type: 'GET',
        url: 'vocabLearnServer.php',
        dataType: 'json',
        data: 'set=' + set
    }).done((response) => {
        terms = response;
        terms.forEach(key => {
            easeMap[key] = 0;
        });
    }).done(() => { displayQuestion(); }).fail((xhr, status, thrownError) => console.log(thrownError));
}

function generateRound() {
    $('.learn-interface').css('background-color', '#bbb');
    for(key in checkedAns){
        if(checkedAns.hasOwnProperty(key)){
            delete checkedAns[key];
        }
    }
    //Create round data obj
    let roundData = {};
    terms.sort(compareTerms);
    let roundCount = 0;
    for (let i = 0; i < terms.length; i++) {
        if (easeMap[terms[i]] < 6) {
            roundData[terms[i]] = easeMap[terms[i]];
            if (++roundCount > 6) {
                break;
            }
        }
    }

    let params = new URLSearchParams(window.location.search);
    let set = params.get('set');
    $.ajax({
        type: 'POST',
        url: 'vocabLearnServer.php',
        contentType: "application/x-www-form-urlencoded",
        dataType: 'json',
        data: 'roundData=' + JSON.stringify(roundData) + '&setId=' + set
    }).done((response) => {
        $('#round-counter').html('Round ' + roundNum++);
        roundQuestions = response;
        displayQuestion();
    });
}

function displayQuestion() {
    $('.learn-interface').html('');
    if (roundQuestions && Object.keys(roundQuestions).length > 0) {
        let term = Object.keys(roundQuestions)[getRand(Object.keys(roundQuestions).length)];
        $('.learn-interface').append('<h3>Term:</h3>')
        $('.learn-interface').append('<p>' + term + '</p>');
        if (roundQuestions[term].type === 'multiple-choice') {
            $('.learn-interface').append('<h3>Choose the matching definition:</h3>');
            $('.learn-interface').append('<div class="multiple-choice"></div>');
            for (let i = 0; i < roundQuestions[term].options.length; i++) {
                $('.multiple-choice').append('<button class="btn btn-outline-dark mc-option"><span class="option-number">' + (i + 1) + ' </span><span class="option-txt">' + roundQuestions[term].options[i] + '</span></button>');
            }
            $('.mc-option').on('click', function () {
                $('.mc-option').off('click', arguments.callee);
                let params = new URLSearchParams(window.location.search);
                let set = params.get('set');
                $.ajax({
                    type: 'POST',
                    url: 'vocabLearnServer.php',
                    contentType: 'application/x-www-form-urlencoded',
                    data: 'setId=' + set + '&answer=' + $('.option-txt', this).html() + '&term=' + term,
                    dataType: 'json'
                }).done((response) => {
                    if (response.correct) {
                        $(this).css('background-color', 'green').css('color', 'white');
                        easeMap[term] += 2;
                    }
                    else {
                        $(this).css('background-color', 'red').css('color', 'white');
                        easeMap[term]--;
                        $(this).parent().find('button:contains(' + response.correctAnswer + ')').css('background-color', 'green').css('color', 'white');
                    }
                    checkedAns[term] = response.correctAnswer;
                    setTimeout(() => {
                        displayQuestion();
                    }, 2000);
                });
            });
        }
        else if (roundQuestions[term]['type'] === 'written') {
            $('.learn-interface').append('<h3>Your answer:</h3>');
            $.ajax()
        }
        else {
            $('.learn-interface').html('Server Error');
        }
        delete roundQuestions[term];
    }
    else {
        displayMidReview();
    }
}

function displayMidReview() {
    if (Object.keys(checkedAns).length) {
        $('.learn-interface').html('');
        $('.learn-interface').css('background-color', 'transparent');
        $('.learn-interface').append('<h3 style="opacity:0.0;">Terms studied in this round:</h3>');
        for (const [key, value] of Object.entries(checkedAns)) {
            $('.learn-interface').append('<div class = "st-pair" style="opacity:0.0;"><span class="st-term">' + key + ' </span><span class="st-def">' + value + '</span></div> ');
        }
        $('.learn-interface').append(`<button class="btn btn-outline-dark" style="margin: 0 auto;opacity:0.0;">Continue to round ${roundNum}</button>`);
        $('.learn-interface h3').first().fadeTo(700, 1.0, function(){
            $('.learn-interface .st-pair').first().fadeTo(700, 1.0, function showNext() {
                $(this).next().fadeTo(700, 1.0, showNext);
            });
        });
        $('.learn-interface .btn').first().fadeTo(700, 1.0, function(){
            $('.learn-interface').first('.btn').on('click', generateRound);
        });
    }
    else
        generateRound();
}

function compareTerms(term1, term2) {
    return easeMap[term1] - easeMap[term2];
}

function getRand(max) {
    return Math.floor(Math.random() * max);
}

function timeout(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}