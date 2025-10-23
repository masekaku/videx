const JSON_PATH = "/assets/catalog.map.json";
const continueBtn = document.getElementById("continueBtn");
const errorBox = document.getElementById("errorBox");
let targetURL = "";

// Ambil ID unik dari URL
const id = window.location.pathname.replace(/\/+$/, "").split("/").pop();

// Validasi URL eksternal
const isSafeHttpUrl = (value) => {
  try { return ["https:", "http:"].includes(new URL(value).protocol); }
  catch { return false; }
};

const showError = (msg) => {
  errorBox.textContent = msg;
  errorBox.classList.remove("hidden");
};

// Load JSON dan ambil URL berdasarkan ID
(async () => {
  try {
    const res = await fetch(JSON_PATH, { cache: "no-store" });
    if (!res.ok) throw new Error("Gagal memuat JSON");
    const data = await res.json();
    const item = data[id];

    if (!item || !item.url || !isSafeHttpUrl(item.url)) {
      showError("ID tidak ditemukan atau URL tidak valid.");
      setTimeout(() => { window.location.href = "/404.html"; }, 2000);
      return;
    }

    targetURL = item.url;
    continueBtn.disabled = false;
  } catch (err) {
    console.error(err);
    showError("Terjadi kesalahan saat memuat tautan.");
  }
})();

// Tombol lanjutkan redirect ke URL eksternal
continueBtn.addEventListener("click", () => {
  if (targetURL) {
    if (window.Histats) Histats.track_click(); // Analytics
    window.location.href = targetURL;
  }
});