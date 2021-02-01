//Obtaining all document elements to be used
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var scoreDisplay = document.querySelector("#score");
var numColors = 4;
var randomSong = 0;
var numGuesses = 0;
var numCorrectAnswers = 0;
var gameActive = true;
var gameTime = 60;
var timerInstance;


//Setting up the game by adding event listeners and rest of the stuff
var songs = populateSongsDatabase();
var colors = generateRandomColors(numColors);
var pickedColor = pickRandomColor();
setup();
resetButton.textContent = "PLAY!"
resetButton.addEventListener("click", resetGame);

function setup() {
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];
    squares[i].addEventListener("click", function () {
      var clickedSong = this.textContent;
      if (clickedSong === songs[randomSong].name) {
        messageDisplay.textContent = "Correct!";
        resetButton.textContent = "Play Again?";
        h1.style.backgroundColor = pickedColor;
        if (gameActive) numCorrectAnswers++;
      } else if (this.style.backgroundColor != "rgb(35, 35, 35)") {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try Again!";
        this.style.color = "#232323";
      }

      if (gameActive) numGuesses++;
      scoreDisplay.textContent = numCorrectAnswers + "/" + numGuesses;
      if (numGuesses < songs.length && gameActive) {
        regenerate();
      } else {
        gameActive = false;
        clearInterval(timerInstance);
        resetButton.textContent = "Play Again?";
        colorDisplay.textContent = "Press the Play Again button!";
        songs[randomSong].howl.stop();
      }
    });
  }
  pickAndPlaySong();
//   startTimer(gameTime);
}

function regenerate() {
  colors = generateRandomColors(numColors);
  pickedColor = pickRandomColor();
  pickAndPlaySong();
  for (var j = 0; j < squares.length; j++) {
    if (j < numColors) {
      squares[j].style.backgroundColor = colors[j];
    } else {
      squares[j].style.backgroundColor = "#232323";
    }
  }
  h1.style.backgroundColor = "steelblue";
  resetButton.textContent = "Reset";
}

function changeColors(color) {
  for (var i = 0; i < numColors; i++) {
    squares[i].style.backgroundColor = color;
    squares[i].style.color = "#FFFFFF";
  }
}

function pickRandomColor() {
  var rndNum = Math.floor(Math.random() * colors.length);
  return colors[rndNum];
}

function pickAndPlaySong() {
  songs[randomSong].howl.stop();
  randomSong = songRandomizer();
  songs[randomSong].played = true;
  songs[randomSong].howl.play();
  songs[randomSong].howl.play();
}

function songRandomizer() {
  var picked = false;
  var arr = [];
  var pickedSong;
  //Generate array of 4 randomly picked songs, in that array search for the song that was not played before. If found then quit the loop
  //If not found iterate again until condition is true
  while (!picked) {
    arr = pick4songs();
    for (var i = 0; i < 20; i++) {
      var pick = Math.floor(Math.random() * arr.length);
      if (!songs[arr[pick]].played) {
        picked = true;
        pickedSong = arr[pick];
        break;
      }
    }
  }
  //Give all squares a song name
  for (var i = 0; i < numColors; i++) {
    squares[i].textContent = songs[arr[i]].name;
    squares[i].style.color = "white";
  }
  return pickedSong;
}

function generateRandomColors(numColors) {
  var arr = [];

  for (var i = 0; i < numColors; i++) {
    arr.push(randomColorGenerator());
  }

  return arr;
}

function resetGame() {
  clearPlayedSongs();
  clearInterval(timerInstance);
  gameActive = true;
  startTimer(gameTime);
  regenerate();
  numCorrectAnswers = 0;
  numGuesses = 0;
  scoreDisplay.textContent = numCorrectAnswers + "/" + numGuesses;
}

function clearPlayedSongs() {
  for (var i = 0; i < songs.length; i++) {
    songs[i].played = false;
  }
}

function randomColorGenerator() {
  var red = Math.floor(Math.random() * 200);
  var green = Math.floor(Math.random() * 200);
  var blue = Math.floor(Math.random() * 200);
  return "rgb(" + red + ", " + green + ", " + blue + ")";
}

function pick4songs() {
  var arr = [];
  while (arr.length < 4) {
    var songNum = Math.floor(Math.random() * songs.length);
    while (hasElement(arr, songNum)) {
      songNum = Math.floor(Math.random() * 4);
    }
    arr.push(songNum);
  }
  return arr;
}

function hasElement(arr, element) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == element) {
      return true;
    }
  }
  return false;
}

function startTimer(duration) {
  timerInstance = setInterval(function () {
    if (--duration < 0) {
      gameActive = false;
      colorDisplay.textContent = "0";
      clearInterval(timerInstance);
    } else {
      colorDisplay.textContent = duration;
    }
  }, 1000);
}

function populateSongsDatabase() {
  var arr = [];

  song = {
    name: "Arabic",
    howl: new Howl({
      src: ["./sounds/Arabic.mp3"],
    }),
    played: false,
  };
  arr.push(song);

  song = {
    name: "Bengali",
    howl: new Howl({
      src: ["./sounds/Bengali.mp3"],
    }),
    played: false,
  };
  arr.push(song);

  song = {
    name: "Ethiopean Nigerian",
    howl: new Howl({
      src: ["./sounds/EthiopianNigerian.mp3"],
    }),
    played: false,
  };

  arr.push(song);
  song = {
    name: "French",
    howl: new Howl({
      src: ["./sounds/French.mp3"],
    }),
    played: false,
  };
  arr.push(song);

  song = {
    name: "German",
    howl: new Howl({
      src: ["./sounds/German.mp3"],
    }),
    played: false,
  };
  arr.push(song);

  song = {
    name: "Gitane",
    howl: new Howl({
      src: ["./sounds/Gitane.mp3"],
    }),
    played: false,
  };
  arr.push(song);

  song = {
    name: "Gujarati",
    howl: new Howl({
      src: ["./sounds/Gujarati.mp3"],
    }),
    played: false,
  };
  arr.push(song);

  song = {
    name: "Hebrew",
    howl: new Howl({
      src: ["./sounds/Hebrew.mp3"],
    }),
    played: false,
  };
  arr.push(song);

  song = {
    name: "Hindi",
    howl: new Howl({
      src: ["./sounds/Hindi.mp3"],
    }),
    played: false,
  };
  arr.push(song);

  song = {
    name: "Italian",
    howl: new Howl({
      src: ["./sounds/Italian.mp3"],
    }),
    played: false,
  };
  arr.push(song);

  song = {
    name: "Japanese",
    howl: new Howl({
      src: ["./sounds/Japanese.mp3"],
    }),
    played: false,
  };
  arr.push(song);

  song = {
    name: "Korean",
    howl: new Howl({
      src: ["./sounds/Korean.mp3"],
    }),
    played: false,
  };
  arr.push(song);

  song = {
    name: "Mandarin",
    howl: new Howl({
      src: ["./sounds/Mandarin.mp3"],
    }),
    played: false,
  };
  arr.push(song);

  song = {
    name: "Mauritius Creole",
    howl: new Howl({
      src: ["./sounds/MauritiusCreole.mp3"],
    }),
    played: false,
  };
  arr.push(song);

  song = {
    name: "Pashto",
    howl: new Howl({
      src: ["./sounds/Pashto.mp3"],
    }),
    played: false,
  };
  arr.push(song);

  song = {
    name: "Portuguese",
    howl: new Howl({
      src: ["./sounds/Portuguese.mp3"],
    }),
    played: false,
  };
  arr.push(song);

  song = {
    name: "Russian",
    howl: new Howl({
      src: ["./sounds/Russian.mp3"],
    }),
    played: false,
  };
  arr.push(song);

  song = {
    name: "Spanish",
    howl: new Howl({
      src: ["./sounds/Spanish.mp3"],
    }),
    played: false,
  };
  arr.push(song);

  song = {
    name: "Swahili",
    howl: new Howl({
      src: ["./sounds/Swahili.mp3"],
    }),
    played: false,
  };
  arr.push(song);

  song = {
    name: "Tagalog",
    howl: new Howl({
      src: ["./sounds/Tagalog.mp3"],
    }),
    played: false,
  };
  arr.push(song);

  song = {
    name: "Tamil",
    howl: new Howl({
      src: ["./sounds/Tamil.mp3"],
    }),
    played: false,
  };
  arr.push(song);

  return arr;
}
