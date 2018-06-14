var triviaQuestions = [{
	question: "How many times was Michael named to the NBA All-Defensive team?",
	answerList: ["5", "9", "7", "3"],
	answer: 1
},{
	question: "What season did he average 37.1 points per game?",
	answerList: ["1986-1987", "1990-1991", "1994-1995", "1996-1997"],
	answer: 0
},{
	question: "What was the name of his high school?",
	answerList: ["Laney High", "St. Thomas", "Heights Park", "Findlay Prep"],
	answer: 0
},{
	question: "When was he picked in the 1984 NBA Draft?",
	answerList: ["1st", "2nd", "3rd", "4th"],
	answer: 2
},{
	question: "What team did he record his 5,000th assist against?",
	answerList: ["Phoenix", "Boston", "New York", "Orlando"],
	answer: 3
},{
	question: "How many NBA scoring titles does he have?",
	answerList: ["10", "8", "6", "4"],
	answer: 0
},{
	question: "How many times was he regular-season MVP?",
	answerList: ["6", "5", "4", "3"],
	answer: 1
},{
	question: "How many pairs of shoes did Nike give him before every game?",
	answerList: ["1", "2", "3", "4"],
	answer: 2
},{
	question: "How many championships did Jordan win with the Bulls?",
	answerList: ["7", "6", "5", "4"],
	answer: 1
},{
	question: "How many points did he score in the infamous flu game?",
	answerList: ["41", "40", "39", "38"],
	answer: 3
},{
	question: "When was he NBA Defensive Player of the Year?",
	answerList: ["1988", "1989", "1990", "1991"],
	answer: 0
},{
	question: "How many Olympics did he play in?",
	answerList: ["3", "2", "1", "4"],
	answer: 1
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Swish.",
	incorrect: "Nope.",
	endTime: "Shot clock violation.",
	finished: "That's game."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question: ' + (currentQuestion+1)+' of '+triviaQuestions.length);
    $('.hr').html('<hr>');
    $('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 12;
    $('#timeLeft').html('<h3>' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
    $('#timeLeft').html('<h3>' + seconds + '</h3>');
	if(seconds < 1){
        clearInterval(time);
        seconds.toFixed(2);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
    $('.question').empty();
    $('.thisChoice').hide();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 3000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 3000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}