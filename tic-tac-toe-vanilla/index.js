// register service worker
var registerUrl = '/tic-tac-toe-vanilla/sw_cached_site.js';
var swScope = '/tic-tac-toe-vanilla/';

if (location.hostname !== 'brian-t-hart.github.io') {
	registerUrl = '/sw_cached_site.js';
	swScope = '/';
}

//make sure sw are supported
if('serviceWorker' in navigator){
    window.addEventListener('load', () => {
        navigator.serviceWorker
			.register(registerUrl, {scope: swScope})
            .then(console.log('Servicewroker registered'))
            .catch(err => console.log(`ServiceWorker error: ${err}`));
    });
}//if SW

else {
    console.log('serviceWorker not in navigator');
}

// tic-tac-toe logic

var boxes = document.getElementsByClassName('box');

var counter = 0;

var gameOver = false;

var messageDiv = document.getElementById('messageDiv');

var theMessage = document.getElementById('theMessage');

var title = document.getElementById('title');

var userLetter = "X";

function checkForWin() {
	if (counter > 4) {
		completeRow(boxes[0].innerHTML, boxes[1].innerHTML, boxes[2].innerHTML, boxes[0].id, boxes[1].id, boxes[2].id);

		completeRow(boxes[3].innerHTML, boxes[4].innerHTML, boxes[5].innerHTML, boxes[3].id, boxes[4].id, boxes[5].id);

		completeRow(boxes[6].innerHTML, boxes[7].innerHTML, boxes[8].innerHTML, boxes[6].id, boxes[7].id, boxes[8].id);

		completeRow(boxes[0].innerHTML, boxes[3].innerHTML, boxes[6].innerHTML, boxes[0].id, boxes[3].id, boxes[6].id);

		completeRow(boxes[1].innerHTML, boxes[4].innerHTML, boxes[7].innerHTML, boxes[1].id, boxes[4].id, boxes[7].id);

		completeRow(boxes[2].innerHTML, boxes[5].innerHTML, boxes[8].innerHTML, boxes[2].id, boxes[5].id, boxes[8].id);

		completeRow(boxes[0].innerHTML, boxes[4].innerHTML, boxes[8].innerHTML, boxes[0].id, boxes[4].id, boxes[8].id);

		completeRow(boxes[2].innerHTML, boxes[4].innerHTML, boxes[6].innerHTML, boxes[2].id, boxes[4].id, boxes[6].id);
	}

	if ((counter == 9) && (gameOver == false)) {
		gameOver = true;

		messageDiv.style.display = 'block';

		theMessage.innerHTML = "Cat's Game!";

		title.style.display = 'none';
	}
}

function checkSpace(event) {
	var clickedBoxId = event.srcElement.id;

	var clickedBoxLetter = event.srcElement.innerHTML;

	if (gameOver == false) {
		if (clickedBoxLetter == false) {
			play();

			document.getElementById(clickedBoxId).innerHTML = userLetter;

			counter++;

			setTimeout(() => {
				checkForWin();
			}, 800);

			userLetter === "X" ? userLetter = "O" : userLetter = "X";
		}
		else {
			alert('This space is taken. Try another!');
		}
	}
	else {
		alert('Game Over. Click the "Play Again" button to start a new game.');   
	}
}

function completeRow(x, y, z, k, l, m) { 
	if ((x.length == 1) && (x == y) && (x == z)) {
		gameOver = true;

		title.style.display = 'none';

		messageDiv.style.display = 'block';

		play2();

		document.getElementById(k).style.color = '#FF880D';

		document.getElementById(l).style.color = '#FF880D';

		document.getElementById(m).style.color = '#FF880D';

		theMessage.innerHTML = x + " wins!";
	}

	else {
		console.log("keep going");
	}
}

function play() {
	var audio = document.getElementById("audio");

	audio.play();
}

function play2() {
	var audio = document.getElementById("audio2");

	audio.play()
}

function resetGame() {
	counter = 0;

	gameOver = false;

	messageDiv.style.display = 'none';

	title.style.display = 'block';

	userLetter = "X";

	// empty boxes and reset color to white
	for (item = 1; item <= 9; item++) {
		var theBoxId = "box" + item;

		var theBox = document.getElementById(theBoxId);

		theBox.innerHTML = "";

		theBox.style.color = "#FFF";
	}
}

function startGame() {
	for (i = 0; i < boxes.length; i++) {
		boxes[i].addEventListener('click', checkSpace)
	}
}

startGame()