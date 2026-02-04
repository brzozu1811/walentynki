function send(msg) {
    fetch(DISCORD_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: msg })
    });
}

/* ===================== */
/* ELEMENTY DOM */
const envelope = document.querySelector(".letter-image");
const letterBox = document.getElementById("letterBox");
const countdownEl = document.getElementById("countdown");
const sentencesContainer = document.getElementById("sentencesContainer");
const sentences = sentencesContainer.querySelectorAll(".sentence");
const readySentence = document.getElementById("readySentence");

const no = document.getElementById("no");
const yes = document.getElementById("yes");
const ofc = document.getElementById("ofc");

/* ===================== */
/* BLOKADA KOPERTY NA START */
let canOpenLetter = false;
envelope.style.pointerEvents = 'none';

/* ===================== */
/* LICZNIK + ANIMACJA ZDAŃ */
let countdownTime = 60;
countdownEl.textContent = countdownTime;
countdownEl.style.display = "block";

let sentenceIndex = 0;

function showNextSentence(callback) {
    if (sentenceIndex >= sentences.length) {
        if (callback) callback();
        return;
    }

    const current = sentences[sentenceIndex];
    current.style.opacity = "1";
    current.style.transform = "translateX(-50%) translateY(-10px)";

    setTimeout(() => {
        current.style.opacity = "0";
        current.style.transform = "translateX(-50%) translateY(0)";
        sentenceIndex++;
        setTimeout(() => showNextSentence(callback), 500);
    }, 1800);
}

// Start animacji zdań
showNextSentence();

/* ===================== */
/* Odliczanie */
const timer = setInterval(() => {
    countdownTime--;
    countdownEl.textContent = countdownTime;

    if (countdownTime <= 0) {
        clearInterval(timer);
        countdownEl.style.display = "none";
        canOpenLetter = true;
        envelope.style.pointerEvents = 'auto';

        // pokaż napis, że można otworzyć kopertę
        readySentence.style.opacity = "1";
        readySentence.style.transform = "translateX(-50%) translateY(-10px)";
        readySentence.style.background = "linear-gradient(45deg, #d82d60, #d82d60)";
        readySentence.style.webkitBackgroundClip = "text";
        readySentence.style.webkitTextFillColor = "transparent";
        readySentence.style.textShadow = "0 0 6px #d82d60(178, 17, 47, 0.8), 0 0 12px #d82d60(184, 8, 61, 0.6)";
    }
}, 1000);

/* ===================== */
/* OTWARCIE LISTU */
function openLetter() {
    if (!canOpenLetter) {
        // efekt ostrzeżenia jeśli kliknie się przed czasem
        envelope.style.transform = "translate(-50%, -50%) scale(1.05)";
        setTimeout(() => {
            envelope.style.transform = "translate(-50%, -50%) scale(1)";
        }, 300);
        return;
    }

    envelope.classList.add("open");
    document.body.classList.add("letter-open");

    setTimeout(() => {
        letterBox.classList.add("show");
    }, 900);
}

/* ===================== */
/* HOVER KOPERTY PRZED ODCZEKANIEM */
envelope.addEventListener("mouseover", () => {
    if (!canOpenLetter) {
        envelope.style.transform = "translate(-50%, -50%) scale(1.05)";
        envelope.style.transition = "transform 0.2s ease-in-out, box-shadow 0.2s";
        envelope.style.boxShadow = "0 0 25px rgba(255,100,150,0.6)";
    }
});
envelope.addEventListener("mouseout", () => {
    if (!canOpenLetter) {
        envelope.style.transform = "translate(-50%, -50%) scale(1)";
        envelope.style.boxShadow = "none";
    }
});

/* ===================== */
/* PRZYCISKI - UCIEKAJĄCE NIE */
// Dodaj transition w CSS (płynna zmiana pozycji)
// Dodaj transition dla gładkiego ruchu
// Funkcja do tworzenia wybuchu przy teleportacji
function createExplosion(x, y) {
    const explosion = document.createElement("div");
    explosion.className = "explosion";
    explosion.style.left = x + "px";
    explosion.style.top = y + "px";
    letterBox.appendChild(explosion);

    // Usuwamy wybuch po animacji (500ms)
    setTimeout(() => explosion.remove(), 500);
}

// CSS dla wybuchu (dodaj do <style> w HTML)
/*
.explosion {
    position: absolute;
    width: 20px;
    height: 20px;
    background: radial-gradient(circle, #ff0 0%, #f00 70%);
    border-radius: 50%;
    pointer-events: none;
    animation: explode 0.5s ease-out forwards;
}

@keyframes explode {
    0% { transform: scale(0); opacity: 1; }
    100% { transform: scale(2.5); opacity: 0; }
}
*/

const margin = 20; // minimalny odstęp od krawędzi






/* ===================== */
/* TAK / OCZYWIŚCIE */
yes.addEventListener("click", () => {
    send("💖 TAK");
    letterBox.innerHTML = "<h1>WIEDZIAŁEM 😍</h1>";
});

ofc.addEventListener("click", () => {
    send("🥰 OCZYWIŚCIE");
    letterBox.innerHTML = "<h1>🥹💘</h1>";
});

/* ===================== */
/* LOSOWE SERDUSZKA W TLE */
function createHearts() {
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.style.left = Math.random() * window.innerWidth + "px";
        heart.style.top = window.innerHeight + "px";
        heart.style.animationDuration = (4 + Math.random() * 4) + "s";
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 8000);
    }
}
setInterval(createHearts, 1000);
