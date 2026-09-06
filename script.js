document.addEventListener("DOMContentLoaded", () => {
  // ===============================================
  // 1. ENVELOPE OPENING ANIMATION
  // ===============================================
  const waxSealBtn = document.getElementById("waxSealBtn");
  const topFlap = document.getElementById("envelopeTopFlap");
  const envelopeScreen = document.getElementById("envelope-screen");
  const lightRay = document.getElementById("envelopeLight");

  if (waxSealBtn) {
    waxSealBtn.addEventListener("click", () => {
      // 1. Trigger light flare
      if (lightRay) lightRay.classList.add("active");

      // 2. Dissolve and slide out seal
      waxSealBtn.style.transform = "translate(-50%, -150%) scale(0.6)";
      waxSealBtn.style.opacity = "0";

      // 3. Unfold flap upward
      setTimeout(() => {
        if (topFlap) topFlap.classList.add("unfolded");
      }, 200);

      // 4. Fade out entire envelope screen
      setTimeout(() => {
        if (envelopeScreen) envelopeScreen.classList.add("dismissed");
      }, 950);
    });
  }

  // ===============================================
  // 2. HTML5 SCRATCH CARDS FUNCTIONALITY
  // ===============================================
  function setupScratchCard(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;

    const width = parent.offsetWidth;
    const height = parent.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    // Draw metallic gold foil layer
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "#D9BC77");
    grad.addColorStop(0.3, "#F9E9BE");
    grad.addColorStop(0.65, "#CFAB5F");
    grad.addColorStop(1, "#A07525");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Diagonal hatch pattern
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.lineWidth = 1.5;
    for (let offset = -width; offset < width * 2; offset += 15) {
      ctx.beginPath();
      ctx.moveTo(offset, 0);
      ctx.lineTo(offset + height, height);
      ctx.stroke();
    }

    let isDrawing = false;

    function eraseAt(clientX, clientY) {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 16, 0, Math.PI * 2, false);
      ctx.fill();
    }

    // Mouse events
    canvas.addEventListener("mousedown", (e) => {
      isDrawing = true;
      eraseAt(e.clientX, e.clientY);
    });

    window.addEventListener("mouseup", () => {
      isDrawing = false;
    });

    canvas.addEventListener("mousemove", (e) => {
      if (!isDrawing) return;
      eraseAt(e.clientX, e.clientY);
    });

    // Touch events for mobile
    canvas.addEventListener("touchstart", (e) => {
      isDrawing = true;
      const touch = e.touches[0];
      eraseAt(touch.clientX, touch.clientY);
    }, { passive: true });

    window.addEventListener("touchend", () => {
      isDrawing = false;
    });

    canvas.addEventListener("touchmove", (e) => {
      if (!isDrawing) return;
      const touch = e.touches[0];
      eraseAt(touch.clientX, touch.clientY);
    }, { passive: true });
  }

  setupScratchCard("canvasDay");
  setupScratchCard("canvasMonth");
  setupScratchCard("canvasYear");

  // ===============================================
  // 3. COUNTDOWN TIMER (Target: 10 Jan 2027)
  // ===============================================
  const ceremonyTarget = new Date("January 10, 2027 18:00:00").getTime();

  function renderCountdown() {
    const currentTime = new Date().getTime();
    const remainingTime = ceremonyTarget - currentTime;

    if (remainingTime > 0) {
      const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

      const dEl = document.getElementById("dayCounter");
      const hEl = document.getElementById("hourCounter");
      const mEl = document.getElementById("minCounter");
      const sEl = document.getElementById("secCounter");

      if (dEl) dEl.innerText = String(days).padStart(2, "0");
      if (hEl) hEl.innerText = String(hours).padStart(2, "0");
      if (mEl) mEl.innerText = String(minutes).padStart(2, "0");
      if (sEl) sEl.innerText = String(seconds).padStart(2, "0");
    }
  }

  setInterval(renderCountdown, 1000);
  renderCountdown();
});
    
