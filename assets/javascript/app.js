$(document).ready(function() {

	var currentQuestion;	

	var correctAnswer;	
	var wrongAnswer;	
	var unanswered;		

	var answered; 		
	
						
	var seconds;		
	var time;			
	
	var userChoice;		

	var text = {
		correct: "Correct",
		incorrect: "Try again!",
		noTime: "Aaaaand you failed!",
		done: "Finally done!",
	};

	var triviaQuestions = [
		{	
			question: "Who was the legendary Benedictine monk who invented champagne?",
			choices: ["Francis", "Jose Cuervo", "Dom Perignon", "Sam Admas"],
			correct: 2,
			image: "assets/images/domperignon.jpg",
			answerText: "Dom Perignon",
		},

		{
			question: "Name the largest freshwater lake in the world.",
			choices: ["Lake Minotonca", "Lake Superior", "Lake More Superior", "Big Daddy Lake"],
			correct: 1,
			image: "assets/images/lakesuperior.jpg",
			answerText: "Lake Superior",
		},

		{
			question: "What is the diameter of Earth?",
			choices: ["1,000,000 miles", "80,000 miles", "9,000 miles", "8,000 miles"],
			correct: 3,
			image: "assets/images/8000.png",
			answerText: "The Earth's diameter is 8,000 miles",
		},

		{
			question: "Which chess piece can only move diagonally?",
			choices: ["Queen", "King", "Daddy", "Bishop"],
			correct: 3,
			image: "assets/images/bishop.jpg",
			answerText: "Bishop",
		},
		{
			question: "How many valves does a trumpet have?",
			choices: ["5", "3", "4", "1"],
			correct: 1,
			image: "assets/images/3.jpeg",
			answerText: '3!',
		},
		{
			question: "When did the Cold War end?",
			choices: ["1989", "2001", "2018", "1942"],
			correct: 0,
			image: "assets/images/coldwar.jpg",
			answerText: 'The Cold War ended in 1989.'
		},
		{
			question: "What is the oldest surviving printed book in the world?",
			choices: ["Kama Sutra", "Epic of Gilgamesh", "The Bible", "The Diamond Sutra"],
			correct: 3,
			image: "assets/images/diamondsutra.jpg",
			answerText: "The oldest printed book is the Diamond Sutra"
		},
	];

	
	$("#gameArea").hide();

	
	$("#startBtn").on("click", function(){
		$("#startGame").hide();
		newGame();
	});

	
	$("#startOverBtn").on("click", function(){
		$("#Res").hide();
		newGame();
	});

	
	function newGame() {
		$("#gameArea").show();
		$("#Ans").hide();
		$("#Res").hide();		
		correctAnswer = 0;
		wrongAnswer = 0;
		unanswered = 0;
		currentQuestion = 0;
		questions();
	}
	
	function questions() {
		$("#Ans").hide();
		$("#Qs").show();
		answered = true;
		
		$(".question").html(triviaQuestions[currentQuestion].question);

		// -----------------------------------------
		//Loops through possible choices and appends
		// -----------------------------------------
		for (var i = 0; i <= 4; i++) {
			var list = $("<div>");
			list.text(triviaQuestions[currentQuestion].choices[i]);
			list.attr({"data-index": i });
			list.addClass("thisChoice");
			$(".choices").append(list);
		}

		//Calls Timer
		countdown();

		// USERCLICK
		$(".thisChoice").on("click",function(){
			userChoice = $(this).data("index");
			clearInterval(time);
			shoAnswer();
		});
	}

	// ==================
	// TIMER COUNTDOWN
	// ==================
	function countdown() {
		seconds = 20;
		$("#time").html("00:" + seconds);
		answered = true;
		//Delay of 1 sec before timer goes off
		time = setInterval(countDownSho, 1000);
	}

	// ==================
	// SHOWS TIMER
	// ==================
	function countDownSho() {
		seconds --;
		if(seconds < 10) {
			$("#time").html("00:0" + seconds);
			$("#time").css({"color": "red"});
		} else {
			$("#time").html("00:" + seconds);
			$("#time").css({"color": "#def"});
		}

		if (seconds < 1) {
			clearInterval(time);
			answered = false;
			shoAnswer();
		}
	}
	// ====================================
	// DISPLAYS ANSWER DIV
	// ====================================
	function shoAnswer() {
		$("#Qs").hide();
		$("#Res").hide();
		$("#Ans").show();
		$(".thisChoice").empty();

		var rightAnswerText = triviaQuestions[currentQuestion].choices[triviaQuestions[currentQuestion].correct];
		var rightAnswerIndex = triviaQuestions[currentQuestion].correct;
		console.log(rightAnswerText);
		console.log(rightAnswerIndex);

		//IMG
		var imgLink = triviaQuestions[currentQuestion].image;
		var img = $("<img>");
		img.attr("Src", imgLink);
		img.addClass("bigImg");
		$("#img").html(img);
		
		
		// Img TEXT
		var imgText = triviaQuestions[currentQuestion].answerText;
			newCap = $("<div>");
			newCap.html(imgText);
			newCap.addClass("imgCap");
			$("#imgText").html(newCap);


		
		if ((userChoice === rightAnswerIndex) && (answered === true)) {
			correctAnswer++;
			$("#text").html(text.correct);
			$("#correctAnswer").hide();
		} else if ((userChoice !== rightAnswerIndex) && (answered === true)) {
			wrongAnswer++;
			$("#text").html(text.incorrect);
			$("#correctAnswer").show().html("The correct answer was: " + rightAnswerText);
		} else {
			unanswered++;
			$("#text").html(text.noTime);
			$("#correctAnswer").html("The correct answer was: " + rightAnswerText);
			answered = true;
		}

		//Timer
		if (currentQuestion === (triviaQuestions.length-1)) {
			setTimeout(results, 10000);
		} else {
			currentQuestion++;
			setTimeout(questions, 10000);
		}

	}

	function results() {
		$("#Ans").hide();
		$("#Qs").hide();
		$("#Res").show();
		$("#resultText").html(text.done);
		$("#correctAnswers").html("Correct Answers: " + correctAnswer);
		$("#wrongAnswers").html("Wrong Answers: " + wrongAnswer);
		$("#unanswered").html("Didn't Answer: " + unanswered);
		$("#startOverBtn").show();
		$("#startOverBtn").html("RESTART GAME");
	}

	
});