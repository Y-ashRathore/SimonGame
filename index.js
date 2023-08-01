
var buttonColors = ["green", "red", "blue", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keydown(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextsequence();
        started = true;
    }
});

$(".btn").on("click", function () {
    if(gamePattern.length===0){
        checkdone();
    }
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playsound(userChosenColor);
    animate(userChosenColor);
    check(userClickedPattern.length-1);

});


function nextsequence() {
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    playsound(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
}

function playsound(name) {
    var audio = new Audio('sounds/' + name + ".mp3");
    audio.play();
}

function animate(name) {
    $("#" + name).addClass("pressed");
    setTimeout(function () {
        $("#" + name).removeClass("pressed");
    }, 100);
}

function check(currentLevel){
    if(gamePattern.length===0){
        return false;
    }
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            userClickedPattern=[];
            setTimeout(function(){
                nextsequence();
            },1000);
        }
    }
    else{    
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 500);
        playsound("wrong");
        userClickedPattern =[];
        gamePattern = [];
        started = false;
        level =0;
        $(document).keydown(function () {
            if (!started) {
                $("#level-title").text("Level " + level);
                nextsequence();
                started = true;
            }
        });
    }
}

// function checkdone(){
//     if (check()) {
//         userClickedPattern=[];
//         setTimeout(function(){
//             nextsequence();
//         },1000);
//     }

//     else{    
//         $("#level-title").text("Game Over, Press Any Key to Restart");
//         $("body").addClass("game-over");
//         setTimeout(function(){
//             $("body").removeClass("game-over");
//         }, 500);
//         playsound(" wrong");
//         userClickedPattern =[];
//         gamePattern = [];
//         started = false;
//         level =0;
//         $(document).keydown(function () {
//             if (!started) {
//                 $("#level-title").text("Level " + level);
//                 nextsequence();
//                 started = true;
//             }
//         });
//     }
// }