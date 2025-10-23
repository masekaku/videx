const JSON_PATH = "/assets/catalog.map.json";
const continueBtn = document.getElementById("continueBtn");
const errorBox = document.getElementById("errorBox");
let targetURL = "";

const getIdFromPath = () => {
  const parts = window.location.pathname.replace(/\/+$/, "").split("/");
  return parts[parts.length - 1] || "";
};

const isSafeHttpUrl = (value) => {
  try { return ["https:", "http:"].includes(new URL(value).protocol); }
  catch { return false; }
};

const showError = (msg) => {
  errorBox.textContent = msg;
  errorBox.classList.remove("hidden");
};

(async () => {
  const id = getIdFromPath();
  if(!id){ showError("ID unik tidak ditemukan."); return; }

  try {
    const res = await fetch(JSON_PATH, {cache:"no-store"});
    if(!res.ok) throw new Error("Gagal memuat JSON");
    const data = await res.json();
    const item = data?.[id];
    if(!item || !item.url || !isSafeHttpUrl(item.url)){
      showError("URL tujuan tidak valid atau tidak ditemukan.");
      setTimeout(() => { window.location.href = "/404.html"; }, 2000);
      return;
    }

    targetURL = item.url;
    continueBtn.disabled = false;
  } catch(err){
    console.error(err);
    showError("Terjadi kesalahan saat memuat tautan.");
  }
})();

continueBtn.addEventListener("click", () => {
  if(targetURL) {
    if (window.Histats) Histats.track_click(); // Histats tracking
    window.location.href = targetURL;
  }
});