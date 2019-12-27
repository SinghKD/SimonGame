
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var playerPattern = [];

var level = 0;
var hasStarted = false;

function playSound(color)
{
    var audio = new Audio("sounds/"+color+".mp3");
    audio.play();
}

function animateButton(color)
{
    $("#" + color).addClass("pressed");
    setTimeout(function(){
        $("#" + color).removeClass("pressed");
    }, 100);
}

$(document).keypress(function(){
    if(!hasStarted)
    {
        $("#score").addClass("hide");
        $("#restart").addClass("hide");
        $(".btn").removeClass("hide");
        hasStarted = true;
        nextInSequence();
    }
})

function nextInSequence()
{
    playerPattern = [];
    var randomColor = buttonColors[Math.floor(Math.random()*4)];
    gamePattern.push(randomColor);
    $("#" + randomColor).fadeOut(100).fadeIn(100);
    playSound(randomColor);
    $("h1").text("Level " + level);
    level++;
}

$(".btn").click(function(){
    var pressedColor = $(this).attr("id");
    playerPattern.push(pressedColor)
    playSound(pressedColor);
    animateButton(pressedColor);
    check(playerPattern.length - 1);
})


function check(currLevel)
{
    if(playerPattern[currLevel] === gamePattern[currLevel])
    {
        console.log("yay");

        if(playerPattern.length === gamePattern.length)
        {
            setTimeout(function(){
                nextInSequence();
            }, 1000);
        }
    }
    else
    {   
        var scr = 0;
        if(level != 0) scr = level - 1;
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200)

        $("#level-title").text("Game Over!");
        $("#score").text("Your Score: " + scr);
        $("#score").removeClass("hide");
        $("#restart").text(" Press Any Key to Start Again");
        $("#restart").removeClass("hide");
        $(".btn").addClass("hide");
        restart();
    }
}

function restart()
{
    hasStarted = false;
    gamePattern = [];
    level = 0;
}