let isDark = false;
let emailConfig = null;

async function loadEmailConfig() {
  try {
    const response = await fetch("/api/config");
    if (!response.ok) {
      throw new Error("Failed to fetch config");
    }
    emailConfig = await response.json();

    if (window.emailjs && emailConfig?.emailjsPublicKey) {
      window.emailjs.init(emailConfig.emailjsPublicKey);
    }
  } catch (error) {
    console.error("Email config unavailable:", error);
  }
}

function toggleTheme() {
  isDark = !isDark;
  document.body.classList.toggle("dark", isDark);
  const icon = isDark ? "☀️" : "🌙";
  document.getElementById("theme-icon").textContent = icon;
}

function scroll2(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  document.getElementById("mob-menu").classList.remove("open");
}

function toggleMenu() {
  document.getElementById("mob-menu").classList.toggle("open");
}

function hoverCard(el, color) {
  el.style.borderColor = color;
  el.style.boxShadow = "0 16px 40px rgba(0,0,0,0.12)";
  el.style.transform = "translateY(-4px)";
}

function unhoverCard(el) {
  el.style.borderColor = "";
  el.style.boxShadow = "";
  el.style.transform = "";
}

function sendMsg() {
  const name = document.getElementById("fname").value.trim();
  const email = document.getElementById("femail").value.trim();
  const msg = document.getElementById("fmsg").value.trim();

  if (!name || !email || !msg) {
    alert("Please fill all fields");
    return;
  }

  if (!email.endsWith("@gmail.com")) {
    alert("Please enter a valid Gmail address");
    return;
  }

  if (!window.emailjs || !emailConfig?.emailjsServiceId || !emailConfig?.emailjsTemplateId) {
    alert("Email service is not configured yet.");
    return;
  }

  const params = {
    from_name: name,
    from_email: email,
    message: msg
  };

  window.emailjs.send(emailConfig.emailjsServiceId, emailConfig.emailjsTemplateId, params)
    .then(function () {
      alert("Message sent successfully!");
    }, function () {
      alert("Failed to send message. Try again.");
    });
}

const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("in");
  });
}, { threshold: 0.08 });

document.querySelectorAll(".reveal,.reveal-left").forEach(el => obs.observe(el));

if (window.innerWidth < 600) {
  const c = document.getElementById("neural-canvas");
  if (c) c.style.display = "none";
}

window.toggleTheme = toggleTheme;
window.scroll2 = scroll2;
window.toggleMenu = toggleMenu;
window.hoverCard = hoverCard;
window.unhoverCard = unhoverCard;
window.sendMsg = sendMsg;

loadEmailConfig();
