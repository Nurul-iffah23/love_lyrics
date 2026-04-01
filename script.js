const audio = document.getElementById("audio");
const lyrics = document.querySelectorAll("#lyrics p");
const popup = document.getElementById("popup");

let popupShown = false; // track popup

audio.addEventListener("timeupdate", () => {
  const currentTime = audio.currentTime;

  // ---- Lyrics highlight & scroll ----
  lyrics.forEach((line) => {
    const time = parseFloat(line.getAttribute("data-time"));

    if (currentTime >= time) {
      // remove active dari semua
      lyrics.forEach(l => l.classList.remove("active"));

      // add active pada line sekarang
      line.classList.add("active");

      // scroll ke tengah container
      line.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  });

  // ---- Popup trigger at last line ----
  if(currentTime >= 42 && !popupShown) { // adjust 42s sesuai last lyric
    popup.classList.add("show");
    popupShown = true;

    // auto hide popup after 8 seconds
    setTimeout(() => {
      popup.classList.remove("show");
    }, 8000);
  }
});
const heartsContainer = document.getElementById("hearts-container");

// Function generate one heart
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.textContent = "💖";

  // random horizontal position
  heart.style.left = Math.random() * window.innerWidth + "px";

  // random size
  const size = Math.random() * 20 + 15; // 15px – 35px
  heart.style.fontSize = size + "px";

  heartsContainer.appendChild(heart);

  // remove heart after animation ends
  setTimeout(() => {
    heart.remove();
  }, 5000); // match floatUp animation duration
}

// generate heart every 500ms
setInterval(createHeart, 500);