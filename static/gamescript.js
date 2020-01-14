// Variables
let wordArray  = [
        "apple", "banana", "orange", "pineapple", "grape", "cherry", "mango", "raspberry", "lemon", "coconut", "strawberry", "kiwifruit", "guava"
    ]
let currentWord = ""
let timeLimit = 10
let gameRunning = false
let wordCount = 0
let inputWord = ""
let myTimer

$(document).ready(function () {
    $("#time").text(timeLimit)
    $("#message").text("Message")
    chooseWord()
})

function sendGameResult(){
    // Creating a XHR object
    let xhr = new XMLHttpRequest();
    let url = "/";

    // open a connection
    xhr.open("POST", url, true);

    // Set the request header i.e. which type of content you are sending
    xhr.setRequestHeader("Content-Type", "application/json");

    // Create a state change callback
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $("#result").text(this.responseText);
        }
    };

    // Converting JSON data to string
    let data = JSON.stringify({"wordCount": wordCount});

    // Sending data with the request
    xhr.send(data);
}


function chooseWord(){
    let random = Math.floor(Math.random() * wordArray.length)
    console.log(random)
    currentWord = wordArray[random]
    $("#word-output").text(currentWord)
}

function setCountdownTimer(){
    if(timeLimit === 0){
        $("#message").text("Gave over")
        gameRunning = false
        clearInterval(myTimer)
    }
    else{
        timeLimit -= 1
        $("#time").text(timeLimit)
    }
}

function GameStart(){
    sendGameResult()
    gameRunning = true
    myTimer = setInterval(setCountdownTimer, 1000)
}

$(document).ready(function (){
    // Do not use keydown -- will not read first character!!
    $("#word-input").keyup(function(){

        inputWord = $("#word-input").val()

        console.log(inputWord)
        console.log(currentWord)

        if(gameRunning) {
            if (inputWord === currentWord) {
                //$("#message").text("You win")
                $("#word-input").val("")
                console.log("ok")
                chooseWord()
                wordCount++
                $("#wordcnt").text(wordCount)
            }
        }
        else {
            GameStart()
            $("#message").text("Playing game")
        }
    })
})