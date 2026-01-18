/* =========================
   NAVBAR TOGGLE (MOBILE)
========================= */
function toggleMenu() {
    document.querySelector(".nav-menu").classList.toggle("active");
}

/* =========================
   INFO DATA
========================= */
const infoData = {
    home: {
        title: "Connecting Farmers & Buyers",
        text: "FarmConnect ensures guaranteed markets, fair prices, and secure digital contracts for farmers."
    },
    features: {
        title: "Smart & Secure Features",
        text: "Get fair pricing, smart contracts, instant payments, and easy mobile access."
    },
    contact: {
        title: "We Are Here To Help",
        text: "Contact our support team anytime for assistance, guidance, and farmer welfare."
    }
};

/* =========================
   NAVBAR CLICK HANDLER
========================= */
const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();

        const targetId = link.getAttribute("href").replace("#", "");
        const section = document.getElementById(targetId);

        section.scrollIntoView({ behavior: "smooth" });
        showInfo(targetId);

        document.querySelector(".nav-menu").classList.remove("active");
    });
});

/* SHOW INFO FUNCTION */
function showInfo(id) {
    const panel = document.getElementById("infoPanel");
    const title = document.getElementById("infoTitle");
    const text = document.getElementById("infoText");

    if (infoData[id]) {
        title.innerText = infoData[id].title;
        text.innerText = infoData[id].text;
        panel.style.display = "block";
    }
}

/* =========================
   ACTIVE NAV ON SCROLL
========================= */
window.addEventListener("scroll", () => {
    let current = "";

    document.querySelectorAll("section").forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

/* =========================
   MODAL
========================= */
function openModal() {
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function closeDetailModal() {
    document.getElementById("detailModal").style.display = "none";
}

window.onclick = function (e) {
    if (e.target === document.getElementById("modal")) {
        closeModal();
    }
    if (e.target === document.getElementById("detailModal")) {
        closeDetailModal();
    }
};

/* =========================
   LEARN MORE BUTTON → FEATURES
========================= */
document.querySelector(".btn-outline").addEventListener("click", () => {
    document.querySelector("#features").scrollIntoView({
        behavior: "smooth"
    });
});

/* =========================
   AI CROP PLANNER (SMART DEMO)
========================= */
function showCropSuggestion() {
    const data = [
        { crop: "🌾 Wheat", reason: "High MSP & stable demand" },
        { crop: "🍅 Tomato", reason: "Contract buyers available" },
        { crop: "🌽 Maize", reason: "Low risk & climate friendly" },
        { crop: "🥔 Potato", reason: "Cold storage support" }
    ];

    const pick = data[Math.floor(Math.random() * data.length)];

    document.getElementById("cropResult").innerHTML = `
        <strong>${pick.crop}</strong><br>
        <small>${pick.reason}</small>
    `;
}

/* =========================
   VOICE ASSIST DEMO
========================= */
function voiceDemo() {
    const msg = new SpeechSynthesisUtterance(
        "FarmConnect par farmers ko guaranteed buyers aur secure contract milte hain."
    );

    msg.lang = "hi-IN";
    msg.rate = 0.9;
    window.speechSynthesis.speak(msg);
}

/* =========================
   SECTION ANIMATION ON VIEW
========================= */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll(".feature, .unique-card, .stat").forEach(el => {
    observer.observe(el);
});

/* =========================
   CARD DETAILS
========================= */
const detailedData = {
    "Guaranteed Buyers": {
        text: "Farmers ko verified buyers milte hain jisse crop sale guaranteed hoti hai aur risk kam hota hai."
    },
    "Fair Pricing": {
        text: "Pricing MSP, market demand aur buyer bidding ke basis par transparent hoti hai."
    },
    "Smart Contracts": {
        text: "Blockchain-inspired digital contracts jo payment aur delivery ko automatically secure karte hain."
    },
    "AI Crop Planner": {
        text: "AI land size, soil, weather aur market demand analyze karke best crop suggest karta hai."
    }
};

document.querySelectorAll(".feature, .unique-card").forEach(card => {
    card.addEventListener("click", () => {
        const title = card.querySelector("h3").innerText;
        if (!detailedData[title]) return;

        document.getElementById("detailTitle").innerText = title;
        document.getElementById("detailText").innerText = detailedData[title].text;

        document.getElementById("detailModal").style.display = "flex";
    });
});

/* =========================
   BACKEND MOCK FETCH
========================= */
async function loadCardData() {
    try {
        const response = await fetch("data/cards.json");
        const data = await response.json();
        console.log("Backend Data Loaded:", data);
    } catch (error) {
        console.error("Backend connection failed");
    }
}
loadCardData();
   