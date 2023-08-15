let terms;
let easeMap = {};
let roundTerms = [];
let request = new XMLHttpRequest();

function loadSet() {
    request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            terms = JSON.parse(this.response);
            terms.forEach(key => {
                easeMap[key] = 0;
            });
        }
    };
    let params = new URLSearchParams(window.location.search);
    let set = params.get('set');
    request.open('GET', 'vocabLearnServer.php?set=' + set, true);
    request.send();
}

function generateRound(){
    //Create round data obj
    let roundData = {};
    terms.sort(compareTerms);
    let roundCount = 0;
    for(let i = 0; i<terms.length; i++){
        if(easeMap[terms[i]] < 6){
            roundData[terms[i]] = easeMap[terms[i]];
            if(++roundCount > 6){
                break;
            }
        }
    }

    //Request round questions
    request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            console.log(this.responseText);
        }
    };
    request.open('POST', 'vocabLearnServer.php', true);
    request.setRequestHeader("Content-type", 'application/x-www-form-urlencoded');
    let params = new URLSearchParams(window.location.search);
    let set = params.get('set');
    request.send('roundData=' + JSON.stringify(roundData) + '&setId='+set);
}

function compareTerms(term1, term2) {
    return easeMap[term1] - easeMap[term2];
}