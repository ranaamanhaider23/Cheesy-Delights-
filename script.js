// QUICK SETUP: replace these values before publishing.
const BRAND_NAME = "ChessyDelights";
const CONTACT_EMAIL = "ranaamanhaider23@gmail.com";

document.title = `${BRAND_NAME} — AR & Digital Experiences`;
document.querySelectorAll(".brand-name").forEach(el => el.innerHTML = `${BRAND_NAME.split(" ")[0]}<span>${BRAND_NAME.split(" ").slice(1).join(" ") || "STUDIO"}</span>`);
document.querySelectorAll(".site-footer .brand-name").forEach(el => el.innerHTML = `${BRAND_NAME.split(" ")[0]}<span>${BRAND_NAME.split(" ").slice(1).join(" ") || "STUDIO"}</span>`);
document.querySelectorAll("footer small").forEach(el => { el.innerHTML = `© ${new Date().getFullYear()} ${BRAND_NAME}. Digital experiences & food.`; });
document.getElementById("year").textContent = new Date().getFullYear();
const emailLink = document.getElementById("emailLink");
emailLink.textContent = CONTACT_EMAIL;
emailLink.href = `mailto:${CONTACT_EMAIL}`;

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

let qrMade = false;
document.getElementById("makeQr").addEventListener("click", () => {
  const output = document.getElementById("qrOutput");
  const qrTarget = document.getElementById("qrcode");
  if (!window.QRCode) {
    output.hidden = false;
    qrTarget.innerHTML = "<p style='color:#111;font-size:10px'>QR library did not load. Check internet connection and try again.</p>";
    return;
  }
  qrTarget.innerHTML = "";
  const shareUrl = window.location.href.split("#")[0];
  new QRCode(qrTarget, { text: shareUrl, width: 180, height: 180, colorDark: "#080a12", colorLight: "#ffffff", correctLevel: QRCode.CorrectLevel.H });
  output.hidden = false;
  qrMade = true;
});
document.getElementById("downloadQr").addEventListener("click", () => {
  const qrTarget = document.getElementById("qrcode");
  const canvas = qrTarget.querySelector("canvas");
  const img = qrTarget.querySelector("img");
  const url = canvas ? canvas.toDataURL("image/png") : (img ? img.src : null);
  if (!url) return;
  const a = document.createElement("a");
  a.href = url;
  a.download = "your-brand-ar-qr.png";
  a.click();
});

document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = form.get("name");
  const email = form.get("email");
  const service = form.get("service");
  const message = form.get("message");
  if (CONTACT_EMAIL === "hello@example.com") {
    document.getElementById("formStatus").textContent = "Setup needed: open script.js and replace hello@example.com with your real email address.";
    return;
  }
  const subject = encodeURIComponent(`Project enquiry — ${service}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nService: ${service}\n\nProject details:\n${message}`);
  document.getElementById("formStatus").textContent = "Opening your email app. Send the drafted email to complete the enquiry.";
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
});
