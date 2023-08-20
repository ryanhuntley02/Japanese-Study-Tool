<?php

function load_set($setId)
{
    $set = retrieve_set($setId);
    $keysJson = json_encode(array_keys($set), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    echo $keysJson;
}

function retrieve_set($setId)
{
    $setsJson = file_get_contents('flashcards.json');
    $setsObj = json_decode($setsJson, true);
    if (in_array($setId, array_keys($setsObj))) {
        $set = $setsObj[$setId];
        return $set;
    } else {
        http_response_code(404);
        die();
    }
}

function generate_round($roundJson, $setId)
{
    $roundQuestions = [];
    $roundData = json_decode($roundJson, true);
    if (json_last_error() != JSON_ERROR_NONE) {
        http_response_code(400);
        die();
    }
    $set = retrieve_set($setId);
    foreach ($roundData as $term => $ease) {
        generate_question($term, $ease, $roundQuestions, $set);
    }
    echo json_encode($roundQuestions, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
}

function generate_question($term, $ease, &$questions, $set)
{
    $cset = $set;
    unset($cset[$term]);
    $multiCorrectDex = rand(0,3);
    switch (true) {
        case $ease < 2:
            $multiChoice['type'] = 'multiple-choice';
            $multiChoice['order'] = 'jp-to-en';
            $multiChoice['options'] = [];
            for ($i = 0; $i < 4; $i++) {
                if($i == $multiCorrectDex){
                    $multiChoice['options'][$i] = $set[$term];
                }
                else{
                    $rand = array_keys($cset)[rand(0, count(array_keys($cset)) - 1)];
                    $multiChoice['options'][$i] = $cset[$rand];
                    unset($cset[$rand]);
                }
            }
            $questions[$term] = $multiChoice;
            break;
        case $ease >= 2 && $ease < 4:
            $cset = array_flip($cset);
            $multiChoice['type'] = 'multiple-choice';
            $multiChoice['order'] = 'en-to-jp';
            $multiChoice['options'] = [];
            for ($i = 0; $i < 4; $i++) {
                if($i == $multiCorrectDex){
                    $multiChoice['options'][$i] = $term;
                }
                else{
                    $rand = array_keys($cset)[rand(0, count(array_keys($cset)) - 1)];
                    $multiChoice['options'][$i] = $cset[$rand];
                    unset($cset[$rand]);
                }
            }
            $questions[$set[$term]] = $multiChoice;
            break;
        case $ease >= 4 && $ease < 6:
            $written['type'] = 'written';
            $written['order'] = 'jp-to-en';
            $questions[$term] = $written;
            break;
        case $ease >= 6:
            $written['type'] = 'written';
            $written['order'] = 'en-to-jp';
            $questions[$set[$term]] = $written;
            break;
    }
}

function check_answer($setId, $answer, $term)
{
    $set = retrieve_set($setId);
    $response['correct'] = $set[$term] == $answer;
    $response['correctAnswer'] = $set[$term];
    echo json_encode($response, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE); 
}


if (isset($_GET['set']) && $_GET['set'] != 'null') {
    load_set($_GET['set']);
} else if (isset($_POST['roundData']) && isset($_POST['setId'])) {
    generate_round($_POST['roundData'], $_POST['setId']);
} else if (isset($_POST['answer']) && isset($_POST['term']) && isset($_POST['setId'])) {
    check_answer($_POST['setId'], $_POST['answer'], $_POST['term']);
} else {
    http_response_code(404);
    die();
}
