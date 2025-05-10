const letterWrapper = document.getElementById('letterWrapper');
const envelopeTop = document.querySelector('.envelope-top');
const letter = document.getElementById('letter');
const content = document.getElementById('messageContent');
const audio = document.getElementById('bg-music');
const tapText = document.getElementById('tapText');

// The message to type out
const message = `My Beloved Palak (Palku) 💖,

Every moment with you feels like poetry written in the stars ✨. This letter is just a small glimpse of how deeply I feel for you 🥺.

I know I’ve made mistakes 😔 — things I wish I could go back and fix. But through every storm, you’ve stood by me like my anchor ⚓ and my light 🌟.

Thank you for trusting me, for forgiving me, and most of all — for loving me even when I’ve struggled to love myself 💕.

You’ve shown me what true love means — not just through your words, but your patience, your laughter, and your quiet strength 🤍.

You make my days brighter 🌞, my nights softer 🌙, and my heart fuller than I ever thought possible 💗.

I made this letter for you to remind you that my love for you is timeless — just like this parchment it’s written on 📜.

No matter where we are or what challenges come our way, remember this:

I am always yours — in every lifetime, every world, every version of me ❤️.

Forever yours,  
💌`;

let opened = false;

// When user clicks the letter, open it and show the message
letterWrapper.addEventListener('click', () => {
  if (!opened) {
    envelopeTop.style.transform = 'rotateX(-180deg)';  // Open the envelope
    letter.classList.add('show'); // Show the letter content
    tapText.style.opacity = '0';  // Fade out the "tap to open" text
    setTimeout(() => (tapText.style.display = 'none'), 500);  // Remove it after fade out
    typeText(message);  // Start typing the message
    audio.play();  // Play background music
    startHearts();  // Start floating hearts animation
    opened = true;
  }
});

// Typewriter effect for displaying the message
function typeText(text, i = 0) {
  if (i < text.length) {
    content.innerHTML += text.charAt(i);
    setTimeout(() => typeText(text, i + 1), 40);  // Delay for each letter
  }
}

// Floating hearts animation using canvas
function startHearts() {
  const canvas = document.getElementById('heartsCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let hearts = [];

  for (let i = 0; i < 50; i++) {
    hearts.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 15 + 5,
      speed: Math.random() * 2 + 1,
      alpha: Math.random() * 0.6 + 0.4
    });
  }

  function drawHeart(x, y, size, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = 'rgba(255, 0, 100, 1)';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x + size / 2, y - size, x + size * 1.5, y + size / 2, x, y + size);
    ctx.bezierCurveTo(x - size * 1.5, y + size / 2, x - size / 2, y - size, x, y);
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(h => {
      h.y -= h.speed;
      if (h.y < -50) {
        h.y = canvas.height + 50;
      }
      drawHeart(h.x, h.y, h.size, h.alpha);
    });
    requestAnimationFrame(animate);
  }

  animate();
}
