const cards = [
  "assets/anime/chibi_naruto.png", "assets/anime/chibi_goku.png",
  "assets/anime/chibi_sailor_moon.png", "assets/anime/chibi_luffy.png",
  "assets/anime/chibi_tanjiro.png", "assets/anime/chibi_deku.png"
];
let cardArray = [...cards, ...cards];
let flippedCards = [];
let matchedPairs = 0, timer = 0, interval = null, score = 0, bgmPlaying = true;
const gameBoard = document.getElementById("game-board");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart");
const muteBtn = document.getElementById("mute");
const bgm = document.getElementById("bgm");
const flipSound = document.getElementById("flip-sound");
const matchSound = document.getElementById("match-sound");
const winSound = document.getElementById("win-sound");
muteBtn.onclick = () => {
  bgmPlaying = !bgmPlaying;
  bgmPlaying ? bgm.play() : bgm.pause();
  muteBtn.textContent = bgmPlaying ? "🔊" : "🔇";
};
function startTimer() {
  interval = setInterval(() => {
    timer++;
    timerEl.textContent = `⏱ ${timer}s`;
  }, 1000);
}
function resetGame() {
  timer = 0; score = 0; matchedPairs = 0; flippedCards = [];
  cardArray = [...cards, ...cards].sort(() => 0.5 - Math.random());
  timerEl.textContent = "⏱ 0s";
  scoreEl.textContent = "✅ 0";
  gameBoard.innerHTML = "";
  restartBtn.style.display = "none";
  if (interval) clearInterval(interval);
  startTimer();
  renderCards();
  if (bgmPlaying) bgm.play();
}
function renderCards() {
  cardArray.forEach(src => {
    const card = document.createElement("div");
    card.className = "card";
    const front = document.createElement("img");
    front.className = "front"; front.src = src;
    const back = document.createElement("div");
    back.className = "back";
    card.append(front, back);
    gameBoard.append(card);
    card.onclick = () => {
      if (flippedCards.length < 2 && !card.classList.contains("flip")) {
        card.classList.add("flip");
        flippedCards.push(card);
        flipSound.play();
        if (flippedCards.length === 2) setTimeout(checkMatch, 800);
      }
    };
  });
}
function checkMatch() {
  const [c1, c2] = flippedCards;
  if (c1.querySelector(".front").src === c2.querySelector(".front").src) {
    matchedPairs++; score++;
    scoreEl.textContent = `✅ ${score}`;
    matchSound.play();
    if (matchedPairs === cards.length) {
      clearInterval(interval);
      setTimeout(() => {
        winSound.play();
        alert("🎉 You win!");
        restartBtn.style.display = "inline-block";
      }, 300);
    }
  } else {
    c1.classList.remove("flip");
    c2.classList.remove("flip");
  }
  flippedCards = [];
}
restartBtn.onclick = resetGame;
window.onload = resetGame;
