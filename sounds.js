var currentMusic;
function loadRandomMusic(){
	song = randomNumber(1,5);  //Gets a random song number, since they are named things like 1.mp3
	currentMusic = new Audio("music/"+"song ("+song+").mp3");
	currentMusic.play(); //Rock out brah!
}
function pauseMusic () {
	currentMusic.pause();
}
